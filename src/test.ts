// import Hachiraw from "./scrapers/hachiraw";

// const hachiraw = await Hachiraw();

// console.log(
//   // await hachiraw.collectGenres(),
//   // await hachiraw.collectUrls(1),
//   await hachiraw.collectManga("https://hachiraw.net/manga/destiny-lovers"),
//   // await hachiraw.collectChapter(
//   //   "https://hachiraw.net/manga/demi-chan-wa-kataritai/chapter-71",
//   // ),
// );

import prisma from "./services/prisma";
import { getMainName} from "./lib/detector";

const removeErrorChap = async () => {
  // get all chapters of 1042
  const chapters = await prisma.chapter.findMany({
    where: {
      mangaId: 1042,
      content: {
        string_contains: "storage.dnmanga.one",
        path: [
           '0', 'data', '0'
        ],
      }
    },
  });

  if (!chapters) {
    console.error("No chapters found!");
    return;
  }

  let chapWithImages = [];

  for (const chapter of chapters) {
    if (!Array.isArray(chapter.content)) {
      return;
    }


    const content = chapter.content[0] as any;
    const firstImage = chapter.content && content?.data[0];

    if (!firstImage) {
      console.error(`Chapter ${chapter.id} has no images!`);
      continue;
    }

    const chapterId = chapter.id;

    chapWithImages.push({ chapterId, firstImage });
  }


  const limit = 50;
  const status = [] as { chapterId: number; isErr: boolean }[];

  for (let i = 0; i < chapWithImages.length; i += limit) {
    const chunk = chapWithImages.slice(i, i + limit);
    const promises = chunk.map(async ({ chapterId, firstImage }) => {
      if (!firstImage) {
        return;
      }

      let isErr = false;

      await fetch(firstImage, {
        method: "HEAD",
      })
        .then(async (res) => {
          const contentLength = parseInt(
            res.headers.get("content-length") || "0",
          );

          if (contentLength <= 146) {
            console.error(`Chapter ${chapterId} not found!`);
            isErr = true;
            return;
          }
        })
        .catch((err) => {
          console.error(err);
        });

      status.push({ chapterId, isErr });
    });

    await Promise.all(promises);
  }



  await prisma.chapter.deleteMany({
    where: {
      id: {
        in: status.filter((s) => s.isErr).map((s) => s.chapterId),
      },
    },
  });

  console.log("Done!");
};

const fixName = async () => {
  // getMainName
  const mangas = await prisma.manga.findMany({
    select: {
      id: true,
      title: true,
      alternative: true,
    },
  });

  for (const manga of mangas) {
    let alternatives = manga.alternative?.split(",") || [];
    const names = [manga.title, ...alternatives];

    const mainName = getMainName(names);

    alternatives = [...new Set(alternatives)].filter((a) => a !== mainName);

    await prisma.manga.update({
      where: {
        id: manga.id,
      },
      data: {
        title: mainName,
        alternative:  alternatives.join(","),
      },
    });
  }

};

const fixName2 = async () => {
  // trim all manga name
  const mangas = await prisma.manga.findMany({
    select: {
      id: true,
      title: true,
    }
  });

  for (const manga of mangas) {
    const title = manga.title.trim();

    await prisma.manga.update({
      where: {
        id: manga.id,
      },
      data: {
        title,
      },
    });

    console.log(`Updated ${manga.id} to ${title}`);
  }
}

await removeErrorChap();

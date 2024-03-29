import { MangaStatus } from "./types/MangaTypes";
import { ContentType } from "./types/MangaTypes";

import { parallelMap, parallelDo } from "@@/src/lib/parallel";

import Scraper from "@@/src/scrapers/hachiraw";

import prisma from "@@/src/services/prisma";
import { Prisma } from "@prisma/client";

const NUMBER_OF_PAGES = 10;
const NUMBER_OF_PARALLEL_REQUESTS = 20; // 20 page requests at a time to get manga urls

const NUMBER_OF_PARALLEL_REQUESTS_CHAPTERS = 20; //20 ^ 2 = 400 chapter requests at a time
const NUMBER_OF_PARALLEL_REQUESTS_MANGA = 10;

class LockUrl {
  private urls: string[] = [];

  constructor() {}

  public add(url: string) {
    this.urls.push(url);
  }

  public remove(url: string) {
    this.urls = this.urls.filter((u) => u !== url);
  }

  public isLocked(url: string) {
    return this.urls.includes(url);
  }

  public length() {
    return this.urls.length;
  }
}

class Picker {
  private urls: string[] = [];
  private unavailableUrls: string[] = [];
  private index = 0;

  constructor(urls: string[]) {
    this.urls = urls;

    this.checkAvailability().then(() => {
      this.urls = this.urls.filter(
        (url) => !this.unavailableUrls.includes(url),
      );

      if (this.urls.length === 0) {
        process.exit(1);
      }

      console.info("Available urls: ", this.urls.length);
    });
  }

  public pick() {
    const url = this.urls[this.index];
    this.index = (this.index + 1) % this.urls.length;
    return url;
  }

  public remove(url: string) {
    this.urls = this.urls.filter((u) => u !== url);
  }

  public async checkAvailability() {
    await Promise.all(
      this.urls.map(async (url) => {
        return fetch(url, {
          method: "HEAD",
        }).then((res) => {
          if (res.status === 429 || res.status === 404) {
            this.unavailableUrls.push(url);
          }
        });
      }),
    );
  }
}

class CloudfareCache {
    private urls: string[] = [];


    constructor(urls = []) {
        this.urls = urls;
    }

    public add(url: string) {
        if (this.urls.includes(url)) return;

        this.urls.push(url);
    }


    async purge() {
        if (this.urls.length === 0 || !process.env.CLOUDFARE_ZONE_ID || !process.env.CLOUDFARE_EMAIL || !process.env.CLOUDFARE_API_KEY) return;

        await fetch(`https://api.cloudflare.com/client/v4/zones/${process.env.CLOUDFARE_ZONE_ID}/purge_cache`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Auth-Email": process.env.CLOUDFARE_EMAIL,
                "X-Auth-Key": process.env.CLOUDFARE_API_KEY,
            },
            body: JSON.stringify({
                files: this.urls,
            }),
        });
    }


}

const worker = new Picker([
  "https://bn.image01.workers.dev/?url=",
  "https://bn.image02.workers.dev/?url=",
  "https://bn.image03.workers.dev/?url=",
  "https://bn.image04.workers.dev/?url=",
  "https://bn.image05.workers.dev/?url=",
  "https://bn.image06.workers.dev/?url=",
  "https://bn.image07.workers.dev/?url=",
  "https://bn.image08.workers.dev/?url=",
  "https://bn.image09.workers.dev/?url=",
  "https://bn.image10.workers.dev/?url=",
  "https://bn.image11.workers.dev/?url=",
  "https://bn.image12.workers.dev/?url=",
  "https://bn.image13.workers.dev/?url=",
]);


const manga1001 = await Scraper();
const lockUrl = new LockUrl();

const genres = await manga1001.collectGenres().then(
  (genres) => genres.filter((genre, index) => genres.indexOf(genre) === index), // Remove duplicates
);

await Promise.all(
  genres.map(async (genre) => {
    if (genre === "Uncategorized") return;

    const genreExists = await prisma.genre.count({
      where: {
        name: genre,
      },
    });

    if (genreExists) return;

    await prisma.genre.create({
      data: {
        name: genre,
        pinned: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    console.log(`Genre ${genre} created!`);
  }),
);

const collectUrls = (page: Number): Promise<any> =>
  new Promise(async (resolve) => {
    console.log(`Collecting urls from page ${page}...`);

    resolve(await manga1001.collectUrls(page));
  });

let urlChunks = await parallelMap(
  Array.from({ length: NUMBER_OF_PAGES }, (_, i) => i + 1),
  collectUrls,
  NUMBER_OF_PARALLEL_REQUESTS,
);

for (const urls of urlChunks) {
  await parallelDo(
    urls,
    async (url: any) => {
      if (lockUrl.isLocked(url)) {
        console.warn(`Url ${url} already locked!`);
        return;
      }

      lockUrl.add(url);

      const manga = await manga1001.collectManga(url);

      if (!manga || manga.title === "") {
        console.log(`Manga ${url} not found!`);
        return;
      }

      let Manga = await prisma.manga.findFirst({
        where: {
          title: {
            equals: manga.title.trim(),
            mode: "insensitive",
          }
        },
      });


      const genres = await prisma.genre.findMany({
        where: {
          name: {
            in: manga.genres,
          },
        },
      });

      const genresIds = genres.map((genre) => genre.id);

      const tags = [...manga.tags];

      if (!Manga) {
        const genreAdults = [
          "エロい",
          "Ecchi",
          "エッチ",
          "アダルト",
          "ジェンダーベンダー",
        ];

        const genres = manga.genres ? manga.genres : [];

        const hasDesiredGenre = genres.some((genre: string) =>
          genreAdults.includes(genre),
        );

        Manga = await prisma.manga.create({
          data: {
            title: manga.title,
            alternative: manga.alternativeTitles,
            description: manga.description,
            image: manga.cover || "/public/img/no-cover.webp",
            status: MangaStatus.ONGOING,
            isAdult: hasDesiredGenre,
            genres: {
              connect: genresIds.map((id) => {
                return {
                  id,
                };
              }),
            },
            tags: {
              connectOrCreate: tags.map((tag) => {
                return {
                  where: {
                    name: tag,
                  },
                  create: {
                    name: tag,
                  },
                };
              }),
            },

            createdAt: new Date(),
            updatedAt: new Date(),
          },
          include: {
            genres: true,
            tags: true,
          },
        });

        console.log(`Manga ${Manga.title} created!`);
      }

      await parallelDo(
        manga.chapters,
        async (chapter: any) => {
          if (!Manga) return;

          if (lockUrl.isLocked(chapter.url)) {
            console.warn(`Chapter ${chapter.title} is locked!`);
            return;
          }

          lockUrl.add(chapter.url);

          if (
            typeof chapter.index === "undefined" ||
            isNaN(new Number(chapter.index).valueOf())
          ) {
            console.error(`Chapter ${chapter.title} has invalid index!`);
            return;
          }

          const chapterExists = await prisma.chapter.count({
            where: {
              index: chapter.index,
              mangaId: Manga.id,
            },
          });

          if (chapterExists) {
            console.log(`Chapter ${chapter.title} exists!`);
            return;
          }

          let images = await manga1001.collectChapter(chapter.url);

          if (!images) {
            return;
          }

          try {
            images = await Promise.all(
              images.map(async (image: string, index: number) => {
                if (!Manga) throw new Error("Manga not found!");

                // const isWebp = image.includes(".webp");
                const path = `${Manga.id}/${chapter.index}/${index}.jpg`;

                const workerUrl = worker.pick();
                const upload = await fetch(
                  `${workerUrl}${encodeURIComponent(
                    // isWebp
                    //   ?
                    //   `${
                    //       imgProxy.pick() + encodeURIComponent(image)
                    //     }&output=jpg&w=900&we`
                    //   :
                    image,
                  )}&path=${path}`,
                  {
                    headers: {
                      referer: manga1001.BASE_URL,
                    },
                  },
                );

                if (!upload.ok) {
                  throw new Error(
                    upload.statusText + " " + workerUrl + " " + image,
                  );
                }

                const json = await upload.json();

                // if (
                //   typeof json === "undefined" ||
                //   typeof json.error !== "undefined"
                // ) {
                //   throw new Error(json.error);
                // }

                // return json[0].src;

                if (
                  json.HttpCode === 201 &&
                  json.Message === "File uploaded."
                ) {
                  return "https://storage.dnmanga.one/" + path;
                }

                throw new Error(json.Message);
              }),
            );
          } catch (error: any) {
            console.log("Error occurred during image upload", error);
            return;
          }

          // console.log(images);

          await Promise.all([
            await prisma.chapter.create({
              data: {
                title: chapter.title,
                index: chapter.index,
                manga: {
                  connect: {
                    id: Manga.id,
                  },
                },
                content: [
                  {
                    type: ContentType.EXTERNAL,
                    data: images,
                  },
                ] as Prisma.JsonArray,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            }),

            await prisma.manga.update({
              where: {
                id: Manga.id,
              },
              data: {
                updatedAt: new Date(),
              },
            }),
          ]);

          console.log(`Chapter ${chapter.title} created!`);
        },
        NUMBER_OF_PARALLEL_REQUESTS_CHAPTERS,
      );
    },
    NUMBER_OF_PARALLEL_REQUESTS_MANGA,
  );
}

process.exit(0);

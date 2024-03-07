import * as cheerio from 'cheerio';
import prisma from "@/services/prisma";
import {ContentType} from "@/types/MangaTypes";
import {Prisma} from "@prisma/client";


const mangaID = 425;
const chapName = 253;

const html = await fetch(`https://www.mangabank.cc/manga/%E5%91%AA%E8%A1%93%E5%BB%BB%E6%88%A6/%E7%AC%AC253%E8%A9%B1/`).then((res) => res.text());

const $ = cheerio.load(html);

let images = $(".c-blog-post .entry-content .entry-content_wrap .read-container img").map((_, el) => $(el).attr("data-src")?.trim()).get();

images = images.filter((image) => !image.includes(
    "https://www.mangabank.cc/wp-content/uploads/WP-manga/data/manga_638445590969920491/1f70ec55f2f17a706e6e9de69cd41ee7/jjk252223-1.png"
));


// DEBUG
// console.log(images);
//
// process.exit(0);


// ============== Upload to storage ==============


const uploaded = await
    Promise.all(
        images.map(async (image, index) => {
                return await fetch(`https://bn.image01.workers.dev/?path=files/${mangaID}/${chapName}/${index}.jpg&url=${image}`, {
                    method: "GET",
                    headers: {
                        "User-Agent": "Mozilla/5.0",
                        "Referer": "https://mangaraw.work/",
                    },
                }).then((res) => res.json());
            }
        )
    )

const isUploaded = uploaded.every((upload) => upload.HttpCode === 201);
if (isUploaded) {
    await prisma.chapter.create({
        data: {
            title: `第${chapName}話`,
            index: chapName,
            isPublic: true,
            mangaId: mangaID,
            content: [
                {
                    type: ContentType.EXTERNAL,
                    data: images.map((_, index) =>
                        `https://storage.dnmanga.one/files/${mangaID}/${chapName}/${index}.jpg`),
                },
            ] as Prisma.JsonArray,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    })
}



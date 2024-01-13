import { MangaStatus } from "./types/MangaTypes";

import { parallelMap, parallelDo } from "@@/src/lib/parallel";
import Manga1001 from "@@/src/scrapers/manga1001";

import prisma from "@@/src/services/prisma";
import { Prisma } from "@prisma/client";


const NUMBER_OF_PAGES = 40;
const NUMBER_OF_PARALLEL_REQUESTS = 10;

const NUMBER_OF_PARALLEL_REQUESTS_CHAPTERS = 20;
const NUMBER_OF_PARALLEL_REQUESTS_MANGA = 10;

const manga1001 = await Manga1001();
const genres = await manga1001.collectGenres();


await Promise.all(genres.map(async (genre) => {
    if (genre === 'Uncategorized') return;

    const genreExists = await prisma.genre.count({
        where: {
            name: genre
        },
    });

    if (genreExists) return;

    await prisma.genre.create({
        data: {
            name: genre,
            pinned: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    });

    console.log(`Genre ${genre} created!`);
}));

const collectUrls = (page: Number): Promise<any> => new Promise(async (resolve) => {
    console.log(`Collecting urls from page ${page}...`);

    resolve(
        await manga1001.collectUrls(page)
    )
});

const urlChunks = await parallelMap(Array.from({ length: NUMBER_OF_PAGES }, (_, i) => i + 1), collectUrls, NUMBER_OF_PARALLEL_REQUESTS);

for (const urls of urlChunks) {
    await parallelDo(urls, async (url: any) => {
        const manga = await manga1001.collectManga(url);


        if (!manga) {
            console.log(`Manga ${url} not found!`);
            return;
        }

        let Manga = await prisma.manga.findFirst({
            where: {
                title: manga.title
            },
        });

        const mergedGenres = [...manga.genres, ...manga.tags];

        const genres = await prisma.genre.findMany({
            where: {
                name: {
                    in: mergedGenres
                }
            }
        });

        const genresIds = genres.map(genre => genre.id);

        const tags = [
            ...manga.tags, 
            ...manga.genres.filter(genre => !genres.map(genre => genre.name).includes(genre))
        ]; 

        if (!Manga) {
            const genreAdults = [
                'エロい',
                'Ecchi',
                'コメディ',
            ]

            const hasDesiredGenre = mergedGenres.some(genre => genreAdults.includes(genre));

            Manga = await prisma.manga.create({
                data: {
                    title: manga.title,
                    alternative: manga.alternativeTitles,
                    description: manga.description,
                    image: manga.cover || '/public/img/no-cover.webp',
                    status: MangaStatus.ONGOING,
                    isAdult: hasDesiredGenre,
                    genres: {
                        connect: genresIds.map(id => {
                            return {
                                id
                            }
                        })
                    },
                    tags: {
                        connectOrCreate: tags.map(tag => {
                            return {
                                where: {
                                    name: tag
                                },
                                create: {
                                    name: tag
                                }
                            }
                        })
                    },
                    
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                include: {
                    genres: true,
                    tags: true,
                }
            });

            console.log(`Manga ${Manga.title} created!`);
        } 


        await parallelDo(manga.chapters, async (chapter: any) => {
            if (!Manga) return;

            const chapterExists = await prisma.chapter.count({
                where: {
                    title: chapter.title,
                    mangaId: Manga.id,
                }
            });

            if (chapterExists) {
                console.log(`Chapter ${chapter.title} exists!`);
                return;
            }

            const images = await manga1001.collectChapter(chapter.url);

            if (!images) {
                return;
            }

            const Chapter = await prisma.chapter.create({
                data: {
                    title: chapter.title,
                    manga: {
                        connect: {
                            id: Manga.id
                        }
                    },
                    content: [
                        {
                            type: 'hotlink',
                            data: images
                        }
                    ] as Prisma.JsonArray,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            });

           
        }, NUMBER_OF_PARALLEL_REQUESTS_CHAPTERS);

    }, NUMBER_OF_PARALLEL_REQUESTS_MANGA);
}


process.exit(0);

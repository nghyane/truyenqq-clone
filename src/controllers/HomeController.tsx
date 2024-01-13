import HomePage from "@/views/pages/home";
import MangaPage from "@/views/pages/manga";
import prisma from '../services/prisma';
import { MangaStatus } from '../types/MangaTypes';

const HomeController = {
    welcome: () => {
        return <h1>Go to <a href="/home">Home</a></h1>
    },

    index: async ({ params }: {
        params: {
            page?: string
        }
    }) => {
        const page = params?.page ? parseInt(params.page) : 1;

        const [trendingMangas, updatedMangas] = await Promise.all([
            prisma.manga.findMany({
                orderBy: {
                    views: {
                        views: 'desc',
                        
                    }
                },
                select: {
                    id: true,
                    title: true,
                    image: true,
                    views: true,
                    chapters: {
                        select: {
                            id: true,
                            title: true,
                            updatedAt: true,
                            mangaId: true,
                        },
                        orderBy: {
                            updatedAt: 'desc'
                        },
                        take: 1,
                    }
                },
                take: 15,
            }),
            prisma.manga.findMany({
                where: {
                    status: MangaStatus.ONGOING
                },
                orderBy: {
                    updatedAt: 'desc'
                },
                select: {
                    id: true,
                    title: true,
                    image: true,
                    views: true,
                    chapters: {
                        select: {
                            id: true,
                            title: true,
                            updatedAt: true,
                            mangaId: true,
                        },
                        orderBy: {
                            updatedAt: 'desc'
                        },
                        take: 1,
                    }
                },

                skip: (page - 1) * 52,
                take: 52,
            })
        ]);

        return <HomePage title="Home Page" trendingMangas={trendingMangas} updatedMangas={updatedMangas} />
    },

    chapter: async ({ params }: { params: {
        id: string
    } }) => {

        const chapter = await prisma.chapter.findUnique({
            where: {
                id: new Number(params.id).valueOf()
            },
            include: {
                manga: {
                    select: {
                        id: true,
                        title: true,
                        image: true,
                    }
                }
            }
        });


        return <h1>Chapter</h1>
    }

}






export default HomeController;
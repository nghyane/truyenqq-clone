import HomePage from "@/views/pages/home";

import prisma from '../services/prisma';
import { Prisma } from '@prisma/client';
import { MangaStatus } from '../types/MangaTypes';
import { Context } from "elysia";

export const MangaSelect = Prisma.validator<Prisma.MangaSelect>()({
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
            index: 'desc'
        },
        take: 1,
    },
    _count: {
        select: {
            bookmarks: true
        }
    }
})

const HomeController = {
    welcome: ({ set }: Context) => {
        set.status = 301;
        set.redirect = '/home';
    },

    index: async ({ params }: {
        params: {
            page?: string
        }
    }) => {
        const page = params?.page ? parseInt(params.page) : 1;

        const [trendingMangas, updatedMangas, topDayMangas] = await Promise.all([
            prisma.manga.findMany({
                orderBy: {
                    views: {
                        views: 'desc',
                        
                    }
                },
                select: MangaSelect,
                take: 15,
            }),
            prisma.manga.findMany({
                where: {
                    status: MangaStatus.ONGOING
                },
                orderBy: {
                    updatedAt: 'desc'
                },
                select: MangaSelect,

                skip: (page - 1) * 52,
                take: 52,
            }),
            prisma.manga.findMany({
                orderBy: {
                    views: {
                        viewsDay: 'desc',
                    }
                },
                select: MangaSelect,
                take: 10,
            }),
        ]);

       

        return <HomePage title="Home Page" trendingMangas={trendingMangas} updatedMangas={updatedMangas} topDayMangas={topDayMangas} />
    },

    

}






export default HomeController;
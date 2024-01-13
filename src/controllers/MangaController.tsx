import MangaPage from "@/views/pages/manga";
import prisma from "@/services/prisma";
import { Prisma } from "@prisma/client";

export const MangaInclude = Prisma.validator<Prisma.MangaInclude>()({
    chapters: {
        orderBy: {
            updatedAt: 'desc'
        },
        select: {
            id: true,
            title: true,
            updatedAt: true,
        },
    },
    genres: {
        select: {
            id: true,
            name: true,
        }
    },
    tags: {
        select: {
            id: true,
            name: true,
        }
    },
    views: {
        select: {
            views: true
        }
    },
})

export const MangaController =  {
    index: async ({ params }: { params: {
        id: string
    } }) => {
        const manga = await prisma.manga.findUnique({
            where: {
                id: new Number(params.id).valueOf()
            },
            include: MangaInclude
        }) as any;

        return <MangaPage manga={manga} />
    },
}
export default MangaController;
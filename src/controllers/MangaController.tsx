import MangaPage from "@/views/pages/manga";
import prisma from "@/services/prisma";
import { Prisma } from "@prisma/client";
import { NotFoundError } from "elysia";

export const MangaInclude = Prisma.validator<Prisma.MangaInclude>()({
    chapters: {
        orderBy: {
            index: 'desc'
        },
        select: {
            id: true,
            title: true,
            index: true,
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
    _count: {
        select: {
            bookmarks: true
        }
    }
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
        });

        if (!manga) {
            throw new NotFoundError();
        }

        return <MangaPage manga={manga} />
    },
}
export default MangaController;
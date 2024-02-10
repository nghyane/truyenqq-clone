import prisma from "@/services/prisma";
import ChapterPage from "@/views/pages/chapter";
import { Context } from "elysia";
import { Prisma } from "@prisma/client";
import { NotFoundError } from "elysia";

export const ChapterInclude = Prisma.validator<Prisma.ChapterInclude>()({
  manga: {
    select: {
      id: true,
      title: true,
      image: true,
      views: true,
      description: true,
      tags: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },
});

export const ChapterController = {
  index: async ({ query }: Context) => {
    const chapter = await prisma.chapter.findUnique({
      where: {
        id: new Number(query.id).valueOf(),
      },
      include: ChapterInclude,
    });

    if (!chapter) {
      throw new NotFoundError();
    }

    return <ChapterPage chapter={chapter} />;
  },
  chapters: async ({ query }: Context) => {
    if (!query.id) {
      return {
        error: "No manga id provided",
      };
    }

    const orderBy = query.orderBy?.toString() === "asc" ? "asc" : "desc";

    const chapters = await prisma.chapter.findMany({
      where: {
        mangaId: new Number(query.id).valueOf(),
      },
      orderBy: {
        index: orderBy,
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return (
      <>
        {chapters.map((chapter) => {
          return (
            <option value={chapter.id.toString()} safe>
              {chapter.title}
            </option>
          );
        })}
      </>
    );
  },
};

export default ChapterController;

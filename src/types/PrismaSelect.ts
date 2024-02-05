import { Prisma } from "@prisma/client";

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
      index: "desc",
    },
    take: 1,
  },
  _count: {
    select: {
      bookmarks: true,
    },
  },
});

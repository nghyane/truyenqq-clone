import HomePage from "@/views/pages/home";

import prisma from "../services/prisma";
import { MangaStatus } from "../types/MangaTypes";
import { Context } from "elysia";
import { MangaSelect } from "../types/PrismaSelect";

const HomeController = {
  welcome: ({ set }: Context) => {
    set.status = 301;
    set.redirect = "/home1";
  },

  index: async ({
    params,
  }: {
    params: {
      page?: string;
    };
  }) => {
    const page = params?.page ? parseInt(params.page) : 1;

    const [trendingMangas, updatedMangas, topDayMangas] = await Promise.all([
      prisma.manga.findMany({
        where: {
          isAdult: false,
        },
        orderBy: {
          bookmarks: {
            _count: "desc",
          }
        },
        select: MangaSelect,
        take: 20,
      }),
      prisma.manga.findMany({
        where: {
          status: MangaStatus.ONGOING,
          isAdult: false,
        },
        orderBy: {
          updatedAt: "desc",
        },
        select: MangaSelect,

        skip: (page - 1) * 52,
        take: 52,
      }),
      prisma.manga.findMany({
        where: {
          isAdult: false,
        },
        orderBy: {
          views: {
            viewsDay: "desc",
          },
        },
        select: MangaSelect,
        take: 10,
      }),
    ]);

    return (
      <HomePage
        title="Home Page"
        trendingMangas={trendingMangas}
        updatedMangas={updatedMangas}
        topDayMangas={topDayMangas}
      />
    );
  },
};

export default HomeController;

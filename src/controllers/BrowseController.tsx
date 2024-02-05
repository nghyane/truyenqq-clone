import BrowsePage from "@/views/pages/browse";
import { Context } from "elysia";
import prisma from "@/services/prisma";
import { MangaSelect } from "../types/PrismaSelect";
import { MangaStatus } from "@@/src/types/MangaTypes";
import { Prisma } from "@prisma/client";

const ALLOWED_QUERY_PARAMS = ["page", "type", "genres", "status", "isAdult"];
const ITEMS_PER_PAGE = 30;

class BrowseController {
  async index(ctx: Context) {
    const { query } = ctx;

    query &&
      Object.keys(query).forEach((key) => {
        if (!ALLOWED_QUERY_PARAMS.includes(key)) {
          throw new Error("Invalid query params");
        }
      });

    let page = 1;

    if (query?.page) {
      page = parseInt(query.page as string);
      if (isNaN(page) || page < 1) {
        throw new Error("Invalid page number");
      }
    }

    let status: MangaStatus | undefined = undefined;
    if (query?.status) {
      status = parseInt(query.status as string);
      if (isNaN(status) || !Object.values(MangaStatus).includes(status)) {
        throw new Error("Invalid status");
      }
    }

    let inGenres: number[] | undefined = undefined;

    if (query?.genres) {
      if (Array.isArray(query.genres)) {
        inGenres = query.genres.map((genre) => parseInt(genre));
      } else {
        inGenres = [parseInt(query.genres as string)];
      }
    }

    const queryPrisma: Prisma.MangaFindManyArgs = {
      where: {
        status: status,
        isAdult: query?.isAdult === "true",
        genres: {
          some: {
            id: {
              in: inGenres,
            },
          },
        },
      },
    };

    const [mangas, count] = await Promise.all([
      prisma.manga.findMany({
        where: queryPrisma.where,
        orderBy: {
          updatedAt: "desc",
        },
        select: MangaSelect,
        skip: page ? (page - 1) * ITEMS_PER_PAGE : 0,
        take: ITEMS_PER_PAGE,
      }),

      prisma.manga.count({
        where: queryPrisma.where,
      }),
    ]);

    return (
      <BrowsePage mangas={mangas} count={count} page={page} context={ctx} />
    );
  }
}

export default BrowseController;

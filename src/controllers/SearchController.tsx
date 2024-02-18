import { Context } from "elysia";
import prisma from "@/services/prisma";

import LiveSearch from "@/views/components/LiveSearch";
import { MangaSelect } from "@/types/PrismaSelect";

const LIMIT = 15;

class SearchController {
  index = async () => {};

  ajax = async ({ query }: Context) => {
    const { keyword } = query;

    const mangas = await prisma.manga.findMany({
      where: {
        OR: [
          {
            alternative: {
              contains: keyword,
              mode: "insensitive",
            },
          },
          {
            title: {
              contains: keyword,
              mode: "insensitive",
            },
          },
          {
            tags: {
              some: {
                name: {
                  contains: keyword,
                  mode: "insensitive",
                },
              },
            },
          }
        ],
      },
      select: MangaSelect,
      take: LIMIT,
    });

    return LiveSearch({ mangas });
  };
}

export default SearchController;

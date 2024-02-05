import { Context } from "elysia";
import prisma from "@/services/prisma";

class ViewCountController {
  mangaViewIncrement = async ({ query }: Context) => {
    const { mangaId } = query;

    if (!mangaId) {
      return {
        status: 400,
        body: {
          message: "mangaId is required",
        },
      };
    }

    await prisma.mangaView.update({
      where: {
        mangaId: parseInt(mangaId as string),
      },
      data: {
        views: {
          increment: 1,
        },
        viewsDay: {
          increment: 1,
        },
        viewsWeek: {
          increment: 1,
        },
        viewsMonth: {
          increment: 1,
        },
      },
    });

    return {
      status: 200,
      body: {
        message: "success",
      },
    };
  };
}

export default ViewCountController;

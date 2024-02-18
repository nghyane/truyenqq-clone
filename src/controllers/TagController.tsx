import { VerifyContext } from "@/derives/VerifyToken";
import prisma from "@/services/prisma";
import TagPage from "@/views/pages/tag";

class TagController {
  async index(ctx: VerifyContext) {
    const { id } = ctx.params;

    if (!id) {
      throw new Error("User id is required");
    }

    const tag = await prisma.tag.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    const mangas = await prisma.manga.findMany({
      where: {
        tags: {
          some: {
            id: parseInt(id),
          },
        },
      },
      select: {
        tags: true,
        title: true,
        id: true,
      },
    });

    if (!tag) {
      throw new Error("Tag not found");
    }

    return TagPage({ tag, mangas });
  }
}

export default TagController;

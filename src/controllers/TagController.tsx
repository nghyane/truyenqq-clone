import { VerifyContext } from "@/derives/VerifyToken";
import prisma from "@/services/prisma";

class TagController {
  async index(ctx: VerifyContext) {
   const { id } = ctx.params;

  if (!id) {
    throw new Error("User id is required");
  }

  const mangas = await prisma.manga.findMany({
    where: {
      tags: {
        some: {
          id: parseInt(id),
        },
      },
    },
  });

  console.log(mangas);

  }
}

export default TagController;

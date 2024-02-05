import { VerifyContext } from "@/derives/VerifyToken";
import prisma from "@/services/prisma";

class UserController {
  getUser = async (ctx: VerifyContext) => {
    const { id } = ctx.params;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        fullname: true,
        updatedAt: true,
        createdAt: true,
        Session: true,
      },
    });
  };
}

export default UserController;

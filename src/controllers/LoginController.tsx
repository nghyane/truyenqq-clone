import LoginPage from "@/views/pages/login";
import { Context } from "elysia";
import prisma from "@/services/prisma";
import { hashPassword } from "@/lib/hash";

class LoginController {
  LOGIN_INVALID = "Your username or password is incorrect!";

  index = () => <LoginPage />;

  login = async ({
    body,
  }: Context & { body: { username: string; password: string } }) => {
    // check if user exists
    const user = await prisma.user.findUnique({
      where: {
        username: body.username,
      },
      select: {
        password: true,
      },
    });

    if (!user) {
      return {
        status: 404,
        body: {
          message: this.LOGIN_INVALID,
        },
      };
    }

    const password = hashPassword(body.password);

    if (password !== user.password) {
      return {
        status: 401,
        body: {
          message: this.LOGIN_INVALID,
        },
      };
    }

    const userInfo = await prisma.user.findUnique({
      where: {
        username: body.username,
      },
      select: {
        Session: true,
        username: true,
        email: true,
        password: false,
        fullname: true,
      },
    });

    return {
      status: 200,
      body: {
        message: "Login success",
        data: userInfo,
      },
    };
  };

  loginWithGoogle = () => {
    console.log("loginWithGoogle");
  };

  // vulnerability = async ({ body }: Context) => {
  //   const { password, username } = body as {
  //     password: string;
  //     username: string;
  //   };

  //   const connectionString = process.env.DATABASE_URL;

  //   const client = new Client({
  //     connectionString,
  //   });

  //   await client.connect();

  //   // const user = await client.query(
  //   //   `SELECT * FROM users WHERE username = '${username}' AND password = '${hashPassword(
  //   //     password,
  //   //   )}'`,
  //   // );

  //   // sqlmap --data "username=1&password=1" -u http://localhost:3000/vulnerability --tables
  //   // curl --data "username=admin&password=admin" --url http://localhost:3000/vulnerability

  //   // ================== SQL INJECTION ==================

  //   const regex: RegExp =
  //     /select|insert|update|delete|drop|create|alter|truncate|exec|xp_cmdshell|sp_|xp_|restore|backup|declare|@|;|'|--/i;

  //   if (regex.test(username)) {
  //     return {
  //       status: 400,
  //       body: {
  //         message: "Invalid username or password",
  //       },
  //     };
  //   }

  //   const user = await client.query(
  //     `SELECT * FROM users WHERE username = $1 AND password = $2`,
  //     [username, hashPassword(password)],
  //   );

  //   // ================== SQL INJECTION ==================

  //   await client.end();

  //   console.info(username, password);

  //   if (user.rows.length === 0) {
  //     return {
  //       status: 404,
  //       body: {
  //         message: "Invalid username or password",
  //       },
  //     };
  //   }

  //   return {
  //     status: 200,
  //     body: {
  //       message: "Login success",
  //       data: user.rows,
  //     },
  //   };
  // };
}

export default LoginController;

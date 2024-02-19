import prisma from "@/services/prisma";
import { Context } from "elysia";
import { ContentType } from "@/types/MangaTypes";

const TableMangas = async (ctx: Context) => {
  const { page = 1, limit = 20, title } = ctx.query as any;

  const mangas = await prisma.manga.findMany({
    skip: (page - 1) * limit,
    take: limit,
    select: {
      id: true,
      title: true,
    },
    where: {
      title: {
        contains: title,
      },
      OR: [
        {
          alternative: {
            contains: title,
          },
        },
        {
          tags: {
            some: {
              name: {
                contains: title,
              },
            },
          },
        },
      ],
    },
  });

  return (
    <>
      <form action="" method="get">
        <input type="text" name="title" />
        <button type="submit">Search</button>
      </form>
      <table style={{ width: "100%", border: "1px solid black" }}>
        <thead>
          <tr style={{ backgroundColor: "lightgray" }}>
            <th>ID</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody style={{ backgroundColor: "white" }}>
          {mangas.map((manga) => (
            <tr>
              <td style={{ textAlign: "center", maxWidth: "50px" }}>
                {manga.id}
              </td>
              <td
                style={{
                  textAlign: "left",
                  maxWidth: "200px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                safe
              >
                {manga.title}
              </td>
              <td
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                }}
              >
                <a href={`/admin/manga/${manga.id}`}>Edit</a>
                <a href={`/admin/manga/${manga.id}/delete`}>Delete</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

class AdminController {
  veryfyAdmin = async (key: any) => {
    if (key == process.env.ADMIN_KEY) {
      return true;
    }

    return false;
  };

  middleware = async (ctx: Context) => {
    const key = ctx.cookie.admin_key.value;

    if (!(await this.veryfyAdmin(key))) {
      ctx.set.redirect = "/admin/check";
      ctx.set.status = 302;

      throw new Error("Unauthorized");
    }
  };

  index = async (ctx: Context) => {
    const key = ctx.cookie.admin_key.value;

    if (!(await this.veryfyAdmin(key))) {
      return (
        <>
          <form action="/admin/check" method="post">
            <input type="text" name="key" />
            <button type="submit">Login</button>
          </form>
        </>
      );
    }

    return (
      <>
        <h1>Admin</h1>

        <TableMangas {...ctx} />
      </>
    );
  };

  check = async (ctx: Context) => {
    const { key } = ctx.body as any;

    if (await this.veryfyAdmin(key)) {
      ctx.cookie.admin_key.set({
        value: key,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      });
    }

    ctx.set.redirect = "/admin";
    ctx.set.status = 302;
  };

  deleteManga = async (ctx: Context) => {
    this.middleware(ctx);

    const { id } = ctx.params as any;

    await prisma.manga.delete({
      where: {
        id: parseInt(id),
      },
    });

    ctx.set.redirect = "/admin";
    ctx.set.status = 302;
  };

  manga = async (ctx: Context) => {
    this.middleware(ctx);

    const { id } = ctx.params as any;

    const manga = await prisma.manga.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!manga) {
      return (ctx.set.redirect = "/admin");
    }

    return (
      <>
        <h1>Edit Manga </h1>
        <form
          action={`/admin/manga/${id}`}
          method="post"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            backgroundColor: "lightgray",
            padding: "10px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
            <label for="title" style={{ width: "100px" }}>
              Title:
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={manga.title}
              style={{ flex: 1 }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
            <label for="alternative" style={{ width: "100px" }}>
              Alternative:
            </label>
            <input
              type="text"
              name="alternative"
              id="alternative"
              style={{ flex: 1 }}
              value={manga.alternative || ""}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
            <label for="image" style={{ width: "100px" }}>
              Cover:{" "}
            </label>
            <input
              type="text"
              name="image"
              id="image"
              value={manga.image || ""}
              style={{ flex: 1 }}
            />
          </div>

          <br />
          <button type="submit" style={{ width: "100px", alignSelf: "left" }}>
            Update
          </button>
        </form>

        <div style={{ display: "flex", flexDirection: "row", gap: "15px" }}>
          <a href="/admin">Back</a>

          <a href={`/admin/manga/${id}/add`} style={{ color: "green" }}>
            Add Chap
          </a>

          <a href={`/admin/manga/${id}/delete`} style={{ color: "red" }}>
            Delete
          </a>
        </div>
      </>
    );
  };

  updateManga = async (ctx: Context) => {
    this.middleware(ctx);

    const { id } = ctx.params as any;
    const { title, alternative, image } = ctx.body as any;

    await prisma.manga.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        alternative,
        image,
      },
    });

    ctx.set.redirect = `/admin/manga/${id}`;
  };

  addChap = async (ctx: Context) => {
    this.middleware(ctx);

    const { id } = ctx.params as any;

    return (
      <>
        <h1>Add Chapter</h1>
        <form
          action={`/admin/manga/${id}/add`}
          method="post"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            backgroundColor: "lightgray",
            padding: "10px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
            <label for="title" style={{ width: "100px" }}>
              Title:
            </label>
            <input
              type="text"
              name="title"
              id="title"
              style={{ flex: 1 }}
              placeholder="第14話"
            />
          </div>

          <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
            <label for="index" style={{ width: "100px" }}>
              Index:{" "}
            </label>
            <input
              type="text"
              name="index"
              id="index"
              style={{ flex: 1 }}
              placeholder="1"
            />
          </div>

          <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
            <label for="file" style={{ width: "100px" }}>
              File:{" "}
            </label>
            <input
              type="file"
              name="file"
              id="file"
              style={{ flex: 1 }}
              multiple
            />
          </div>

          <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
            <label for="image" style={{ width: "100px" }}>
              Images:{" "}
            </label>
            <textarea
              name="image"
              id="image"
              style={{ flex: 1 }}
              placeholder={
                "https://cdn.mangaeden.com/01.jpg\nhttps://cdn.mangaeden.com/02.jpg\n..."
              }
              rows="5"
            />

            <script>
              {`
              const textarea = document.getElementById("image");
              textarea.addEventListener("input", function () {
                textarea.style.height = "auto";
                textarea.style.height = textarea.scrollHeight + "px";

              });
              `}
            </script>

            <script src="/public/js/admin.js"></script>
          </div>

          <br />

          <button type="submit" style={{ width: "100px", alignSelf: "left" }}>
            Add
          </button>
        </form>

        <div style={{ display: "flex", flexDirection: "row", gap: "15px" }}>
          <a href={`/admin/manga/${id}`}>Back</a>
        </div>
      </>
    );
  };

  addChapPost = async (ctx: Context) => {
    this.middleware(ctx);

    const { id } = ctx.params as any;
    const { title, index, image } = ctx.body as any;

    const content = [
      {
        data: image
          .trim()
          .split("\r\n")
          .map((url: string) => url.trim()),
        type: ContentType.EXTERNAL,
      },
    ];

    await prisma.chapter.create({
      data: {
        title,
        index: parseFloat(index),
        content: content,
        mangaId: parseInt(id),
      },
    });

    ctx.set.redirect = `/admin/manga/${id}`;
    ctx.set.status = 302;
  };
}

export default new AdminController();

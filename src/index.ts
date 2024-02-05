import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";

import api from "./routers/api";
import web from "./routers/web";

import refreshViewCron from "./crons/refresh-view";

const app = new Elysia()
  .use(
    staticPlugin({
      assets: "public",
      prefix: "public",
    }),
  )
  .use(
    staticPlugin({
      assets: "public/js",
      prefix: "public/js",
      headers: {
        "Cache-Control": "max-age=604800",
      },
    }),
  )
  .use(
    staticPlugin({
      assets: "public/img",
      prefix: "public/img",
      headers: {
        "Cache-Control": "max-age=604800",
      },
    }),
  )
  .use(
    staticPlugin({
      assets: "public/css",
      prefix: "public/css",
    }),
  );

app.use(refreshViewCron);

app.use(api);

app.use(html());
app.use(web);

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

import cron from "@elysiajs/cron";
import Elysia from "elysia";

const proxy = new Elysia();

proxy.use(
  cron({
    name: "refreshProxy",
    // every 5 minutes
    pattern: "0 */5 * * * *",
    run() {
      // https://cn.manga1001.workers.dev/https://cdn.kumaraw.com/uploads/chapters/74783/01.jpg
    },
  }),
);

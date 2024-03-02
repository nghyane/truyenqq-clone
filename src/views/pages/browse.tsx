import BaseBody from "../components/BaseBody";
import BaseHead from "../components/BaseHead";
import HomeFooter from "../components/HomeFooter";
import theme from "@@/src/services/theme";
import localize from "@/languages";

import { MangaStatus } from "@@/src/types/MangaTypes";
import { MangaSelect } from "@/types/PrismaSelect";
import { Prisma } from "@prisma/client";
import { mangaUrl, chapterUrl } from "@/services/url";
import { dateFormater } from "@/lib/time";
import { Context } from "elysia";
import qs from "qs";

import AdsenseSlot from "@components/AdsenseSlot";

const BrowsePage = ({
  mangas,
  count = 0,
  page = 1,
  context,
}: {
  mangas: Prisma.MangaGetPayload<{
    select: typeof MangaSelect;
  }>[];
  count: number;
  page: number;
  context: Context;
}) => {
  const title = process.env.BROWSE_TITLE;

  const totalPage = Math.ceil(count / 20);
  const currentPage = page;

  const maxPage = currentPage + 4;
  const minPage = currentPage - 4;

  const pages = Array.from({ length: totalPage }, (_, i) => i + 1);
  const query = context.query;

  const pagination = pages
    .filter((p) => p >= minPage && p <= maxPage)
    .map((p) => {
      return {
        page: p,
        query: {
          ...query,
          page: p,
        },
      };
    });

  const status = [
    { id: MangaStatus.ONGOING, name: localize("ongoing") },
    { id: MangaStatus.COMPLETED, name: localize("completed") },
  ];

  const type = [
    { id: "manga", name: "Manga" },
    { id: "smartoon", name: "Smartoon" },
  ];

  return (
    <html
      lang={process.env.APP_LANG}
      class="overflow-y-scoll h-auto min-h-full  w-full"
    >
      <BaseHead>
        <title safe>{title}</title>
        <meta name="description" content={process.env.BROWSE_DESCRIPTION} />
      </BaseHead>

      <BaseBody>
        <div class="container">
          <div class="mt-10 bg-white p-4 md:rounded-lg md:px-8 md:shadow">
            <h1 class="mx-auto mb-4 mt-5 w-full gap-2 text-center text-2xl font-semibold">
              <span safe>{localize("advanced_filter")}</span>
              <span class="text-sm text-gray-500"> ({count})</span>
            </h1>
            <form>
              <h2 class="mb-3 text-lg font-semibold" safe>
                {localize("filter")}
              </h2>
              <div class="flex flex-wrap items-center gap-x-3">
                <div class="flex w-[calc(50%-1rem)] flex-row items-center justify-start gap-2 rounded-md border border-gray-300 px-2 py-1 text-sm md:w-[220px] md:text-base lg:px-4 lg:py-1">
                  <label class="block w-[max-content]" for="type" safe>
                    {localize("type")}
                  </label>

                  <select
                    class="w-[calc(100%-60px)] bg-transparent text-gray-500"
                    name="type"
                  >
                    {type.map((t) => (
                      <option
                        value={`${t.id}`}
                        safe
                        selected={t.id == context.query.type}
                      >
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div class="flex w-[calc(50%-1rem)] flex-row items-center justify-start gap-2 rounded-md  border border-gray-300 px-2 py-1 text-sm md:w-[220px] md:text-base lg:px-4 lg:py-1">
                  <label class="block w-[max-content]" for="status" safe>
                    {localize("status")}
                  </label>

                  <select
                    class="w-[calc(100%-80px)] bg-transparent  text-gray-500 md:w-[calc(100%-90px)]"
                    name="status"
                  >
                    <option value="" safe>
                      {localize("all")}
                    </option>

                    {status.map((s) => (
                      <option
                        value={`${s.id}`}
                        safe
                        selected={
                          s.id == parseInt(context.query.status as string)
                        }
                      >
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <h2 class="mb-3 mt-4 text-lg font-semibold" safe>
                {localize("genres")}
              </h2>
              <div class="flex gap-x-3 gap-y-2 overflow-auto pb-3 text-sm md:flex-wrap md:text-base">
                {theme?.genres?.map((genre) => (
                  <div class="flex h-auto min-w-[max-content] flex-row items-center gap-2 rounded border border-gray-300 px-2 py-1">
                    <input
                      type="checkbox"
                      name="genres"
                      value={`${genre.id}`}
                      class="rounded border-gray-300"
                      id={`gen-${genre.id}`}
                      checked={
                        Array.isArray(context.query.genres)
                          ? context.query.genres.some((g) => g == genre.id)
                          : context.query.genres == genre.id.toString()
                      }
                    />
                    <label
                      for={`gen-${genre.id}`}
                      class="text-sm md:text-base"
                      safe
                    >
                      {genre.name}
                    </label>
                  </div>
                ))}
              </div>

              <div class="flex h-auto min-w-[max-content] flex-row items-center gap-2 rounded py-2">
                <input
                  type="checkbox"
                  name="isAdult"
                  value="true"
                  class="rounded border-gray-300"
                  id="adult"
                  checked={context.query.isAdult == "true"}
                />
                <label for="isAdult" class="text-sm font-bold md:text-base">
                  18+
                </label>
              </div>

              <button
                class="bg-primary mb-5 mt-8 rounded-md px-4 py-2 text-white"
                safe
              >
                {localize("apply")}
              </button>
            </form>
          </div>

            <AdsenseSlot className={"mt-10"} />

          <ul class="mt-10 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3 xl:grid-cols-5">
            {mangas.map((manga) => (
              <li>
                <a href={mangaUrl(manga)} title={manga.title}>
                  <div
                    class="relative overflow-hidden pb-[70%]"
                    style={{
                      backgroundImage: `url(/public/img/bg-image.png)`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  >
                    <img
                      src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                      data-src={manga.image}
                      alt={manga.title}
                      class="lazy absolute left-0 top-0 h-full w-full cursor-pointer object-cover"
                    />
                    <div class="no-wrap absolute bottom-0 flex h-7 w-full items-center justify-start gap-2 bg-black bg-opacity-70 px-2 text-xs font-medium text-white">
                      <span class="flex items-center gap-0.5">
                        <span>{manga.views?.viewsWeek || 0}</span>

                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          stroke-width="0"
                          viewBox="0 0 24 24"
                          class=" h-3 w-3"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12ZM12.0003 17C14.7617 17 17.0003 14.7614 17.0003 12C17.0003 9.23858 14.7617 7 12.0003 7C9.23884 7 7.00026 9.23858 7.00026 12C7.00026 14.7614 9.23884 17 12.0003 17ZM12.0003 15C10.3434 15 9.00026 13.6569 9.00026 12C9.00026 10.3431 10.3434 9 12.0003 9C13.6571 9 15.0003 10.3431 15.0003 12C15.0003 13.6569 13.6571 15 12.0003 15Z"></path>
                        </svg>
                      </span>
                      <span class="flex items-center gap-0.5">
                        <span>{manga._count.bookmarks}</span>
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          stroke-width="0"
                          viewBox="0 0 24 24"
                          class=" h-3 w-3"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M5 2H19C19.5523 2 20 2.44772 20 3V22.1433C20 22.4194 19.7761 22.6434 19.5 22.6434C19.4061 22.6434 19.314 22.6168 19.2344 22.5669L12 18.0313L4.76559 22.5669C4.53163 22.7136 4.22306 22.6429 4.07637 22.4089C4.02647 22.3293 4 22.2373 4 22.1433V3C4 2.44772 4.44772 2 5 2Z" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </a>

                <div class="mt-2 flex cursor-pointer flex-wrap">
                  <a href={mangaUrl(manga)} class="w-full">
                    <h2
                      class="hover:text-primary two-lines mb-2 w-full text-[16px] font-medium transition-colors duration-300"
                      safe
                    >
                      {manga.title}
                    </h2>
                  </a>

                  {manga.chapters?.length > 0 && (
                    <a
                      class="between flex w-full items-center gap-2 text-[14px]  text-gray-800 visited:text-gray-800"
                      href={chapterUrl(manga.chapters[0])}
                    >
                      <span
                        class="hover:text-primary w-5/6 truncate font-medium"
                        safe
                      >
                        {manga.chapters[0].title}
                      </span>
                      <span
                        class="w-5/6 truncate text-right text-gray-800"
                        safe
                      >
                        {dateFormater(manga.chapters[0].updatedAt)}
                      </span>
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div class="mb-10 mt-10 flex  justify-center">
            {pagination.map((item) => (
              <a
                href={
                  `?${qs.stringify(
                    {
                      ...query,
                      page: item.page,
                    },
                    {
                      arrayFormat: "repeat",
                    },
                  )}` || `?page=${item.page}`
                }
                class={`mx-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full p-4
                  ${item.page === page ? "bg-primary text-white" : ""}`}
              >
                {item.page}
              </a>
            ))}
          </div>

          <AdsenseSlot className={"mt-10 !max-w-full overflow-hidden"} />
        </div>


        <HomeFooter />
      </BaseBody>
    </html>
  );
};

export default BrowsePage;

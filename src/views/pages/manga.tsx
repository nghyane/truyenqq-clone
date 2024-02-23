import { BaseHead } from "../components/BaseHead";
import { BaseBody } from "../components/BaseBody";
import { MangaInclude } from "@/controllers/MangaController";
import { Prisma } from "@prisma/client";
import { chapterUrl, mangaUrl } from "@/services/url";
import { MangaButton } from "@@/src/views/components/Bookmark";

import localize from "@/languages";

const MangaPage = ({
  manga,
}: {
  manga: Prisma.MangaGetPayload<{
    include: typeof MangaInclude;
  }>;
}): JSX.Element => {
  const lastChapter = manga?.chapters[0];

  const dayUpdated = Math.round(
    (Date.now() - new Date(lastChapter?.updatedAt).getTime()) /
      (1000 * 60 * 60 * 24),
  );

  const index = Math.round(lastChapter?.index + (dayUpdated >= 3 ? 1 : 0)) || 0;

  const firstChapter = manga?.chapters[manga?.chapters.length - 1];

  const title =
    index > 0
      ? manga.title + ` – Raw 【第${index}話】`
      : manga.title + " (Raw – Free)";

  const customTags = [manga.title +  "Raw Free", title];

  if (lastChapter) {
    customTags.push(manga.title + lastChapter.title);
  }

  const breadcrumbs = [
    {
      name: localize("home"),
      url: "/home",
    },
    {
      name: manga.title,
      url: mangaUrl(manga),
      isActive: true,
    },
  ];

  return (
    <html
      lang={process.env.APP_LANG}
      class="overflow-y-scoll h-auto min-h-full  w-full"
    >
      <BaseHead>
        <title safe>{title}</title>
        <meta name="description" content={manga.description} />
        <meta name="keywords" content={customTags.join(", ")} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={manga.description} />
        <meta property="og:image" content={manga.image} />
        <meta property="og:url" content={mangaUrl(manga)} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={manga.description} />
        <meta name="twitter:image" content={manga.image} />

        <link rel="canonical" href={process.env.APP_URL + mangaUrl(manga)} />

        <link rel="preload" href={manga.image} as="image" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: breadcrumbs.map((breadcrumb, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: breadcrumb.name,
              item: breadcrumb.url,
            })),
          })}
        </script>

        <script type="text/javascript">
          {`window.__INITIAL_STATE__ =${JSON.stringify({
            mangaId: manga.id,
            chapterId: null,
          })}`}
        </script>
      </BaseHead>

      <BaseBody>
        <div class="container mx-auto my-10 flex  flex-wrap gap-4 rounded bg-white p-5 shadow">
          <ol class="flex w-full flex-wrap items-center gap-2 text-center">
            {breadcrumbs.map((breadcrumb, index) => (
              <>
                <li
                  class={
                    `text-sm` +
                    (index == breadcrumbs.length - 1 ? " text-primary" : "")
                  }
                >
                  <a href={breadcrumb.url} safe>
                    {breadcrumb.name}
                  </a>
                </li>

                {index < breadcrumbs.length - 1 && (
                  <li class="text-gray-500">-</li>
                )}
              </>
            ))}
          </ol>
          <div class="w-full md:w-1/4 md:max-w-[280px]">
            <div class="mx-auto w-[280px] overflow-hidden shadow-sm md:w-full">
              <img
                src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                data-src={manga.image}
                alt={manga.title}
                class="lazy h-[184px] w-full cursor-pointer object-cover"
                width={320}
                height={184}
              />
            </div>

            <div class="mx-auto mt-4 flex w-[70%] flex-none gap-2 md:w-full">
              <a
                class="bg-primary w-full rounded px-4 py-2 text-center text-white"
                href={
                  firstChapter
                    ? chapterUrl(firstChapter)
                    : 'javascript:window.App.showToaster("No chapter found")'
                }
                safe
              >
                {localize("read_now")}
              </a>

              <MangaButton manga_id={manga.id} />
            </div>
          </div>

          <div class="w-full md:w-[calc(75%-16px)]">
            <div class="my-4 flex flex-wrap justify-center gap-2 md:m-0 md:justify-start">
              <h1
                class="w-full text-center text-lg font-semibold capitalize md:text-left md:text-2xl"
                safe
              >
                {manga.title}
              </h1>
              <h2
                class="text-md w-full text-center font-medium capitalize md:text-left md:text-xl"
                safe
              >
                {manga.alternative}
              </h2>
            </div>

            <div class="my-6 flex flex-wrap gap-2">
              {manga.genres?.map((item) => (
                <a
                  href={`/browse?genres=${item.id}`}
                  class="bg-primary rounded px-2 py-1 text-[13px] text-white"
                  safe
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div class="flex flex-wrap gap-4">
              <div class="flex w-full flex-nowrap md:gap-4"></div>
            </div>
          </div>

          <div class="w-full">
            <p class="pb-4 text-sm md:text-[15px]" safe>
              {manga.description}
            </p>

            <h3 class="w-full text-lg font-semibold">Chapters</h3>

            <div class="mt-5 w-full">
              <input
                type="text"
                class="w-full cursor-pointer rounded border border-gray-200 p-2"
                placeholder="Search"
                id="search-chapter"
              />
            </div>

            <ul
              class="mt-3 flex flex-wrap rounded border  px-2"
              id="chapter-list"
            >
              {manga?.chapters?.map((chapter, index) => (
                <li
                  class={
                    `flex w-full cursor-pointer flex-nowrap justify-between gap-2 border-b border-gray-200 p-2` +
                    (index > 10 ? " hidden" : "")
                  }
                >
                  <a
                    href={chapterUrl(chapter)}
                    class="w-auto visited:text-gray-500"
                    title={`${manga.title} ${chapter.title}`}
                  >
                    <h3
                      class="hover:text-primary truncate text-[13px] font-medium transition-colors duration-300 md:text-[15px]"
                      safe
                    >
                      {chapter.title}
                    </h3>
                  </a>

                  <span
                    class="truncate text-[13px] text-gray-500 md:text-[15px]"
                    safe
                  >
                    {new Date(chapter.updatedAt).toLocaleDateString("ja-JP", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </li>
              ))}
            </ul>

            {manga.chapters?.length > 10 && (
              <button
                class="text-primary w-full cursor-pointer p-2"
                id="load-more-chapters"
              >
                View all chapters
              </button>
            )}

            <div class="my-6 flex flex-wrap gap-2">
              {manga.tags?.map((tag) => (
                <a href={`/tag/${tag.id}`}>
                  <span class="text-primary" safe>
                    #{tag.name}
                  </span>
                </a>
              ))}

              {customTags.map((tag) => (
                <a href="#">
                  <strong class="text-primary font-normal" safe>
                    #{tag}
                  </strong>
                </a>
              ))}
            </div>
          </div>
        </div>
      </BaseBody>
    </html>
  );
};

export default MangaPage;

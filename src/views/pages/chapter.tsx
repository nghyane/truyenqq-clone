import { BaseHead } from "@components/BaseHead";
import { BaseBody } from "@components/BaseBody";
import { Prisma } from "@prisma/client";
import { ChapterInclude } from "@/controllers/ChapterController";
import { Content, ContentType } from "@@/src/types/MangaTypes";
import { chapterUrl, mangaUrl } from "@/services/url";
import { ChapterButton } from "@components/Bookmark";

import localize from "@/languages";

const ChapterPage = ({
  chapter,
}: {
  chapter: Prisma.ChapterGetPayload<{
    include: typeof ChapterInclude;
  }>;
}): JSX.Element => {
  const content: Content[] = chapter.content as any;

  let title;

  if (chapter.manga.title.includes("(Raw – Free)")) {
    title = chapter.manga.title.replace(
      "(Raw – Free)",
      `【${chapter.title}】 RAW`,
    );
  } else {
    title = chapter.manga.title + `【${chapter.title}】 RAW`
  }

  const images: string[] = [];

  if (content) {
    content.forEach((content) => {
      if (content.type == ContentType.HOTLINK) {
        content.data.forEach((path: string) => {
          images.push(path);
        });
      } else if (content.type == ContentType.SELFHOSTED) {
        const total = content.data.total;

        for (let i = 1; i <= total; i++) {
          images.push(content.data.url.replace("{page}", i.toString()));
        }
      } else if (content.type == ContentType.EXTERNAL) {
        content.data.forEach((path: string) => {
          // regex if path has domain
          if (path.match(/^(http|https):\/\//)) {
            images.push(path);
          } else {
            images.push(`https://tl.dnmanga.one${path}`);
          }
        });
      }
    });
  }

  const breadcrumbs = [
    {
      name: localize("home"),
      url: "/home",
    },
    {
      name: chapter.manga.title,
      url: mangaUrl(chapter.manga),
    },
    {
      name: chapter.title,
      url: chapterUrl(chapter),
      isActive: true,
    },
  ];

  return (
    <html
      lang={process.env.APP_LANG}
      class="overflow-y-scoll h-auto min-h-full  w-full"
    >
      <BaseHead>
        <>
          <title safe>{title}</title>
          <meta name="description" content={title} />

          <meta property="og:title" content={title} />
          <meta property="og:description" content={title} />
          <meta property="og:image" content={chapter.manga.image} />

          <meta
            property="og:url"
            content={process.env.APP_URL + chapterUrl(chapter)}
          />

          <link
            rel="canonical"
            href={process.env.APP_URL + chapterUrl(chapter)}
          />

          <meta name="twitter:card" content="summary_large_image" />


          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={title} />

          <meta name="twitter:image" content={images[0] || chapter.manga.image} />

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

          <script>
            {`window.__INITIAL_STATE__ = ${JSON.stringify({
              chapterTitle: chapter.title,
              chapterId: chapter.id,
              chapterUrl: chapterUrl(chapter),
              mangaTitle: chapter.manga.title,
              mangaId: chapter.mangaId,
              mangaUrl: mangaUrl(chapter.manga),
              mangaCover: chapter.manga.image,
            })}`}
          </script>
        </>
      </BaseHead>

      <BaseBody className="!bg-[#000]">
        <div class="container p-0">
          <div class="mx-auto  flex w-full max-w-[1000px] flex-wrap items-center justify-center">
            <div class="flex w-full flex-wrap items-center justify-between gap-2 bg-white p-5 text-sm">
              <ol class="flex w-full flex-wrap items-center gap-2 text-center">
                {breadcrumbs.map((breadcrumb, index) => (
                  <>
                    <li
                      class={
                        `text-inherit` +
                        (index == breadcrumbs.length - 1 ? " text-primary" : "")
                      }
                    >
                      <a href={breadcrumb.url} safe>
                        {breadcrumb.name}
                      </a>
                    </li>

                    {index < breadcrumbs.length - 1 && (
                      <li class="text-inherit">-</li>
                    )}
                  </>
                ))}
              </ol>
              <h1 class="w-full text-[20px] font-semibold leading-normal">
                <a href={mangaUrl(chapter.manga)} class="text-primary" safe>
                  {chapter.manga.title}
                </a>{" "}
                - <span safe>{chapter.title}</span>
              </h1>
            </div>

            <div class="w-full border bg-[#f6f7f8]">
              <div
                class="chapter-nav flex w-full flex-wrap justify-center gap-1 bg-[#f6f7f8] p-1 md:h-[46px]"
                id="chapter-nav"
              >
                <a
                  href="/home"
                  class="mr-4 flex flex-nowrap items-center justify-center gap-2 leading-normal text-red-700"
                >
                  <svg
                    fill="currentColor"
                    class="h-6 w-6"
                    style="display:unset;vertical-align:unset;"
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="18"
                    viewBox="0 0 576 512"
                  >
                    <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"></path>
                  </svg>
                </a>
                <button class="prev-chapter flex w-10 flex-nowrap items-center justify-center gap-2 rounded-s-md bg-[#d9534f] p-2 leading-normal text-white">
                  <svg
                    fill="currentColor"
                    class="h-3 w-3"
                    viewBox="0 0 512 512"
                  >
                    <path d="M177.5 414c-8.8 3.8-19 2-26-4.6l-144-136C2.7 268.9 0 262.6 0 256s2.7-12.9 7.5-17.4l144-136c7-6.6 17.2-8.4 26-4.6s14.5 12.5 14.5 22l0 72 288 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-288 0 0 72c0 9.6-5.7 18.2-14.5 22z" />
                  </svg>
                </button>

                <select
                  id="chapters"
                  class="flex w-1/4 flex-nowrap items-center justify-center gap-2 border p-1 leading-normal"
                >
                  <option value="1" safe>
                    {chapter.title}
                  </option>
                </select>

                <button class="next-chapter flex w-10 flex-nowrap items-center justify-center gap-2 rounded-e-md bg-[#d9534f] p-2 leading-normal text-white">
                  <svg
                    fill="currentColor"
                    class="h-3 w-3"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M334.5 414c8.8 3.8 19 2 26-4.6l144-136c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22l0 72L32 192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32l288 0 0 72c0 9.6 5.7 18.2 14.5 22z" />
                  </svg>
                </button>

                <ChapterButton manga_id={chapter.mangaId} />
              </div>

              <div id="nav-placeholder" class="hidden h-[43px] w-full"></div>
            </div>
          </div>

          <div id="viewer" class="mx-auto w-full max-w-[800px] select-none">
            <div class="relative flex h-full w-full cursor-pointer flex-wrap items-center justify-center  gap-y-2 p-2 py-5">
              <div class="w-full text-center text-white">
                この章を読むために下にスクロールしてください
              </div>

              <svg
                class="h-8 w-8 animate-bounce fill-current text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="m15.707 15.707-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 1.414-1.414L11 15.586V6a1 1 0 0 1 2 0v9.586l1.293-1.293a1 1 0 0 1 1.414 1.414z"
                  data-name="Down"
                />
              </svg>
            </div>

            {images.map((url) => (
              <div data-src={url} class="page-img mb-2 h-full w-full">
                <div
                  id="loading"
                  class="flex h-[300px] w-full items-center justify-center"
                >
                  <svg
                    class="-ml-1 mr-3 h-5 w-5 animate-spin fill-white text-white opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="16"
                    viewBox="0 0 512 512"
                  >
                    <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          <div class="chapter-nav mx-auto my-10 flex w-full max-w-[1000px] select-none flex-wrap items-center justify-center gap-5">
            <button class="bg-primary prev-chapter w-[200px] rounded px-4 py-2 text-white">
              Previous
            </button>

            <button class="bg-primary next-chapter w-[200px] rounded px-4 py-2 text-white">
              Next
            </button>
          </div>
        </div>
      </BaseBody>
    </html>
  );
};

export default ChapterPage;

import { Prisma } from "@prisma/client";
import { mangaUrl, chapterUrl } from "@/services/url";
import { MangaSelect } from "@/types/PrismaSelect";
import { dateFormater } from "@/lib/time";

type HomeTrendingProps = {
  headingText: string;
  mangas: Prisma.MangaGetPayload<{
    select: typeof MangaSelect;
  }>[];
};
const HomeTrending = ({
  headingText,
  mangas,
}: HomeTrendingProps): JSX.Element => {
  return (
    <section class="carousel-trending relative">
      <div
        class="border-primary my-[10px] flex justify-between border-l-[5px] text-[20px] "
        style={{ lineHeight: "60px" }}
      >
        <div class="flex flex-nowrap items-center gap-2">
          <svg
            class="ml-[15px] w-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="stars"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            data-fa-i2svg=""
          >
            <path
              fill="currentColor"
              d="M259.69042,85.96457l49.64549,20.69969,20.70353,49.643a6.65746,6.65746,0,0,0,11.926,0L362.667,106.66426l49.64549-20.69969a6.66574,6.66574,0,0,0,0-11.92493L362.667,53.338,341.96545,3.697a6.65746,6.65746,0,0,0-11.926,0L309.33591,53.338,259.69042,74.03964a6.66574,6.66574,0,0,0,0,11.92493ZM364.294,267.29343,259.4951,251.99764l-46.90716-95.19633c-8.39078-16.99879-32.68813-17.2019-41.18829,0l-46.90716,95.19633L19.69358,267.29343C.89634,269.99636-6.71318,293.19783,6.99021,306.49376l75.90772,73.99472L64.89758,485.07476c-3.20319,18.9049,16.68782,33.107,33.29752,24.2014l93.7987-49.3871,93.79869,49.3871A22.95361,22.95361,0,0,0,319.09,485.07476L301.199,380.48848l75.89209-73.99472C390.70077,293.19783,383.09125,269.99636,364.294,267.29343ZM509.05268,219.2285,469.339,202.67109,452.7801,162.961a5.32691,5.32691,0,0,0-9.5412,0L426.678,202.67109l-39.7117,16.55741a5.33385,5.33385,0,0,0,0,9.54033L426.678,245.3282l16.56087,39.7081a5.32534,5.32534,0,0,0,9.5412,0L469.339,245.3282l39.71366-16.55937a5.33386,5.33386,0,0,0,0-9.54033Z"
            ></path>
          </svg>
          <h1 class="font-medium capitalize" safe>
            {headingText}
          </h1>
        </div>

        <div class="end-0 flex items-center justify-between gap-2">
          <button class="carousel-button--prev rounded-full border p-3 shadow">
            <svg
              class="h-6 w-6"
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
            </svg>
          </button>
          <button class="carousel-button--next rounded-full border p-3 shadow">
            <svg
              class="h-6 w-6"
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
            </svg>
          </button>
        </div>
      </div>

      <div class="carousel-viewport mt-6">
        <div class="embla__container">
          {mangas.map((manga) => (
            <div class="embla__slide cursor-pointer">
              <a href={mangaUrl(manga)} title={manga.title}>
                <div class="relative overflow-hidden pb-[90%]">
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
                        <path d="M5 2H19C19.5523 2 20 2.44772 20 3V22.1433C20 22.4194 19.7761 22.6434 19.5 22.6434C19.4061 22.6434 19.314 22.6168 19.2344 22.5669L12 18.0313L4.76559 22.5669C4.53163 22.7136 4.22306 22.6429 4.07637 22.4089C4.02647 22.3293 4 22.2373 4 22.1433V3C4 2.44772 4.44772 2 5 2Z"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </a>
              <div class="mt-2 flex cursor-pointer flex-wrap">
                <a href={mangaUrl(manga)} class="w-full" title={manga.title}>
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
                    <span class="w-5/6 truncate text-right text-gray-800" safe>
                      {dateFormater(manga.chapters[0].updatedAt)}
                    </span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeTrending;

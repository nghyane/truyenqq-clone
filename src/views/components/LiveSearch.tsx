import { Prisma } from "@prisma/client";
import { MangaSelect } from "@/types/PrismaSelect";
import { mangaUrl } from "@/services/url";

const LiveSearch = ({
  mangas,
}: {
  mangas: Prisma.MangaGetPayload<{
    select: typeof MangaSelect;
  }>[];
}) => {
  return (
    <div class="flex flex-col">
      <ul>
        {mangas.map((manga) => (
          <li class="flex w-full p-2">
            <div class="relative h-[50px] w-[50px]">
              <img
                src={manga.image}
                alt={manga.title}
                class="absolute h-full w-full object-cover"
              />
            </div>

            <div class="ml-2 flex w-[calc(100%-50px-1rem)] flex-col justify-start">
              <a href={mangaUrl(manga)}>
                <h3 class="truncate text-start" safe>
                  {manga.title}
                </h3>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LiveSearch;

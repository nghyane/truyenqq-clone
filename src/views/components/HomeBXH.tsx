import { Prisma } from "@prisma/client";
import { mangaUrl, chapterUrl } from "@/services/url";
import { MangaSelect } from "@/controllers/HomeController";
import localize from "@/languages";

const HomeBXH = ({
    mangas
}: {
    mangas: Prisma.MangaGetPayload<{
        select: typeof MangaSelect
    }>[]
}): JSX.Element => (
    <>
        <div class="w-full">
            <div class="flex flex-nowrap">
                <a href="#" class="w-1/2  rounded-tl py-5 text-center border-b-[3px] border-primary">
                    {localize('top_day')}
                </a>
                <a href="#" class="w-1/2  py-5 text-center border-b-[3px]  border-gray-200">
                    {localize('top_week')}
                </a>
                <a href="#" class="w-1/2 rounded-tr py-5 text-center border-b-[3px] border-gray-200">
                    {localize('top_month')}
                </a>
            </div>
            <div class="bg-white border border-y-0 rounded-b overflow-hidden border-gray-200">
                <ul>
                    {mangas.map((manga, index) => (
                        <li class="flex flex-nowrap gap-2 py-2 px-4 border-b border-gray-200 w-full">
                            <div class="relative w-[60px] h-[60px]">
                                <img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src={manga.image} alt={manga.title} class="lazy w-full h-full object-cover absolute top-0 left-0" />
                            </div>

                            <a href={mangaUrl(manga)} class="w-[calc(100%-60px-8px)]">
                                <h3 class="text-[13px] md:text-[15px] font-medium truncate  hover:text-primary transition-colors duration-300">{manga.title}</h3>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </>
)

export default HomeBXH;
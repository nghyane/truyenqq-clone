import { Prisma } from "@prisma/client";
import { MangaSelect } from "@/controllers/HomeController";


import { chapterUrl, mangaUrl } from "@/services/url";

const BookmarkContent = ({ mangas }: {
    mangas: Prisma.MangaGetPayload<{
        select: typeof MangaSelect
    }>[]
}): JSX.Element => (
    <div>
        {
            mangas.length > 0 ? mangas.map((manga) => (
                <div class="flex flex-nowrap gap-2 py-2 border-b border-gray-200 w-full">
                    <div class="relative w-[60px] h-[60px]">
                        <img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src={manga.image} alt={manga.title} class="lazy w-full h-full object-cover absolute top-0 left-0" />
                    </div>
                    <div class="w-[calc(100%-60px-8px)]">
                        <a href={
                            mangaUrl(manga)
                        } class="w-full">
                            <h3 class="text-[13px] md:text-[15px] font-medium truncate hover:text-primary transition-colors duration-300">{manga.title}</h3>
                        </a>

                        <div class="w-full">
                            {
                                manga.chapters.map((chapter) => (
                                    <div class="w-full flex justify-between">
                                        <a class="text-sm" href={
                                            chapterUrl(chapter)
                                        }>
                                            {chapter.title}
                                        </a>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            )) : (
                <div class="mb-4 rounded-lg bg-blue-100 px-6 py-5 text-base text-primary-600 w-full hidden" id="bookmark-empty">
                    <span class="block sm:inline"> No bookmark yet. </span>
                </div>
            )
        }
    </div>
);


export default BookmarkContent;
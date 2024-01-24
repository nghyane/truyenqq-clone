import { mangaUrl, chapterUrl } from "@@/src/services/url";
import { Prisma } from "@prisma/client";
import { MangaSelect } from "@/controllers/HomeController";
import { dateFormater } from "@/lib/time";
type HomeUpdateProps = {
    headingText: string,
    mangas: Prisma.MangaGetPayload<{
        select: typeof MangaSelect
    }>[]
}

const HomeUpdate = ({
    headingText,
    mangas
}: HomeUpdateProps): JSX.Element => {
    return (
        <>
            <div class="flex gap-2 flex-nowrap items-center border-l-[5px] border-primary my-[10px] text-[20px] " style={{ lineHeight: '60px' }}>
                <svg class="ml-[15px] w-4" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sync-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z"></path></svg>

                <h1 class="capitalize font-medium">
                    {headingText}
                </h1>
            </div>
            <ul class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 mt-6">
                {mangas.map((manga) => (
                    <li>
                        <div class="relative pb-[70%] overflow-hidden" style={{
                            backgroundImage: `url(/public/img/bg-image.png)`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover'
                        }}>
                            <img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src={manga.image} alt={manga.title} class="lazy absolute top-0 left-0 w-full h-full object-cover cursor-pointer" />
                            <div class="gap-2 h-7 bottom-0 w-full absolute bg-black bg-opacity-70 flex no-wrap items-center justify-start px-2 text-xs text-white font-medium">
                                <span class="flex items-center gap-0.5">
                                    <span>{manga.views?.viewsWeek || 0}</span>

                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class=" h-3 w-3" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12ZM12.0003 17C14.7617 17 17.0003 14.7614 17.0003 12C17.0003 9.23858 14.7617 7 12.0003 7C9.23884 7 7.00026 9.23858 7.00026 12C7.00026 14.7614 9.23884 17 12.0003 17ZM12.0003 15C10.3434 15 9.00026 13.6569 9.00026 12C9.00026 10.3431 10.3434 9 12.0003 9C13.6571 9 15.0003 10.3431 15.0003 12C15.0003 13.6569 13.6571 15 12.0003 15Z"></path>
                                    </svg>
                                </span>
                                <span class="flex items-center gap-0.5">
                                    <span>{manga._count.bookmarks}</span>
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class=" h-3 w-3" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 2H19C19.5523 2 20 2.44772 20 3V22.1433C20 22.4194 19.7761 22.6434 19.5 22.6434C19.4061 22.6434 19.314 22.6168 19.2344 22.5669L12 18.0313L4.76559 22.5669C4.53163 22.7136 4.22306 22.6429 4.07637 22.4089C4.02647 22.3293 4 22.2373 4 22.1433V3C4 2.44772 4.44772 2 5 2Z" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <div class="flex flex-wrap mt-2 cursor-pointer">
                            <a href={mangaUrl(manga)} class="w-full">

                                <h2 class="text-[16px] font-medium w-full hover:text-primary transition-colors duration-300 mb-2 two-lines">
                                    {manga.title}
                                </h2>
                            </a>

                            {manga.chapters?.length > 0 && (
                                <a class="flex items-center gap-2 between w-full text-[14px]  text-gray-800 visited:text-gray-800" href={
                                    chapterUrl(manga.chapters[0])
                                }>
                                    <span class="w-5/6 truncate font-medium hover:text-primary">{manga.chapters[0].title}</span>
                                    <span class="w-5/6 truncate text-right text-gray-800">{
                                        dateFormater(manga.chapters[0].updatedAt)
                                    }</span>
                                </a>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default HomeUpdate;
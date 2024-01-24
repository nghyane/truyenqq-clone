import { BaseHead } from "../components/BaseHead";
import { BaseBody } from "../components/BaseBody";
import { MangaInclude } from "@/controllers/MangaController";
import { Prisma } from "@prisma/client";
import { chapterUrl, mangaUrl } from "@/services/url";
import { MangaButton } from "@@/src/views/components/Bookmark";

import localize from "@/languages";

const MangaPage = ({
    manga
}: {
    manga: Prisma.MangaGetPayload<{
        include: typeof MangaInclude
    }>
}): JSX.Element => {
    const lastChapter = manga?.chapters[0];

    const dayUpdated = Math.round((Date.now() - new Date(lastChapter?.updatedAt).getTime()) / (1000 * 60 * 60 * 24));
    
    const index = Math.round(lastChapter?.index + (
        dayUpdated >= 3 ? 1 : 0
    )) || 0;

    const firstChapter = manga?.chapters[manga?.chapters.length - 1];

    const title = index > 0 ? manga.title.replace('(Raw – Free)', ` – Raw 【第${index}話】`) : manga.title;
    const customTags = [
        manga.title.replace('(Raw – Free)', 'Raw Free'),
        title,
    ]

    if (lastChapter) {
        customTags.push(manga.title.replace('(Raw – Free)', lastChapter.title));
    }

    const breadcrumbs = [
        {
            name: 'Home',
            url: '/home',
        },
        {
            name: manga.title,
            url: mangaUrl(manga),
            isActive: true,
        }
    ]

    return (
        <html lang={process.env.APP_LANG} class="h-auto min-h-full w-full  overflow-y-scoll">
            <BaseHead>
                <>
                    <title>{title}</title>
                    <link rel="preload" href={manga.image} as="image" />

                    <script type="application/ld+json">
                        {JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "BreadcrumbList",
                            "itemListElement": breadcrumbs.map((breadcrumb, index) => ({
                                "@type": "ListItem",
                                "position": index + 1,
                                "name": breadcrumb.name,
                                "item": breadcrumb.url,
                            }))
                        })}
                    </script>

                    <script type="text/javascript">
                        {`
                            window.__INITIAL_STATE__ =${JSON.stringify({
                                mangaId : manga.id,
                                chapterId : null,
                            })}
                        `}
                    </script>

                </>
            </BaseHead>


            <BaseBody>
                <div class="container mx-auto my-10 bg-white  p-5 flex flex-wrap gap-4 rounded">
                    <ol class="w-full text-center flex flex-wrap gap-2 items-center">
                        {breadcrumbs.map((breadcrumb, index) => (
                            <>
                                <li class={
                                    `text-sm` + (index == breadcrumbs.length - 1 ? ' text-primary' : '')
                                }>
                                    <a href={breadcrumb.url}>
                                        {breadcrumb.name}
                                    </a>
                                </li>

                                {index < breadcrumbs.length - 1 && (
                                    <li class="text-gray-500">
                                        -
                                    </li>
                                )}
                            </>

                        ))}

                    </ol>
                    <div class="w-full md:w-1/4 md:max-w-[280px]">
                        <div class="w-[280px] mx-auto md:w-full shadow-sm overflow-hidden">
                            <img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src={manga.image} alt={manga.title} class="lazy w-full h-[184px] object-cover cursor-pointer" width={320} height={184} />
                        </div>

                        <div class="flex flex-none gap-2 mt-4 w-[70%] mx-auto md:w-full">
                            <a class="bg-primary text-white px-4 py-2 rounded w-full text-center" href={
                                firstChapter ? chapterUrl(firstChapter) : 'javascript:window.App.showToaster("No chapter found")'
                            }>

                                {
                                    localize("read_now")
                                }
                            </a>

                            <MangaButton manga_id={manga.id} />
                        </div>

                    </div>

                    <div class="w-full md:w-[calc(75%-16px)]">
                        <div class="flex flex-wrap gap-2 my-4 md:m-0 justify-center md:justify-start">
                            <h1 class="text-lg md:text-2xl capitalize font-semibold text-center md:text-left w-full">{manga.title}</h1>
                            <h2 class="text-md md:text-xl capitalize font-medium text-center md:text-left w-full">{manga.alternative}</h2>
                        </div>

                        <div class="flex flex-wrap gap-2 my-6">
                            {manga.genres?.map((item) => (
                                <a href={`/category/${item.id}`} class="bg-primary text-white px-2 py-1 rounded text-[13px]">{
                                    item.name
                                }</a>
                            ))}
                        </div>

                        <div class="flex flex-wrap gap-4">
                            <div class="w-full flex flex-nowrap md:gap-4">

                            </div>

                        </div>
                    </div>

                    <div class="w-full">
                        <p class="text-sm md:text-[15px] pb-4">
                            {manga.description}
                        </p>

                        <h3 class="w-full text-lg font-semibold">Chapters</h3>

                        <div class="w-full mt-5">
                            <input type="text" class="w-full border rounded border-gray-200 p-2 cursor-pointer" placeholder="Search" id="search-chapter" />
                        </div>

                        <ul class="border rounded flex flex-wrap mt-3  px-2" id="chapter-list">
                            {manga?.chapters?.map((chapter, index) => (
                                <li class={`w-full border-b border-gray-200 p-2 cursor-pointer flex flex-nowrap gap-2 justify-between` + (index > 10 ? ' hidden' : '')}>
                                    <a href={
                                        chapterUrl(chapter)
                                    } class="w-auto visited:text-gray-500" title={`${manga.title} ${chapter.title}`}>
                                        <h3 class="text-[13px] md:text-[15px] font-medium truncate hover:text-primary transition-colors duration-300">{chapter.title}</h3>
                                    </a>

                                    <span class="text-[13px] md:text-[15px] text-gray-500 truncate">
                                        {new Date(chapter.updatedAt).toLocaleDateString('ja-JP', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        {manga.chapters?.length > 10 && (
                            <button class="w-full text-primary p-2 cursor-pointer" id="load-more-chapters">
                                View all chapters
                            </button>
                        )}

                        <div class="flex flex-wrap gap-2 my-6">
                            {manga.tags?.map((tag) => (
                                <a href={`/tag/${tag.id}`}>
                                    <span class="text-primary">#{tag.name}</span>
                                </a>
                            ))}


                            {customTags.map((tag) => (
                                <a href="#">
                                    <strong class="text-primary font-normal">#{tag}</strong>
                                </a>
                            ))}

                        </div>
                    </div>
                </div>
            </BaseBody>

        </html>
    )
}

export default MangaPage;
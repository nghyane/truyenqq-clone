import { BaseHead } from "../components/BaseHead";
import { BaseBody } from "../components/BaseBody";
import { MangaInclude } from "@/controllers/MangaController";
import { Prisma } from "@prisma/client";

const MangaPage = ({
    manga
}: {
    manga: Prisma.MangaGetPayload<{
        include: typeof MangaInclude
    }>
}): JSX.Element => {
    return (
        <html lang={process.env.APP_LANG} class="h-auto min-h-full w-full  overflow-y-scoll">
            <BaseHead>
                <>
                    <title>{manga.title}</title>
                </>
            </BaseHead>


            <BaseBody>
                <div class="container mx-auto my-10 bg-white  p-5 flex flex-wrap gap-4 rounded">
                    <div class="w-full md:w-1/4 md:max-w-[280px]">
                        <div class="w-[280px] mx-auto md:w-full rounded overflow-hidden">
                            <img src={manga.image} alt={manga.title} class=" w-full h-full object-cover cursor-pointer" loading="eager" />
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

                        <h3 class="w-full text-lg">Chapters</h3>

                        <ul class="border rounded grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 mt-6 overflow-y-auto max-h-[600px] p-5">
                            {manga?.chapters?.map((chapter) => (
                                <li class="border border-gray-200 rounded-md p-2 cursor-pointer">
                                    {chapter.title}
                                </li>
                            ))}
                        </ul>

                        <div class="flex flex-wrap gap-2 my-6">
                            {manga.tags?.map((tag) => (
                                <span class="text-primary">#{tag.name}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </BaseBody>

        </html>
    )
}

export default MangaPage;
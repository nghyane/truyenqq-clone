import { BaseHead } from "../components/BaseHead";
import { BaseBody } from "../components/BaseBody";
import HomeUpdate from "../components/HomeUpdate";
import HomeTrending from "../components/HomeTrending";
import HomeFooter from "../components/HomeFooter";
import localize from "@/languages";

type HomePageProps = {
    title: string,
    trendingMangas: any[],
    updatedMangas: any[]
}

const HomePage = ({
    title,
    trendingMangas,
    updatedMangas
}: HomePageProps): JSX.Element => {
    return (
        <html lang={process.env.APP_LANG} class="h-auto min-h-full w-full  overflow-y-scoll">
            <BaseHead>
                <>
                    <title>{title}</title>
                </>
            </BaseHead>

            <BaseBody>
                <>
                    <div class="flex gap-[20px] container mt-10 flex-wrap">
                        <div class="w-full md:w-[calc(100%-320px)]">
                            <HomeTrending headingText={localize("trending")} mangas={trendingMangas} />
                            <hr class="my-10" />
                            <HomeUpdate headingText={localize("new_update")} mangas={updatedMangas} />

                            <div class="flex justify-center mt-10">
                                <a href="/browse/2" class="bg-primary text-white px-4 py-2 rounded">
                                    {
                                        localize("view_all")
                                    }
                                </a>
                            </div>
                        </div>

                        <div class="w-full md:w-[320px]">

                        </div>

                    </div>

                    <HomeFooter />

                    <script src="/public/js/app.js" type="module" />
                </>
            </BaseBody>
        </html>
    );
}

export default HomePage;
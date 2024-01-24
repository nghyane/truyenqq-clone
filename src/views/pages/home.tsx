import { BaseHead } from "../components/BaseHead";
import { BaseBody } from "../components/BaseBody";
import HomeUpdate from "../components/HomeUpdate";
import HomeTrending from "../components/HomeTrending";
import HomeFooter from "../components/HomeFooter";
import localize from "@/languages";
import HomeBXH from "../components/HomeBXH";
import Share from "../components/Share";


type HomePageProps = {
    title: string,
    trendingMangas: any[],
    updatedMangas: any[],
    topDayMangas: any[],
}

const HomePage = ({
    title,
    trendingMangas,
    updatedMangas,
    topDayMangas
}: HomePageProps): JSX.Element => {
    return (
        <html lang={process.env.APP_LANG} class="h-auto min-h-full w-full  overflow-y-scoll">
            <BaseHead>
                <title>{title}</title>

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@hentai3t" />
                <meta name="twitter:title" content="mangarawの代わりはこれが1番" />
                <meta name="twitter:description" content="mangarawの代わりはこれが1番" />
                <meta name="twitter:image" content="https://telegra.ph/file/b2e87380cb72da6609f93.jpg" />
            </BaseHead>

            <BaseBody>
                <div class="flex gap-[20px] container mt-10 flex-wrap">
                    <div class="w-full md:w-[calc(100%-340px)]">
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
                        <Share />

                        <HomeBXH mangas={topDayMangas} />
                    </div>

                </div>

                <HomeFooter />

            </BaseBody>
        </html>
    );
}

export default HomePage;
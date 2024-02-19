import { BaseHead } from "../components/BaseHead";
import { BaseBody } from "../components/BaseBody";
import HomeUpdate from "../components/HomeUpdate";
import HomeTrending from "../components/HomeTrending";
import HomeFooter from "../components/HomeFooter";
import localize from "@/languages";
import HomeBXH from "../components/HomeBXH";
import Share from "../components/Share";

type HomePageProps = {
  title: string;
  trendingMangas: any[];
  updatedMangas: any[];
  topDayMangas: any[];
};

const HomePage = ({
  trendingMangas,
  updatedMangas,
  topDayMangas,
}: HomePageProps): JSX.Element => {
  return (
    <html
      lang={process.env.APP_LANG}
      class="overflow-y-scoll h-auto min-h-full  w-full"
    >
      <BaseHead>
        <title safe>{process.env.HOME_PAGE_TITLE}</title>
        <meta name="description" content={process.env.HOME_PAGE_DESCRIPTION} />

        <link rel="canonical" href={process.env.APP_URL + '/home'} />

        <meta
          property="og:title"
          content={process.env.HOME_PAGE_TITLE_SOCIAL}
        />

        <meta
          property="og:description"
          content={process.env.HOME_PAGE_DESCRIPTION_SOCIAL}
        />

        <meta
          property="og:image"
          content={process.env.DEFAULT_SOCIAL_IMAGE} />

        <meta name="twitter:card" content="summary_large_image" />

        <meta
          name="twitter:title"
          content={process.env.HOME_PAGE_TITLE_SOCIAL}
        />
        <meta
          name="twitter:description"
          content={process.env.HOME_PAGE_DESCRIPTION_SOCIAL}
        />
        <meta
          name="twitter:image"
          content={process.env.DEFAULT_SOCIAL_IMAGE}
        />
      </BaseHead>

      <BaseBody>
        <div class="container mt-10 flex flex-wrap gap-[20px]">
          <div class="w-full md:w-[calc(100%-340px)]">
            <HomeTrending
              headingText={localize("trending")}
              mangas={trendingMangas}
            />
            <hr class="my-10" />
            <HomeUpdate
              headingText={localize("new_update")}
              mangas={updatedMangas}
            />

            <div class="mt-10 flex justify-center">
              <a
                href="/browse"
                class="bg-primary rounded px-4 py-2 text-white"
                safe
              >
                {localize("view_all")}
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
};

export default HomePage;

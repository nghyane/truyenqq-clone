import BaseBody from "../components/BaseBody";
import BaseHead from "../components/BaseHead";
import Share from "../components/Share";
import localize from "@/languages";
import AdsenseSlot from "@components/AdsenseSlot";

const BookmarkPage = () => (
  <html
    lang={process.env.APP_LANG}
    class="overflow-y-scoll h-auto min-h-full  w-full"
  >
    <BaseHead>
      <title>履歴 | Bookmark</title>
      <meta name="robots" content="noindex, nofollow" />
    </BaseHead>
    <BaseBody>
      <div class="container mx-auto my-10 flex flex-wrap gap-4 rounded p-5">
        <div class="min-h-[100vh] w-full md:w-[calc(100%-336px)]">
          <h1 class="w-full text-2xl font-bold" safe>
            {localize("bookmark")}
          </h1>

          <div id="bookmarks" class="mt-6 w-full">
            <div
              class="text-primary-600 mb-4 hidden w-full rounded-lg bg-blue-100 px-6 py-5 text-base"
              id="bookmark-empty"
            >
              <span class="block sm:inline"> No bookmark yet. </span>
            </div>
          </div>
        </div>

        <div class="w-full md:w-[320px]">
          <AdsenseSlot className="mb-5"/>

          <Share />
        </div>
      </div>
    </BaseBody>

    <script src="/public/js/bookmark.js" type="module"></script>
  </html>
);

export default BookmarkPage;

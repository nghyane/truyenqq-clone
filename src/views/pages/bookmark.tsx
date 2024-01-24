import BaseBody from "../components/BaseBody";
import BaseHead from "../components/BaseHead";
import Share from "../components/Share";


const BookmarkPage = () => (
    <html lang={process.env.APP_LANG} class="h-auto min-h-full w-full  overflow-y-scoll">
        <BaseHead>
            <title>履歴 | Bookmark</title>
            <meta name="robots" content="noindex, nofollow" />
        </BaseHead>
        <BaseBody>
            <div class="container mx-auto my-10 p-5 flex flex-wrap gap-4 rounded">
                <div class="w-full md:w-[calc(100%-336px)] min-h-[100vh]">
                    <h1 class="text-2xl font-bold w-full">Bookmark</h1>

                    <div id="bookmarks" class="w-full mt-6">
                        <div class="mb-4 rounded-lg bg-blue-100 px-6 py-5 text-base text-primary-600 w-full hidden" id="bookmark-empty">
                            <span class="block sm:inline"> No bookmark yet. </span>
                        </div>
                    </div>
                </div>

                <div class="w-full md:w-[320px]">
                    <Share />
                </div>
            </div>
        </BaseBody>

        <script src="/public/js/bookmark.js" type="module"></script>
    </html>
)

export default BookmarkPage;
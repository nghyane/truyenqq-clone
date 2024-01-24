import BaseBody from "../components/BaseBody";
import BaseHead from "../components/BaseHead";
import Share from "../components/Share";

import localize from "@/languages";

const HistoryPage = () => (
    <html lang={process.env.APP_LANG} class="h-auto min-h-full w-full  overflow-y-scoll">
        <BaseHead>
            <>
                <title>履歴 | {localize("history")}</title>
                <meta name="robots" content="noindex, nofollow" />
            </>
        </BaseHead>

        <BaseBody>
            <div class="container mx-auto my-10 p-5 flex flex-wrap gap-4 rounded">
                <div class="w-full md:w-[calc(100%-336px)] min-h-[100vh]">


                    <div class="w-full mb-6 flex gap-2 items-end justify-between">
                        <h1 class="text-2xl font-bold">{localize("history")}</h1>
                        <button class="bg-red-600 text-white px-4 py-2 rounded text-sm leading-none items-baseline" id="clear-history">
                            {localize("clear_all_history")}
                        </button>
                    </div>

                    <div class="w-full">
                        <div class="flex flex-nowrap">
                            <a href="javascript:alert('Not implemented yet')" class="w-1/2  rounded-tl py-3 text-center border-b-[2px] border-primary">
                                {localize("in_device")}
                            </a>
                            <a href="javascript:alert('Not implemented yet')" class="w-1/2  py-3 text-center border-b-[2px]  border-gray-200">
                                {localize("in_account")}
                            </a>
                        </div>
                    </div>



                    <div id="history-local" class="w-full mt-4">
                        <div class="mb-4 rounded-lg bg-blue-100 px-6 py-5 text-base text-primary-600 w-full hidden" id="history-empty">
                            <span class="block sm:inline"> {localize("no_history")} </span>
                        </div>
                    </div>
                </div>

                <div class="w-full md:w-[320px]">
                    <Share />
                </div>
            </div>


            <div id="history-template" class="hidden">
                <div class="flex flex-nowrap gap-2 py-2 border-b border-gray-200 w-full">
                    <div class="relative w-[60px] h-[60px]">
                        <img data-src="MANGA_COVER" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" class="lazy w-full h-full object-cover absolute top-0 left-0" />
                    </div>
                    <div class="w-[calc(100%-60px-8px)]">
                        <a href="MANGA_URL" class="w-full">
                            <h3 class="text-[13px] md:text-[15px] font-medium truncate hover:text-primary transition-colors duration-300">
                                MANGA_TITLE
                            </h3>
                        </a>

                        <div class="w-full">
                            <div class="w-full flex justify-between">
                                <a class="text-sm" href="CHAPTER_URL">
                                    CHAPTER_TITLE
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </BaseBody>

        <script src="/public/js/history.js" type="module"></script>
    </html>
)

export default HistoryPage;
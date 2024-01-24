import { BaseHead } from "../components/BaseHead";
import { BaseBody } from "../components/BaseBody";



const NotFoundPage = (): JSX.Element => {
    return (
        <html lang={process.env.APP_LANG} class="h-auto min-h-full w-full  overflow-y-scoll">
            <BaseHead>
                <title>404 Not Found</title>
            </BaseHead>

            <BaseBody>
                <div class="container my-10 p-12 flex flex-wrap gap-4 rounded text-xl">
                    <div class="w-full text-center">
                        <a href="/home" class="p-2 bg-primary text-white rounded">
                            Go back to home
                        </a>
                    </div>


                    <p class="mx-auto w-full text-center mt-2">404 Not Found</p>
                </div>
            </BaseBody>
        </html>
    );
}

export default NotFoundPage;
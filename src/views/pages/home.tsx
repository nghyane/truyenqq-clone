import { BaseHead } from "../components/BaseHead";
import { BaseBody } from "../components/BaseBody";

type HomePageProps = {
    title: string
}

const HomePage = ({
    title,
}: HomePageProps): JSX.Element => {
    return (
        <html lang={process.env.APP_LANG} class="h-[100%] w-[100%] fixed overflow-y-scoll">
            <BaseHead>
                <title>{title}</title>
            </BaseHead>

            <BaseBody>
                <>
                    <h1 class="text-4xl font-bold">Home 1</h1>
                    <p class="text-lg">Welcome to the home page!</p>
                </>
            </BaseBody>



        </html>
    );
}

export default HomePage;
import BaseHeader from "./BaseHeader";
import BaseNav from "./BaseNav";

export const BaseBody = ({ children }: { children?: JSX.Element }) => {
    return (
        <body class="bg-slate-50 flex flex-col justify-center items-center h-full overflow-y-scroll" >
            
            <BaseHeader />

            <BaseNav />

            <main class="w-full h-full text-slate-800">
                {children ? children : undefined}
            </main>

        </body>
    );
}

export default BaseBody;
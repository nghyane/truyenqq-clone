export const BaseBody = ({ children }: { children?: JSX.Element }) => {
    return (
        <body class="flex flex-col justify-center items-center">
            <header class="w-full">
                <div class="container flex justify-between items-center w-full h-20 ">
                    <div class="flex justify-between items-center gap-2">
                        <a href="/" class=" text-2xl font-bold ml-4">TruyenQQ</a>

                        <div class="flex justify-between items-center rounded-full border p-2 ml-4 h-12 min-w-12">
                            Dark Mode
                        </div>

                        <form action="/search" method="GET" class="flex justify-between items-center relative">
                            <input type="text" name="q" 
                            // padding 0 45px 0 20px
                            class="p-0 pl-4 pr-16 h-12
                            
                            rounded-full border bg-gray-50" placeholder="Search..." />
                            <button type="submit" class="absolute p-2 right-0 text-primary">Search</button>
                        </form>
                    </div>
                    <div class="flex justify-between items-center gap-2">
                        <a href="/login" class="">Login</a>
                        <a href="/register" class=" ">Register</a>
                    </div>
                </div>
            </header>
            <nav class="w-full bg-primary">
                <ul class="container flex justify-between items-center w-full h-14 gap-2">
                    <li class="flex justify-between items-center">
                        <a href="/" class="ml-4">Home</a>
                    </li>
                    <li class="flex justify-between items-center">
                        <a href="/category" class="ml-4">Category</a>
                    </li>
                    <li class="flex justify-between items-center">
                        <a href="/author" class="ml-4">Author</a>
                    </li>
                    <li class="flex justify-between items-center">
                        <a href="/contact" class="ml-4">Contact</a>
                    </li>
                </ul>
            </nav>

            {children ? children : undefined}
        </body>
    );
}

export default BaseBody;
const BaseHeader = () => {
    return (
        <header class="w-full bg-header text-header-text">
            <div class="container flex items-center w-full h-auto lg:h-[64px] p-[10px] m-auto">
                <div class="flex flex-wrap lg:flex-nowrap lg:items-center gap-4 w-full relative">
                    <a href="/home" class="text-2xl font-bold">
                        <div class="hidden lg:block">
                            TruyenQQ
                        </div>

                        <div class="block lg:hidden">
                            QQ
                        </div>
                    </a>

                    <div class="items-center rounded-full p-2 h-[44px] w-[44px] min-w-[44px] flex border border-header-text">
                        <svg class="fill-current w-[14px] h-[14px] m-auto" viewBox="0 0 352 512" xmlns="http://www.w3.org/2000/svg">
                            <path d="m176 80c-52.94 0-96 43.06-96 96 0 8.84 7.16 16 16 16s16-7.16 16-16c0-35.3 28.72-64 64-64 8.84 0 16-7.16 16-16s-7.16-16-16-16zm-79.94 379.17c0 3.15.93 6.22 2.68 8.84l24.51 36.84c2.97 4.46 7.97 7.14 13.32 7.14h78.85c5.36 0 10.36-2.68 13.32-7.14l24.51-36.84c1.74-2.62 2.67-5.7 2.68-8.84l.05-43.18h-159.96zm79.94-459.17c-102.28 0-176 82.97-176 176 0 44.37 16.45 84.85 43.56 115.78 16.64 18.99 42.74 58.8 52.42 92.16v.06h48v-.12c-.01-4.77-.72-9.51-2.15-14.07-5.59-17.81-22.82-64.77-62.17-109.67-20.54-23.43-31.52-53.15-31.61-84.14-.2-73.64 59.67-128 127.95-128 70.58 0 128 57.42 128 128 0 30.97-11.24 60.85-31.65 84.14-39.11 44.61-56.42 91.47-62.1 109.46a47.507 47.507 0 0 0 -2.22 14.3v.1h48v-.05c9.68-33.37 35.78-73.18 52.42-92.16 27.1-30.94 43.55-71.42 43.55-115.79 0-97.2-78.8-176-176-176z" />
                        </svg>
                        
                    </div>

                    <form id="search-form" action="/search" method="GET" class="justify-between items-center relative w-full lg:w-[420px] text-black hidden lg:flex">
                        <input type="text" name="q" class="header-input" placeholder="Bạn muốn tìm truyện gì" />
                        <button type="submit" class="absolute p-2 right-1 text-primary" aria-label="Search">
                            <svg class="fill-current text-primary w-6 h-6"  aria-hidden="true" focusable="false" data-prefix="far" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z"></path></svg>
                        </button>

                        <div class="search-results">
                            SEARCH RESULTS
                        </div>
                    </form>

                    <div class="flex justify-between items-center gap-2 end-0 absolute">
                        <button aria-label="Search" class="lg:hidden h-[44px] w-[44px] rounded-full bg-primary text-white">
                            
                            <svg class="fill-current w-6 h-6 m-auto"  aria-hidden="true" focusable="false" data-prefix="far" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z"></path></svg>

                        </button>

                        <div class="flex justify-between items-center gap-2" id="user-menu">
                            <a href="/register" class="header-button no-bg">Register</a>
                            <a href="/login" class="header-button">Login</a>
                        </div>
                    </div>
                </div>

            </div>
        </header>
    );
}

export default BaseHeader;
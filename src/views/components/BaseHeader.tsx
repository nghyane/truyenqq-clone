import localize from "@/languages";

const BaseHeader = () => {
  return (
    <>
      <header class="bg-header text-header-text w-full">
        <div class="container m-auto flex h-auto w-full items-center p-[10px] lg:h-[58px]">
          <div class="relative flex w-full flex-wrap gap-4 lg:flex-nowrap lg:items-center">
            <a href="/home1" class="self-center text-2xl font-bold">
              <div class="block" safe>
                {process.env.APP_LOGO}
              </div>
            </a>

            <div class="border-header-text flex h-[44px] w-[44px] min-w-[44px] items-center rounded-full border p-2 opacity-0">
              <svg
                class="m-auto h-[16px] w-[16px] fill-current"
                viewBox="0 0 352 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m176 80c-52.94 0-96 43.06-96 96 0 8.84 7.16 16 16 16s16-7.16 16-16c0-35.3 28.72-64 64-64 8.84 0 16-7.16 16-16s-7.16-16-16-16zm-79.94 379.17c0 3.15.93 6.22 2.68 8.84l24.51 36.84c2.97 4.46 7.97 7.14 13.32 7.14h78.85c5.36 0 10.36-2.68 13.32-7.14l24.51-36.84c1.74-2.62 2.67-5.7 2.68-8.84l.05-43.18h-159.96zm79.94-459.17c-102.28 0-176 82.97-176 176 0 44.37 16.45 84.85 43.56 115.78 16.64 18.99 42.74 58.8 52.42 92.16v.06h48v-.12c-.01-4.77-.72-9.51-2.15-14.07-5.59-17.81-22.82-64.77-62.17-109.67-20.54-23.43-31.52-53.15-31.61-84.14-.2-73.64 59.67-128 127.95-128 70.58 0 128 57.42 128 128 0 30.97-11.24 60.85-31.65 84.14-39.11 44.61-56.42 91.47-62.1 109.46a47.507 47.507 0 0 0 -2.22 14.3v.1h48v-.05c9.68-33.37 35.78-73.18 52.42-92.16 27.1-30.94 43.55-71.42 43.55-115.79 0-97.2-78.8-176-176-176z" />
              </svg>
            </div>

            <form
              id="search-form"
              action="/browse"
              method="GET"
              class="relative m-0 hidden w-full items-center justify-between text-black lg:flex lg:w-[420px]"
              onsubmit="return false"
            >
              <input
                type="text"
                name="q"
                class="header-input"
                placeholder={localize("search_placeholder")}
              />
              <button
                type="submit"
                class="text-primary absolute right-1 p-2"
                aria-label="Search"
              >
                <svg
                  class="text-primary h-6 w-6 fill-current"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="far"
                  data-icon="search"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  data-fa-i2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z"
                  ></path>
                </svg>
              </button>

              <div class="search-results"></div>
            </form>

            <div class="absolute end-0 flex items-center justify-between gap-2">
              <button
                aria-label="Search"
                class="h-[44px] w-[44px] text-white lg:hidden"
                onclick="window.App.toggleSearch()"
              >
                <svg
                  class="m-auto h-6 w-6 fill-current"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="far"
                  data-icon="search"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  data-fa-i2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z"
                  ></path>
                </svg>
              </button>

              <button
                aria-label="Toggle menu"
                class="h-[44px] w-[44px] text-white lg:hidden"
                onclick="window.App.toggleMenu()"
              >
                <svg
                  class="m-auto h-6 w-6 fill-current"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="bars"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  data-fa-i2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M0 384V320c0-17.69 14.33-32 32-32h384c17.67 0 32 14.31 32 32v64c0 17.69-14.33 32-32 32H32c-17.67 0-32-14.31-32-32zm0-192V128c0-17.69 14.33-32 32-32h384c17.67 0 32 14.31 32 32v64c0 17.69-14.33 32-32 32H32C14.33 224 0 209.7 0 192z"
                  ></path>
                </svg>
              </button>

              <div
                class="hidden items-center justify-between gap-2 lg:flex"
                id="user-menu"
              >
                <a
                  href="javascript:void(0)"
                  onclick="alert('This feature is not available yet')"
                  class="header-button no-bg"
                  safe
                >
                  {localize("register")}
                </a>
                <a href="/login" class="header-button" safe rel="nofollow">
                  {localize("login")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      
    </>
  );
};

export default BaseHeader;

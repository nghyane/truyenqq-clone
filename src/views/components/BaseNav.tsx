import theme from "@@/src/services/theme";
import localize from "@/languages";

type DropdownItem = {
  name: string;
  to: string;
};

const BaseNav = () => {
  const menus = [
    {
      name: "homeIcon",
      mobileText: localize("home"),
      to: "/home",
    },
    {
      name: localize("history"),
      to: "/history",
    },
    {
      name: localize("bookmark"),
      to: "/bookmark",
    },
    {
      name: localize("category"),
      isDropdown: true,
      getDropdownItems: () => {
        let genres = [] as DropdownItem[];

        theme.genres?.forEach((genre) => {
          genres.push({
            name: genre.name,
            to: `/browse?genres=${genre.id}`,
          });
        });

        return genres;
      },
    },
    {
      name: localize("browse"),
      to: "/browse",
    },
    {
      name: localize("login"),
      to: "/login",
      mobileOnly: true,
    },
    {
      name: localize("register"),
      to: "javascript:void(0)",
      mobileOnly: true,
    },
  ];

  return (
    <nav class="bg-navbar text-navbar-text top-0 z-10 w-full text-[15px] lg:sticky">
      <ul class="container" id="header_left_menu">
        {menus.map((menu, index) =>
          menu.isDropdown ? (
            <li
              class={`menu-hidden hover:bg-primary-hover cursor-pointer px-[10px] lg:float-left`}
            >
              <div class="flex flex-nowrap gap-[2px]">
                <p class="uppercase" safe>
                  {menu.name}
                </p>
                <svg
                  class="w-[14px] fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6.1018 8C5.02785 8 4.45387 9.2649 5.16108 10.0731L10.6829 16.3838C11.3801 17.1806 12.6197 17.1806 13.3169 16.3838L18.8388 10.0731C19.5459 9.2649 18.972 8 17.898 8H6.1018Z" />
                </svg>
              </div>
              <div class="hidden-menu">
                <ul class="container z-30 flex flex-wrap items-start justify-between p-4">
                  {menu.getDropdownItems().map((item) => (
                    <a
                      href={item.to}
                      class="w-[140px] lg:truncate lg:p-2"
                      style={{ lineHeight: "40px" }}
                      safe
                    >
                      {item.name}
                    </a>
                  ))}
                </ul>
              </div>
            </li>
          ) : (
            <li
              class={`menu-hidden hover:bg-primary-hover cursor-pointer px-[10px] lg:float-left ${menu.mobileOnly ? "lg:hidden" : ""}`}
            >
              <a
                class="flex flex-nowrap items-center gap-2 uppercase lg:list-item"
                href={menu.to}
              >
                {menu.name === "homeIcon" ? (
                  <svg
                    style={{
                      display: "unset",
                      verticalAlign: "unset",
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="18"
                    viewBox="0 0 576 512"
                  >
                    <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                  </svg>
                ) : (
                  <span safe>{menu.name}</span>
                )}
                {menu?.mobileText && (
                  <span class="lg:hidden" safe>
                    {menu.mobileText}
                  </span>
                )}
              </a>
            </li>
          ),
        )}
      </ul>

      <script type="text/javascript">
        {`
                    const headerLeftMenu = document.querySelectorAll('#header_left_menu li');
                    headerLeftMenu.forEach((item) => {
                        const href = item.querySelector('a')?.getAttribute('href');
                        if (href === window.location.pathname) {
                            item.classList.add('active');
                        }
                    });
                `}
      </script>
    </nav>
  );
};

export default BaseNav;

type BookmarkProps = {
  manga_id: number;
};

import localize from "@/languages";

export const MangaButton = ({ manga_id }: BookmarkProps) => (
  <button
    id="bookmark"
    class="bg-primary rounded px-4 py-2 text-white"
    onclick={`window.App.addToBookmark(this, ${manga_id})`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="16"
      width="12"
      viewBox="0 0 384 512"
      fill="currentColor"
    >
      <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
    </svg>
  </button>
);

export const ChapterButton = ({ manga_id }: BookmarkProps) => (
  <button
    id="bookmark"
    class="flex flex-nowrap items-center justify-center gap-2 rounded-md bg-green-600 p-2 px-3 text-sm  leading-normal text-white md:px-4"
    onclick={`window.App.addToBookmark(this, ${manga_id})`}
  >
    <span class="block md:hidden">
      <svg
        class="w-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M6.69 2a1.75 1.75 0 00-1.75 1.756L5 21.253a.75.75 0 001.219.583L12 17.21l5.782 4.625A.75.75 0 0019 21.25V3.75A1.75 1.75 0 0017.25 2H6.69z"
        />
      </svg>
    </span>
    <span class="hidden w-[60px] md:block" safe>
      {localize("follow")}
    </span>
  </button>
);

export const MangaButtonFollowed = ({ manga_id }: BookmarkProps) => (
  <button
    id="bookmark"
    class="items-center rounded bg-red-800 px-3 py-2 text-white"
    onclick={`window.App.removeFromBookmark(this, ${manga_id})`}
  >
    <svg
      class="w-5"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        d="M1.565 2.018a.75.75 0 00-.88 1.214L5 6.357v14.902a.75.75 0 001.219.585L12 17.21l5.781 4.633A.75.75 0 0019 21.259v-4.764l3.435 2.487a.75.75 0 10.88-1.215L1.565 2.017zM17.5 15.408l-11-7.965v12.254l5.031-4.032a.75.75 0 01.938 0l5.031 4.032v-4.288z"
      />
      <path d="M7.25 2a.75.75 0 000 1.5h10a.25.25 0 01.25.25v6.5a.75.75 0 001.5 0v-6.5A1.75 1.75 0 0017.25 2h-10z" />
    </svg>
  </button>
);

export const ChapterButtonFollowed = ({ manga_id }: BookmarkProps) => (
  <button
    id="bookmark"
    class="flex flex-nowrap items-center justify-center gap-2 rounded-md bg-red-800 p-2 px-3 text-sm leading-normal text-white md:px-4"
    onclick={`window.App.removeFromBookmark(this, ${manga_id})`}
  >
    <span class="block md:hidden">
      <svg
        class="w-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M1.565 2.018a.75.75 0 00-.88 1.214L5 6.357v14.902a.75.75 0 001.219.585L12 17.21l5.781 4.633A.75.75 0 0019 21.259v-4.764l3.435 2.487a.75.75 0 10.88-1.215L1.565 2.017zM17.5 15.408l-11-7.965v12.254l5.031-4.032a.75.75 0 01.938 0l5.031 4.032v-4.288z"
        />
        <path d="M7.25 2a.75.75 0 000 1.5h10a.25.25 0 01.25.25v6.5a.75.75 0 001.5 0v-6.5A1.75 1.75 0 0017.25 2h-10z" />
      </svg>
    </span>
    <span class="hidden w-fit text-nowrap md:block" safe>
      {localize("unfollow")}
    </span>
  </button>
);

import Hachiraw from "./scrapers/hachiraw";

const hachiraw = await Hachiraw();

console.log(
  // await hachiraw.collectGenres(),
  // await hachiraw.collectUrls(1),
  await hachiraw.collectManga("https://hachiraw.net/manga/destiny-lovers"),
  // await hachiraw.collectChapter(
  //   "https://hachiraw.net/manga/demi-chan-wa-kataritai/chapter-71",
  // ),
);

import * as cheerio from "cheerio";
import { getMainName, hasJapanese } from "@/lib/detector";
import {MangaStatus} from "@/types/MangaTypes";


const genreMap = {
  'Action': 'アクション',
  'Adult': 'アダルト',
  'Adventure': '冒険',
  'Comedy': 'コメディ',
  'Drama': 'ドラマ',
  'Ecchi': 'エッチ',
  'Fantasy': 'ファンタジー',
  'Gender Bender': 'ジェンダーベンダー',
  'Harem': 'ハーレム',
  'Historical': '歴史的',
  'Horror': 'ホラー',
  'Martial Art': '武道',
  'Mature': '成熟した',
  'Mecha': 'メカ',
  'Mystery': '神秘',
  'Psychological': '心理的',
  'Romance': 'ロマンス',
  'School Life': '学校生活',
  'Sci-fi': 'SF',
  'Seinen': '青年',
  'Shoujo': '少女',
  'Shojou Ai': '少女愛',
  'Shounen': '少年',
  'Shounen Ai': '少年愛',
  'Slice of Life': '人生のひとこま',
  'Sports': 'スポーツ',
  'Supernatural': '超自然的な',
  'Tragedy': '悲劇',
  'Yuri': '百合',
  'Josei': 'じょうせい',
  'Smut': '汚い',
  'One Shot': 'ワンショット',
  'Shotacon': 'ショタコン'
};

const Weloma = async () => {
    const BASE_URL = "https://weloma.art";


    const collectGenres = async (): Promise<string[]> => {
       // genreMap value to array
        return Object.values(genreMap);
    };

    const collectUrls = async (page: Number) => {
        const html = await fetch(`${BASE_URL}/manga-list.html?listType=pagination&page=${page}`).then((res) => res.text());
        const $ = cheerio.load(html);

        const urls = $(".row-last-update .thumb-item-flow").map((_, el) => {
            const url = $(el).find("a").eq(0).attr("href")


            return `${BASE_URL}${url}`;
        }).get();

        return urls;
    }

    const collectManga = async (url: string) => {
        const html = await fetch(url).then((res) => res.text());
        const $ = cheerio.load(html);

        const manga = {
            title: "",
            alternativeTitles: "",
            genres: [],
            status: MangaStatus.ONGOING,
            description: null,
            cover: null,
            chapters: []
        } as any;

        manga.title = $(".info-manga .manga-info h3").text();

        // manga-info li
        const infoLi = $(".info-manga .manga-info li");

        infoLi.each((i, el) => {
            const text = $(el).text();
            if (text.includes("Other names")) {
                manga.alternativeTitles = $(el).text().replace('Other names:', '').split(',').map((title) => title.trim());
            } else if (text.includes("Genre")) {
                manga.genres = $(el).find("small a").map((_, el) => $(el).text().trim()).get();
            } else if (text.includes("Status")) {
                const status = $(el).find("a").text();
                manga.status = status === "On going" ? MangaStatus.ONGOING : MangaStatus.COMPLETED;
            }
        });

        manga.description = $(".summary-content p").text();

        manga.cover = $(".info-cover .thumbnail").attr("src");



        return manga;
    }

    return {
        collectGenres,
        collectUrls,
        collectManga
    }
}

export default Weloma;

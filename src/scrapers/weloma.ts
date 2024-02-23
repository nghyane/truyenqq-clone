import * as cheerio from "cheerio";
import { getMainName, hasJapanese } from "@/lib/detector";


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
    }

    const collectManga = async (url: string) => {
    }

    return {
        collectGenres,
        collectUrls,
        collectManga
    }
}

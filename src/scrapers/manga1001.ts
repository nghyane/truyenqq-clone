import puppeteer from "puppeteer";

// curl -x http://135.181.16.141:9999 http://ipinfo.io

import * as cheerio from "cheerio";
import fs from "fs";

let proxies: string[] = [
  "http://EAzGMRSu:ZiNQDnXh@195.96.144.90:63270",
  "http://EAzGMRSu:ZiNQDnXh@103.171.110.97:64094",
  "http://EAzGMRSu:ZiNQDnXh@103.217.81.128:63588",
  // "http://135.181.16.141:9999",
];

const ProxyRouting = () => {
  let proxy: string | undefined = proxies.shift();
  if (proxy) {
    proxies.push(proxy);
  } else {
    throw new Error("No proxy available");
  }

  return proxy;
};

const Manga1001 = async () => {
  const BASE_URL = "https://manga1001.win";

  const fetchOptions = {
    headers: {
      REFERER: BASE_URL,
      "USER-AGENT":
        "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    },
    proxy: ProxyRouting(),
    keepalive: false,
    retry: {
      retries: 2,
    },
  } as RequestInit;

  const collectGenres = async (): Promise<string[]> => {
    // const { data: html } = await axiosInstance.get('/list/');
    const html = await fetch(`${BASE_URL}/list/`, fetchOptions).then((res) =>
      res.text(),
    );

    const $ = cheerio.load(html);

    const genres = $(".container .col-md-3 a.d-block")
      .map((i, el) => {
        return $(el).text();
      })
      .get();

    return genres;
  };

  const collectUrls = async (page: Number) => {
    // const { data: html } = await axiosInstance.get(`/page/${page}`).catch(() => {
    //     return {
    //         data: null
    //     }
    // })

    const html = await fetch(`${BASE_URL}/page/${page}`, fetchOptions).then(
      (res) => res.text(),
    );

    if (!html) return [];

    const $ = cheerio.load(html);

    const urls = $(
      ".container .card-body .text-center.text-white.text-shadow.p-2 a:nth-child(1)",
    )
      .map((i, el) => {
        const url = $(el).attr("href");

        return decodeURIComponent(BASE_URL + url);
      })
      .get();

    return urls as string[];
  };

  const collectManga = async (url: string) => {
    const html = await fetch(url, fetchOptions).then((res) => res.text());

    if (!html) return null;

    const $ = cheerio.load(html);

    const title = $(".site-main h1").text();

    const alternativeTitles = $("#primary p").eq(1).find("strong").eq(1).text();

    const description = $("#primary p").eq(2).text();
    const cover =
      $("img.aligncenter").attr("data-src") || $("img.aligncenter").attr("src");

    const tags = $(".container .text-left.text-white.text-shadow.small.p-2 a")
      .map((i, el) => {
        return $(el).text();
      })
      .get();

    const genres = $("#primary .text-center.text-white.text-shadow.small.p-2 a")
      .map((i, el) => {
        return $(el).text();
      })
      .get();

    const chapters = $(".site-main .list-scoll tbody tr a")
      .map((i, el) => {
        const url = $(el).attr("href");
        const index = $(el)
          .text()
          .match(/第(\d+\.?\d*)話/)?.[1];

        if (
          typeof index === "undefined" ||
          isNaN(new Number(index).valueOf())
        ) {
          return null;
        }

        return {
          url: decodeURIComponent(BASE_URL + url),
          title: "第" + index + "話",
          index: new Number(index).valueOf(),
        };
      })
      .get();

    return {
      title,
      alternativeTitles,
      description,
      cover,
      tags,
      genres,
      chapters,
    };
  };

  const collectChapter = async (url: string) => {
    // const browser = await puppeteer.connect({ browserWSEndpoint: 'ws://150.107.200.33:3000' });

    // const { data: html } = await axiosInstance.get(url).catch(() => {
    //     return {
    //         data: null
    //     }
    // })
    const html = await fetch(url, fetchOptions).then((res) => res.text());

    try {
      if (!html) return;

      if (html.includes('",shuffle: true }')) {
        console.log("Found encrypted chap!");
        return;
      }

      const matchResult = html.match(
        /'8HdOdbI','2069060yNuhPa','24168vYWUfr','(.*?)','join','match'/,
      );
      const encrypted = matchResult ? matchResult[1] : null;

      function decryptString(
        key: string,
        encryptedString: { match: (arg0: RegExp) => any[] },
      ) {
        const stringToCharCodes = (str: string) =>
          str.split("").map((char: string) => char.charCodeAt(0));
        const xorReducer = (accumulator: number, currentValue: number) =>
          accumulator ^ currentValue;
        return encryptedString
          .match(/.{1,2}/g)
          .map((hex) => parseInt(hex, 0x10))
          .map((chunk) => stringToCharCodes(key).reduce(xorReducer, chunk))
          .map((result) => String.fromCharCode(result))
          .join("");
      }

      const decryptedArray = decryptString(
        BASE_URL,
        encrypted! as { match: (arg0: RegExp) => any[] },
      ).split('","');

      if (decryptedArray.length > 1) {
        fs.appendFileSync(
          "scraper.log",
          "Unkown encrypted chap: " + url + "\n",
        );

        return null;
      }
    } catch (e) {
      fs.appendFileSync("scraper.log", "Failed to decrypt chap: " + url + "\n");

      return null;
    }

    const $ = cheerio.load(html);

    const pages = $(".container-chapter-reader .card-wrap .image-vertical")
      .map((i, el) => {
        return $(el).attr("data-src") || $(el).attr("src");
      })
      .get();

    return pages;
  };

  return {
    collectGenres,
    collectUrls,
    collectManga,
    collectChapter,
  };
};

export default Manga1001;

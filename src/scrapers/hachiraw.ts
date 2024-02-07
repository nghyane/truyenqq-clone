import * as cheerio from "cheerio";
import fs from "fs";

import ProxyRouting from "@/services/proxy";
import { getMainName, hasJapanese } from "@/lib/detector";
// import translate from "google-translate-api-browser";

const Hachiraw = async () => {
  const BASE_URL = "https://hachiraw.net";
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
    const html = await fetch(`${BASE_URL}/list-manga`, fetchOptions).then(
      (res) => res.text(),
    );

    const $ = cheerio.load(html);

    const genres = $("#TypeShow .list-group-item")
      .map((i, el) => {
        return $(el).text().trim();
      })
      .get();

    return genres;
  };

  const collectUrls = async (page: Number) => {
    const html = await fetch(
      `${BASE_URL}/list-manga/${page}`,
      fetchOptions,
    ).then((res) => res.text());

    if (!html) return [];

    const $ = cheerio.load(html);

    const urls = $(".row .SeriesName")
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

    let title = $(".BoxBody h1").text();

    const regex =
      /<li class="list-group-item d-md-block">\s*<span class="mlabel"><i class="fa fa-user"><\/i>\s*ほかの名前:\s*<\/span>\s*([^<]+)\s*<\/li>/;

    const alternativeTitles = (html.match(regex)?.[1] || "")
      .split(",")
      .map((title) => {
        return title.trim();
      });

    if (alternativeTitles.length > 0) {
      title = getMainName(alternativeTitles);
    }

    let description = $(".Content").text();

    if (!hasJapanese(description)) {
      description = description;
      // + "\n\n" +
      // (await translate(description, { to: "ja" }).then((res) => res.text));
    }

    const cover = $(".BoxBody img.img-fluid")
      .attr("src")
      ?.replace(
        /https:\/\/i\d+\.wp\.com\/cdn\.kumaraw\.com/,
        "https://cdn.kumaraw.com",
      )
      .replace(/\?quality=\d+/, "");

    const tags = alternativeTitles.map((tag) => {
      return tag + " raw";
    });

    // list-group-item d-md-block nth-child(3)
    let genres;

    $(".list-group-flush .list-group-item").each((i, el) => {
      const text = $(el).text() || "";
      if (text.includes("ジャンル")) {
        genres = $(el)
          .find("a")
          .map((i, el) => $(el).text())
          .get();
      }

      if (text.includes("著者") && !text.includes("Updating")) {
        tags.push($(el).text().replace("著者: ", "").trim());
      }

      // 雑誌
      if (text.includes("雑誌") && !text.includes("Updating")) {
        tags.push($(el).text().replace("雑誌: ", "").trim());
      }
    });

    const chapters = $(".ChapterLink")
      .map((i, el) => {
        const url = $(el).attr("href");
        const index = $(el)
          .find(".ng-binding")
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
      .get()
      .filter((chapter) => chapter !== null) // remove null
      .filter((chapter, index, self) => {
        return (
          index ===
          self.findIndex((t) => {
            return t?.index === chapter?.index;
          })
        );
      }); // remove duplicate

    return {
      title,
      alternativeTitles: alternativeTitles.join(", "),
      description,
      cover,
      tags,
      genres,
      chapters,
    };
  };

  const collectChapter = async (url: string) => {
    const html = await fetch(url, fetchOptions).then((res) => res.text());

    if (!html) return null;

    const $ = cheerio.load(html);

    const pages = $(".ImageGallery img")
      .map((i, el) => {
        const img = $(el).attr("data-original") || $(el).attr("src");

        return img == "https://hachiraw.net/01.png" ? null : img;
      })
      .get()
      .filter((page) => page !== null);

    return pages;
  };

  return {
    collectGenres,
    collectUrls,
    collectManga,
    collectChapter,
  };
};

export default Hachiraw;

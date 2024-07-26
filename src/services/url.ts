import slugify from "slugify";

const titleToSlug = (title: string) => {
    // Create slug from title
    let slug = slugify(title, {
        locale: "ja",
        remove: /[*+～ー?.()'"!:@\/]/g, // Remove specified characters
        lower: true,
        replacement: "-" // Replace removed characters with '-'
    }).replace(/#/g, ""); // Remove '#' character

    return slug.slice(0, 150);
};


export const mangaUrl = ({title, id}: { title: string; id: number }) => {

    let replaces = {
        '呪術廻戦': 'jujutsu-kaisen',
    } as {[key: string]: string};


    for (let key in replaces) {
        title = title.replace(key, replaces[key]);
    }

    return `/manga/${titleToSlug(title)}/${id}`;
};

export const chapterUrl = ({id}: { id: number }) => {
    return `/read?id=${id}`;
};

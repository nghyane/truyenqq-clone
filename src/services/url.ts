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
    return `/manga/${titleToSlug(title)}/${id}`;
};

export const chapterUrl = ({id}: { id: number }) => {
    return `/read?id=${id}`;
};

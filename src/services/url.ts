import slugify from "slugify";

const titleToSlug = (title: string) => {
    // limit to 100 characters
    return slugify(title, {
        locale: 'ja',
        remove: /[*+～ー.()'"!:@]/g,
        lower: true,
        replacement: '-',
    }).slice(0, 150);
}

export const mangaUrl = ({title, id} : {title: string, id: number}) => {
    return `/manga/${
        titleToSlug(title)
    }/${id}`;
}

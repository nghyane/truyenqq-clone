export enum MangaStatus {
    ONGOING = 1,
    COMPLETED = 2,
    CANCELLED = 3,
}

export enum ContentType {
    SELFHOSTED = 'selfhosted',
    EXTERNAL = 'external',
}

export type Manga = {
    id: number;
    title: string;
    alternative?: string | null;
    description?: string | null;
    author?: string | null;
    status: number;
    image: string;
    chapters?: Chapter[]; // Assuming Chapter is another type/interface
    bookmarks?: Bookmark[];
    genres?: Genre[];
    createdAt: Date;
    updatedAt: Date;
}


export type Chapter = {
    id: number;
    title: string;
    mangaId: number;
    content: Content;
    createdAt: Date;
    updatedAt: Date;
}

export type Content = {
    type:  ContentType.SELFHOSTED | ContentType.EXTERNAL;
    content: {
        selfhosted?: {
            total: number;
            server: string; // ex: https://cdn.mangaeden.com/mangasimg/
        };
        
        external?: {
            total: number;
            images: string[];
        };
    }
}


export type Bookmark = {
    id: number;
    mangaId: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
}

export type Genre = {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

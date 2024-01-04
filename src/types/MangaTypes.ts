export enum MangaStatus {
    ONGOING = 1,
    COMPLETED = 2,
    CANCELLED = 3,
}

export type MangaAttributes = {
    id: number;
    title: string;
    views: number;
    chapters: number;
    status: MangaStatus;
    description: string;
    image: string;
}

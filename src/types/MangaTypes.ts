export enum MangaStatus {
    ONGOING = 1,
    COMPLETED = 2,
    CANCELLED = 3,
}

export enum ContentType {
    SELFHOSTED = 'selfhosted',
    EXTERNAL = 'external',
    HOTLINK = 'hotlink',
}

export type Content = {
    type:  ContentType.SELFHOSTED | ContentType.EXTERNAL | ContentType.HOTLINK;
    data: string | string[] | {total: number, server: string};  
    beforeHtml?: string;
    afterHtml?: string;
}


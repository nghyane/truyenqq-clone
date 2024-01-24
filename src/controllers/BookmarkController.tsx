import { VerifyContext } from "@/derives/VerifyToken";
import prisma from "@/services/prisma";

import BookmarkPage from "@/views/pages/bookmark";
import { MangaButton, MangaButtonFollowed, ChapterButtonFollowed, ChapterButton } from "@/views/components/Bookmark";
import BookmarkContent from "@/views/components/BookmarkContent";

import { MangaSelect } from "./HomeController";

class BookmarkController {
    index = async () => {
        return <BookmarkPage />
    }

    /**
    * ==========================================
    * API for bookmark
    * ==========================================
    */

    addBookmark = async ({ body, set, verify }: VerifyContext & { body: string }) => {
        if (!verify) {
            set.status = 403;
            return;
        }

        const payload = JSON.parse(body) as {
            id: number,
            template: 'manga' | 'chapter',
        }

        if (!payload.id || !payload.template) {
            set.status = 400;
            return {
                error: "Invalid payload"
            };
        }

        const user = await prisma.session.findUnique({
            where: {
                uuidHash: verify.uuidHash
            }
        });

        if (!user) {
            const user = await prisma.session.create({
                data: {
                    uuidHash: verify.uuidHash,
                    bookmarks: {
                        create: {
                            mangaId: payload.id,
                        }
                    }
                }
            });

            console.log(user);

        } else {
            await prisma.session.update({
                where: {
                    uuidHash: verify.uuidHash
                },
                data: {
                    bookmarks: {
                        connectOrCreate: {
                            where: {
                                sessionId_mangaId_unique: {
                                    sessionId: user.id,
                                    mangaId: payload.id,
                                }
                            },
                            create: {
                                mangaId: payload.id,
                            }
                        }
                    }
                }
            });
        }

        return payload.template === 'manga' ? <MangaButtonFollowed manga_id={payload.id} /> : <ChapterButtonFollowed manga_id={payload.id} />
    }

    removeBookmark = async ({ verify, body, set }: VerifyContext & { body: string }) => {
        if (!verify) {
            set.status = 403;
            return;
        }


        const payload = JSON.parse(body) as {
            id: number,
            template: 'manga' | 'chapter',
        }

        if (!payload.id || !payload.template) {
            set.status = 400;
            return;
        }

        const user = await prisma.session.findUnique({
            where: {
                uuidHash: verify.uuidHash
            }
        });

        if (!user) {
            set.status = 403;
            return;
        }

        await prisma.bookmark.delete({
            where: {
                sessionId_mangaId_unique: {
                    sessionId: user.id,
                    mangaId: payload.id,
                }
            }
        });

        return payload.template === 'manga' ? <MangaButton manga_id={payload.id} /> : <ChapterButton manga_id={payload.id} />
    }

    getBookmarkStatus = async ({ verify, query, set }: VerifyContext) => {
        if (!query.id || !verify) {
            set.status = 400;

            return;
        }


        const session = await prisma.session.findUnique({
            where: {
                uuidHash: verify.uuidHash
            }
        });

        if (!session) {
            return query.template === 'manga' ? <MangaButton manga_id={new Number(query.id).valueOf()} /> : <ChapterButton manga_id={new Number(query.id).valueOf()} />
        }

        const isBookmarked = await prisma.bookmark.findUnique({
            where: {
                sessionId_mangaId_unique: {
                    sessionId: session.id,
                    mangaId: new Number(query.id).valueOf(),
                }
            }
        });

        if (!isBookmarked) {
            return query.template === 'manga' ? <MangaButton manga_id={new Number(query.id).valueOf()} /> : <ChapterButton manga_id={new Number(query.id).valueOf()} />
        }


        return query.template === 'manga' ? <MangaButtonFollowed manga_id={new Number(query.id).valueOf()} /> : <ChapterButtonFollowed manga_id={new Number(query.id).valueOf()} />
    }

    getBookmarks = async ({ verify, set, query }: VerifyContext) => {
        if (!verify) {
            set.status = 403;

            return;
        }

        const LIMIT = 15;

        const bookmarks = await prisma.session.findUnique({
            where: {
                uuidHash: verify.uuidHash
            },
            select: {
                bookmarks: {
                    select: {
                        manga: {
                            select: MangaSelect
                        },
                    },
                    orderBy: {
                        manga: {
                            updatedAt: 'desc'
                        }
                    }, 
                    
                    take: LIMIT,
                    skip: query.page ? (new Number(query.page).valueOf() - 1) * LIMIT : 0,
                }
            },

        });

        const mangas = bookmarks?.bookmarks.map(bookmark => bookmark.manga) as any;

        return <BookmarkContent mangas={mangas} />
    }
}

export default BookmarkController;

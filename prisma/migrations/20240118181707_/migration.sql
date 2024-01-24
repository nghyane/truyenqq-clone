/*
  Warnings:

  - A unique constraint covering the columns `[sessionId]` on the table `bookmarks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mangaId]` on the table `bookmarks` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "bookmarks" DROP CONSTRAINT "bookmarks_sessionId_fkey";

-- DropIndex
DROP INDEX "sessionId";

-- CreateTable
CREATE TABLE "_BookmarkToSession" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BookmarkToSession_AB_unique" ON "_BookmarkToSession"("A", "B");

-- CreateIndex
CREATE INDEX "_BookmarkToSession_B_index" ON "_BookmarkToSession"("B");

-- CreateIndex
CREATE UNIQUE INDEX "bookmarks_sessionId_key" ON "bookmarks"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "bookmarks_mangaId_key" ON "bookmarks"("mangaId");

-- AddForeignKey
ALTER TABLE "_BookmarkToSession" ADD CONSTRAINT "_BookmarkToSession_A_fkey" FOREIGN KEY ("A") REFERENCES "bookmarks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookmarkToSession" ADD CONSTRAINT "_BookmarkToSession_B_fkey" FOREIGN KEY ("B") REFERENCES "sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

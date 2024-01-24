/*
  Warnings:

  - A unique constraint covering the columns `[sessionId,mangaId]` on the table `bookmarks` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "bookmarks_mangaId_key";

-- DropIndex
DROP INDEX "bookmarks_sessionId_key";

-- CreateIndex
CREATE UNIQUE INDEX "bookmarks_sessionId_mangaId_key" ON "bookmarks"("sessionId", "mangaId");

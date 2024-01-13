/*
  Warnings:

  - You are about to drop the `manga_tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "manga_tags" DROP CONSTRAINT "manga_tags_mangaId_fkey";

-- DropForeignKey
ALTER TABLE "manga_tags" DROP CONSTRAINT "manga_tags_tagId_fkey";

-- DropTable
DROP TABLE "manga_tags";

-- CreateTable
CREATE TABLE "_MangaToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MangaToTag_AB_unique" ON "_MangaToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_MangaToTag_B_index" ON "_MangaToTag"("B");

-- AddForeignKey
ALTER TABLE "_MangaToTag" ADD CONSTRAINT "_MangaToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "mangas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MangaToTag" ADD CONSTRAINT "_MangaToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

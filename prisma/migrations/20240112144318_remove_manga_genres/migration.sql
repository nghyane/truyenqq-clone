/*
  Warnings:

  - You are about to drop the `manga_genres` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "manga_genres" DROP CONSTRAINT "manga_genres_genreId_fkey";

-- DropForeignKey
ALTER TABLE "manga_genres" DROP CONSTRAINT "manga_genres_mangaId_fkey";

-- DropTable
DROP TABLE "manga_genres";

-- CreateTable
CREATE TABLE "_GenreToManga" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GenreToManga_AB_unique" ON "_GenreToManga"("A", "B");

-- CreateIndex
CREATE INDEX "_GenreToManga_B_index" ON "_GenreToManga"("B");

-- AddForeignKey
ALTER TABLE "_GenreToManga" ADD CONSTRAINT "_GenreToManga_A_fkey" FOREIGN KEY ("A") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToManga" ADD CONSTRAINT "_GenreToManga_B_fkey" FOREIGN KEY ("B") REFERENCES "mangas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

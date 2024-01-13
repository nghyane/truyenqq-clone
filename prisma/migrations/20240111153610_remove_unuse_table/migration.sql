/*
  Warnings:

  - You are about to drop the `latest_chapters` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "latest_chapters" DROP CONSTRAINT "latest_chapters_manga_id_fkey";

-- DropTable
DROP TABLE "latest_chapters";

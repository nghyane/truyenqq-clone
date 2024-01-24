/*
  Warnings:

  - You are about to drop the `_BookmarkToSession` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BookmarkToSession" DROP CONSTRAINT "_BookmarkToSession_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookmarkToSession" DROP CONSTRAINT "_BookmarkToSession_B_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_userId_fkey";

-- AlterTable
ALTER TABLE "sessions" ALTER COLUMN "userId" DROP NOT NULL;

-- DropTable
DROP TABLE "_BookmarkToSession";

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

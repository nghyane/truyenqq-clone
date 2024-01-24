-- AlterTable
ALTER TABLE "chapters" ADD COLUMN     "is_public" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "manga_views" ADD COLUMN     "viewsMonth" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "mangas" ADD COLUMN     "is_public" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "userId" ON "sessions"("user_id");

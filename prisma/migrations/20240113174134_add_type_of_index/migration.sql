-- AlterTable
ALTER TABLE "chapters" ALTER COLUMN "index" SET DEFAULT 0,
ALTER COLUMN "index" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "genres" ADD COLUMN     "content" TEXT;

-- AlterTable
ALTER TABLE "tags" ADD COLUMN     "content" TEXT;

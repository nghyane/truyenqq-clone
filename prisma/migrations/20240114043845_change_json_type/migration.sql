/*
  Warnings:

  - Made the column `content` on table `chapters` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "chapters" ALTER COLUMN "content" SET NOT NULL;

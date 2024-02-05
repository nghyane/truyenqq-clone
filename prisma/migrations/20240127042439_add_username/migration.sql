/*
  Warnings:

  - A unique constraint covering the columns `[usename]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_usename_key" ON "users"("usename");

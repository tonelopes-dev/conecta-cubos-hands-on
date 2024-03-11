/*
  Warnings:

  - Made the column `token` on table `admin` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "admin" ALTER COLUMN "token" SET NOT NULL;

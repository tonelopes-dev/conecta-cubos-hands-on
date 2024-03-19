/*
  Warnings:

  - You are about to drop the column `status` on the `lecture` table. All the data in the column will be lost.
  - Added the required column `status_lecture` to the `lecture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lecture" DROP COLUMN "status",
ADD COLUMN     "status_lecture" TEXT NOT NULL;

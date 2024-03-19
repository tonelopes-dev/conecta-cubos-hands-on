/*
  Warnings:

  - The primary key for the `lecture` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `lecture` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "lecture" DROP CONSTRAINT "lecture_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
ADD CONSTRAINT "lecture_pkey" PRIMARY KEY ("id");

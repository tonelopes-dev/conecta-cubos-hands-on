/*
  Warnings:

  - The primary key for the `lecture` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "lecture" DROP CONSTRAINT "lecture_pkey",
ADD COLUMN     "access_token" VARCHAR(255),
ADD COLUMN     "github_id" VARCHAR(255),
ADD COLUMN     "speaker_photo_url" VARCHAR(255),
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "lecture_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "lecture_id_seq";

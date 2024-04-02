/*
  Warnings:

  - The `status_lecture` column on the `lecture` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status_meet` column on the `meet` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('FINISHED', 'CONFIRMED', 'PENDING', 'CANCELED');

-- AlterTable
ALTER TABLE "lecture" DROP COLUMN "status_lecture",
ADD COLUMN     "status_lecture" "Status" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "meet" DROP COLUMN "status_meet",
ADD COLUMN     "status_meet" "Status" NOT NULL DEFAULT 'PENDING';

-- DropEnum
DROP TYPE "status";

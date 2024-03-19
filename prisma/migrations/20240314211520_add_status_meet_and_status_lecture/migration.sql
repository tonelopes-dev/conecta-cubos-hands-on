/*
  Warnings:

  - Made the column `meet_id` on table `lecture` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `status_lecture` on the `lecture` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "lecture" ALTER COLUMN "meet_id" SET NOT NULL,
DROP COLUMN "status_lecture",
ADD COLUMN     "status_lecture" "status" NOT NULL;

-- AlterTable
ALTER TABLE "meet" ADD COLUMN     "status_meet" "status" NOT NULL DEFAULT 'pending';

/*
  Warnings:

  - The values [cancelled] on the enum `status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "status_new" AS ENUM ('finished', 'confirmed', 'pending', 'canceled');
ALTER TABLE "meet" ALTER COLUMN "status_meet" DROP DEFAULT;
ALTER TABLE "lecture" ALTER COLUMN "status_lecture" DROP DEFAULT;
ALTER TABLE "lecture" ALTER COLUMN "status_lecture" TYPE "status_new" USING ("status_lecture"::text::"status_new");
ALTER TABLE "meet" ALTER COLUMN "status_meet" TYPE "status_new" USING ("status_meet"::text::"status_new");
ALTER TYPE "status" RENAME TO "status_old";
ALTER TYPE "status_new" RENAME TO "status";
DROP TYPE "status_old";
ALTER TABLE "meet" ALTER COLUMN "status_meet" SET DEFAULT 'pending';
ALTER TABLE "lecture" ALTER COLUMN "status_lecture" SET DEFAULT 'pending';
COMMIT;

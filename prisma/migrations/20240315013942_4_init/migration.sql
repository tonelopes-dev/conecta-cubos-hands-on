/*
  Warnings:

  - Made the column `manager_id` on table `meet` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "meet" ALTER COLUMN "manager_id" SET NOT NULL;

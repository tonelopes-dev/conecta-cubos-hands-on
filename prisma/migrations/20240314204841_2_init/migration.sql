-- DropForeignKey
ALTER TABLE "lecture" DROP CONSTRAINT "lecture_meet_id_fkey";

-- AddForeignKey
ALTER TABLE "lecture" ADD CONSTRAINT "lecture_meet_id_fkey" FOREIGN KEY ("meet_id") REFERENCES "meet"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

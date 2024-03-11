-- CreateEnum
CREATE TYPE "status" AS ENUM ('pending', 'confirmed', 'cancelled');

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateTable
CREATE TABLE "lecture" (
    "id" SERIAL NOT NULL,
    "meet_id" UUID,
    "speaker_name" VARCHAR(255) NOT NULL,
    "speaker_linkedin" VARCHAR(255),
    "speaker_about" VARCHAR(255) NOT NULL,
    "speaker_email" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "datetime" TIMESTAMP(6),
    "status" "status",
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),
    "iscancelled" BOOLEAN DEFAULT false,
    "cancellation_reason" VARCHAR(255),

    CONSTRAINT "lecture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manager" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "admin_id" UUID,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255),
    "isactive" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),
    "token" VARCHAR(255),
    "token_expiration_time" TIMESTAMP(6),

    CONSTRAINT "manager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meet" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "admin_id" UUID,
    "manager_id" UUID,
    "title" VARCHAR(255) NOT NULL,
    "summary" VARCHAR(255) NOT NULL,
    "datetime" TIMESTAMP(6) NOT NULL,
    "link" VARCHAR(255),
    "image_link" VARCHAR(255),
    "address" VARCHAR(255) NOT NULL,
    "address_number" VARCHAR(255),
    "address_zip" VARCHAR(255) NOT NULL,
    "address_city" VARCHAR(255) NOT NULL,
    "address_state" VARCHAR(255) NOT NULL,
    "address_district" VARCHAR(255) NOT NULL,
    "address_complement" VARCHAR(255),
    "start_time" TIMESTAMP(6) NOT NULL,
    "end_time" TIMESTAMP(6) NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "meet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "username" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "token" VARCHAR(255),

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_username_key" ON "admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");

-- AddForeignKey
ALTER TABLE "lecture" ADD CONSTRAINT "lecture_meet_id_fkey" FOREIGN KEY ("meet_id") REFERENCES "meet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "manager" ADD CONSTRAINT "manager_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "meet" ADD CONSTRAINT "meet_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "meet" ADD CONSTRAINT "meet_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "manager"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;


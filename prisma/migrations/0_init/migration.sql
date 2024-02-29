-- CreateTable
CREATE TABLE "lecture" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "starttime" TIME(6),
    "endtime" TIME(6),
    "lecturer_id" INTEGER,

    CONSTRAINT "lecture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lecturer" (
    "id" SERIAL NOT NULL,
    "firstname" VARCHAR(255) NOT NULL,
    "lastname" VARCHAR(255) NOT NULL,
    "github" VARCHAR(255) NOT NULL,
    "createdat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "email" VARCHAR(255),

    CONSTRAINT "lecturer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manager" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "username" VARCHAR(255) NOT NULL,
    "firstname" VARCHAR(255) NOT NULL,
    "lastname" VARCHAR(255) NOT NULL,
    "github" VARCHAR(255) NOT NULL,
    "createdat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "email" VARCHAR(255),

    CONSTRAINT "manager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meet" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "date" TIMESTAMP(6),
    "place" VARCHAR(255),
    "link" VARCHAR(255),
    "createdat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "manager_id" UUID,

    CONSTRAINT "meet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meet_lecture" (
    "id" SERIAL NOT NULL,
    "meet_id" INTEGER,
    "lecture_id" INTEGER,

    CONSTRAINT "meet_lecture_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "manager_username_key" ON "manager"("username");

-- AddForeignKey
ALTER TABLE "lecture" ADD CONSTRAINT "lecture_lecturer_id_fkey" FOREIGN KEY ("lecturer_id") REFERENCES "lecturer"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "meet" ADD CONSTRAINT "meet_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "manager"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "meet_lecture" ADD CONSTRAINT "meet_lecture_lecture_id_fkey" FOREIGN KEY ("lecture_id") REFERENCES "lecture"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "meet_lecture" ADD CONSTRAINT "meet_lecture_meet_id_fkey" FOREIGN KEY ("meet_id") REFERENCES "meet"("id") ON DELETE CASCADE ON UPDATE NO ACTION;


-- CreateEnum
CREATE TYPE "StatusLecture" AS ENUM ('PENDING_APPROVAL', 'CANCELED', 'IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "token" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Manager" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Manager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meet" (
    "id" SERIAL NOT NULL,
    "managerId" INTEGER NOT NULL,
    "adminId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "link" TEXT,
    "address" TEXT,
    "zipcode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "stateOfCity" TEXT NOT NULL,
    "complement" TEXT,
    "lectureTime" TIMESTAMP(3) NOT NULL,
    "listLectureEmails" TEXT NOT NULL,
    "statusEvent" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Meet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lecture" (
    "id" SERIAL NOT NULL,
    "meetId" INTEGER NOT NULL,
    "speakerName" TEXT NOT NULL,
    "speakerLinkedIn" TEXT NOT NULL,
    "speakerEmail" TEXT NOT NULL,
    "speakerAbout" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "timeDate" TIMESTAMP(3) NOT NULL,
    "statusLecture" "StatusLecture" NOT NULL,

    CONSTRAINT "Lecture_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_token_key" ON "Admin"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Manager_name_key" ON "Manager"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Manager_email_key" ON "Manager"("email");

-- AddForeignKey
ALTER TABLE "Meet" ADD CONSTRAINT "Meet_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meet" ADD CONSTRAINT "Meet_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lecture" ADD CONSTRAINT "Lecture_meetId_fkey" FOREIGN KEY ("meetId") REFERENCES "Meet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

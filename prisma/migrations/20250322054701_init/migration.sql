-- CreateTable
CREATE TABLE "Record" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "fileLocation" TEXT,
    "imageLocation" TEXT,
    "bannerLocation" TEXT,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

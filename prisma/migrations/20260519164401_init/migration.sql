-- CreateTable
CREATE TABLE "Read" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Read_pkey" PRIMARY KEY ("id")
);

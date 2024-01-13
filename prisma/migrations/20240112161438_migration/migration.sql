-- CreateTable
CREATE TABLE "Cardinfo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "interests" TEXT[],
    "githubUrl" TEXT,
    "twitterUrl" TEXT,

    CONSTRAINT "Cardinfo_pkey" PRIMARY KEY ("id")
);

-- CreateEnum
CREATE TYPE "SUBTYPE" AS ENUM ('BASIC', 'PLATINUM', 'DAIMOND');

-- CreateEnum
CREATE TYPE "MEDIA_TYPE" AS ENUM ('TEXT', 'IMAGE', 'VIDEO');

-- CreateEnum
CREATE TYPE "PLATFORM" AS ENUM ('INSTAGRAM', 'FACEBOOK', 'YOUTUBE', 'LINKEDIN', 'TWITTER', 'PINTEREST', 'MEDIUM');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image" TEXT
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" SERIAL NOT NULL,
    "published" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "type" "SUBTYPE" NOT NULL DEFAULT 'BASIC',
    "subscriptionId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Action" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "prompt" TEXT NOT NULL,
    "inputImage" TEXT[],
    "inputVideo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "OutPut" (
    "id" SERIAL NOT NULL,
    "outputText" TEXT NOT NULL,
    "outputImage" TEXT[],
    "outputVideo" TEXT,
    "mediaType" "MEDIA_TYPE" NOT NULL,
    "actionId" INTEGER NOT NULL,
    "recommendedPlatform" "PLATFORM" NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_id_key" ON "Subscription"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userId_key" ON "Subscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Action_id_key" ON "Action"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Action_userId_key" ON "Action"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "OutPut_id_key" ON "OutPut"("id");

-- CreateIndex
CREATE UNIQUE INDEX "OutPut_actionId_key" ON "OutPut"("actionId");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutPut" ADD CONSTRAINT "OutPut_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "Action"("id") ON DELETE CASCADE ON UPDATE CASCADE;

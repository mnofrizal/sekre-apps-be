/*
  Warnings:

  - Added the required column `type` to the `ApprovalLink` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ApprovalType" AS ENUM ('SUPERVISOR', 'GA', 'KITCHEN');

-- DropIndex
DROP INDEX "ApprovalLink_requestId_key";

-- AlterTable
ALTER TABLE "ApprovalLink" ADD COLUMN     "respondedAt" TIMESTAMP(3),
ADD COLUMN     "type" "ApprovalType" NOT NULL;

-- CreateIndex
CREATE INDEX "ApprovalLink_requestId_idx" ON "ApprovalLink"("requestId");

-- CreateIndex
CREATE INDEX "StatusHistory_requestId_idx" ON "StatusHistory"("requestId");

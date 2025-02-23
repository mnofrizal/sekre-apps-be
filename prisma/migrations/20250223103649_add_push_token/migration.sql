/*
  Warnings:

  - A unique constraint covering the columns `[pushToken]` on the table `DashboardUser` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "DashboardUser" ADD COLUMN     "pushToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "DashboardUser_pushToken_key" ON "DashboardUser"("pushToken");

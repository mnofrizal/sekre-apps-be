/*
  Warnings:

  - You are about to drop the column `division` on the `EmployeeOrder` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EmployeeOrder" DROP COLUMN "division",
ADD COLUMN     "entity" TEXT;

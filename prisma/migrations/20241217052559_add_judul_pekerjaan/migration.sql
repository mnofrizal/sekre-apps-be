/*
  Warnings:

  - Added the required column `judulPekerjaan` to the `ServiceRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ServiceRequest" ADD COLUMN     "judulPekerjaan" TEXT NOT NULL;

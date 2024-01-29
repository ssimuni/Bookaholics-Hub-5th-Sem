/*
  Warnings:

  - You are about to drop the column `borrrowsAt` on the `BorrowProcess` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BorrowProcess" DROP COLUMN "borrrowsAt",
ADD COLUMN     "borrowsAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

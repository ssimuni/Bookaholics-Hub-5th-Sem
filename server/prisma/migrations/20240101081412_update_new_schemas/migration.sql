/*
  Warnings:

  - Added the required column `paymentForBorrow` to the `BorrowableBook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BorrowableBook" ADD COLUMN     "paymentForBorrow" INTEGER NOT NULL,
ALTER COLUMN "returnTime" SET DATA TYPE TEXT;

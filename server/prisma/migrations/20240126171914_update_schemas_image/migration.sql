/*
  Warnings:

  - Added the required column `image` to the `BorrowableBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `ExchangeableBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `SellingBook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BorrowableBook" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ExchangeableBook" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SellingBook" ADD COLUMN     "image" TEXT NOT NULL;

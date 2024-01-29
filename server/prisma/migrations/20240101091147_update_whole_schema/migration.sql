/*
  Warnings:

  - You are about to drop the column `bookId` on the `BorrowableBook` table. All the data in the column will be lost.
  - You are about to drop the column `bookId` on the `ExchangeableBook` table. All the data in the column will be lost.
  - You are about to drop the column `bId` on the `SellingBook` table. All the data in the column will be lost.
  - You are about to drop the `Books` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `b_authorname` to the `BorrowableBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `b_description` to the `BorrowableBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `b_edition` to the `BorrowableBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `b_numOfPages` to the `BorrowableBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `b_price` to the `BorrowableBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `b_quantity` to the `BorrowableBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `b_title` to the `BorrowableBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `BorrowableBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `soldBy_Email` to the `BorrowableBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `b_authorname` to the `ExchangeableBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `b_description` to the `ExchangeableBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `b_edition` to the `ExchangeableBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `b_numOfPages` to the `ExchangeableBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `b_price` to the `ExchangeableBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `b_quantity` to the `ExchangeableBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `b_title` to the `ExchangeableBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `ExchangeableBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `soldBy_Email` to the `ExchangeableBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `b_authorname` to the `SellingBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `b_description` to the `SellingBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `b_edition` to the `SellingBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `b_numOfPages` to the `SellingBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `b_price` to the `SellingBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `b_quantity` to the `SellingBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `b_title` to the `SellingBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `SellingBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `soldBy_Email` to the `SellingBook` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Books" DROP CONSTRAINT "Books_soldBy_Email_fkey";

-- DropForeignKey
ALTER TABLE "BorrowableBook" DROP CONSTRAINT "BorrowableBook_bookId_fkey";

-- DropForeignKey
ALTER TABLE "ExchangeableBook" DROP CONSTRAINT "ExchangeableBook_bookId_fkey";

-- DropForeignKey
ALTER TABLE "SellingBook" DROP CONSTRAINT "SellingBook_bId_fkey";

-- DropIndex
DROP INDEX "BorrowableBook_bookId_key";

-- DropIndex
DROP INDEX "ExchangeableBook_bookId_key";

-- DropIndex
DROP INDEX "SellingBook_bId_key";

-- AlterTable
ALTER TABLE "BorrowableBook" DROP COLUMN "bookId",
ADD COLUMN     "b_authorname" TEXT NOT NULL,
ADD COLUMN     "b_description" TEXT NOT NULL,
ADD COLUMN     "b_edition" TEXT NOT NULL,
ADD COLUMN     "b_numOfPages" INTEGER NOT NULL,
ADD COLUMN     "b_price" INTEGER NOT NULL,
ADD COLUMN     "b_quantity" INTEGER NOT NULL,
ADD COLUMN     "b_title" TEXT NOT NULL,
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "postAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "soldBy_Email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ExchangeableBook" DROP COLUMN "bookId",
ADD COLUMN     "b_authorname" TEXT NOT NULL,
ADD COLUMN     "b_description" TEXT NOT NULL,
ADD COLUMN     "b_edition" TEXT NOT NULL,
ADD COLUMN     "b_numOfPages" INTEGER NOT NULL,
ADD COLUMN     "b_price" INTEGER NOT NULL,
ADD COLUMN     "b_quantity" INTEGER NOT NULL,
ADD COLUMN     "b_title" TEXT NOT NULL,
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "postAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "soldBy_Email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SellingBook" DROP COLUMN "bId",
ADD COLUMN     "b_authorname" TEXT NOT NULL,
ADD COLUMN     "b_description" TEXT NOT NULL,
ADD COLUMN     "b_edition" TEXT NOT NULL,
ADD COLUMN     "b_numOfPages" INTEGER NOT NULL,
ADD COLUMN     "b_price" INTEGER NOT NULL,
ADD COLUMN     "b_quantity" INTEGER NOT NULL,
ADD COLUMN     "b_title" TEXT NOT NULL,
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "postAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "soldBy_Email" TEXT NOT NULL;

-- DropTable
DROP TABLE "Books";

-- AddForeignKey
ALTER TABLE "SellingBook" ADD CONSTRAINT "SellingBook_soldBy_Email_fkey" FOREIGN KEY ("soldBy_Email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExchangeableBook" ADD CONSTRAINT "ExchangeableBook_soldBy_Email_fkey" FOREIGN KEY ("soldBy_Email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowableBook" ADD CONSTRAINT "BorrowableBook_soldBy_Email_fkey" FOREIGN KEY ("soldBy_Email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

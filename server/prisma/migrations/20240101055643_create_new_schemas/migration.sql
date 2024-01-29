/*
  Warnings:

  - You are about to drop the column `purpose` on the `Books` table. All the data in the column will be lost.
  - You are about to drop the column `bookId` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sbId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sbId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_bookId_fkey";

-- DropIndex
DROP INDEX "Order_bookId_key";

-- AlterTable
ALTER TABLE "Books" DROP COLUMN "purpose";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "bookId",
ADD COLUMN     "sbId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "SellingBook" (
    "sid" SERIAL NOT NULL,
    "bId" INTEGER NOT NULL,

    CONSTRAINT "SellingBook_pkey" PRIMARY KEY ("sid")
);

-- CreateIndex
CREATE UNIQUE INDEX "SellingBook_bId_key" ON "SellingBook"("bId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_sbId_key" ON "Order"("sbId");

-- AddForeignKey
ALTER TABLE "SellingBook" ADD CONSTRAINT "SellingBook_bId_fkey" FOREIGN KEY ("bId") REFERENCES "Books"("bid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_sbId_fkey" FOREIGN KEY ("sbId") REFERENCES "SellingBook"("sid") ON DELETE RESTRICT ON UPDATE CASCADE;

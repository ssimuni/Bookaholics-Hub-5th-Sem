/*
  Warnings:

  - You are about to drop the column `state` on the `Books` table. All the data in the column will be lost.
  - Added the required column `category` to the `Books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupPoint` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Books" DROP COLUMN "state",
ADD COLUMN     "category" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "pickupPoint" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'Pending';

-- CreateTable
CREATE TABLE "ExchangeableBook" (
    "ebId" SERIAL NOT NULL,
    "wishedBook" TEXT NOT NULL,
    "wishedBookAuthor" TEXT NOT NULL,
    "wishedBookEdition" TEXT NOT NULL,
    "bookId" INTEGER NOT NULL,

    CONSTRAINT "ExchangeableBook_pkey" PRIMARY KEY ("ebId")
);

-- CreateTable
CREATE TABLE "ExchangeProcess" (
    "epId" SERIAL NOT NULL,
    "postAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eId" INTEGER NOT NULL,
    "exchangerEmail" TEXT NOT NULL,

    CONSTRAINT "ExchangeProcess_pkey" PRIMARY KEY ("epId")
);

-- CreateTable
CREATE TABLE "BorrowableBook" (
    "borrId" SERIAL NOT NULL,
    "pickupPoint" TEXT NOT NULL,
    "returnTime" TIMESTAMP(3) NOT NULL,
    "borrState" TEXT NOT NULL DEFAULT 'Not Borrowed',
    "bookId" INTEGER NOT NULL,

    CONSTRAINT "BorrowableBook_pkey" PRIMARY KEY ("borrId")
);

-- CreateTable
CREATE TABLE "BorrowProcess" (
    "bpId" SERIAL NOT NULL,
    "borrrowsAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bbId" INTEGER NOT NULL,
    "borrowerEmail" TEXT NOT NULL,

    CONSTRAINT "BorrowProcess_pkey" PRIMARY KEY ("bpId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExchangeableBook_bookId_key" ON "ExchangeableBook"("bookId");

-- CreateIndex
CREATE UNIQUE INDEX "ExchangeProcess_eId_key" ON "ExchangeProcess"("eId");

-- CreateIndex
CREATE UNIQUE INDEX "BorrowableBook_bookId_key" ON "BorrowableBook"("bookId");

-- CreateIndex
CREATE UNIQUE INDEX "BorrowProcess_bbId_key" ON "BorrowProcess"("bbId");

-- AddForeignKey
ALTER TABLE "ExchangeableBook" ADD CONSTRAINT "ExchangeableBook_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Books"("bid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExchangeProcess" ADD CONSTRAINT "ExchangeProcess_eId_fkey" FOREIGN KEY ("eId") REFERENCES "ExchangeableBook"("ebId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExchangeProcess" ADD CONSTRAINT "ExchangeProcess_exchangerEmail_fkey" FOREIGN KEY ("exchangerEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowableBook" ADD CONSTRAINT "BorrowableBook_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Books"("bid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowProcess" ADD CONSTRAINT "BorrowProcess_bbId_fkey" FOREIGN KEY ("bbId") REFERENCES "BorrowableBook"("borrId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowProcess" ADD CONSTRAINT "BorrowProcess_borrowerEmail_fkey" FOREIGN KEY ("borrowerEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

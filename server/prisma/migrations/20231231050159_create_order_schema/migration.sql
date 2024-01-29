/*
  Warnings:

  - Added the required column `b_quantity` to the `Books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Books" ADD COLUMN     "b_quantity" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Order" (
    "orderId" SERIAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Waiting',
    "orderedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "takenBy_Email" TEXT NOT NULL,
    "bookId" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("orderId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_bookId_key" ON "Order"("bookId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_takenBy_Email_fkey" FOREIGN KEY ("takenBy_Email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Books"("bid") ON DELETE RESTRICT ON UPDATE CASCADE;

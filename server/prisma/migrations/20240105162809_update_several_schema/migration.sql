/*
  Warnings:

  - You are about to drop the column `borrState` on the `BorrowableBook` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Order` table. All the data in the column will be lost.
  - Added the required column `phone` to the `BorrowProcess` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `ExchangeProcess` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BorrowProcess" ADD COLUMN     "borrState" TEXT NOT NULL DEFAULT 'Pending',
ADD COLUMN     "phone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BorrowableBook" DROP COLUMN "borrState";

-- AlterTable
ALTER TABLE "ExchangeProcess" ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL DEFAULT 'Pending';

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "status",
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL DEFAULT 'Pending';

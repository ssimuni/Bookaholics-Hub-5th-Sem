/*
  Warnings:

  - You are about to drop the column `soldBy_Id` on the `Books` table. All the data in the column will be lost.
  - Added the required column `soldBy_Email` to the `Books` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Books" DROP CONSTRAINT "Books_soldBy_Id_fkey";

-- AlterTable
ALTER TABLE "Books" DROP COLUMN "soldBy_Id",
ADD COLUMN     "soldBy_Email" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "Books_soldBy_Email_fkey" FOREIGN KEY ("soldBy_Email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

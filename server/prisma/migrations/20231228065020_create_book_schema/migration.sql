-- CreateTable
CREATE TABLE "Books" (
    "bid" SERIAL NOT NULL,
    "b_title" TEXT NOT NULL,
    "b_authorname" TEXT NOT NULL,
    "b_edition" TEXT NOT NULL,
    "b_numOfPages" INTEGER NOT NULL,
    "b_description" TEXT NOT NULL,
    "b_price" INTEGER NOT NULL,
    "purpose" TEXT NOT NULL DEFAULT 'For Sell',
    "state" INTEGER NOT NULL DEFAULT 1,
    "postAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "soldBy_Id" INTEGER NOT NULL,

    CONSTRAINT "Books_pkey" PRIMARY KEY ("bid")
);

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "Books_soldBy_Id_fkey" FOREIGN KEY ("soldBy_Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

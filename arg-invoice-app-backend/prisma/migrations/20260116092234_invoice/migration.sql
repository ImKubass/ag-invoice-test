-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('pending', 'paid');

-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" "InvoiceStatus" NOT NULL DEFAULT 'pending',
    "issueDate" DATE NOT NULL,
    "dueDate" DATE NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL,
    "projectDescription" TEXT NOT NULL,
    "vendorStreet" TEXT NOT NULL,
    "vendorCity" TEXT NOT NULL,
    "vendorZip" TEXT NOT NULL,
    "vendorCountry" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "customerStreet" TEXT NOT NULL,
    "customerCity" TEXT NOT NULL,
    "customerZip" TEXT NOT NULL,
    "customerCountry" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceItem" (
    "id" SERIAL NOT NULL,
    "invoiceId" INTEGER NOT NULL,
    "quantity" DECIMAL(10,2) NOT NULL,
    "pricePerUnit" DECIMAL(10,2) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "InvoiceItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceItem" ADD CONSTRAINT "InvoiceItem_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

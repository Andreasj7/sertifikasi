/*
  Warnings:

  - You are about to drop the column `idAssesmentImpl` on the `assesion` table. All the data in the column will be lost.
  - You are about to drop the column `invoiceDistId` on the `asstestresult` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `assesion` DROP FOREIGN KEY `Assesion_idAssesmentImpl_fkey`;

-- DropForeignKey
ALTER TABLE `asstestresult` DROP FOREIGN KEY `AssTestResult_invoiceDistId_fkey`;

-- AlterTable
ALTER TABLE `assesion` DROP COLUMN `idAssesmentImpl`;

-- AlterTable
ALTER TABLE `assesmentimplementation` ADD COLUMN `idAssesion` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `asstestresult` DROP COLUMN `invoiceDistId`;

-- AddForeignKey
ALTER TABLE `AssesmentImplementation` ADD CONSTRAINT `AssesmentImplementation_idAssesion_fkey` FOREIGN KEY (`idAssesion`) REFERENCES `Assesion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

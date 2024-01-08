/*
  Warnings:

  - You are about to drop the column `idSystemMiners` on the `paymentconfirmation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idCertApplication]` on the table `PaymentConfirmation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idCertApplication` to the `PaymentConfirmation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `paymentconfirmation` DROP FOREIGN KEY `PaymentConfirmation_idSystemMiners_fkey`;

-- AlterTable
ALTER TABLE `paymentconfirmation` DROP COLUMN `idSystemMiners`,
    ADD COLUMN `idCertApplication` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `PaymentConfirmation_idCertApplication_key` ON `PaymentConfirmation`(`idCertApplication`);

-- AddForeignKey
ALTER TABLE `PaymentConfirmation` ADD CONSTRAINT `PaymentConfirmation_idCertApplication_fkey` FOREIGN KEY (`idCertApplication`) REFERENCES `CertApplication`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

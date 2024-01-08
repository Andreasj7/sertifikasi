/*
  Warnings:

  - You are about to drop the column `certStorageId` on the `paymentconfirmation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `paymentconfirmation` DROP FOREIGN KEY `PaymentConfirmation_certStorageId_fkey`;

-- AlterTable
ALTER TABLE `paymentconfirmation` DROP COLUMN `certStorageId`;

-- CreateTable
CREATE TABLE `SendCommand` (
    `id` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NULL,
    `isProcessed` BOOLEAN NOT NULL DEFAULT false,
    `idPaymentConfirmation` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SendCommand` ADD CONSTRAINT `SendCommand_idPaymentConfirmation_fkey` FOREIGN KEY (`idPaymentConfirmation`) REFERENCES `PaymentConfirmation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

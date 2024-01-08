/*
  Warnings:

  - Added the required column `idAproval` to the `CertApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `certapplication` ADD COLUMN `idAproval` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `CertApplication` ADD CONSTRAINT `CertApplication_idAproval_fkey` FOREIGN KEY (`idAproval`) REFERENCES `Approval`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

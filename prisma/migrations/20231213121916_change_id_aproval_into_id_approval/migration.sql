/*
  Warnings:

  - You are about to drop the column `idAproval` on the `certapplication` table. All the data in the column will be lost.
  - Added the required column `idApproval` to the `CertApplication` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `certapplication` DROP FOREIGN KEY `CertApplication_idAproval_fkey`;

-- AlterTable
ALTER TABLE `certapplication` DROP COLUMN `idAproval`,
    ADD COLUMN `idApproval` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `CertApplication` ADD CONSTRAINT `CertApplication_idApproval_fkey` FOREIGN KEY (`idApproval`) REFERENCES `Approval`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

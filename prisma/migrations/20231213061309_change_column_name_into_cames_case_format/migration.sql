/*
  Warnings:

  - You are about to drop the column `is_approved` on the `approval` table. All the data in the column will be lost.
  - You are about to drop the column `assesment_date` on the `certapplication` table. All the data in the column will be lost.
  - You are about to drop the column `id_cert_purpose` on the `certapplication` table. All the data in the column will be lost.
  - You are about to drop the column `is_processing` on the `certapplication` table. All the data in the column will be lost.
  - You are about to drop the column `receipt_date` on the `certapplication` table. All the data in the column will be lost.
  - You are about to drop the column `reference_number` on the `certapplication` table. All the data in the column will be lost.
  - You are about to drop the column `tuk_name` on the `certapplication` table. All the data in the column will be lost.
  - Added the required column `assesmentDate` to the `CertApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idCertPurpose` to the `CertApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isProcessing` to the `CertApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiptDate` to the `CertApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referenceNumber` to the `CertApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tukName` to the `CertApplication` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `certapplication` DROP FOREIGN KEY `CertApplication_id_cert_purpose_fkey`;

-- AlterTable
ALTER TABLE `approval` DROP COLUMN `is_approved`,
    ADD COLUMN `isApproved` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `certapplication` DROP COLUMN `assesment_date`,
    DROP COLUMN `id_cert_purpose`,
    DROP COLUMN `is_processing`,
    DROP COLUMN `receipt_date`,
    DROP COLUMN `reference_number`,
    DROP COLUMN `tuk_name`,
    ADD COLUMN `assesmentDate` VARCHAR(191) NOT NULL,
    ADD COLUMN `idCertPurpose` VARCHAR(191) NOT NULL,
    ADD COLUMN `isProcessing` BOOLEAN NOT NULL,
    ADD COLUMN `receiptDate` VARCHAR(191) NOT NULL,
    ADD COLUMN `referenceNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `tukName` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `CertApplication` ADD CONSTRAINT `CertApplication_idCertPurpose_fkey` FOREIGN KEY (`idCertPurpose`) REFERENCES `CertPurpose`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

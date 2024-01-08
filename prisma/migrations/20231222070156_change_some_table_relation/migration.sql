/*
  Warnings:

  - You are about to drop the column `idDirecturSign` on the `certmanager` table. All the data in the column will be lost.
  - You are about to drop the column `idCertStamp` on the `certscanner` table. All the data in the column will be lost.
  - You are about to drop the column `idCertManager` on the `certstamp` table. All the data in the column will be lost.
  - You are about to drop the column `idCertScanner` on the `certstorage` table. All the data in the column will be lost.
  - You are about to drop the column `idPrintCompensation` on the `directursign` table. All the data in the column will be lost.
  - You are about to drop the column `idCertStorage` on the `systemminers` table. All the data in the column will be lost.
  - Added the required column `idPrintBlank` to the `CertManager` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idPrintBlank` to the `CertScanner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idPrintBlank` to the `CertStamp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idPrintBlank` to the `CertStorage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idPrintBlank` to the `DirecturSign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idPrintBlank` to the `SystemMiners` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `certmanager` DROP FOREIGN KEY `CertManager_idDirecturSign_fkey`;

-- DropForeignKey
ALTER TABLE `certscanner` DROP FOREIGN KEY `CertScanner_idCertStamp_fkey`;

-- DropForeignKey
ALTER TABLE `certstamp` DROP FOREIGN KEY `CertStamp_idCertManager_fkey`;

-- DropForeignKey
ALTER TABLE `certstorage` DROP FOREIGN KEY `CertStorage_idCertScanner_fkey`;

-- DropForeignKey
ALTER TABLE `directursign` DROP FOREIGN KEY `DirecturSign_idPrintCompensation_fkey`;

-- DropForeignKey
ALTER TABLE `systemminers` DROP FOREIGN KEY `SystemMiners_idCertStorage_fkey`;

-- AlterTable
ALTER TABLE `certmanager` DROP COLUMN `idDirecturSign`,
    ADD COLUMN `idPrintBlank` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `certscanner` DROP COLUMN `idCertStamp`,
    ADD COLUMN `idPrintBlank` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `certstamp` DROP COLUMN `idCertManager`,
    ADD COLUMN `idPrintBlank` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `certstorage` DROP COLUMN `idCertScanner`,
    ADD COLUMN `idPrintBlank` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `directursign` DROP COLUMN `idPrintCompensation`,
    ADD COLUMN `idPrintBlank` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `systemminers` DROP COLUMN `idCertStorage`,
    ADD COLUMN `idPrintBlank` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `DirecturSign` ADD CONSTRAINT `DirecturSign_idPrintBlank_fkey` FOREIGN KEY (`idPrintBlank`) REFERENCES `PrintBlank`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CertManager` ADD CONSTRAINT `CertManager_idPrintBlank_fkey` FOREIGN KEY (`idPrintBlank`) REFERENCES `PrintBlank`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CertStamp` ADD CONSTRAINT `CertStamp_idPrintBlank_fkey` FOREIGN KEY (`idPrintBlank`) REFERENCES `PrintBlank`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CertScanner` ADD CONSTRAINT `CertScanner_idPrintBlank_fkey` FOREIGN KEY (`idPrintBlank`) REFERENCES `PrintBlank`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CertStorage` ADD CONSTRAINT `CertStorage_idPrintBlank_fkey` FOREIGN KEY (`idPrintBlank`) REFERENCES `PrintBlank`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SystemMiners` ADD CONSTRAINT `SystemMiners_idPrintBlank_fkey` FOREIGN KEY (`idPrintBlank`) REFERENCES `PrintBlank`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

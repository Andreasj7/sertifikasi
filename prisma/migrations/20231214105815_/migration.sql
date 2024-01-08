/*
  Warnings:

  - You are about to drop the column `isProcessing` on the `certapplication` table. All the data in the column will be lost.
  - You are about to drop the `sptasesor` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `certapplication` DROP COLUMN `isProcessing`,
    ADD COLUMN `isProcessed` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `sptasesor`;

-- CreateTable
CREATE TABLE `SptAssesor` (
    `id` VARCHAR(191) NOT NULL,
    `noSptAssesor` VARCHAR(191) NOT NULL,
    `assesorDate` VARCHAR(191) NOT NULL,
    `isProcessed` BOOLEAN NOT NULL DEFAULT false,
    `idCertApplication` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `SptAssesor_idCertApplication_key`(`idCertApplication`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SptAssesor` ADD CONSTRAINT `SptAssesor_idCertApplication_fkey` FOREIGN KEY (`idCertApplication`) REFERENCES `CertApplication`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

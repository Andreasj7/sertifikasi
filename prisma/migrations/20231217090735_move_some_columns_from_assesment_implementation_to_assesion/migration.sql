/*
  Warnings:

  - You are about to drop the column `idSchema` on the `assesmentimplementation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `assesmentimplementation` DROP FOREIGN KEY `AssesmentImplementation_idSchema_fkey`;

-- AlterTable
ALTER TABLE `assesion` ADD COLUMN `idSchema` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `assesmentimplementation` DROP COLUMN `idSchema`,
    ADD COLUMN `schemaId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `AssesmentImplementation` ADD CONSTRAINT `AssesmentImplementation_schemaId_fkey` FOREIGN KEY (`schemaId`) REFERENCES `Schema`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assesion` ADD CONSTRAINT `Assesion_idSchema_fkey` FOREIGN KEY (`idSchema`) REFERENCES `Schema`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

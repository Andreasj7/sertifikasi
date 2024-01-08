/*
  Warnings:

  - You are about to drop the column `idAssesion` on the `assesmentimplementation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `assesmentimplementation` DROP FOREIGN KEY `AssesmentImplementation_idAssesion_fkey`;

-- DropForeignKey
ALTER TABLE `assesmentschedule` DROP FOREIGN KEY `AssesmentSchedule_idAssesion_fkey`;

-- AlterTable
ALTER TABLE `assesmentimplementation` DROP COLUMN `idAssesion`;

-- AlterTable
ALTER TABLE `assesmentschedule` ADD COLUMN `assesionAssesmentImplId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `AssesmentImplAssesion` (
    `id` VARCHAR(191) NOT NULL,
    `idAssesmentImpl` VARCHAR(191) NOT NULL,
    `idAssesion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AssesmentImplAssesion` ADD CONSTRAINT `AssesmentImplAssesion_idAssesmentImpl_fkey` FOREIGN KEY (`idAssesmentImpl`) REFERENCES `AssesmentImplementation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssesmentImplAssesion` ADD CONSTRAINT `AssesmentImplAssesion_idAssesion_fkey` FOREIGN KEY (`idAssesion`) REFERENCES `Assesion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssesmentSchedule` ADD CONSTRAINT `AssesmentSchedule_idAssesion_fkey` FOREIGN KEY (`idAssesion`) REFERENCES `AssesmentImplAssesion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

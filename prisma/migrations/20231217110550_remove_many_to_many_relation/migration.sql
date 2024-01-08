/*
  Warnings:

  - You are about to drop the column `assesionAssesmentImplId` on the `assesmentschedule` table. All the data in the column will be lost.
  - You are about to drop the `assesmentimplassesion` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `idAssesmentImpl` to the `Assesion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `assesmentimplassesion` DROP FOREIGN KEY `AssesmentImplAssesion_idAssesion_fkey`;

-- DropForeignKey
ALTER TABLE `assesmentimplassesion` DROP FOREIGN KEY `AssesmentImplAssesion_idAssesmentImpl_fkey`;

-- DropForeignKey
ALTER TABLE `assesmentschedule` DROP FOREIGN KEY `AssesmentSchedule_idAssesion_fkey`;

-- AlterTable
ALTER TABLE `assesion` ADD COLUMN `idAssesmentImpl` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `assesmentschedule` DROP COLUMN `assesionAssesmentImplId`,
    MODIFY `idAssesion` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `assesmentimplassesion`;

-- AddForeignKey
ALTER TABLE `Assesion` ADD CONSTRAINT `Assesion_idAssesmentImpl_fkey` FOREIGN KEY (`idAssesmentImpl`) REFERENCES `AssesmentImplementation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssesmentSchedule` ADD CONSTRAINT `AssesmentSchedule_idAssesion_fkey` FOREIGN KEY (`idAssesion`) REFERENCES `Assesion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

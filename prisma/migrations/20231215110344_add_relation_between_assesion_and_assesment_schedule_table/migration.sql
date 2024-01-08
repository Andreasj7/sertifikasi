/*
  Warnings:

  - A unique constraint covering the columns `[idAssesion]` on the table `AssesmentSchedule` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idAssesion` to the `AssesmentSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `assesmentschedule` ADD COLUMN `idAssesion` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `AssesmentSchedule_idAssesion_key` ON `AssesmentSchedule`(`idAssesion`);

-- AddForeignKey
ALTER TABLE `AssesmentSchedule` ADD CONSTRAINT `AssesmentSchedule_idAssesion_fkey` FOREIGN KEY (`idAssesion`) REFERENCES `Assesion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

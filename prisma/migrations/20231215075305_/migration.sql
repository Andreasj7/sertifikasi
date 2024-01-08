/*
  Warnings:

  - A unique constraint covering the columns `[idAssesmentImpl]` on the table `Assesion` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idAssesmentImpl` to the `Assesion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `assesion` ADD COLUMN `idAssesmentImpl` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Assesion_idAssesmentImpl_key` ON `Assesion`(`idAssesmentImpl`);

-- AddForeignKey
ALTER TABLE `Assesion` ADD CONSTRAINT `Assesion_idAssesmentImpl_fkey` FOREIGN KEY (`idAssesmentImpl`) REFERENCES `AssesmentImplementation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

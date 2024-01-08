/*
  Warnings:

  - You are about to drop the column `idCertApplication` on the `minerbadist` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idMinerbaData]` on the table `MinerbaDist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idMinerbaData` to the `MinerbaDist` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `minerbadist` DROP FOREIGN KEY `MinerbaDist_idCertApplication_fkey`;

-- AlterTable
ALTER TABLE `minerbadist` DROP COLUMN `idCertApplication`,
    ADD COLUMN `idMinerbaData` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `MinerbaDist_idMinerbaData_key` ON `MinerbaDist`(`idMinerbaData`);

-- AddForeignKey
ALTER TABLE `MinerbaDist` ADD CONSTRAINT `MinerbaDist_idMinerbaData_fkey` FOREIGN KEY (`idMinerbaData`) REFERENCES `MinerbaData`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

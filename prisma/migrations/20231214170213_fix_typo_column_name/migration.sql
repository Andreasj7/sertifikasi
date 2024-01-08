/*
  Warnings:

  - You are about to drop the column `idSptAsesor` on the `assesmentimplementation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idSptAssesor]` on the table `AssesmentImplementation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idSptAssesor` to the `AssesmentImplementation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `assesmentimplementation` DROP FOREIGN KEY `AssesmentImplementation_idSptAsesor_fkey`;

-- AlterTable
ALTER TABLE `assesmentimplementation` DROP COLUMN `idSptAsesor`,
    ADD COLUMN `idSptAssesor` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `AssesmentImplementation_idSptAssesor_key` ON `AssesmentImplementation`(`idSptAssesor`);

-- AddForeignKey
ALTER TABLE `AssesmentImplementation` ADD CONSTRAINT `AssesmentImplementation_idSptAssesor_fkey` FOREIGN KEY (`idSptAssesor`) REFERENCES `SptAssesor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

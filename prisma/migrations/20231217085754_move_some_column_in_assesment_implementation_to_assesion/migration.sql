/*
  Warnings:

  - You are about to drop the column `asesorRecommendation` on the `assesmentimplementation` table. All the data in the column will be lost.
  - You are about to drop the column `assesionNumber` on the `assesmentimplementation` table. All the data in the column will be lost.
  - You are about to drop the column `assesorLead` on the `assesmentimplementation` table. All the data in the column will be lost.
  - You are about to drop the column `assesorName` on the `assesmentimplementation` table. All the data in the column will be lost.
  - You are about to drop the column `lspAdmin` on the `assesmentimplementation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `assesion` ADD COLUMN `asesorRecommendation` VARCHAR(191) NULL,
    ADD COLUMN `assesionNumber` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `assesorLead` VARCHAR(191) NULL,
    ADD COLUMN `assesorName` VARCHAR(191) NULL,
    ADD COLUMN `lspAdmin` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `assesmentimplementation` DROP COLUMN `asesorRecommendation`,
    DROP COLUMN `assesionNumber`,
    DROP COLUMN `assesorLead`,
    DROP COLUMN `assesorName`,
    DROP COLUMN `lspAdmin`;

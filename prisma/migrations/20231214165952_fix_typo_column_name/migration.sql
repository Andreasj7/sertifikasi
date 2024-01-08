/*
  Warnings:

  - You are about to drop the column `asesorLead` on the `assesmentimplementation` table. All the data in the column will be lost.
  - You are about to drop the column `asesorName` on the `assesmentimplementation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `assesmentimplementation` DROP COLUMN `asesorLead`,
    DROP COLUMN `asesorName`,
    ADD COLUMN `assesorLead` VARCHAR(191) NULL,
    ADD COLUMN `assesorName` VARCHAR(191) NULL;

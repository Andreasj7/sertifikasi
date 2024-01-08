/*
  Warnings:

  - You are about to drop the column `noDateBlank` on the `blankapplication` table. All the data in the column will be lost.
  - You are about to drop the column `noDateHandover` on the `blankapplication` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `blankapplication` DROP COLUMN `noDateBlank`,
    DROP COLUMN `noDateHandover`,
    ADD COLUMN `dateBlank` VARCHAR(191) NULL,
    ADD COLUMN `dateHandover` VARCHAR(191) NULL,
    ADD COLUMN `noBlank` VARCHAR(191) NULL,
    ADD COLUMN `noHandover` VARCHAR(191) NULL;

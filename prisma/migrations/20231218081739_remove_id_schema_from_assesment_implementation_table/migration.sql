/*
  Warnings:

  - You are about to drop the column `schemaId` on the `assesmentimplementation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `assesmentimplementation` DROP FOREIGN KEY `AssesmentImplementation_schemaId_fkey`;

-- AlterTable
ALTER TABLE `assesmentimplementation` DROP COLUMN `schemaId`;

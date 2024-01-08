/*
  Warnings:

  - You are about to drop the column `tanggal` on the `approval` table. All the data in the column will be lost.
  - Added the required column `date` to the `Approval` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `approval` DROP COLUMN `tanggal`,
    ADD COLUMN `date` VARCHAR(191) NOT NULL;

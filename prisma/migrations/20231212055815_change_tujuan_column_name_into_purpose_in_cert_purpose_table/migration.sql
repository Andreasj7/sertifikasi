/*
  Warnings:

  - You are about to drop the column `tujuan` on the `certpurpose` table. All the data in the column will be lost.
  - Added the required column `purpose` to the `CertPurpose` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `certpurpose` DROP COLUMN `tujuan`,
    ADD COLUMN `purpose` VARCHAR(191) NOT NULL;

/*
  Warnings:

  - You are about to drop the column `is_approve` on the `approval` table. All the data in the column will be lost.
  - Added the required column `is_approved` to the `Approval` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `approval` DROP COLUMN `is_approve`,
    ADD COLUMN `is_approved` BOOLEAN NOT NULL;

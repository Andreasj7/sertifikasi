/*
  Warnings:

  - A unique constraint covering the columns `[idApproval]` on the table `CertApplication` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `approval` MODIFY `date` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `CertApplication_idApproval_key` ON `CertApplication`(`idApproval`);

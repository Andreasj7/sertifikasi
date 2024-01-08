/*
  Warnings:

  - You are about to drop the `certificationpurposes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `certificationpurposes`;

-- CreateTable
CREATE TABLE `CertPurpose` (
    `id` VARCHAR(191) NOT NULL,
    `tujuan` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

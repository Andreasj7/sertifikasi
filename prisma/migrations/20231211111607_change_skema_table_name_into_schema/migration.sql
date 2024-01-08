/*
  Warnings:

  - You are about to drop the `skema` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tujuansertifikasi` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `skema`;

-- DropTable
DROP TABLE `tujuansertifikasi`;

-- CreateTable
CREATE TABLE `Schema` (
    `id` VARCHAR(191) NOT NULL,
    `skema` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Schema_skema_key`(`skema`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CertificationPurposes` (
    `id` VARCHAR(191) NOT NULL,
    `tujuan` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

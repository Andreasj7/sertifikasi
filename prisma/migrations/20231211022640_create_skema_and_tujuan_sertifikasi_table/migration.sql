-- CreateTable
CREATE TABLE `Skema` (
    `id` VARCHAR(191) NOT NULL,
    `skema` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TujuanSertifikasi` (
    `id` VARCHAR(191) NOT NULL,
    `tujuan` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

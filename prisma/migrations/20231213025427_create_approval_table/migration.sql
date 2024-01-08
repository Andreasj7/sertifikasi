-- CreateTable
CREATE TABLE `Approval` (
    `id` VARCHAR(191) NOT NULL,
    `tanggal` VARCHAR(191) NOT NULL,
    `is_approve` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

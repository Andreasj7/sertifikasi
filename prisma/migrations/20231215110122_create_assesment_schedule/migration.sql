-- CreateTable
CREATE TABLE `AssesmentSchedule` (
    `id` VARCHAR(191) NOT NULL,
    `schedule` VARCHAR(191) NULL,
    `isProcessed` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

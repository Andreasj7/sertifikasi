-- CreateTable
CREATE TABLE `TestResult` (
    `id` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NULL,
    `isProcessed` BOOLEAN NOT NULL,
    `idBaSk` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TestResult_idBaSk_key`(`idBaSk`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TestResult` ADD CONSTRAINT `TestResult_idBaSk_fkey` FOREIGN KEY (`idBaSk`) REFERENCES `BaSk`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

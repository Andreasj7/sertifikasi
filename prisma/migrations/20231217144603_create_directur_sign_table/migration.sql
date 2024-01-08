-- CreateTable
CREATE TABLE `DirecturSign` (
    `id` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NULL,
    `isProcessed` BOOLEAN NOT NULL DEFAULT false,
    `idPrintCompensation` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DirecturSign` ADD CONSTRAINT `DirecturSign_idPrintCompensation_fkey` FOREIGN KEY (`idPrintCompensation`) REFERENCES `PrintCompensation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

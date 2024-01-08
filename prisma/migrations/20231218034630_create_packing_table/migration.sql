-- CreateTable
CREATE TABLE `Packing` (
    `id` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NULL,
    `isProcessed` BOOLEAN NOT NULL DEFAULT false,
    `idSendCommand` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Packing` ADD CONSTRAINT `Packing_idSendCommand_fkey` FOREIGN KEY (`idSendCommand`) REFERENCES `SendCommand`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

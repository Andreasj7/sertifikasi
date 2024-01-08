-- CreateTable
CREATE TABLE `TukConfirmation` (
    `id` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NULL,
    `isProcessed` BOOLEAN NOT NULL DEFAULT false,
    `idReceipt` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TukConfirmation` ADD CONSTRAINT `TukConfirmation_idReceipt_fkey` FOREIGN KEY (`idReceipt`) REFERENCES `Receipt`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE `PaymentConfirmation` (
    `id` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NULL,
    `proofUrl` VARCHAR(191) NULL,
    `isProcessed` BOOLEAN NOT NULL DEFAULT false,
    `idSystemMiners` VARCHAR(191) NOT NULL,
    `certStorageId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PaymentConfirmation` ADD CONSTRAINT `PaymentConfirmation_idSystemMiners_fkey` FOREIGN KEY (`idSystemMiners`) REFERENCES `SystemMiners`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaymentConfirmation` ADD CONSTRAINT `PaymentConfirmation_certStorageId_fkey` FOREIGN KEY (`certStorageId`) REFERENCES `CertStorage`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

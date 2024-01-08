-- CreateTable
CREATE TABLE `CertDist` (
    `id` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NULL,
    `isProcessed` BOOLEAN NOT NULL DEFAULT false,
    `idCardDist` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CertDist` ADD CONSTRAINT `CertDist_idCardDist_fkey` FOREIGN KEY (`idCardDist`) REFERENCES `CardDist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

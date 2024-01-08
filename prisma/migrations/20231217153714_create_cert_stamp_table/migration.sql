-- CreateTable
CREATE TABLE `CertStamp` (
    `id` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NULL,
    `isProcessed` BOOLEAN NOT NULL DEFAULT false,
    `idCertManager` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CertStamp` ADD CONSTRAINT `CertStamp_idCertManager_fkey` FOREIGN KEY (`idCertManager`) REFERENCES `CertManager`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

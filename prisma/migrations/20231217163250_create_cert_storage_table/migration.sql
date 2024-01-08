-- CreateTable
CREATE TABLE `CertStorage` (
    `id` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NULL,
    `isProcessed` BOOLEAN NOT NULL DEFAULT false,
    `idCertScanner` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CertStorage` ADD CONSTRAINT `CertStorage_idCertScanner_fkey` FOREIGN KEY (`idCertScanner`) REFERENCES `CertScanner`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

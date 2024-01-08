-- CreateTable
CREATE TABLE `SystemMiners` (
    `id` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NULL,
    `isProcessed` BOOLEAN NOT NULL DEFAULT false,
    `idCertStorage` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SystemMiners` ADD CONSTRAINT `SystemMiners_idCertStorage_fkey` FOREIGN KEY (`idCertStorage`) REFERENCES `CertStorage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

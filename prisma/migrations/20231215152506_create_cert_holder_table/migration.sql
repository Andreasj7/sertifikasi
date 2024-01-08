-- CreateTable
CREATE TABLE `CertHolder` (
    `id` VARCHAR(191) NOT NULL,
    `certHolder` VARCHAR(191) NULL,
    `isProcessed` BOOLEAN NOT NULL DEFAULT false,
    `idCertApplication` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `CertHolder_idCertApplication_key`(`idCertApplication`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CertHolder` ADD CONSTRAINT `CertHolder_idCertApplication_fkey` FOREIGN KEY (`idCertApplication`) REFERENCES `CertApplication`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

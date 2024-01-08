-- CreateTable
CREATE TABLE `CertScanner` (
    `id` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NULL,
    `isProcessed` BOOLEAN NOT NULL DEFAULT false,
    `idCertStamp` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CertScanner` ADD CONSTRAINT `CertScanner_idCertStamp_fkey` FOREIGN KEY (`idCertStamp`) REFERENCES `CertStamp`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

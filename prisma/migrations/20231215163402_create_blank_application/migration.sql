-- CreateTable
CREATE TABLE `BlankApplication` (
    `id` VARCHAR(191) NOT NULL,
    `noDateBlank` VARCHAR(191) NULL,
    `noDateHandover` VARCHAR(191) NULL,
    `blankReceiptDate` VARCHAR(191) NULL,
    `isProcessed` BOOLEAN NOT NULL DEFAULT false,
    `idCertApplication` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `BlankApplication_idCertApplication_key`(`idCertApplication`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BlankApplication` ADD CONSTRAINT `BlankApplication_idCertApplication_fkey` FOREIGN KEY (`idCertApplication`) REFERENCES `CertApplication`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

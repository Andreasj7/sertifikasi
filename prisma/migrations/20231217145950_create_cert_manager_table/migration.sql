-- CreateTable
CREATE TABLE `CertManager` (
    `id` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NULL,
    `isProcessed` BOOLEAN NOT NULL DEFAULT false,
    `idDirecturSign` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CertManager` ADD CONSTRAINT `CertManager_idDirecturSign_fkey` FOREIGN KEY (`idDirecturSign`) REFERENCES `DirecturSign`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

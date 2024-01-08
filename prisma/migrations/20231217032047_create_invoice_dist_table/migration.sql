-- AlterTable
ALTER TABLE `asstestresult` ADD COLUMN `invoiceDistId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `InvoiceDist` (
    `id` VARCHAR(191) NOT NULL,
    `invoiceDate` VARCHAR(191) NULL,
    `isProcessed` BOOLEAN NOT NULL DEFAULT false,
    `idCertApplication` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `InvoiceDist_idCertApplication_key`(`idCertApplication`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AssTestResult` ADD CONSTRAINT `AssTestResult_invoiceDistId_fkey` FOREIGN KEY (`invoiceDistId`) REFERENCES `InvoiceDist`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InvoiceDist` ADD CONSTRAINT `InvoiceDist_idCertApplication_fkey` FOREIGN KEY (`idCertApplication`) REFERENCES `CertApplication`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

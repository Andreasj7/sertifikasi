-- CreateTable
CREATE TABLE `MinerbaData` (
    `id` VARCHAR(191) NOT NULL,
    `no` VARCHAR(191) NULL,
    `date` VARCHAR(191) NULL,
    `idCertApplication` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `MinerbaData_idCertApplication_key`(`idCertApplication`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MinerbaDist` (
    `id` VARCHAR(191) NOT NULL,
    `no` VARCHAR(191) NULL,
    `date` VARCHAR(191) NULL,
    `idCertApplication` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `MinerbaDist_idCertApplication_key`(`idCertApplication`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MinerbaData` ADD CONSTRAINT `MinerbaData_idCertApplication_fkey` FOREIGN KEY (`idCertApplication`) REFERENCES `CertApplication`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MinerbaDist` ADD CONSTRAINT `MinerbaDist_idCertApplication_fkey` FOREIGN KEY (`idCertApplication`) REFERENCES `CertApplication`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

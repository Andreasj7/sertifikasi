-- CreateTable
CREATE TABLE `PrintAssesion` (
    `id` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NULL,
    `idAssTestResult` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PrintBlank` (
    `id` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NULL,
    `idPrintAssesion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PrintCompensation` (
    `id` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NULL,
    `idPrintBlank` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PrintAssesion` ADD CONSTRAINT `PrintAssesion_idAssTestResult_fkey` FOREIGN KEY (`idAssTestResult`) REFERENCES `AssTestResult`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrintBlank` ADD CONSTRAINT `PrintBlank_idPrintAssesion_fkey` FOREIGN KEY (`idPrintAssesion`) REFERENCES `PrintAssesion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrintCompensation` ADD CONSTRAINT `PrintCompensation_idPrintBlank_fkey` FOREIGN KEY (`idPrintBlank`) REFERENCES `PrintBlank`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

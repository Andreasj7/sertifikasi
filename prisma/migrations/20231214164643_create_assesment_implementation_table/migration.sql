-- CreateTable
CREATE TABLE `AssesmentImplementation` (
    `id` VARCHAR(191) NOT NULL,
    `lspAdmin` VARCHAR(191) NULL,
    `asesorLead` VARCHAR(191) NULL,
    `asesorName` VARCHAR(191) NULL,
    `assesionNumber` INTEGER NOT NULL,
    `asesorRecommendation` VARCHAR(191) NULL,
    `isProcessed` BOOLEAN NOT NULL DEFAULT false,
    `idSchema` VARCHAR(191) NOT NULL,
    `idSptAsesor` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `AssesmentImplementation_idSptAsesor_key`(`idSptAsesor`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AssesmentImplementation` ADD CONSTRAINT `AssesmentImplementation_idSchema_fkey` FOREIGN KEY (`idSchema`) REFERENCES `Schema`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssesmentImplementation` ADD CONSTRAINT `AssesmentImplementation_idSptAsesor_fkey` FOREIGN KEY (`idSptAsesor`) REFERENCES `SptAssesor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

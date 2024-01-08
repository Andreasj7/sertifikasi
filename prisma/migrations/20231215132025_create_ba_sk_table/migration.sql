-- CreateTable
CREATE TABLE `BaSk` (
    `id` VARCHAR(191) NOT NULL,
    `noBaDate` VARCHAR(191) NULL,
    `noSkDate` VARCHAR(191) NULL,
    `plenoDate` VARCHAR(191) NULL,
    `baDate` VARCHAR(191) NULL,
    `skDate` VARCHAR(191) NULL,
    `isProcessed` BOOLEAN NOT NULL DEFAULT false,
    `idAssesmentSchedule` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `BaSk_idAssesmentSchedule_key`(`idAssesmentSchedule`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BaSk` ADD CONSTRAINT `BaSk_idAssesmentSchedule_fkey` FOREIGN KEY (`idAssesmentSchedule`) REFERENCES `AssesmentSchedule`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

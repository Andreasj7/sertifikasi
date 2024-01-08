-- CreateTable
CREATE TABLE `CardDist` (
    `id` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NULL,
    `isProcessed` BOOLEAN NOT NULL DEFAULT false,
    `idPacking` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CardDist` ADD CONSTRAINT `CardDist_idPacking_fkey` FOREIGN KEY (`idPacking`) REFERENCES `Packing`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

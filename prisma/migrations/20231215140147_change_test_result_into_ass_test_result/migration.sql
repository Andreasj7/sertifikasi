/*
  Warnings:

  - You are about to drop the `testresult` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `testresult` DROP FOREIGN KEY `TestResult_idBaSk_fkey`;

-- DropTable
DROP TABLE `testresult`;

-- CreateTable
CREATE TABLE `AssTestResult` (
    `id` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NULL,
    `isProcessed` BOOLEAN NOT NULL,
    `idBaSk` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `AssTestResult_idBaSk_key`(`idBaSk`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AssTestResult` ADD CONSTRAINT `AssTestResult_idBaSk_fkey` FOREIGN KEY (`idBaSk`) REFERENCES `BaSk`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

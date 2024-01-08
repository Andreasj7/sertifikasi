-- AlterTable
ALTER TABLE `printassesion` ADD COLUMN `isProcessed` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `printblank` ADD COLUMN `isProcessed` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `printcompensation` ADD COLUMN `isProcessed` BOOLEAN NOT NULL DEFAULT false;

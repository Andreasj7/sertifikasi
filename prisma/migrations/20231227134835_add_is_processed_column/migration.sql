-- AlterTable
ALTER TABLE `minerbadata` ADD COLUMN `isProcessed` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `minerbadist` ADD COLUMN `isProcessed` BOOLEAN NOT NULL DEFAULT false;

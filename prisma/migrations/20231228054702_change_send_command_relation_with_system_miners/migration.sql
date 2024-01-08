/*
  Warnings:

  - You are about to drop the column `idPaymentConfirmation` on the `sendcommand` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idSystemMiners]` on the table `SendCommand` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idSystemMiners` to the `SendCommand` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `sendcommand` DROP FOREIGN KEY `SendCommand_idPaymentConfirmation_fkey`;

-- AlterTable
ALTER TABLE `sendcommand` DROP COLUMN `idPaymentConfirmation`,
    ADD COLUMN `idSystemMiners` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `SendCommand_idSystemMiners_key` ON `SendCommand`(`idSystemMiners`);

-- AddForeignKey
ALTER TABLE `SendCommand` ADD CONSTRAINT `SendCommand_idSystemMiners_fkey` FOREIGN KEY (`idSystemMiners`) REFERENCES `SystemMiners`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

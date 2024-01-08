/*
  Warnings:

  - A unique constraint covering the columns `[idPacking]` on the table `CardDist` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idCardDist]` on the table `CertDist` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idPrintBlank]` on the table `CertManager` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idPrintBlank]` on the table `CertScanner` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idPrintBlank]` on the table `CertStamp` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idPrintBlank]` on the table `CertStorage` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idPrintBlank]` on the table `DirecturSign` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idSendCommand]` on the table `Packing` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idSystemMiners]` on the table `PaymentConfirmation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idAssTestResult]` on the table `PrintAssesion` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idPrintAssesion]` on the table `PrintBlank` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idPrintBlank]` on the table `PrintCompensation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idCertDist]` on the table `Receipt` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idPaymentConfirmation]` on the table `SendCommand` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idPrintBlank]` on the table `SystemMiners` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idReceipt]` on the table `TukConfirmation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `CardDist_idPacking_key` ON `CardDist`(`idPacking`);

-- CreateIndex
CREATE UNIQUE INDEX `CertDist_idCardDist_key` ON `CertDist`(`idCardDist`);

-- CreateIndex
CREATE UNIQUE INDEX `CertManager_idPrintBlank_key` ON `CertManager`(`idPrintBlank`);

-- CreateIndex
CREATE UNIQUE INDEX `CertScanner_idPrintBlank_key` ON `CertScanner`(`idPrintBlank`);

-- CreateIndex
CREATE UNIQUE INDEX `CertStamp_idPrintBlank_key` ON `CertStamp`(`idPrintBlank`);

-- CreateIndex
CREATE UNIQUE INDEX `CertStorage_idPrintBlank_key` ON `CertStorage`(`idPrintBlank`);

-- CreateIndex
CREATE UNIQUE INDEX `DirecturSign_idPrintBlank_key` ON `DirecturSign`(`idPrintBlank`);

-- CreateIndex
CREATE UNIQUE INDEX `Packing_idSendCommand_key` ON `Packing`(`idSendCommand`);

-- CreateIndex
CREATE UNIQUE INDEX `PaymentConfirmation_idSystemMiners_key` ON `PaymentConfirmation`(`idSystemMiners`);

-- CreateIndex
CREATE UNIQUE INDEX `PrintAssesion_idAssTestResult_key` ON `PrintAssesion`(`idAssTestResult`);

-- CreateIndex
CREATE UNIQUE INDEX `PrintBlank_idPrintAssesion_key` ON `PrintBlank`(`idPrintAssesion`);

-- CreateIndex
CREATE UNIQUE INDEX `PrintCompensation_idPrintBlank_key` ON `PrintCompensation`(`idPrintBlank`);

-- CreateIndex
CREATE UNIQUE INDEX `Receipt_idCertDist_key` ON `Receipt`(`idCertDist`);

-- CreateIndex
CREATE UNIQUE INDEX `SendCommand_idPaymentConfirmation_key` ON `SendCommand`(`idPaymentConfirmation`);

-- CreateIndex
CREATE UNIQUE INDEX `SystemMiners_idPrintBlank_key` ON `SystemMiners`(`idPrintBlank`);

-- CreateIndex
CREATE UNIQUE INDEX `TukConfirmation_idReceipt_key` ON `TukConfirmation`(`idReceipt`);

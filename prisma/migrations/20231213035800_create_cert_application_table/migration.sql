-- CreateTable
CREATE TABLE `CertApplication` (
    `id` VARCHAR(191) NOT NULL,
    `tuk_name` VARCHAR(191) NOT NULL,
    `assesment_date` VARCHAR(191) NOT NULL,
    `reference_number` VARCHAR(191) NOT NULL,
    `receipt_date` VARCHAR(191) NOT NULL,
    `id_cert_purpose` VARCHAR(191) NOT NULL,
    `is_processing` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CertApplication` ADD CONSTRAINT `CertApplication_id_cert_purpose_fkey` FOREIGN KEY (`id_cert_purpose`) REFERENCES `CertPurpose`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

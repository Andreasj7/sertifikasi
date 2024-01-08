-- CreateTable
CREATE TABLE `Authentication` (
    `token` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Authentication_token_key`(`token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

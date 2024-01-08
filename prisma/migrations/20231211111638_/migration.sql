/*
  Warnings:

  - You are about to drop the column `skema` on the `schema` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[schema]` on the table `Schema` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `schema` to the `Schema` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Schema_skema_key` ON `schema`;

-- AlterTable
ALTER TABLE `schema` DROP COLUMN `skema`,
    ADD COLUMN `schema` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Schema_schema_key` ON `Schema`(`schema`);

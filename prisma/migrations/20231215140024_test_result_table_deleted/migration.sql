/*
  Warnings:

  - You are about to drop the `testresult` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `testresult` DROP FOREIGN KEY `TestResult_idBaSk_fkey`;

-- DropTable
DROP TABLE `testresult`;

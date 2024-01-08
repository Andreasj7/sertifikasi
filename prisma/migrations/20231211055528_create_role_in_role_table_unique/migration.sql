/*
  Warnings:

  - A unique constraint covering the columns `[role]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[skema]` on the table `Skema` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Role_role_key` ON `Role`(`role`);

-- CreateIndex
CREATE UNIQUE INDEX `Skema_skema_key` ON `Skema`(`skema`);

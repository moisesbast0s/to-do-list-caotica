/*
  Warnings:

  - You are about to drop the column `criadoEm` on the `tokenrecuperacao` table. All the data in the column will be lost.
  - You are about to drop the column `expiraEm` on the `tokenrecuperacao` table. All the data in the column will be lost.
  - Added the required column `validade` to the `TokenRecuperacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tokenrecuperacao` DROP COLUMN `criadoEm`,
    DROP COLUMN `expiraEm`,
    ADD COLUMN `validade` DATETIME(3) NOT NULL;

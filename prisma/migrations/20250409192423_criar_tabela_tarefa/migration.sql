/*
  Warnings:

  - You are about to drop the column `concluido` on the `tarefa` table. All the data in the column will be lost.
  - You are about to drop the column `conteudo` on the `tarefa` table. All the data in the column will be lost.
  - Added the required column `nome` to the `Tarefa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tarefa` DROP COLUMN `concluido`,
    DROP COLUMN `conteudo`,
    ADD COLUMN `concluida` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `nome` VARCHAR(191) NOT NULL;

/*
  Warnings:

  - You are about to drop the column `concluida` on the `tarefa` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `tarefa` table. All the data in the column will be lost.
  - Added the required column `conteudo` to the `Tarefa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tarefa` DROP COLUMN `concluida`,
    DROP COLUMN `nome`,
    ADD COLUMN `concluido` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `conteudo` VARCHAR(191) NOT NULL;

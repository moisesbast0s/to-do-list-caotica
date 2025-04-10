/*
  Warnings:

  - You are about to drop the column `criadoEm` on the `usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `criadoEm`;

-- CreateTable
CREATE TABLE `Tarefa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `conteudo` VARCHAR(191) NOT NULL,
    `dataHora` DATETIME(3) NOT NULL,
    `concluido` BOOLEAN NOT NULL DEFAULT false,
    `usuarioId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tarefa` ADD CONSTRAINT `Tarefa_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

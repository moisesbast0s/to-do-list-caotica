-- CreateTable
CREATE TABLE `TokenRecuperacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expiraEm` DATETIME(3) NOT NULL,
    `usuarioId` INTEGER NOT NULL,

    UNIQUE INDEX `TokenRecuperacao_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TokenRecuperacao` ADD CONSTRAINT `TokenRecuperacao_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

import { prisma } from '@/lib/prisma'

export async function registrarAuditoria({ userId, action, target }) {
  try {
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        target,
      },
    })
  } catch (error) {
    console.error('Erro ao registrar auditoria:', error)
  }
}

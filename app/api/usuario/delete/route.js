import { getUsuarioAutenticado } from '@/utils/auth'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function DELETE() {
  const usuario = await getUsuarioAutenticado()
  if (!usuario) return NextResponse.json({ message: 'Não autorizado' }, { status: 401 })

  await prisma.tarefa.deleteMany({ where: { usuarioId: usuario.id } })
  await prisma.usuario.delete({ where: { id: usuario.id } })

  return NextResponse.json({ message: 'Usuário excluído' })
}

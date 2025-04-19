import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function DELETE(request, context) {
  const { id } = await context.params

  try {
    await prisma.tarefa.delete({
      where: { id: parseInt(id) },
    })

    return NextResponse.json({ message: 'Tarefa excluída com sucesso' })
  } catch (error) {
    console.error('Erro ao excluir tarefa:', error)
    return NextResponse.json({ message: 'Erro ao excluir tarefa' }, { status: 500 })
  }
}

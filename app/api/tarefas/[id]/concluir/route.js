import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function PUT(_, { params }) {
  const { id } = params

  const tarefa = await prisma.tarefa.findUnique({ where: { id: parseInt(id) } })
  if (!tarefa) {
    return NextResponse.json({ message: 'Tarefa não encontrada' }, { status: 404 })
  }

  const tarefaAtualizada = await prisma.tarefa.update({
    where: { id: parseInt(id) },
    data: { concluido: !tarefa.concluido },
  })

  return NextResponse.json(tarefaAtualizada)
}

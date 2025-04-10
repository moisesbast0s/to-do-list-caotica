import { getUsuarioAutenticado } from '@/utils/auth'
import prisma from '@/lib/prisma'

export async function PUT(request, { params }) {
  const usuario = await getUsuarioAutenticado()
  if (!usuario) {
    return new Response(JSON.stringify({ message: 'Não autorizado' }), { status: 401 })
  }

  const { id } = params
  const { conteudo, dataHora } = await request.json()

  if (!conteudo || !dataHora) {
    return new Response(JSON.stringify({ message: 'Dados inválidos' }), { status: 400 })
  }

  try {
    const tarefa = await prisma.tarefa.update({
      where: {
        id: parseInt(id),
        usuarioId: usuario.id,
      },
      data: {
        conteudo,
        dataHora: new Date(dataHora),
      },
    })

    return new Response(JSON.stringify(tarefa), { status: 200 })
  } catch (error) {
    console.error('Erro ao editar tarefa:', error)
    return new Response(JSON.stringify({ message: 'Erro ao editar tarefa' }), { status: 500 })
  }
}

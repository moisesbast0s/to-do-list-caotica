import { getUsuarioAutenticado } from '@/utils/auth'
import prisma from '@/lib/prisma'

export async function POST(req) {
  const usuario = await getUsuarioAutenticado(req.headers)

  if (!usuario) {
    return new Response(JSON.stringify({ message: 'Não autorizado' }), {
      status: 401,
    })
  }

  const { conteudo, dataHora } = await req.json()

  const novaTarefa = await prisma.tarefa.create({
    data: {
      conteudo,
      dataHora: new Date(dataHora),
      usuarioId: usuario.id,
    },
  })


  await prisma.auditLog.create({
    data: {
      userId: usuario.id,
      action: 'CREATE',
      target: `Tarefa ID ${novaTarefa.id}`,
    },
    
  })
  

  return new Response(JSON.stringify(novaTarefa), { status: 201 })
}

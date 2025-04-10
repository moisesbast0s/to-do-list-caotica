import { getUsuarioAutenticado } from '@/utils/auth'
import prisma from '@/lib/prisma'

export async function GET() {
  const usuario = await getUsuarioAutenticado()

  if (!usuario) {
    return new Response(JSON.stringify({ message: 'Não autorizado' }), {
      status: 401,
    })
  }

  const tarefas = await prisma.tarefa.findMany({
    where: { usuarioId: usuario.id },
    orderBy: { createdAt: 'desc' },
  })

  return new Response(JSON.stringify(tarefas), { status: 200 })
}

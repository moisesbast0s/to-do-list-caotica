import { getUsuarioAutenticado } from '@/utils/auth'
import prisma from '@/lib/prisma'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = cookies() // <- precisa estar DENTRO da função
  const usuario = await getUsuarioAutenticado(cookieStore)

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

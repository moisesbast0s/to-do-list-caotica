import { getUsuarioAutenticado } from '@/utils/auth'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = cookies()
  const usuario = await getUsuarioAutenticado(cookieStore)

  if (!usuario) {
    return new Response(JSON.stringify({ message: 'Não autorizado' }), {
      status: 401,
    })
  }

  return new Response(JSON.stringify(usuario), { status: 200 })
}

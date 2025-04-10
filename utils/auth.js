import { cookies } from 'next/headers'
import { verify } from 'jsonwebtoken'
import prisma from '@/lib/prisma'

export async function getUsuarioAutenticado() {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value

    if (!token) return null

    const decoded = verify(token, process.env.JWT_SECRET)

    const usuario = await prisma.usuario.findUnique({
      where: { id: decoded.id },
    })

    return usuario
  } catch (error) {
    console.error('Erro ao verificar token:', error)
    return null
  }
}

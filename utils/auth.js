import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'

const prisma = new PrismaClient()

export async function getUsuarioAutenticado() {
  const cookieStore = await cookies() // ✅ AGORA COM AWAIT
  const token = cookieStore.get('token')?.value

  if (!token) return null

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const usuario = await prisma.usuario.findUnique({
      where: { id: decoded.id },
    })

    return usuario
  } catch (error) {
    console.error('Erro ao verificar token:', error)
    return null
  }
}

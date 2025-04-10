import { getUsuarioAutenticado } from '@/utils/auth'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const usuario = await getUsuarioAutenticado()
  if (!usuario) return NextResponse.json({ message: 'Não autorizado' }, { status: 401 })

  return NextResponse.json({ nome: usuario.nome, email: usuario.email })
}

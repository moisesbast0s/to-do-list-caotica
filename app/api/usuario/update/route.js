import { getUsuarioAutenticado } from '@/utils/auth'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function PUT(req) {
  const usuario = await getUsuarioAutenticado()
  if (!usuario) return NextResponse.json({ message: 'Não autorizado' }, { status: 401 })

  const { nome, email, senha } = await req.json()
  const dadosAtualizados = { nome, email }

  if (senha) {
    dadosAtualizados.senha = await bcrypt.hash(senha, 10)
  }

  await prisma.usuario.update({
    where: { id: usuario.id },
    data: dadosAtualizados,
  })

  return NextResponse.json({ message: 'Perfil atualizado' })
}

import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req) {
  const { token, senha } = await req.json()

  const tokenRec = await prisma.tokenRecuperacao.findUnique({ where: { token } })

  if (!tokenRec || tokenRec.validade < new Date()) {
    return NextResponse.json({ erro: 'Token inválido ou expirado' }, { status: 400 })
  }

  const senhaCriptografada = await bcrypt.hash(senha, 10)

  await prisma.usuario.update({
    where: { id: tokenRec.usuarioId },
    data: { senha: senhaCriptografada },
  })

  await prisma.tokenRecuperacao.delete({ where: { token } })

  return NextResponse.json({ mensagem: 'Senha redefinida com sucesso' })
}

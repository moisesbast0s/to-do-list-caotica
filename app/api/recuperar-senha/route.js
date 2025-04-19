import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import nodemailer from 'nodemailer'
import crypto from 'crypto'

export async function POST(req) {
  const { email } = await req.json()

  const usuario = await prisma.usuario.findUnique({ where: { email } })
  if (!usuario) {
    return NextResponse.json({ erro: 'Usuário não encontrado' }, { status: 404 })
  }

  // Gera token e validade
  const token = crypto.randomBytes(32).toString('hex')
  const validade = new Date(Date.now() + 15 * 60 * 1000) // 15 minutos

  // Remove tokens antigos e salva o novo
  await prisma.tokenRecuperacao.deleteMany({ where: { usuarioId: usuario.id } })
  await prisma.tokenRecuperacao.create({
    data: {
      token,
      usuarioId: usuario.id,
      validade,
    },
  })

  const link = `http://localhost:3000/redefinir-senha?token=${token}`

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS,
    },
  })

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Recuperação de Senha - To-Do List',
    html: `
      <p>Olá, ${usuario.nome || 'usuário'}!</p>
      <p>Clique no link abaixo para redefinir sua senha:</p>
      <a href="${link}">${link}</a>
      <p><strong>Este link é válido por 15 minutos.</strong></p>
    `,
  })

  return NextResponse.json({ mensagem: 'Email enviado com sucesso' })
}

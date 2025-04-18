import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const prisma = new PrismaClient()

export async function POST(req) {
  const { email, senha } = await req.json()

  try {
    const user = await prisma.usuario.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json({ message: 'Usuário não encontrado' }, { status: 401 })
    }

    const passwordMatch = await bcrypt.compare(senha, user.senha)

    if (!passwordMatch) {
      return NextResponse.json({ message: 'Senha incorreta' }, { status: 401 })
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    })

    // Cria a resposta
    const response = NextResponse.json({ message: 'Login realizado com sucesso!' })

    // ✅ Define o cookie corretamente na resposta
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 dia
    })

    return response
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Erro ao fazer login' }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma' // ✅ Corrigida aqui
import bcrypt from 'bcryptjs'

export async function POST(req) {
  try {
    const { nome, email, senha } = await req.json()

    // Verifica se o usuário já existe
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email },
    })

    if (usuarioExistente) {
      return NextResponse.json({ message: 'Usuário já cadastrado' }, { status: 400 })
    }

    // Criptografa a senha
    const senhaCriptografada = await bcrypt.hash(senha, 10)

    // Cria o usuário no banco de dados
    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: senhaCriptografada,
      },
    })

    return NextResponse.json(novoUsuario, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Erro no cadastro' }, { status: 500 })
  }
}

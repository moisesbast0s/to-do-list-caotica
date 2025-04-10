import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUsuarioAutenticado } from '@/utils/auth'
import bcrypt from 'bcryptjs'

// Handler GET - Retorna os dados do usuário autenticado
export async function GET(req) {
  try {
    const usuario = await getUsuarioAutenticado(req.headers)

    if (!usuario) {
      return NextResponse.json({ message: 'Usuário não autenticado' }, { status: 401 })
    }

    const usuarioEncontrado = await prisma.usuario.findUnique({
      where: { id: usuario.id },
      select: {
        id: true,
        nome: true,
        email: true,
      },
    })

    return NextResponse.json(usuarioEncontrado)
  } catch (error) {
    console.error('Erro ao buscar perfil:', error)
    return NextResponse.json({ message: 'Erro ao buscar perfil' }, { status: 500 })
  }
}

// Handler PUT - Atualiza o perfil
export async function PUT(req) {
  try {
    const usuario = await getUsuarioAutenticado(req.headers)
    if (!usuario) {
      return NextResponse.json({ message: 'Usuário não autenticado' }, { status: 401 })
    }

    const { nome, email, senha } = await req.json()

    const dataAtualizada = {}
    if (nome) dataAtualizada.nome = nome
    if (email) dataAtualizada.email = email
    if (senha) {
      const senhaCriptografada = await bcrypt.hash(senha, 10)
      dataAtualizada.senha = senhaCriptografada
    }

    const usuarioAtualizado = await prisma.usuario.update({
      where: { id: usuario.id },
      data: dataAtualizada,
    })

    return NextResponse.json(usuarioAtualizado)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Erro ao atualizar perfil' }, { status: 500 })
  }
}

// Handler DELETE - Exclui o usuário
export async function DELETE(request) {
    const usuario = await getUsuarioAutenticado()
  
    if (!usuario) {
      return new Response(JSON.stringify({ erro: 'Usuário não autenticado' }), { status: 401 })
    }
  
    try {
      // Primeiro: deletar as tarefas do usuário
      await prisma.tarefa.deleteMany({
        where: {
          usuarioId: usuario.id
        }
      })
  
      // Depois: deletar o próprio usuário
      await prisma.usuario.delete({
        where: {
          id: usuario.id
        }
      })
  
      return new Response(JSON.stringify({ mensagem: 'Conta excluída com sucesso' }), { status: 200 })
  
    } catch (error) {
      console.error(error)
      return new Response(JSON.stringify({ erro: 'Erro ao excluir conta' }), { status: 500 })
    }
  }
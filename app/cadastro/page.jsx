'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import './cadastro.css'
import morcegoImg from '/public/morcego.webp'

export default function CadastroPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  })

  const [erro, setErro] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (form.senha !== form.confirmarSenha) {
      setErro('As senhas não coincidem.')
      return
    }

    const res = await fetch('/api/cadastro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: form.nome,
        email: form.email,
        senha: form.senha
      }),
    })

    const data = await res.json()

    if (res.ok) {
      alert('Conta criada com sucesso!')
      router.push('/login')
    } else {
      setErro(data.message || 'Erro ao criar conta.')
    }
  }

  return (
    <div className="login-wrapper">
  <div className="login-container">
    <div className="login-image">
      <Image src={morcegoImg} alt="Morcego Roxo" width={400} height={400} />
    </div>
    <div className="register-form">
      <h2>Cadastro</h2>

      {erro && <p className="error-message">{erro}</p>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome</label>
        <input
          type="text"
          id="nome"
          name="nome"
          className="form-input"
          value={form.nome}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-input"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="senha">Senha</label>
        <input
          type="password"
          id="senha"
          name="senha"
          className="form-input"
          value={form.senha}
          onChange={handleChange}
          required
        />

        <label htmlFor="confirmarSenha">Confirmar senha</label>
        <input
          type="password"
          id="confirmarSenha"
          name="confirmarSenha"
          className="form-input"
          value={form.confirmarSenha}
          onChange={handleChange}
          required
        />

        <button type="submit" className="form-button">Cadastrar</button>

        <p className="signup-link">
          Já tem conta? <Link href="/login">Fazer login</Link>
        </p>
      </form>
    </div>
  </div>
</div>

  )
}

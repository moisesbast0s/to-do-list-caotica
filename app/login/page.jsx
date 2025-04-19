'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import './login.css'
import morcegoImg from '/public/morcego.webp'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    })

    const data = await res.json()

    if (res.ok) {
      router.push('/dashboard')
    } else {
      setErro(data.message)
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-image">
          <Image src={morcegoImg} alt="Morcego Roxo" width={400} height={400} />
        </div>
        <div className="login-form">
          <h2>Entre na sua conta</h2>

          {erro && <p style={{ color: 'red' }}>{erro}</p>}

          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />

            {/* Link de recuperação de senha */}
            <p style={{ margin: '0.5rem 0 1rem', textAlign: 'right' }}>
              <Link href="/recuperar-senha" style={{ fontSize: '0.9rem', color: '#6b21a8' }}>
                Esqueceu a senha?
              </Link>
            </p>

            <button type="submit" className='botao-de-login'>Login</button>
            <p className="signup-link">
              Não tem conta? <Link href="/cadastro">Cadastrar-se</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

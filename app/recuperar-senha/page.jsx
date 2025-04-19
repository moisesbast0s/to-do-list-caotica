// app/recuperar-senha/page.jsx
'use client'
import { useState } from 'react'
import Image from 'next/image'
import morcegoImg from '/public/morcego.webp'
import './recuperar-senha.css'
import Link from 'next/link'

export default function RecuperarSenha() {
  const [email, setEmail] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await fetch('/api/recuperar-senha', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    const data = await res.json()

    if (res.ok) {
      setMensagem('Email de recuperação enviado com sucesso!')
      setErro('')
    } else {
      setErro(data?.erro || 'Erro ao tentar enviar email.')
      setMensagem('')
    }
    
    
  }

  return (
    <div className="recover-password-wrapper">
      <div className="recover-container">
        <div className="recove-image">
          <Image src={morcegoImg} alt="Morcego Roxo" width={400} height={400} />
        </div>
        <div className="recover-password-form">
          <h2>Recuperar Senha</h2>

          {erro && <p className="error-message">{erro}</p>}
          {mensagem && <p className="success-message">{mensagem}</p>}

          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: 8, marginBottom: 16 }}
            />

            <button type="submit" className="form-button">Enviar Link de Recuperação</button>
          </form>
          <p className="signup-link">
          Lembrou da senha? <Link href="/login">Fazer login</Link>
        </p>
        </div>
      </div>
    </div>

  )
}

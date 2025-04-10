// app/recuperar-senha/page.jsx
'use client'
import { useState } from 'react'

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
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Recuperar Senha</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 16 }}
        />
        <button type="submit" style={{ width: '100%', padding: 10 }}>
          Enviar Link de Recuperação
        </button>
      </form>
      {mensagem && <p style={{ color: 'green' }}>{mensagem}</p>}
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
    </div>
  )
}

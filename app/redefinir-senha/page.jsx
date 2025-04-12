// app/redefinir-senha/page.jsx
'use client'

import './redefinir-senha.css'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState } from 'react'

export default function RedefinirSenha() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const router = useRouter()

  const [senha, setSenha] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (senha !== confirmar) {
      setErro('As senhas não coincidem')
      return
    }

    const res = await fetch('/api/redefinir-senha', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, senha }),
    })

    const data = await res.json()

    if (res.ok) {
      setMensagem('Senha redefinida com sucesso!')
      setErro('')
      setTimeout(() => router.push('/login'), 3000)
    } else {
      setErro(data?.erro || 'Erro ao redefinir a senha.')
      setMensagem('')
    }
  }

  return (
    <div className="redefinir-container">
      <h2>Redefinir Senha</h2>
      <form onSubmit={handleSubmit}>
        <label>Nova Senha:</label>
        <input
          type="password"
          required
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
       />

        <label>Confirmar Senha:</label>
        <input
          type="password"
          required
          value={confirmar}
          onChange={(e) => setConfirmar(e.target.value)}
   />
        <button type="submit">Redefinir Senha</button>
      </form>

      {mensagem && <p className="mensagem">{mensagem}</p>}
      {erro && <p className="erro">{erro}</p>}
    </div>
  )
}

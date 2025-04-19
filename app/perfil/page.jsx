'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import './perfil.css'


export default function PerfilPage() {
  const router = useRouter()
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    async function fetchUsuario() {
      try {
        const res = await fetch('/api/perfil')
        const data = await res.json()
        setUsuario(data)
        setNome(data.nome)
        setEmail(data.email)
      } catch (error) {
        console.error('Erro ao carregar dados do perfil:', error)
      }
    }
    fetchUsuario()
  }, [])

  const atualizarPerfil = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/perfil', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email }),
      })

      if (res.ok) {
        alert('Perfil atualizado com sucesso!')
      } else {
        alert('Erro ao atualizar perfil')
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error)
    }
  }

  const excluirConta = async () => {
    if (!confirm('Tem certeza que deseja excluir sua conta?')) return

    try {
      const res = await fetch('/api/perfil', {
        method: 'DELETE',
      })

      if (res.ok) {
        alert('Conta excluída com sucesso!')
        router.push('/login')
      } else {
        alert('Erro ao excluir conta')
      }
    } catch (error) {
      console.error('Erro ao excluir conta:', error)
    }
  }

  return (
    <div className="perfil-container">
  <div className="perfil-header">
    <h2 className="perfil-titulo">Meu Perfil</h2>
    <button className="botao-voltar" onClick={() => router.push('/dashboard')}>
      Voltar ao Dashboard
    </button>
  </div>

  <form onSubmit={atualizarPerfil}>
    <label className="perfil-label">Nome:</label>
    <input
      type="text"
      value={nome}
      onChange={(e) => setNome(e.target.value)}
      placeholder={usuario?.nome || ''}
      className="perfil-input"
    />

    <label className="perfil-label">Email:</label>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder={usuario?.email || ''}
      className="perfil-input"
    />

    <button type="submit" className="botao-atualizar">
      Atualizar Perfil
    </button>

    <button type="button" onClick={excluirConta} className="botao-excluir">
      Excluir Conta
    </button>
  </form>
</div>

  )
}

'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

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
    <div style={{
      maxWidth: '400px',
      margin: '2rem auto',
      padding: '2rem',
      background: '#f9f9f9',
      borderRadius: '10px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem'
      }}>
        <h2 style={{ margin: 0, color: '#000' }}>Meu Perfil</h2>
        <button
          onClick={() => router.push('/dashboard')}
          style={{
            background: '#555',
            color: '#fff',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Voltar ao Dashboard
        </button>
      </div>

      <form onSubmit={atualizarPerfil}>
        <label style={{ color: '#000', marginBottom: '0.25rem', display: 'block' }}>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder={usuario?.nome || ''}
          style={{
            width: '100%',
            padding: '0.5rem',
            marginBottom: '1.5rem',
            borderRadius: '5px',
            border: '1px solid #ccc',
            backgroundColor: '#f3f0ff', // cor igual ao email
            color: '#000' // texto visível
          }}
        />


        <label style={{ color: '#000', marginBottom: '0.25rem', display: 'block' }}>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={usuario?.email || ''}
          style={{
            width: '100%',
            padding: '0.5rem',
            marginBottom: '1.5rem',
            borderRadius: '5px',
            border: '1px solid #ccc',

          }}
        />

        <button
          type="submit"
          style={{
            width: '100%',
            background: 'green',
            color: '#fff',
            border: 'none',
            padding: '0.75rem',
            borderRadius: '5px',
            marginBottom: '1rem',
            cursor: 'pointer'
          }}
        >
          Atualizar Perfil
        </button>

        <button
          type="button"
          onClick={excluirConta}
          style={{
            width: '100%',
            background: 'red',
            color: '#fff',
            border: 'none',
            padding: '0.75rem',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Excluir Conta
        </button>
      </form>
    </div>
  )
}

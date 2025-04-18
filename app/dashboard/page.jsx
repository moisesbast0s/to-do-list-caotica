'use client'
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import 'flatpickr/dist/themes/dark.css'
import Flatpickr from 'react-flatpickr'
import { Portuguese } from 'flatpickr/dist/l10n/pt.js'
import { Checkbox } from "@heroui/checkbox";


export default function Dashboard() {
  const [tarefas, setTarefas] = useState([])
  const [conteudo, setConteudo] = useState('')
  const [dataHora, setDataHora] = useState('')
  const [editandoId, setEditandoId] = useState(null)
  const [novoConteudo, setNovoConteudo] = useState('')
  const router = useRouter()
  const [novaDataHora, setNovaDataHora] = useState('')
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    async function fetchUsuario() {
      const res = await fetch('/api/usuario') // <-- endpoint que retorna os dados do usuário
      const data = await res.json()
      setUsuario(data)
    }

    fetchUsuario()
  }, [])


  const sairDaConta = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' })
      router.push('/login')
    } catch (error) {
      console.error('Erro ao sair da conta:', error)
    }
  }

  async function carregarTarefas() {
    try {
      const res = await fetch('/api/tarefas/get')
      if (!res.ok) {
        console.error('Erro ao buscar tarefas:', res.status)
        return
      }
      const data = await res.json()
      setTarefas(Array.isArray(data) ? data : []) // evitar map() error
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error)
    }
  }


  async function adicionarTarefa() {
    if (!conteudo || !dataHora) return alert('Preencha todos os campos!')
    try {
      const res = await fetch('/api/tarefas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conteudo, dataHora }),
      })
      if (res.ok) {
        setConteudo('')
        setDataHora('')
        carregarTarefas()
      } else {
        const erro = await res.json()
        alert(`Erro: ${erro.message || 'Erro ao adicionar tarefa'}`)
      }
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error)
    }
  }

  async function excluirTarefa(id) {
    try {
      const res = await fetch(`/api/tarefas/${id}/delete`, {
        method: 'DELETE',
      })
      if (res.ok) {
        carregarTarefas()
      } else {
        const erro = await res.json()
        alert(`Erro ao excluir: ${erro.message}`)
      }
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error)
    }
  }

  async function concluirTarefa(id) {
    console.log("ID enviado para a API:", id); // Verifique no console do navegador
    try {
      const res = await fetch(`/api/tarefas/${id}/concluir`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Adicione headers
        },
      });

      if (!res.ok) {
        const erro = await res.json();
        console.error("Erro na resposta:", erro);
        return;
      }

      carregarTarefas();
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  }

  async function salvarEdicao(id) {
    if (!novoConteudo.trim() || !novaDataHora.trim()) {
      return alert('Preencha todos os campos!')
    }

    try {
      const res = await fetch(`/api/tarefas/${id}/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conteudo: novoConteudo,
          dataHora: novaDataHora,
        }),
      })

      if (res.ok) {
        setEditandoId(null)
        setNovoConteudo('')
        setNovaDataHora('')
        carregarTarefas()
      } else {
        const erro = await res.json()
        alert(`Erro ao editar: ${erro.message}`)
      }
    } catch (error) {
      console.error('Erro ao salvar edição:', error)
    }
  }


  useEffect(() => {
    carregarTarefas()
  }, [])

  return (


    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', backgroundColor: '#fff', color: 'white', borderRadius: '10px' }}>
      <h2 style={{ margin: 0, color: '#000' }}>Bem-vindo, {usuario?.nome || 'Usuário'}</h2>
      {/* Header com ícone de perfil e botão de sair */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '1rem' }}>
        <button
          onClick={() => router.push('/perfil')}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'white',
            fontSize: '1.5rem',
            marginRight: '1rem',
          }}
          title="Perfil"
        >
          👤
        </button>

        <button
          onClick={sairDaConta}
          style={{
            backgroundColor: '#ff3e3e',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Sair
        </button>
      </div>


      <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: '#030202' }}>📋 To-Do List</h2>

      {/* Campo de Adição */}
      <div style={{ marginBottom: '2rem', padding: '1rem', borderRadius: '5px', color: '#030202' }}>
        <input
          type="text"
          maxLength={40} // limita para 100 caracteres
          placeholder="Digite a tarefa"
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
          style={{ padding: '0.5rem', width: '100%', marginBottom: '0.5rem', border: '1px solid #030202', borderRadius: '5px' }}
        />
        <Flatpickr
          value={dataHora}
          options={{
            dateFormat: "j \\de F \\de Y",
            locale: Portuguese,
            altFormat: "F j, Y",
          }}
          onChange={([date]) => {
            if (!date) return
            const localDate = new Date(date)
            localDate.setHours(0, 0, 0, 0)
            setDataHora(localDate.toISOString())
          }}
          placeholder="Selecione a data da tarefa"

          style={{ padding: '0.5rem', width: '100%', marginBottom: '0.5rem', border: '1px solid #030202', borderRadius: '5px' }}
        />


        <button onClick={adicionarTarefa} style={{ width: '100%', padding: '0.75rem', backgroundColor: '#5e17eb', color: 'white', border: 'none', borderRadius: '5px' }}>
          Adicionar Tarefa
        </button>
      </div>

      {/* Lista de Tarefas */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id} style={{ background: 'white', marginBottom: '1rem', padding: '1rem', borderRadius: '5px', border: '1px solid #ccc', color: '#030202' }}>
            {editandoId === tarefa.id ? (
              <>
                <input
                  type="text"
                  value={novoConteudo}
                  maxLength={40} // limita para 100 caracteres
                  onChange={(e) => setNovoConteudo(e.target.value)}
                  placeholder="Novo conteúdo"
                  style={{ width: '100%', marginBottom: '0.5rem' }}
                />
                <Flatpickr
                  value={novaDataHora}
                  options={{
                    dateFormat: 'Y-m-d',
                    locale: Portuguese,
                  }}
                  onChange={([date]) => {
                    if (!date) return
                    const localDate = new Date(date)
                    localDate.setHours(0, 0, 0, 0)
                    setNovaDataHora(localDate.toISOString())
                  }}
                  placeholder="Editar data da tarefa"
                />


                <button
                  onClick={() => salvarEdicao(tarefa.id)}
                  style={{ backgroundColor: '#28a745', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '5px' }}
                >
                  Salvar
                </button>
              </>
            ) : (
              <>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0rem' }}>
                  <label className="checkbox-custom">
                    <input
                      type="checkbox"
                      checked={tarefa.concluido}
                      onChange={() => concluirTarefa(tarefa.id)}
                      style={{ 
                        margin: 0, // Remove margens padrão
                        transform: 'translateY(1px)' // Ajuste fino de alinhamento
                      }}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <strong
                    style={{
                      textDecoration: tarefa.concluido ? 'line-through' : 'none',
                      color: tarefa.concluido ? '#999' : '#333',
                      marginLeft: '0.5rem',
                      fontSize: '1rem',
                      fontWeight: 700,
                    }}
                  >
                    {tarefa.conteudo}
                  </strong>
                </div>



                <div style={{ marginTop: '0.5rem', fontSize: '1rem', color: 'black', fontWeight: 400 }}>
                  {new Date(tarefa.dataHora).toLocaleDateString('pt-BR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </div>

                <div style={{ marginTop: '0.5rem', justifyContent: 'space-between', display: 'flex' }}>
                  <button
                    onClick={() => {
                      setEditandoId(tarefa.id)
                      setNovoConteudo(tarefa.conteudo)
                      setNovaDataHora(tarefa.dataHora?.slice(0, 16) || '') // Ajuste para campo datetime-local
                    }}
                    style={{ marginRight: '10px', backgroundColor: '#f0ad4e', color: 'white', border: 'none', padding: '5px 8px', borderRadius: '8px' }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => excluirTarefa(tarefa.id)}
                    style={{ backgroundColor: '#e3b6b6', color: 'white', border: 'none', padding: '5px 8px', borderRadius: '8px' }}
                  >
                    Excluir
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

    </div>
  )
}

'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Erro capturado pela página /error:', error)
  }, [error])

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Erro interno do servidor</h1>
      <p>Algo deu errado. Tente novamente.</p>
      <button onClick={() => reset()}>Tentar novamente</button>
    </div>
  )
}

// app/not-found.js
'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      padding: '2rem',
      backgroundColor: '#f5f7fa',
      background: 'linear-gradient(135deg,rgb(140, 77, 199) 0%, #e4e8eb 100%)'
    }}>
      <div style={{
        marginBottom: '2rem',
        filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))'
      }}>
        <Image
          src="/error404.webp"
          alt="Erro 404"
          width={300}
          height={200}
          style={{
            objectFit: 'contain',
            borderRadius: '8px'
          }}
        />
      </div>

      <h1 style={{ 
        fontSize: '2.5rem',
        color: '#2d3748',
        marginBottom: '1rem',
        fontWeight: '800',
        background: 'linear-gradient(to right, #6b46c1, #805ad5)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        404 - Página Não Encontrada
      </h1>

      <p style={{ 
        fontSize: '1.1rem',
        color: '#4a5568',
        maxWidth: '500px',
        lineHeight: '1.6',
        marginBottom: '2rem'
      }}>

      </p>

      <Link
        href="/"
        style={{
          padding: '0.75rem 1.75rem',
          backgroundColor: '#6b46c1',
          color: 'white',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: '600',
          fontSize: '1rem',
          transition: 'all 0.2s ease',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          ':hover': {
            backgroundColor: '#805ad5',
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)'
          }
        }}
      >
        Voltar para a Home
      </Link>

      <style jsx global>{`
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }
      `}</style>
    </div>
  );
}
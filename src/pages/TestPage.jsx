import React from 'react'

export default function TestPage() {
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f0f0f0', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#333' }}>🧪 Test Page</h1>
      <p style={{ color: '#666' }}>Se vedi questa pagina, React funziona!</p>
      <div style={{ 
        backgroundColor: '#4CAF50', 
        color: 'white', 
        padding: '10px', 
        borderRadius: '5px',
        marginTop: '20px'
      }}>
        ✅ Sito funzionante!
      </div>
    </div>
  )
} 
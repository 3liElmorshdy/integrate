import React, { useEffect } from 'react';

function Block() {
  useEffect(() => {
    const titleOriginal = document.title;
    document.title = 'Server Error - Try Again Later';
    return () => {
      document.title = titleOriginal;
    };
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0a0a0a',
      color: '#00ff88',
      fontFamily: 'monospace',
      padding: '24px',
      textAlign: 'center'
    }}>
      <style>{`
        @keyframes scan {
          0% { background-position: 0 -100vh; }
          100% { background-position: 0 0; }
        }
        @keyframes pulseGlow {
          0% { opacity: 0.06; }
          100% { opacity: 0.16; }
        }
        @keyframes driftSlow {
          0% { background-position: 0 0, 0 0; }
          100% { background-position: 200px 400px, -150px 300px; }
        }
      `}</style>
      <div style={{
        maxWidth: '720px',
        width: '100%'
      }}>
        <div style={{
          fontSize: '14px',
          letterSpacing: '0.2em',
          color: '#16ff9b',
          opacity: 0.8,
          marginBottom: '8px'
        }}>Forbidden</div>
        <h1 style={{
          fontSize: '48px',
          lineHeight: 1.1,
          margin: 0,
          textShadow: '0 0 12px rgba(22,255,155,0.5)'
        }}>
          4<span style={{filter:'drop-shadow(0 0 6px #16ff9b)'}}>0</span>3
        </h1>
        <p style={{
          marginTop: '12px',
          fontSize: '18px',
          color: '#a0f7d4'
        }}>
         "You don’t have permission to access this resource"
        </p>

        <div style={{
          marginTop: '24px',
          padding: '16px',
          background: 'rgba(0,255,136,0.06)',
          border: '1px solid rgba(0,255,136,0.25)',
          borderRadius: '8px',
          textAlign: 'left',
          color: '#ccffe9'
        }}>
          <pre style={{
            margin: 0,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}>{`>
_ initializing diagnostics...
_ probing network routes... timeout
_ checking service health... degraded
_ trace-id: ${Math.random().toString(16).slice(2)}
_ status: 503 Service Unavailable
          `}</pre>
        </div>

        <button
          onClick={() => window.location.reload()}
          style={{
            marginTop: '20px',
            padding: '10px 16px',
            background: 'transparent',
            border: '1px solid rgba(0,255,136,0.6)',
            color: '#a0f7d4',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Retry
        </button>
      </div>

      {/* Animated overlays */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}>
        {/* Moving scanlines */}
        <div style={{
          position: 'absolute',
          inset: 0,
          mixBlendMode: 'screen',
          backgroundImage: 'repeating-linear-gradient(180deg, rgba(0,255,136,0.18) 0px, rgba(0,255,136,0.18) 1px, rgba(0,0,0,0) 2px)',
          animation: 'scan 8s linear infinite',
          opacity: 0.08
        }} />

        {/* Pulsing vignette */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(1200px 600px at 50% 20%, rgba(0,255,136,0.25), rgba(0,0,0,0) 60%)',
          filter: 'blur(20px)',
          animation: 'pulseGlow 3s ease-in-out infinite alternate',
          opacity: 0.12
        }} />

        {/* Drifting dot grid */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(22,255,155,0.35) 1px, rgba(0,0,0,0) 1px), radial-gradient(rgba(22,255,155,0.2) 1px, rgba(0,0,0,0) 1px)',
          backgroundSize: '22px 22px, 28px 28px',
          backgroundPosition: '0 0, 0 0',
          animation: 'driftSlow 28s linear infinite',
          opacity: 0.06
        }} />
      </div>
    </div>
  );
}

export default Block;



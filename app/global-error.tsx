'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <div style={{ padding: '50px', textAlign: 'left', fontFamily: 'system-ui, sans-serif' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'red' }}>A Critical Error Occurred</h1>
          <p style={{ marginTop: '10px' }}>This error was caught by the global error boundary.</p>
          <pre style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f1f5f9', borderRadius: '8px', overflowX: 'auto', fontSize: '14px' }}>
            {error.message || 'Unknown error'}
            {'\n'}
            {error.stack}
          </pre>
          <button
            onClick={() => reset()}
            style={{
              display: 'inline-block',
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#1E293B',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}

'use client';

export default function NotFound() {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
          <h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>404 - Not Found</h1>
          <p style={{ marginTop: '10px' }}>This page could not be found.</p>
          <a
            href="/"
            style={{
              display: 'inline-block',
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#1E293B',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: 600
            }}
          >
            Go back home
          </a>
        </div>
      </body>
    </html>
  );
}

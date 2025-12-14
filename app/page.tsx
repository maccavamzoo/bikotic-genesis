export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      padding: '2rem',
      fontFamily: 'system-ui, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      {/* Header */}
      <header style={{
        borderBottom: '2px solid #b0236f',
        paddingBottom: '1rem',
        marginBottom: '3rem'
      }}>
        <h1 style={{
          fontSize: '3rem',
          margin: 0,
          color: '#b0236f',
          fontWeight: 700
        }}>
          BIKOTIC
        </h1>
        <p style={{
          fontSize: '1.2rem',
          margin: '0.5rem 0 0 0',
          color: '#666'
        }}>
          Visual Bike Comparisons & Reviews
        </p>
      </header>

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #b0236f 0%, #6a1542 100%)',
        color: 'white',
        padding: '3rem 2rem',
        borderRadius: '12px',
        marginBottom: '3rem',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          margin: '0 0 1rem 0'
        }}>
          Compare Bikes Visually
        </h2>
        <p style={{
          fontSize: '1.2rem',
          marginBottom: '2rem',
          opacity: 0.9
        }}>
          The ultimate tool for visual bike comparisons. See real geometry differences, fade between models, and make informed decisions.
        </p>
        <button style={{
          background: 'white',
          color: '#b0236f',
          border: 'none',
          padding: '1rem 2rem',
          fontSize: '1.1rem',
          fontWeight: 700,
          borderRadius: '8px',
          cursor: 'pointer'
        }}>
          Launch Comparison Tool
        </button>
      </section>

      {/* Featured Content */}
      <section>
        <h2 style={{
          fontSize: '2rem',
          marginBottom: '2rem',
          color: '#333'
        }}>
          Latest Comparisons
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {/* Article Card 1 */}
          <article style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '1.5rem',
            transition: 'box-shadow 0.3s'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              margin: '0 0 1rem 0',
              color: '#b0236f'
            }}>
              Specialized Tarmac SL8 vs Trek Madone Gen 7
            </h3>
            <p style={{
              color: '#666',
              lineHeight: 1.6,
              marginBottom: '1rem'
            }}>
              The ultimate aero vs lightweight showdown. We compare geometry, aerodynamics, and real-world performance.
            </p>
            <a href="#" style={{
              color: '#b0236f',
              textDecoration: 'none',
              fontWeight: 600
            }}>
              Read comparison →
            </a>
          </article>

          {/* Article Card 2 */}
          <article style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '1.5rem'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              margin: '0 0 1rem 0',
              color: '#b0236f'
            }}>
              Best Road Bikes Under $3000 (2025)
            </h3>
            <p style={{
              color: '#666',
              lineHeight: 1.6,
              marginBottom: '1rem'
            }}>
              Our comprehensive buyer's guide for the best value road bikes. Real geometry comparisons included.
            </p>
            <a href="#" style={{
              color: '#b0236f',
              textDecoration: 'none',
              fontWeight: 600
            }}>
              Read guide →
            </a>
          </article>

          {/* Article Card 3 */}
          <article style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '1.5rem'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              margin: '0 0 1rem 0',
              color: '#b0236f'
            }}>
              Latest YouTube Review
            </h3>
            <p style={{
              color: '#666',
              lineHeight: 1.6,
              marginBottom: '1rem'
            }}>
              Watch our latest bike review on the BIKOTIC YouTube channel with 18K subscribers.
            </p>
            <a href="#" style={{
              color: '#b0236f',
              textDecoration: 'none',
              fontWeight: 600
            }}>
              Watch now →
            </a>
          </article>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        marginTop: '4rem',
        paddingTop: '2rem',
        borderTop: '1px solid #ddd',
        color: '#666',
        textAlign: 'center'
      }}>
        <p>© 2025 BIKOTIC - Visual Bike Comparisons Since 2017</p>
      </footer>
    </main>
  );
}

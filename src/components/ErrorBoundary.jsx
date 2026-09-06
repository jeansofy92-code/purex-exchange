import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Crash Error Boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
          background: '#080b11',
          color: '#f8fafc'
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#00f2fe' }}>Purex Exchange</h1>
          <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>Something unexpected occurred. Please reload the page.</p>
          <button
            onClick={() => window.location.reload()}
            className="glow-btn"
          >
            Reload Application
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary

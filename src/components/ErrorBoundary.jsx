import React from 'react'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('App runtime error caught by boundary:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    try {
      window.location.href = '/'
    } catch (_e) {}
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0c0e22] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="rounded-3xl border border-white/15 bg-[#15193b] p-8 max-w-md shadow-2xl space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-[#ff7a00]/20 border border-[#ff7a00]/30 flex items-center justify-center text-[#ff7a00] mx-auto text-xl font-bold">
              !
            </div>
            <h1 className="text-xl font-black text-white">Temporary Interface Refresh</h1>
            <p className="text-xs text-slate-400">
              {this.state.error?.message || 'An unexpected display update occurred. Click below to continue.'}
            </p>
            <button
              type="button"
              onClick={this.handleReset}
              className="w-full rounded-full bg-gradient-to-r from-[#ff7a00] to-[#ff9500] py-2.5 text-xs font-bold text-white shadow hover:brightness-110 cursor-pointer"
            >
              Continue to PUREX Exchange
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

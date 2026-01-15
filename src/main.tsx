import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { initSentry, SentryErrorBoundary } from './lib/sentry'
import './index.css'

initSentry();

function ErrorFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold text-white mb-4">Une erreur est survenue</h1>
        <p className="text-slate-400 mb-6">Notre equipe a ete notifiee.</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-amber-500 text-white rounded-lg"
        >
          Recharger la page
        </button>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SentryErrorBoundary fallback={<ErrorFallback />}>
      <App />
    </SentryErrorBoundary>
  </StrictMode>,
)

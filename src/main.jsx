import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SmoothScrollProvider } from './components/SmoothScrollProvider'
import { LanguageProvider } from './i18n/LanguageContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <SmoothScrollProvider>
        <App />
      </SmoothScrollProvider>
    </LanguageProvider>
  </StrictMode>
)

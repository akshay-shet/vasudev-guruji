import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import App from './App'
import { PrefsProvider } from './lib/prefs'
// Google Fonts, self-hosted via Fontsource (works offline and on any host)
import '@fontsource/marcellus/400.css'
import '@fontsource/cinzel/400.css'
import '@fontsource/cinzel/600.css'
import '@fontsource/cormorant-garamond/400.css'
import '@fontsource/cormorant-garamond/500.css'
import '@fontsource/cormorant-garamond/600.css'
import '@fontsource/cormorant-garamond/700.css'
import '@fontsource/cormorant-garamond/500-italic.css'
import '@fontsource/cormorant-garamond/600-italic.css'
import '@fontsource/cormorant-garamond/700-italic.css'
import '@fontsource/tiro-devanagari-sanskrit/400.css'
import '@fontsource/tiro-kannada/400.css'
import '@fontsource/tiro-telugu/400.css'
import '@fontsource/tiro-tamil/400.css'
import '@fontsource/noto-serif-malayalam/400.css'
import '@fontsource/noto-serif-malayalam/600.css'
import '@fontsource/tiro-devanagari-hindi/400.css'
import './index.css'

// Preview builds (VITE_ROUTER=memory) keep navigation inside the page.
const Router = import.meta.env.VITE_ROUTER === 'memory' ? MemoryRouter : BrowserRouter

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <PrefsProvider>
        <App />
      </PrefsProvider>
    </Router>
  </React.StrictMode>,
)

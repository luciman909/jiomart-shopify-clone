import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { DeliveryModeProvider } from './contexts/DeliveryModeContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <DeliveryModeProvider>
        <App />
      </DeliveryModeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

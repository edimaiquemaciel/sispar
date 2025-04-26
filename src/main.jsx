import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster
      toastOptions={{
        style: {
          minWidth: "350px",
          maxWidth: "500px",
          fontSize: "1rem",
        },
      }}
    />

    <App />
  </StrictMode>,
)

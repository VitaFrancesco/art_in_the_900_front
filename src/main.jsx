import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faPhone, faMagnifyingGlass, faChevronRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
library.add(faEnvelope, faPhone, faMagnifyingGlass, faChevronRight, faArrowLeft)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LazyMotion, domAnimation } from 'framer-motion'
import App from './App'
import { applyHashRedirect } from './utils/hashRedirect'
import './index.css'

// Old `/#/parks/...` bookmarks → new path URLs
applyHashRedirect()

// LazyMotion + domAnimation loads only the animation features this site uses.
// BrowserRouter needs host rewrite rules (see vercel.json) so deep links work.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LazyMotion features={domAnimation}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LazyMotion>
  </React.StrictMode>,
)

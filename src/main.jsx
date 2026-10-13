import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// The site used to use hash URLs (josancll.ca/#/services/sod). Send anyone
// arriving on an old link to the matching clean URL (josancll.ca/services/sod).
if (window.location.hash.startsWith('#/')) {
  const cleanPath = window.location.hash.slice(1)
  window.history.replaceState(null, '', cleanPath)
}

// The HTML is prerendered at build time for search engines; React takes over here.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

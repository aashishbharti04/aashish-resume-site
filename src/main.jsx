import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import ResumeSite from './ResumeSite.jsx'
import AdminApp from './admin/AdminApp.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<ResumeSite />} />
        <Route path="/admin" element={<AdminApp />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
)

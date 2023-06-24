import React, {  Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./style/common.scss"
import { HashRouter as Hash } from "react-router-dom"
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Hash>
      <Suspense>
        <App />
      </Suspense>
    </Hash>
  </React.StrictMode>,
)

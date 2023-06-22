import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import './index.css'
import "./style/common.scss"
import { Provider } from "react-redux"
import store, { persistor } from './rtk/store'
import { PersistGate } from 'redux-persist/integration/react'
import { HashRouter as Hash, useLocation } from "react-router-dom"
import LayoutRouter from './pages/router'
import Myload from './components/Myload'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Hash>
        <Suspense fallback={<Myload />}>
          <App />
        </Suspense>
      </Hash>
    </PersistGate>
  </Provider>

)

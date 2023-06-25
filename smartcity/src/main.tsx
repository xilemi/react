import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import './index.css'
import "./style/common.scss"
import { Provider } from "react-redux"
import store, { persistor } from './rtk/store'
import { PersistGate } from 'redux-persist/integration/react'
import { HashRouter as Hash } from "react-router-dom"
import Myload from './components/Myload'




// import  "../mock/api"


import { mockXHR } from '../mock';
if (process.env.NODE_ENV !== 'production') {
  mockXHR();
}



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

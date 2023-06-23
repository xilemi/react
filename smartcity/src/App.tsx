import { HashRouter as Hash, useLocation } from "react-router-dom"
import MyFooter from "./components/MyFooter"
import MyHeader from "./components/MyHeader"
import LayoutRouter from "./pages/router"
import React, { Fragment, Suspense, useEffect, useState } from "react"
import Myload from "./components/Myload"
import { useLocalData } from "./hooks"

function App() {
  const { setfromPath, settoPath, toPath, fromPath } = useLocalData()
  const { pathname } = useLocation()
  useEffect(() => {
    setfromPath(pathname)
    settoPath(fromPath)
  }, [pathname])


  return (
    <Fragment>
      {/* <Hash>
        <Suspense fallback={<Myload />}>
          <LayoutRouter></LayoutRouter>
        </Suspense>
      </Hash> */}
      <LayoutRouter></LayoutRouter>
    </Fragment>
  )
}

export default App

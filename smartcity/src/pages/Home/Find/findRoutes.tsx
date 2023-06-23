import { useRoutes } from "react-router-dom"
import Hospital from "./Hospital"
import React from "react"
import City from "./City"


const findRoutes = [
    {
        path: '/index/outpatient/hospitalList',
        element: <Hospital />
    },
    {
        path: '/index/city',
        element: <City />
    }
]
export default findRoutes
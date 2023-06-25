import { useRoutes } from "react-router-dom"
import Hospital from "./Hospital/Hospital"
import React from "react"
import City from "./City"
import HospitalDetail from "./Hospital/HospitalDetail"
import HospitalCard from "./Hospital/HospitalCard"

const findRoutes = [
    {
        path: '/index/outpatient/hospitalList',
        element: <Hospital />
    },
    {
        path: '/index/outpatient/hospitaldetail',
        element: <HospitalDetail />
    },
    {
        path:"/index/outpatient/hospitalcard",
        element:<HospitalCard/>
    },
    {
        path: '/index/city',
        element: <City />
    }
]
export default findRoutes
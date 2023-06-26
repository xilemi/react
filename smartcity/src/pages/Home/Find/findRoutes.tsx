import { useRoutes } from "react-router-dom"
import Hospital from "./Hospital/Hospital"
import React from "react"
import City from "./City"
import HospitalDetail from "./Hospital/HospitalDetail"
import HospitalCard from "./Hospital/HospitalCard"
import Department from "./Hospital/Department"
import AddHospCard from "./Hospital/AddHospCard"
import AddReservation from "./Hospital/AddReservation"
import UpdataHospCard from "./Hospital/updataHospCard"
import ReservationList from "./Hospital/ReservationList"
import ReservationDetail from "./Hospital/ReservationDetail"

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
        path:"/index/outpatient/department",
        element:<Department/>
    }, 
    {
        path:"/index/outpatient/addhospcard",
        element:<AddHospCard/>
    },
    {
        path:"/index/outpatient/updatahospcard",
        element:<UpdataHospCard/>
    },
    {
        path:"/index/outpatient/addreservation",
        element:<AddReservation/>
    },
    {
        path:"/index/outpatient/reservationlist",
        element:<ReservationList/>
    }, 
    {
        path:"/index/outpatient/reservationdetail",
        element:<ReservationDetail/>
    },
    {
        path: '/index/city',
        element: <City />
    }
]
export default findRoutes
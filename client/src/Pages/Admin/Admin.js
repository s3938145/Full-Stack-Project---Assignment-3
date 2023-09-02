import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminHeader from '../../Components/Header/AdminHeader'

function Admin() {
  return (
    <div>
        <AdminHeader />
        <div className='container-body'>
            <Outlet />
        </div>
    </div>
  )
}

export default Admin
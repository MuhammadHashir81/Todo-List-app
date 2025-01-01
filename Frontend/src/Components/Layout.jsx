import React from 'react'
import { TodoProvider } from '../Context/ContextApi'
import Form from './Form'
import Todos from './Todos'
import { Outlet,useLocation } from 'react-router-dom'

const Layout = () => {
    const location = useLocation()
    const hideNavbarAndFooter = location.pathname === '/signup' || location.pathname === '/login' 
  return (
    <TodoProvider>
      <div className='main m-10'>
        {!hideNavbarAndFooter && <Form/>}
        <Outlet/>
        {!hideNavbarAndFooter && <Todos />}
      </div>    
    </TodoProvider>
  )
}

export default Layout
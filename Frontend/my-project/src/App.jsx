import React from 'react'
import Layout from './Components/Layout'
import {  RouterProvider, createBrowserRouter, createRoutesFromElements,Route } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
const App = () => {
  const router  = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Route>
    )
  );
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
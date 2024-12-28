import React, { useContext, useState, useEffect } from 'react'
import { TodoContext } from '../Context/ContextApi'
import { GoAlertFill } from "react-icons/go";
import toast, { Toaster } from 'react-hot-toast';
import Login from './Login';
import Signup from './Signup';
import { Link, NavLink } from 'react-router-dom';
const Form = () => {
  const { input, setInput, setTodos, todos, addTodo,logError,logOutUser,userLoginStatus,setUserLoginStatus } = useContext(TodoContext);
  const [showLogin, setShowLogin] = useState(false)
  
  // handleForm   
  
  const handleForm = (e) => {
    e.preventDefault()
    if (input === "") {
      toast.error("Please enter todo")
      return
    }
    addTodo(input)
    setInput("")
  }


  const handleLogOut = ()=>{
    localStorage.removeItem('isLoginUser')
    logOutUser()
  }

  return (
    <>
    <Toaster/>
      <div className='mb-20 flex justify-between items-center'>
        <form onSubmit={handleForm}>
          <input
            type="text"
            placeholder='Enter your todo'
            className='focus:outline-none focus:ring focus:ring-amber-400 p-1 rounded-sm 
          '
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type='submit' className='w-32 h-9 ml-4 rounded-sm bg-amber-400 hover:bg-amber-300 text-black focus:ring-2 focus:ring-amber-400
        focus:ring-offset-2'>Add todo</button>
        </form>     
        {
          userLoginStatus ? (
            <button onClick={handleLogOut} className='w-32 h-9 bg-red-500 rounded-md focus:bg-red-300 hover:bg-red-300 focus:ring-2 focus:ring-red-400
            focus:ring-offset-2'>logout</button>
          ):(
            <NavLink to='/login'>
        <button className='w-32 h-9 bg-amber-400 rounded-md focus:bg-amber-300 hover:bg-amber-200 focus:ring-2 focus:ring-amber-400
        focus:ring-offset-2'>Login</button>
        </NavLink>
             )
        }
      </div>
    </>
  )
}

   
export default Form







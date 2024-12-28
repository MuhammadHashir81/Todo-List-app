import React, { useState, useEffect } from 'react'
import { useContext } from 'react'
import { TodoContext } from '../Context/ContextApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Todos = () => {
  const [showingModal, setShowingModal] = useState(false)
  const [updateInput, setUpdateInput] = useState("")
  const [updateId, setUpdateId] = useState(null)
  const { todos, deleteTodo, updateTodo } = useContext(TodoContext)

  
  
  const notify = () => {
    toast.error("Please enter todo")
  }

  const openModal = (id) => {
    setShowingModal(true)
    setUpdateId(id)
  }

  const handleTodo = (id) => {
    deleteTodo(id)
  }
  const updateFunc = () => {
    if (updateInput === "") {
      notify()
      return
    }
    updateTodo(updateId,updateInput)
    setShowingModal(false)
    setUpdateId(null)
    setUpdateInput("")

  }

  const handleCancel = () => {
    setShowingModal(false)
    setUpdateId(null)
  }


  return (
    <>
      <ToastContainer className="absolute left-[40%]"/>      
    <div className='grid grid-cols-4 gap-8'>
      {
        showingModal && updateId && (
          <div className='fixed inset-0 flex justify-center items-center bg-black  bg-opacity-50 h-full'>
            <div className='w-fit h-[180px] bg-white flex flex-col rounded-md p-10'>
              <input
                type="text"
                placeholder='Enter your todo'
                value={updateInput}
                onChange={(e) => setUpdateInput(e.target.value)}
                className=' outline outline-2  outline-black p-2 rounded-sm'
              />
              <div className='mt-3'>
                <button
                  type='button'
                  className='w-28 h-8 rounded-3xl bg-amber-400 text-black focus:ring-amber-400 focus:ring-offset-2 focus:ring-2 mr-3 '
                  onClick={updateFunc}
                >Update</button>
                <button type="button" onClick={handleCancel} className=' border-2 border-black rounded-3xl focus:bg-amber-50 w-20 h-11 hover:bg-amber-100 focus:border-none'>Cancel</button>
              </div>
            </div>
          </div>
        )
      }
      {
        todos.map((todo) => (
          <div className='w-80 h-fit bg-slate-100 tracking-wider p-5 border-2 rounded' 
          key={todo._id}>
            <p className="break-words">{todo.input}</p>
            <div className='flex justify-around mt-5'>
              <button
                type='button'
                className='w-28 h-8 rounded-3xl bg-amber-400 text-black focus:ring-amber-400 focus:ring-offset-2 focus:ring-2 '
                onClick={() => openModal(todo._id)}
              >update</button>
              <button
                type='button'
                className='w-28 h-8  rounded-3xl border-2 hover-border-black
                 focus:border-2 focus:border-black  shadow-black  text-black '
                onClick={() => handleTodo(todo._id)}
              >delete</button>
            </div>
          </div>

        ))
      }
    </div>
      </>
  )
}

export default Todos


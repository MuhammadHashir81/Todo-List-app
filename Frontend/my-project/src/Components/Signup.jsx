import React, {useContext, useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import { TodoContext } from '../Context/ContextApi';
import { Link } from 'react-router-dom';
import  toast, { Toaster } from 'react-hot-toast';
import { jwtDecode } from "jwt-decode";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    
    const {signUpName,setSignUpName,signUpEmail,setSignUpEmail,signUpPassword,setSignUpPassword,signUpUser} = useContext(TodoContext)
    
    const onSubmit = (data)=>{
        console.log(data)
        signUpUser()
    }

 const signUpVisiblity = (e)=>{
    if (e.target.id === 'signUpDiv') {
        navigate('/')
    }
    
 }

    return (
        <>
            {                
                <div>
                    <div className='fixed inset-0 flex justify-center items-center bg-black  bg-opacity-50 h-full' onClick={signUpVisiblity} id='signUpDiv'>
                        <div className='w-[420px] h-[500px] bg-white rounded-sm p-6 flex flex-col justify-between'>
                        <Toaster/>
                        <div className='flex justify-between items-center mb-8'>

                            <h1 className='text-center text-3xl font-semibold'>SignUp</h1>
                            <Link to='/'><RxCross1 /></Link>
                        </div>
                                <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='h-[55%] flex flex-col justify-around gap-1'>
                                <label htmlFor="name" className='font-semibold'>Name</label>
                                <input
                                    type="text"
                                    id='name'
                                    autoFocus
                                    {...register('name',{required:"Please enter your name", minLength:3})}
                                    placeholder='Enter name'
                                    value={signUpName}
                                    onChange={(e)=>setSignUpName(e.target.value)}
                                    className=' rounded-3xl block p-2 border-2 focus:ring focus:ring-amber-400 outline-none focus:border-none'
                                />
                                {errors.name && <p className='text-red-500'>{errors.name.message}</p>}

                                <label htmlFor="email" className='font-semibold'>Email</label>
                                <input
                                    type="text"
                                    id='email'
                                    {...register('email',{required:"Enter your email"})}
                                    value={signUpEmail}
                                    onChange={(e)=>setSignUpEmail(e.target.value)}
                                    placeholder='Enter you email'
                                    className='rounded-3xl block p-2 border-2 focus:ring focus:ring-amber-400 outline-none focus:border-none'
                                />
                                {errors.email && <p className='text-red-500'>{errors.email.message}</p>}

                                <label htmlFor="password" className='font-semibold'>Password</label>
                                <input
                                    type="password"
                                    id='password'
                                    {...register('password',{required:"Please enter a password"})}
                                    placeholder='Enter you password'
                                    value={signUpPassword}
                                    onChange={(e)=>setSignUpPassword(e.target.value)}
                                     className='rounded-3xl block p-2 border-2 focus:ring focus:ring-amber-400 outline-none focus:border-none'
                                />
                                {errors.password && <p className='text-red-500'>{errors.password.message}</p>}

                                <button type="submit" className='bg-amber-400 rounded-3xl p-2 mt-4'>Signup</button>
                            </div>
                                </form>
                                <span className='text-center font-normal my-2'>OR</span>
                            <div className='flex flex-col  gap-3'>
                                <p className='text-center'>Already have an account? <Link className='underline underline-offset-2 text-blue-500' to='/login'>Login</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Signup
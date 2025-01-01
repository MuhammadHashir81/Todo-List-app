import React, { useEffect, useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import { TodoContext } from '../Context/ContextApi';
import { useContext } from 'react';
import { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Login = () => {   
    const navigate = useNavigate()
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const loginVisibility  = (e)=>{
        if (e.target.id === 'signUpDiv') {
            navigate('/')
        }
    }
    const { email, setEmail, password, setPassword, loginUser, userLoginStatus } = useContext(TodoContext)

    console.log(userLoginStatus)
           
    const onSubmit = (data)=>{
        loginUser()
        console.log(data)
    }
        
    return (
        <div>
            <div className='fixed inset-0 flex justify-center items-center bg-black  bg-opacity-50 h-full' onClick={loginVisibility} id='signUpDiv'>

                <div className={`w-[420px] h-[390px] bg-white rounded-sm p-6 flex flex-col justify-between`}>
                    <Toaster />
                    <div className='flex justify-between items-center'>
                        <h1 className='text-center text-3xl font-semibold'>Login</h1>
                        <Link to='/'><RxCross1 /></Link>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} >
                    <div className='h-fit flex flex-col gap-2'>
                        <label htmlFor="email" className='font-semibold'>Email</label>
                        <input
                            type="email"
                            autoFocus
                            {...register('email',{required:"Please enter email"})}
                            id='email'
                            placeholder='Enter your email'
                            className='rounded-3xl block p-2 border-2 focus:ring focus:ring-amber-400 outline-none focus:border-none'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                        <label htmlFor="password" className='font-semibold'>Password</label>
                        <input
                            type="password"
                            id='password'
                            {...register('password',{required:"Please enter your password"})}
                            placeholder='Enter your password'
                            className='rounded-3xl block p-2 border-2 focus:ring focus:ring-amber-400 outline-none focus:border-none'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}


                    <button type="submit" className='bg-amber-400 rounded-3xl p-2 mt-4'>Login</button>
                    </div>

                    </form>
                    <span className='text-center font-normal my-2'>OR</span>
                    <div className='flex flex-col gap-3'>
                        
                        <p className='text-center'>Don't have a account? <Link
                            className='underline underline-offset-2 text-blue-500 cursor-pointer'
                            to='/signup'>Sign up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login





    import React, { createContext, useState, useEffect } from 'react';
    import { useNavigate } from 'react-router-dom';
    import toast, { Toaster } from 'react-hot-toast';
    export const TodoContext = createContext();

    export const TodoProvider = ({ children }) => {
        const navigate = useNavigate(   )
        const [todos, setTodos] = useState([])
        const [input, setInput] = useState("")
        const [email,setEmail] = useState("")
        const [password,setPassword] = useState("")
        const [logError,setLogError] = useState("")
        const [signUpName,setSignUpName] = useState("")
        const [signUpEmail,setSignUpEmail] = useState("")
        const [signUpPassword,setSignUpPassword] = useState("")
        
        const [userLoginStatus,setUserLoginStatus] = useState(
            localStorage.getItem('isLoginUser') || undefined    
        )
        
        const host = import.meta.env.VITE_LOCAL_HOST
        ;

        useEffect(()=>{
            const gettingLogInStatus = localStorage.getItem('isLoginUser')
            setUserLoginStatus(gettingLogInStatus === 'true')
        },[])

        const signUpUser = async()=>{
            

            try {
                const fetchSignUp = await fetch(`${host}/auth/signup`,{
                    method:"POST",
                    headers:{
                        "Content-type":"application/json"
                    },
                    credentials:"include",
                    body:JSON.stringify({name:signUpName,email:signUpEmail,password:signUpPassword})
                })
                const response = await fetchSignUp.json()
                console.log(response.error) 
                if (response.error) {
                        toast.error(response.error.join(' , '))
                }
                if (response.success) {
                    setLogError(response.success)
                    toast.success(response.success)
                    setSignUpName("")
                    setSignUpEmail("")
                    setSignUpPassword("")
                    setTimeout(() => {
                        navigate('/login');
                    }, 1000);
                    
                    }
                } catch (error) {
                    console.log(error)            
                }
            } 
            
        // Login User

        const loginUser = async()=>{
            try {
                const fetchLogin = await fetch(`${host}/auth/login`,{
                    method:"POST",
                    headers:{
                        "Content-type":"application/json"
                    },
                    credentials:"include",
                    body:JSON.stringify({email,password})
                })
                const response = await fetchLogin.json()
                if (response.error) {
                    setLogError(response.error)
                    toast.error(response.error)
                }
                if (response.success) {
                    setLogError(response.success)
                    toast.success(response.success)
                    setUserLoginStatus(true)
                    setEmail("")
                    setPassword("")
            setUserLoginStatus(true)
            localStorage.setItem('isLoginUser','true')
                    setTimeout(() => {
                        navigate('/');
                    }, 1000);
                    
                fetchAllTodos()   
                }
            } catch (error) {
                console.log(error)            
            }


        } 

        // logOutUser

        const logOutUser = async()=>{
            const userLogOut = await fetch(`${host}/auth/logout`,{
                method:'GET',
                headers:{
                'Contetn-type':'application/json'                
                },
                credentials:'include'
            })
            if (userLogOut.ok) {
                const result = await userLogOut.json()
                toast.success(result.success)
                window.location.reload()
            }

            
        }
        // fetchAllTodos

        const fetchAllTodos = async () => {
            try {
                const fetchTodos = await fetch(`${host}/todos/fetchAllTodos`, {
                    method: "GET",
                    headers: {
                        "Content-type":"application/json"
                    },
                    credentials:"include"
                })
                if (fetchTodos.status === 401) {
                    console.log(fetchTodos.status)
                    const errorResponse = await fetchTodos.json();
                    console.log(errorResponse.error)
                    toast.error(errorResponse.error)
                    return; // Stop further execution
                }
                if (fetchTodos.ok) {
                    const result = await fetchTodos.json()
                    console.log(result.fetchTodos)
                    const allTodos = result.fetchTodos
                    setTodos(allTodos)
                }
                else{
                    console.log(fetchTodos.error)
                }

            } catch (error) {
                console.log(error)
            }
        }

            useEffect(() => {
                fetchAllTodos()
                console.log("fetching todos")
            }, [])    

        const addTodo = async (input) => {
            try {
                const addTodo = await fetch(`${host}/todos/addtodo`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ input }),
                    credentials:"include"
                })
                if (addTodo.status === 401) {
                    console.log(addTodo.status)
                    const errorResponse = await addTodo.json();
                    console.log(errorResponse.error)
                    toast.error(errorResponse.error)
                    return; // Stop further execution
                }
                
                if (addTodo.ok) {
                    const todoResult = await addTodo.json()
                    setTodos(todos.concat(todoResult.todos))
                    console.log(todoResult.todos)
                    console.log(todoResult.todos._id)
                }
                else {
                    console.log(addTodo.error)
                }

            } catch (error) {
                console.log(error)

            }
        }

        // deleteTodo

        const deleteTodo = async (id) => {
            try {
                const deleteTodo = await fetch(`${host}/todos/deletetodo/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const result = await deleteTodo.json()
                if (deleteTodo.ok) {
                    setTodos(todos.filter(todo => todo._id !== id));
                }
                else(
                    console.log("error")
                )
                console.log(result)
            }
                
            catch (error) {
                console.log(error)
            }
        }

        // updateTodo 


        const updateTodo = async (id,input)=>{
            const updatingTodo = await fetch(`${host}/todos/updatetodo/${id}`,{
                method:"PUT",
                headers:{
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({input})
            })
            const result = await updatingTodo.json()
            // filter is not a good choice to udpate todos
            // setTodos(todos.filter(todo=>
            //     todo._id !== id ? {...todo,input:result.input} : input
            // ))
            setTodos(todos.map(todo => 
                todo._id === id ? { ...todo, input: result.input } : todo
            ));
            console.log(result)
        }


        return (
            <TodoContext.Provider value={{ input, setInput, todos, setTodos, addTodo, deleteTodo,updateTodo,email,setEmail,password,setPassword,loginUser,logError,signUpName,signUpEmail,signUpPassword,setSignUpName,setSignUpEmail,setSignUpPassword,signUpUser,logOutUser,userLoginStatus,setUserLoginStatus}}>
                {children}
            </TodoContext.Provider>
        );
    };



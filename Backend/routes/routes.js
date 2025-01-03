import express from "express"
import { addTodos ,deleteTodos , fetchAllTodos, updateTodo} from "../Contollers/Todos.Controller.js";
import { logIn, logOut, signUp, signUpValidationRules } from "../Contollers/User.Controllers.js";
import fetchuser from "../middleware/fetchuser.js";

const userRouter = express.Router();
const todosRouter = express.Router()
        
todosRouter.get('/fetchAllTodos', fetchuser,fetchAllTodos)
todosRouter.post('/addtodo' ,fetchuser,fetchuser,addTodos)
todosRouter.delete('/deletetodo/:id',deleteTodos)
todosRouter.put('/updatetodo/:id',updateTodo)
userRouter.post("/signup",signUpValidationRules, signUp)
userRouter.post('/login',signUpValidationRules,logIn)
userRouter.get('/logout',logOut)

export  {todosRouter,userRouter}
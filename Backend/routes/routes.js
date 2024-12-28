import express from "express"
import { addTodos ,deleteTodos , fetchAllTodos, updateTodo} from "../Contollers/Todos.Controller.js";
import { logIn, logOut, signUp, signUpValidationRules } from "../Contollers/User.Controllers.js";
import fetchuser from "../middleware/fetchuser.js";

const router = express.Router();
        
router.get('/fetchAllTodos', fetchuser,fetchAllTodos)
router.post('/addtodo' ,fetchuser,fetchuser,addTodos)
router.delete('/deletetodo/:id',deleteTodos)
router.put('/updatetodo/:id',updateTodo)
router.post("/signup",signUpValidationRules, signUp)
router.post('/login',signUpValidationRules,logIn)
router.get('/logout',logOut)

export default router   
import Todos from "../Model/todoSchema.js"

// getting todos

export const fetchAllTodos = async (req, res) => {
    try {   
        const fetchTodos = await Todos.find({user: req.userId})
            res.status(200).json({ fetchTodos })
    } catch (error) {
        res.send(500).json({ error })
    }
}
// adding todos

export const addTodos = async (req, res) => {
    const { input } = req.body
    console.log(req.userId)
    try {
        const todos = await Todos.create({ input , user: req.userId })
        res.status(201).json({ todos })
    } catch (error) {
        res.status(500).json({ error })
    }

}   

// deleting todos


export const deleteTodos = async (req, res) => {
    console.log(req.params.id)
    try {
        const delTodo = await Todos.findByIdAndDelete(req.params.id)
        res.status(200).json(delTodo)
    } catch (error) {
        res.status(500).json({ error })
    }
}



// update todos


export const updateTodo = async (req, res) => {
       const {input} = req.body
    try {
        const updateObj = {}
        if (input) {
            updateObj.input = input 
        }
        const todo = await Todos.findById(req.params.id)
        if (!todo) {
            res.status(400).json({ message: "Todo does not exist" })
            return
        }

        const newTodo = await Todos.findByIdAndUpdate(req.params.id, { $set: updateObj }, { new: true })
        res.status(200).json(newTodo)
    } catch (error) {
        res.status(500).json({ error })
    }
}

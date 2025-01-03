import express from "express"
import {todosRouter,userRouter} from "../routes/routes.js"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser";


const app = express()
const port = 3000
// when we are sending cookies its important to use cookie parser
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials:true
}));

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// connecting to database
try {
  await mongoose.connect('mongodb://127.0.0.1:27017/Todos');
  console.log("connected to database successfully")
} catch (error) {
  console.log(error)
}


app.use("/todos",todosRouter)
app.use("/auth",userRouter)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
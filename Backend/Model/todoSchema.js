import mongoose from 'mongoose';
const { Schema } = mongoose;

const TodoSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
},
    input:{
        type:String,
        required:[true,"please fill the field"],
        minLength:[3,"Please enter a three character long todo"]
    }
}); 


const Todos = mongoose.model('Todos', TodoSchema);
export default Todos
import mongoose from "mongoose"
import pkg from 'validator';
const { isEmail } = pkg;

const { Schema } = mongoose;

const userSchema = new Schema({

      name: {
      type: String,
      required: [true, "please enter your name"],
      minLength:[3, "Name should be atleast 3 characters long"],
      maxLength: [30, "Name should not be greater than 30 characters"]
  },
      email: {
      type:String,
      required: [true, "Please enter your email address"],
      validate: [isEmail, 'Please enter a valid email'],
      unique:true,
      lowercase:true
  },
  password:{
    type:String,
    required:[true,"Please enter your password"],
    minLength:[5,"Password should be atleat 5 characters long"]
  }

});


const User = mongoose.model('user', userSchema);
export default User
import User from "../Model/userSchema.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import pkg from 'bcryptjs';
import { body, validationResult } from 'express-validator'
const { genSalt } = pkg;


// signup route

export const signUpValidationRules = [
    body('name')
    .notEmpty().withMessage('Name is required').bail()
    .isLength({ min: 3 }).withMessage('Name should be at least 3 characters long'),
    body('email')
    .trim().notEmpty().withMessage('Email is required').bail()
    .isEmail().withMessage('Please enter a valid email').bail()
    .normalizeEmail(),
    body('password')
    .notEmpty().withMessage('Password is required').bail()
    .isLength({ min: 5 }).withMessage('Password should be at least 5 characters long'),
];

// creating json web token 

const maxAge = 60 * 60 // this is  value in seconds

const createToken = (id) => {
    return jwt.sign({ id }, 'thisissecretkey', {
        expiresIn: maxAge
    });
};

const handleErrors = (error) => {
    console.log(error)
    let errors = { email: "", name: "", password: "" }
    if (error.code === 11000) {
        return "This email is taken"
    }
    if (error.message.includes("user validation failed")) {
        (Object.values(error.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
            console.log(errors[properties.path] = properties.message)
        }))
        return errors
    }
}

export const signUp = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            console.log(errors.array())
            const error = errors.array().map(error => ` ${error.msg}`);
            res.json({error})
            return
        }
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        const saveAuth = await User.create({ name, email, password:hashedPassword })
        // const saveAuth = await User.create({password})
        res.status(201).json({ success: "sign up successfully" })
    } catch (err) {

        const error = handleErrors(err)
        console.log(error)
        res.status(500).json({ error })
    }
}


// Login route

export const logIn = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (user) {
            const findPassword = await bcrypt.compare(password, user.password)
            if (findPassword) {
                const token = createToken(user._id)
                console.log(token)
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
                return res.status(200).json({ "success": "welcome to home page" })
            }
            else {
                return res.status(400).json({ error: "incorrect email or password" })
            }
        }
        else {
            return res.status(200).json({ error: "incorrect email or password" })
        }


    } catch (err) {
        const error = handleErrors(err)
        res.status(400).json({ error })
    }

}


// Logout route

export const logOut = async (req, res) => {
    try {
        res.cookie('jwt', '', { httpOnly: true, maxAge: 1 }); // Clear the cookie by setting it with an empty value and short expiration
        res.status(200).json({ success: "Logged out successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred during logout" });
    }
};


// Integrating chatgpt's apis

// publishable key 
// pk_test_51QVEFtF4N71ria2J2ngCqfWiqmyvftZgUTEeNUMmeI1l7ScG77F8Jmi2Tc4icboj0F93NX1QTXyGxdq31RFeG8hC003tfqY4XB
// secret key 
// sk_test_51QVEFtF4N71ria2JqtFM0qejpmpV7PD7AUbQVupZRHsrc7mJQVGnycpOQFFCvCORYYMdGNESN5sTkTybF3ZlUPql00OD9YPg0p
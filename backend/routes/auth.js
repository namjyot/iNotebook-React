const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchuser')
const Secret_Key = 'secretkeyofnamjyot';
let success = false;

// Router 1: Sign up; No login required
router.post('/createUser', [
    body('name', 'Enter a valid name!').isLength({min: 3}),
    body('email', 'Enter a valid email address!').isEmail(),
    body('password', 'Password must be of atleast 6 characters!').isLength({min: 6})    
], async (req, res)=>{

    // Checking if the values are valid or not
    
    const result = validationResult(req);
    if (!result.isEmpty()) {
        success = false;
        return res.json({success, errors: result.array() });
    }

    // Using try catch to catch any unexpected error

    try {
        // Checking if the email already exist in the database or not
        let user = await User.findOne({email: req.body.email})
        if(user){
            success = false;
            return res.status(400).json({success, error: "Email already exists!"})
        }

        // Creating a user
        else{
            const salt = bcrypt.genSaltSync(10);
            const secPass = bcrypt.hashSync(req.body.password, salt);
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            })
            
            // Signing the token with JWT
            const data = {
                user: user.id
            }
            const authToken = jwt.sign(data, Secret_Key)
            success = true;
            return res.json({success, authToken})
        }

    } catch (error) {
        success = false;
        return res.status(500).json({success, error:"Unexpected error occured"})
    }
})


// Router 2: Login system; No login required
router.post('/login', [
    body('email', 'Enter a valid email address!').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {

    // Checking if the credentials are valid or not
    const result = validationResult(req);
    if (!result.isEmpty()) {
        success = false
        return res.json({success, errors: result.array() });
    }

    const {email,password} = req.body

    try {
        // Checking if the email exist or not
        const user = await User.findOne({email})
        if(!user){
            success = false;
            return res.status(400).json({success, error: "Please fill the valid credentials"})
        }

        // Checking if the password matching or not
        const comparedPass = bcrypt.compareSync(password, user.password)
        if(!comparedPass){
            success = false;
            return res.status(400).json({success, error: "Please fill the valid credentials"})
        }

        // Signing Token with JSON Web Token (JWT)
        const data = {
            user: user.id
        }
        const authToken = jwt.sign(data, Secret_Key)
        success = true;
        return res.json({success, authToken})
    }
    // Catching any unexpected error
    catch (error) {
        success = false;
        return res.status(500).json({success, error: "Internal Server Error"})
    }
})

// Router 3: verify user and fetch user; Login required

router.post('/getuser', fetchUser, async (req, res)=>{

    try {
        const user = await User.findById(req.user).select("-password");
        success: true;
        return res.json({success, user})
    }
    catch (error) {
        success = false;
        return res.status(500).json({success, error: "Internal Server Error"})
    }
})

module.exports = router
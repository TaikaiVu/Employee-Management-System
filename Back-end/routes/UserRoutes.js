const express = require("express")
const usersModel = require('../models/Users');
const Users = require("../models/Users");
const routes = express.Router()

routes.post('/', (req, res) => {
    res.send("<h1>hello</h1>")
})

// CREATE new account
routes.post('/signup', async (req, res) => {

    try{

        const newUser = new usersModel({
            ...req.body                    // DONE
        });
        await newUser.save();
        res.status(201).json({
            "status": true,
            "message": "Successfully created new User!"
        });

    }catch(error){
        res.status(500).json({
            "status": false,
            "message": 'Error creating new User',
            "Error:": error
        })
    }

})

// User login
routes.post('/login', async (req,res) => {

  
        const {username, password} = req.body;

        const user = await usersModel.findOne({username});    //DONE
        
        if (!user || password !== user.password){
            return res.status(401).json({
                "status": false,
                "message": "Invalid Username and password",
                password,
                user
            });
        }

        res.status(200).json({
            "status": true,
            "message": "User successfully logged in!",
        });


})


module.exports = routes




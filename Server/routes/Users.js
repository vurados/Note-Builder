const express = require('express');
const router = express.Router();
const {User} = require("../models")

router.get('/', async(req, res) => {
    const listOfUsers = await User.findAll()
    res.json(listOfUsers)
});

router.post('/', async(req, res) => {
    const user = req.body
    try {
        const newData = await User.create(user)
        res.status(200).json({msg:'User successfully signed up', data: newData})
    }catch(error){
        console.error(error)
        res.json({msg: 'Error creating user entity', error: error.message})
    }

    // res.send('The error ocurred during creating(posting) user entity into the table')
});

module.exports = router;
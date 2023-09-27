const express = require('express');
const router = express.Router();
const {User} = require("../models")

router.get('/', async(req, res) => {
    const listOfUsers = await User.findAll()
    res.json(listOfUsers)
});

router.post('/', async(req, res) => {
    const user = req.body
    await User.create(user).catch((e) => {
        // res.send(e.name)
        if (e.name === 'SequelizeUniqueConstraintError'){
            return res.json({
                succes: false,
                msg: e.errors.map((er) => er.message)
            })
        }
    })
    res.status(200)
    // res.send('The error ocurred during creating(posting) user entity into the table')
});

module.exports = router;
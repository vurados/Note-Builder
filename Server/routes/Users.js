const express = require('express');
const router = express.Router();
const {User} = require("../models")

router.post('/checkUser', async(req, res) => {
    const {username, password} = req.body
    const user = await User.findOne({where:{username: username, password: password}})
    if (user){
        res.status(200).json({success:true, userID: user.id, user: user, msg:'User exist'})
    }else{
        res.json({success:false, msg:'User not found'})
    }
});

router.post('/createUser', async(req, res) => {
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

router.delete('/deleteUser/:id', async (req, res) => {
    const UserId = req.params.id
    await User.destroy({where: {id: UserId}})
    res.status(200).send(`User ${UserId} has been deleted`)
})

module.exports = router;
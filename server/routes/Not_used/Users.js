const express = require('express');
const router = express.Router();
const {User, sequelize} = require("../models");
const { QueryTypes } = require('sequelize');

router.get('/checkToken', async (req, res) => {
    const token = req.cookies['connect.sid']
    console.log(token);
    res.set('Access-Control-Allow-Origin', req.headers.origin);
    res.set('Access-Control-Allow-Credentials', 'true');
    // res.json('trying to give token')
    if(!token){return res.send('No token')}
    const session = await sequelize.query('SELECT * FROM sessions WHERE session_id = ?', {replacements: [token], type: QueryTypes.SELECT})
    console.log("sessin found in database", session);
    if(!session){return res.send('Session expired')}
    const user = await User.findOne({where:{token: token}})
    console.log("user: ========> ", user);
    res.status(200).json({success:true, userID: user.id, user: user, msg: 'token succesfully used'})
})

router.post('/checkUser', async(req, res) => {
    const {username, password} = req.body
    // console.log(req.cookies);
    const user = await User.findOne({where:{username: username, hashedPassword: password}})
    if (user){
        res.cookie('token', req.session.id, req.session.cookie)
        console.log('req cookie:',req.session.cookie, 'ses id', req.session.id);
        res.set('Access-Control-Allow-Origin', req.headers.origin);
        res.set('Access-Control-Allow-Credentials', 'true');
        user.update({token: req.session.id})
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
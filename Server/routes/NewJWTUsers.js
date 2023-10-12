const { genPassword, issueJWT, verifyPassword } = require('../Authentification/passwordUtils');
const passport = require('passport')
const express = require('express');
const router = express.Router();
const {User, sequelize} = require("../models");
const { QueryTypes } = require('sequelize');
const { log } = require('console');

// 

router.get('/checkToken', passport.authenticate('jwt', {session: false}), async (req, res) => {
    // const token = req.cookies['connect.sid'] //taking session cookie from request
    // console.log(token) // debug tool
    // res.set('Access-Control-Allow-Origin', req.headers.origin);
    // res.set('Access-Control-Allow-Credentials', 'true');
    // // res.json('trying to give token')
    // if(!token){return res.send('No token')}
    // const session = await sequelize.query('SELECT * FROM sessions WHERE session_id = ?', {replacements: [token], type: QueryTypes.SELECT})
    // console.log("sessin found in database", session);
    // if(!session){return res.send('Session expired')}
    // const user = await User.findOne({where:{token: token}})
    // console.log("user: ========> ", user)
    // res.status(200).json({success:true, userID: user.id, user: user, msg: 'token succesfully used'})
    console.log('we are in the check token route');
    res.set('Access-Control-Allow-Origin', req.headers.origin);
    res.set('Access-Control-Allow-Credentials', 'true');
    res.status(200).json({succes: true, msg: 'passport authentification went well, nicuuuuuuuuuuuu'})
})

router.post('/checkUser', async(req, res) => {
    const {username, password} = req.body
    // console.log(req.cookies);
    // const user = await User.findOne({where:{username: username, hashedPassword: password}})
    // if (user){
    //     res.cookie('token', req.session.id, req.session.cookie)
    //     console.log('req cookie:',req.session.cookie, 'ses id', req.session.id);
    //     res.set('Access-Control-Allow-Origin', req.headers.origin);
    //     res.set('Access-Control-Allow-Credentials', 'true');
    //     user.update({token: req.session.id})
    //     res.status(200).json({success:true, userID: user.id, user: user, msg:'User exist'})
    // }else{
    //     res.json({success:false, msg:'User not found'})
    // }
    await User.findOne({where:{username: username}}).then(async (user) => {
        if (!user){
            res.status(401).json({succes: false, msg: 'user with this username not found'})
        }

        const isValid = verifyPassword(password, user.hashedPassword, user.salt)

        if (isValid){
            res.set('Access-Control-Allow-Origin', req.headers.origin);
            res.set('Access-Control-Allow-Credentials', 'true');
            const jwt = issueJWT(user)
            res.status(200).json({msg:'User successfully signed up', user: user, token:jwt.token , expiresIn: jwt.expires})
        } else {
            res.status(401).json({msg:'password is incorrect'})
        }
    }).catch((err) => res.json({msg:err}))
})

router.post('/createUser', async(req, res) => {
    console.log(req);
    const user = req.body
    console.log('user=======>',user);
    const {salt, hash} = genPassword(user.hashedPassword)
    user.hashedPassword = hash
    user.salt = salt
    if(req.cookies){console.log('YOU HAVE COOKIE', req.cookies, req.cookie);}
    try {
        const newUser = await User.create(user)
        res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.set('Access-Control-Allow-Credentials', 'true');
        res.set('Access-Control-Expose-Headers', 'access-control-allow-origin, access-control-allow-credentials')
        const jwt = issueJWT(newUser)
        res.cookie('jwt', jwt)
        res.status(200).json({msg:'User successfully signed up', user: newUser, token:jwt.token , expiresIn: jwt.expires})
    }catch(error){
        console.error(error)
        res.status(401).json({msg: 'Error creating user entity', error: error.message})
    }

    // res.send('The error ocurred during creating(posting) user entity into the table')
});


module.exports = router;
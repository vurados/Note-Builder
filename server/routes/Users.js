const { genPassword, issueJWT, verifyPassword } = require('../Authentification/passwordUtils');
const passport = require('passport')
const express = require('express');
const router = express.Router();
const {User} = require("../models");



// 

router.get('/getUserFromJwt', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const user = {id: req.user.id, username: req.user.username, email: req.user.email}
    res.status(200).json({success: true, user: user, msg: 'passport authentification went well, nicuuuuuuuuuuuu'})
})

router.post('/checkUser', async(req, res) => {
    const {username, password} = req.body
    
    await User.findOne({where:{username: username}}).then((user) => {
        if (!user){
            res.status(401).json({success: false, msg: 'user with this username not found'})
        }
        
        const isValid = verifyPassword(password, user.hashedPassword, user.salt)
        if (isValid){
            const jwt = issueJWT(user)
            res.cookie('jwt', jwt, {maxAge:86400000, httpOnly: true})
            res.cookie('jwtExist', true, {maxAge:86400000})
            res.status(200).json({success: true, msg:'User successfully signed up', user: user})
        } else {
            res.status(401).json({success: false, msg:'password is incorrect'})
        }
    }).catch((err) => res.json({msg:err}))
})

router.post('/createUser', async(req, res) => {
    const user = req.body
    console.log('user=======>',user);
    const {salt, hash} = genPassword(user.hashedPassword)
    user.hashedPassword = hash
    user.salt = salt
    if(req.cookies){console.log('YOU HAVE COOKIE', req.cookies, req.cookie);}
    try {
        const newUser = await User.create(user)
        const jwt = issueJWT(newUser)
        res.cookie('jwt', jwt, {maxAge:86400000, httpOnly: true})
        res.cookie('jwtExist', true, {maxAge:86400000})
        res.status(200).json({success: true, msg:'User successfully signed up', user: newUser})
    }catch(error){
        console.error(error)
        res.status(401).json({success: false, msg: 'Error creating user entity', error: error.message})
    }

    // res.send('The error ocurred during creating(posting) user entity into the table')
});


module.exports = router;
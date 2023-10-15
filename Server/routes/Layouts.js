const express = require('express');
const router = express.Router();
const {Layout} = require("../models")
const {User} = require('../models');
const passport = require('passport');
// const layout = require('../models/layout');


router.get('/getLayouts', passport.authenticate('jwt', {session: false}),async (req, res) => {
    const userId = req.user.dataValues.id
    // res.json(userId)
    console.log('we are in getLayouts');
    const user = await User.findOne({where: {id: userId}})
    const listOfLayout = await user.getLayout()
    res.json(listOfLayout)
})

router.post('/createLayout', passport.authenticate('jwt', {session: false}),async (req, res) => {
    const userId = req.user.dataValues.id
    // todo : i need to change LayoutModal request
    const layout = {title: req.body.title}
    const user = await User.findOne({where: {id: userId}})
    const newLayout = await user.createLayout(layout)
    res.status(200).json(newLayout)
})

router.delete('/deleteLayout/:id', passport.authenticate('jwt', {session: false}),async (req, res) => {
    const LayoutId = req.params.id
    const userId = req.user.dataValues.id
    const user = await User.findOne({where: {id: userId}})
    const layout = await Layout.findOne({where: {id: LayoutId}})
    if(user.id === layout.UID){
        await layout.destroy().then(() => {
            res.status(200).send(`Layout ${LayoutId} has been deleted`)})
        .catch((err) => {
            res.status(402).send('Error ocurred trying to delete Layout')
        })
    }
})


module.exports = router;
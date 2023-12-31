const express = require('express');
const router = express.Router();
const {Layout, User, Note} = require("../models");
const passport = require('passport');
const { checkOwner } = require('../Authentification/checkOwner');
// const layout = require('../models/layout');


router.get('/exportAll', passport.authenticate('jwt', {session: false}), async(req, res) => {
    const userId = req.user.id
    const user = await User.findByPk(userId)
    const LayoutsWithNotes = await user.getLayout({
        include:{
            model: Note,
            as: 'Note',
            attributes: {
            exclude: ["id", "UID", "LID", "createdAt", "updatedAt", ]
        }
        },
        attributes: {
            exclude: ["id", "LID", "createdAt", "updatedAt", ]
        }
    })
    res.json(LayoutsWithNotes)
})

router.get('/getLayouts', passport.authenticate('jwt', {session: false}),async (req, res) => {
    const userId = req.user.id
    // res.json(userId)
    // console.log('we are in getLayouts');
    const user = await User.findOne({where: {id: userId}})
    const listOfLayout = await user.getLayout()
    res.json(listOfLayout)
})

router.post('/createLayout', passport.authenticate('jwt', {session: false}),async (req, res) => {
    const userId = req.user.id
    // TODO : i need to change LayoutModal request
    const layout = {title: req.body.title, width: req.body.width}
    const user = await User.findOne({where: {id: userId}})
    const newLayout = await user.createLayout(layout).
        then((data) => {res.status(200).json(data)}).
            catch((err) => res.status(418).send(err))
    
})

router.put('/changeLayout/:id', passport.authenticate('jwt', {session: false}), checkOwner(Layout), async (req, res) => {
    const layout = req.record
    const newLayout = req.body
    await layout.update(newLayout).
        then((data) => {res.status(200).json(data)}).
            catch((err) => res.status(418).send(err))
})

router.delete('/deleteLayout/:id', passport.authenticate('jwt', {session: false}),async (req, res) => {
    const LayoutId = req.params.id
    const userId = req.user.id
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
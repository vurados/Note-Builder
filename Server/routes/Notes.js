const express = require('express');
const router = express.Router();
const {Note, User, Layout} = require("../models")
const passport = require('passport');

router.post('/getNotesByLayoutId/:id', passport.authenticate('jwt', {session: false}), async(req, res) => {
    const userId = req.user.dataValues.id
    console.log("🚀 ~ file: Notes.js:8 ~ router.get ~ userId:", userId)
    const lid = req.params.id
    console.log("🚀 ~ file: Notes.js:10 ~ router.post ~ lid:", lid)
    
    // const user = await User.findAll({where:{id:userId}, include:{model:Layout, as: 'Layout', where:{id:lid}, include:{model:Note, as: 'Note'}}})
    // console.log("🚀 ~ file: Notes.js:12 ~ router.post ~ user:", JSON.stringify(user[0].Layout[0].Note))
    // const noteees = user[0].Layout[0].Note
    
    const layout = await Layout.findByPk(lid)
    let notes = []
    if(layout.dataValues.UID === userId){
        notes = await layout.getNote()
        // console.log("🚀 ~ file: Notes.js:17 ~ router.post ~ notes:", notes.dataValues)
    }
    res.json(notes)
});

router.post('/createNote', passport.authenticate('jwt', {session: false}), async(req, res) => {
    const note = req.body
    await Note.create(note)
    res.json(note)
});

module.exports = router;
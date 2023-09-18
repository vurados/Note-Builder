const express = require('express');
const router = express.Router();
const {Note} = require("../models")

router.get('/', async(req, res) => {
    const listOfNotes = await Note.findAll()
    res.json(listOfNotes)
});

router.post('/', async(req, res) => {
    const note = req.body
    await Note.create(note)
    res.json(note)
});

module.exports = router;
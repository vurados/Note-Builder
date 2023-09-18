const express = require('express');
const router = express.Router();
const {Layout} = require("../models")

router.get('/', async(req, res) => {
    const listOfLayouts = await Layout.findAll()
    res.json(listOfLayouts)
});

router.post('/', async(req, res) => {
    const layout = req.body
    await Layout.create(layout)
    res.json(layout)
});


module.exports = router;
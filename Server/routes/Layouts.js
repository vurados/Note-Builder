const express = require('express');
const router = express.Router();
const {Layout} = require("../models")
const {User} = require('../models');
// const layout = require('../models/layout');


router.post('/getLayouts', async (req, res) => {
    const userId = req.body.id
    // res.json(userId)
    const user = await User.findOne({where: {id: userId}})
    const listOfLayout = await user.getLayout()
    res.json(listOfLayout)
})

router.post('/createLayout', async (req, res) => {
    const userId = req.body.id
    // todo : i need to change LayoutModal request
    const layout = {title: req.body.title}
    const user = await User.findOne({where: {id: userId}})
    const newLayout = await user.createLayout(layout)
    res.status(200).json(newLayout)
})

router.delete('/deleteLayout/:id', async (req, res) => {
    const LayoutId = req.params.id
    await Layout.destroy({where: {id: LayoutId}})
    res.status(200).send(`Layout ${LayoutId} has been deleted`)
})


module.exports = router;
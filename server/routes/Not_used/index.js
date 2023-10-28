const express = require('express')
const router = express.Router()

const userRouter = require('./NewJWTUsers');
router.use('/api/users', userRouter);

const layoutRouter = require('./Layouts');
userRouter.use('/layouts', layoutRouter);

const noteRouter = require('./Notes');
layoutRouter.use('/notes', noteRouter);

module.exports = router
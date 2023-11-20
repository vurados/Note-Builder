require('dotenv').config()

const express = require("express");
// const session = require("express-session");
const cookieParser = require("cookie-parser");
// const sessionStore = require("express-session-sequelize")(session.Store)
const passport = require('passport')

// connect to database
require("./connectDB");

const db = require('./models');

const app = express();
app.use(cookieParser())

require( './Authentification/pasport_jwt')(passport)

app.use(express.json())
app.use(passport.initialize())
app.use(express.urlencoded({extended: true}))


//Routers 
// TODO: you know what you should do
// app.use(require('./routes'))
app.use('/healthz', (req, res) => {res.status(200).send('OK')})

const userRouter = require('./routes/Users');
app.use('/api/users', userRouter);

const layoutRouter = require('./routes/Layouts');
userRouter.use('/layouts', layoutRouter);

const noteRouter = require('./routes/Notes');
layoutRouter.use('/notes', noteRouter);

if(process.env.NODE_ENV === 'production'){
    console.log('production static serve of build');
    app.use(express.static('./build'))
}

db.sequelize.sync().then(() => {
    const port = process.env.DB_PORT || 3001
    app.listen(port, () => console.info(`server running on port ${port}`))
})

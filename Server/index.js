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

// app.use(require('./routes'))
const userRouter = require('./routes/Users');
app.use('/api/users', userRouter);

const layoutRouter = require('./routes/Layouts');
userRouter.use('/layouts', layoutRouter);

const noteRouter = require('./routes/Notes');
layoutRouter.use('/notes', noteRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => console.log('server running on port 3001'))
})

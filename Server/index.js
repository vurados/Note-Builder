const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const sessionStore = require("express-session-sequelize")(session.Store)
const cors = require("cors")

// connect to database
require("./connectDB");

const db = require('./models');
// initialize store with db.sequelize from ./models/index
const sequelizeSessionStore = new sessionStore({
    db: db.sequelize,
})

const app = express();

app.use(cookieParser())
app.use(express.json())
app.use(cors())

app.use(session({
    // --------------------------------------------------------
    // IMPORTANT!!!!!!!!!!!!!!!! YOU NEED TO CREATE AND MOVE SECRET VALUE TO .env
    secret:'Thats ma little secret',
    // ------------------------------------------------------------
    store: sequelizeSessionStore,
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge: 1000 * 60 * 60 * 24  //thats 1 day in seconds
    },
}))

// const checkAuth = (req, res, next) => {
//     const token = req.header()

//     if(!token){
//         return res.status(401).json({message:'Not Authorized'})
//     }


// }


//Routers 
// TODO: implement this(instead app.use(), use api.use() in routers)
// const api = express()
// app.use('/api', api)

const userRouter = require('./routes/Users');
app.use('/api/users', userRouter);

const layoutRouter = require('./routes/Layouts');
userRouter.use('/layouts', layoutRouter);

const noteRouter = require('./routes/Notes');
layoutRouter.use('/notes', noteRouter);


db.sequelize.sync().then(() => {
    app.listen(3001, () => console.log('server running on port 3001'))
})

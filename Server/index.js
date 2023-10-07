const express = require("express");
const app = express();

const cors = require("cors")

app.use(express.json())
app.use(cors())

require("./connectDB");

const db = require('./models');

//Routers 
// TODO: implement this(instead app.use(), use api.use() in routers)
// const api = express()
// app.use('/api', api)

const userRouter = require('./routes/Users');
app.use('/users', userRouter);

const layoutRouter = require('./routes/Layouts');
app.use('/layouts', layoutRouter);

const noteRouter = require('./routes/Notes');
app.use('/notes', noteRouter);







db.sequelize.sync().then(() => {
app.listen(3001, () => console.log('server running on port 3001'))
})

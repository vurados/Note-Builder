const { Sequelize } = require('sequelize')


// TODO: before deployment need to change it to .env variables
const sequelize = new Sequelize('noteprojectdb', 'root', '05032001', {
    host: process.env.DB_HOST || 'localhost', 
    dialect: 'mysql',
    logging: false,
});

const connect = async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

connect()
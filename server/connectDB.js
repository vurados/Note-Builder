const { Sequelize } = require('sequelize')

let sequelize
if (process.env.NODE_ENV === 'production'){
  console.info('production DB connect');
  sequelize = new Sequelize(`${process.env.DB_DATABASE}`, `${process.env.DB_USERNEME}`, `${process.env.DB_PASSWORD}`, {
    host: process.env.DB_HOST, 
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  });
}else{
  console.info('development DB connect');
  sequelize = new Sequelize('noteprojectdb', 'root', '05032001', {
    host: 'localhost', 
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  });
}

const connect = async() => {
    try {
        await sequelize.authenticate();
        console.info('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

connect()
const { Sequelize } = require('sequelize')
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.js')['production'];

let sequelize
if (process.env.NODE_ENV === 'production'){
  console.info('production DB connect', config.host, config.database, config.username, config.password);
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host, 
    dialect: config.dialect,
    logging: false,
    pool: {
      max: 5,
      min: 0,
      idle: 300
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
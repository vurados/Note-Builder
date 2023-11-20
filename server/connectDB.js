const { Sequelize } = require('sequelize')


if (process.env.NODE_ENV === 'production'){
  console.log('production go brrrrrrrrr');
  const sequelize = new Sequelize(`${process.env.DB_DATABASE}`, `${process.env.DB_USERNEME}`, `${process.env.DB_PASSWORD}`, {
    host: process.env.DB_HOST, 
    dialect: 'mysql',
    logging: false,
  });
}else{
  console.log('development database initialization');
  const sequelize = new Sequelize('noteprojectdb', 'root', '05032001', {
    host: 'localhost', 
    dialect: 'mysql',
    logging: false,
  });
}

// TODO: before deployment need to change it to .env variables

const connect = async() => {
    try {
        await sequelize.authenticate();
        console.info('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

connect()
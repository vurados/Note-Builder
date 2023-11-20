const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];
console.log("🚀 ~ file: index.js:9 ~ const config = require('../config/config.js')[env]", config)
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize.DataTypes);
db.Layout = require('./layout')(sequelize, Sequelize.DataTypes);
db.Note = require('./note')(sequelize, Sequelize.DataTypes);

db.User.hasMany(db.Layout, {foreignKey:'UID', as:'Layout', onDelete: 'CASCADE' });
db.Layout.belongsTo(db.User, {foreignKey:'UID', as:'User', onDelete: 'CASCADE' });
db.Layout.hasMany(db.Note, {foreignKey:'LID', as:'Note', onDelete: 'CASCADE' });
db.Note.belongsTo(db.Layout, {foreignKey:'LID', as:'Layout', onDelete: 'CASCADE' });

module.exports = db;

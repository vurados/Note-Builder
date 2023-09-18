module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
    name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    email:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    password:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return User
}
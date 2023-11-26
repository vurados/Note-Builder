module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
    username:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    email:{
            type: DataTypes.STRING,
            allowNull: false,
            isEmail: true
        },
    password:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    salt:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return User
}
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
    hashedPassword:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    salt:{
            type: DataTypes.STRING,
            // TRUE FOR NOW THEN SHOULD BE FALSE
            allowNull: true,
        },
    });

    return User
}
module.exports = (sequelize, DataTypes) => {
    const Note = sequelize.define("Note", {
    title:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    content:{
            type: DataTypes.STRING,
            allowNull: true,
        },
    x:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    y:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    width:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    height:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    });

    return Note
}
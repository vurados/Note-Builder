module.exports = (sequelize, DataTypes) => {
    const Note = sequelize.define("Note", {
    layoutId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
            
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
            allowNull: false,
        },
    y:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    width:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    height:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return Note
}
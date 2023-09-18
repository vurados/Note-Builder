module.exports = (sequelize, DataTypes) => {
    const Layout = sequelize.define("Layout", {
    userId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
            
    title:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    color:{
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    return Layout
}
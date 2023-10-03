module.exports = (sequelize, DataTypes) => {
    const Layout = sequelize.define("Layout", {
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
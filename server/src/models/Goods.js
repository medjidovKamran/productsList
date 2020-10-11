const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

module.exports = sequelize.define("goods",{
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },

    name: Sequelize.STRING(150),
    description: Sequelize.STRING(400),
    cost: Sequelize.INTEGER(),
    image: Sequelize.STRING(),
})
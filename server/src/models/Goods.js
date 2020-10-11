const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

module.exports = sequelize.define("goods",{
    id: {
        type: Sequelize.INTEGER(),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },

    name: Sequelize.STRING(),
    description: Sequelize.STRING(),
    cost: Sequelize.DOUBLE(),
    image: Sequelize.STRING(),
})
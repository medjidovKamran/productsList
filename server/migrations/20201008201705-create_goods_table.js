'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable("goods", {
            id: {
                type: Sequelize.INTEGER(),
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING(150),
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING(300),
                allowNull: false,
            },
            cost: {
                type: Sequelize.DOUBLE(),
                allowNull: false,
            },
            image: {
                type: Sequelize.STRING(300),
                allowNull: false,
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
        })
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable("goods")
    }
};

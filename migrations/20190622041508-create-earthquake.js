"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("earthquakes", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            name: {
                type: Sequelize.STRING
            },
            mag: {
                type: Sequelize.FLOAT,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            place: {
                type: Sequelize.STRING
            },
            tz: {
                type: Sequelize.STRING
            },
            url: {
                type: Sequelize.STRING
            },
            detail: {
                type: Sequelize.STRING
            },
            felt: {
                type: Sequelize.STRING
            },
            cdi: {
                type: Sequelize.STRING
            },
            mmi: {
                type: Sequelize.STRING
            },
            alert: {
                type: Sequelize.STRING
            },
            status: {
                type: Sequelize.STRING
            },
            tsunami: {
                type: Sequelize.INTEGER
            },
            sig: {
                type: Sequelize.INTEGER
            },
            net: {
                type: Sequelize.STRING
            },
            code: {
                type: Sequelize.STRING
            },
            ids: {
                type: Sequelize.STRING
            },
            sources: {
                type: Sequelize.STRING
            },
            types: {
                type: Sequelize.STRING
            },
            nst: {
                type: Sequelize.INTEGER
            },
            dmin: {
                type: Sequelize.DECIMAL
            },
            rms: {
                type: Sequelize.DECIMAL
            },
            gap: {
                type: Sequelize.INTEGER
            },
            magType: {
                type: Sequelize.STRING
            },
            type: {
                type: Sequelize.STRING
            },
            title: {
                type: Sequelize.STRING
            },
            geometry_type: {
                type: Sequelize.STRING
            },
            coordinates: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("NOW()")
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("NOW()")
            }
        });
    },
    down: queryInterface => {
        return queryInterface.dropTable("earthquakes");
    }
};

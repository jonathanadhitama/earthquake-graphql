"use strict";
module.exports = (sequelize, DataTypes) => {
    const earthquake = sequelize.define(
        "earthquake",
        {
            name: DataTypes.STRING,
            mag: {
                type: DataTypes.FLOAT,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            place: DataTypes.STRING,
            tz: DataTypes.STRING,
            url: DataTypes.STRING,
            detail: DataTypes.STRING,
            felt: DataTypes.STRING,
            cdi: DataTypes.STRING,
            mmi: DataTypes.STRING,
            alert: DataTypes.STRING,
            status: DataTypes.STRING,
            tsunami: DataTypes.INTEGER,
            sig: DataTypes.INTEGER,
            net: DataTypes.STRING,
            code: DataTypes.STRING,
            ids: DataTypes.STRING,
            sources: DataTypes.STRING,
            types: DataTypes.STRING,
            nst: DataTypes.INTEGER,
            dmin: DataTypes.FLOAT,
            rms: DataTypes.FLOAT,
            gap: DataTypes.INTEGER,
            magType: DataTypes.STRING,
            type: DataTypes.STRING,
            title: DataTypes.STRING,
            geometry_type: DataTypes.STRING,
            coordinates: DataTypes.STRING,
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            }
        },
        {}
    );
    earthquake.associate = function(models) {
        // associations can be defined here
    };
    return earthquake;
};

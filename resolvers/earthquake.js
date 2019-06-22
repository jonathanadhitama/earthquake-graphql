const db = require("../models");
const axios = require("axios");
const {
    EARTHQUAKE_API,
    SUCCESS_CODE,
    EMPTY_STRING,
    YESTERDAY_DATE
} = require("../utils/constants");
const { isEmpty, isString } = require("lodash");
const { ApolloError, UserInputError } = require("apollo-server-express");
const { Op } = require("sequelize");
const uuidv4 = require("uuid/v4");

module.exports = {
    earthquake: {
        Query: {
            earthquake: async (_root, { id }) => {
                const earthquake = db.earthquake.findByPk(id);
                if (isEmpty(earthquake)) {
                    throw new UserInputError(
                        "Cannot find earthquake with ID ",
                        id
                    );
                } else {
                    return earthquake;
                }
            },
            biggestEarthquakes: async () => {
                const earthquakes = await db.earthquake.findAll({
                    where: {
                        createdAt: {
                            [Op.lt]: new Date(), //Date less than today
                            [Op.gte]: YESTERDAY_DATE //Date greater than or equal to yesterday
                        }
                    },
                    order: [["mag", "DESC"]], //Order descending by magnitude
                    limit: 10 //Get only 10 earthquakes
                });
                return earthquakes;
            }
        },
        Mutation: {
            fetchEarthquakes: async () => {
                const response = await axios.get(EARTHQUAKE_API);
                const { status, data } = response;
                if (status !== SUCCESS_CODE || isEmpty(data)) {
                    return [];
                } else if (
                    !isEmpty(data) &&
                    Array.isArray(data.features) &&
                    !isEmpty(data.features)
                ) {
                    //Get the first 100 earthquakes
                    const filtered = data.features.slice(0, 100);
                    let output = [];

                    //Inserting into db
                    await db.earthquake.destroy({
                        where: {},
                        truncate: true
                    });
                    for await (const item of filtered) {
                        const { properties, geometry, id } = item;
                        const {
                            mag,
                            place,
                            time,
                            updated,
                            tz,
                            url,
                            detail,
                            felt,
                            cdi,
                            mmi,
                            alert,
                            status,
                            tsunami,
                            sig,
                            ci,
                            code,
                            ids,
                            sources,
                            types,
                            nst,
                            dmin,
                            rms,
                            gap,
                            magType,
                            earthquake,
                            title
                        } = properties;
                        let created = db.earthquake.build({
                            id,
                            mag,
                            place,
                            tz,
                            url,
                            detail,
                            felt,
                            cdi,
                            mmi,
                            alert,
                            status,
                            tsunami,
                            sig,
                            ci,
                            code,
                            ids,
                            sources,
                            types,
                            nst,
                            dmin,
                            rms,
                            gap,
                            magType,
                            earthquake,
                            title,
                            geometry_type:
                                !isEmpty(geometry) && geometry.type
                                    ? geometry.geometry_type
                                    : EMPTY_STRING,
                            coordinates:
                                !isEmpty(geometry) &&
                                !isEmpty(geometry.coordinates)
                                    ? geometry.coordinates.join()
                                    : EMPTY_STRING,
                            createdAt: Date(time),
                            updatedAt: Date(updated)
                        });
                        try {
                            //Attempt to save entry
                            await created.save();
                        } catch (error) {
                            //Throw error
                            throw new ApolloError(
                                `Fail to create earthquake ID ${id}.\nError message: ${
                                    error.message
                                }`,
                                500
                            );
                        }
                        output.push(created);
                    }
                    return output;
                } else {
                    return null;
                }
            },
            updateEarthquake: async (_root, { input: { id, name, mag } }) => {
                const earthquake = await db.earthquake.findByPk(id);
                if (isEmpty(earthquake)) {
                    throw new UserInputError(
                        "Cannot find earthquake with ID ",
                        id
                    );
                }
                try {
                    await earthquake.update({ name, mag });
                } catch (error) {
                    throw new ApolloError(
                        `Fail to update earthquake ID ${id}.\nError message: ${
                            error.message
                        }`,
                        500
                    );
                }
                return earthquake;
            },
            createEarthquake: async (_root, { input: { name, mag } }) => {
                const id = uuidv4();
                let created = db.earthquake.build({
                    id,
                    name,
                    mag
                });
                try {
                    await created.save();
                } catch (error) {
                    throw new ApolloError(
                        `Fail to create earthquake name ${name} with magnitude ${mag}.\nError message: ${
                            error.message
                        }`,
                        500
                    );
                }
                return created;
            }
        },
        Earthquake: {
            coordinates: earthquake => {
                const { coordinates } = earthquake;
                return isString(coordinates)
                    ? coordinates.split(",").map(c => parseFloat(c))
                    : [];
            }
        }
    }
};

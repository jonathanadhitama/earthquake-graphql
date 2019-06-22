const { gql } = require("apollo-server-express");
const earthquake = require("./earthquake");

module.exports = {
    schemas: [
        gql`
            scalar DateTime
            scalar URL
        `,
        gql`
            type Query {
                _: Boolean
            }
            type Mutation {
                _: Boolean
            }
        `,
        earthquake.earthquake
    ]
};

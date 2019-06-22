const { gql } = require("apollo-server-express");

const earthquake = gql`
    extend type Query {
        earthquake(id: ID!): Earthquake
        biggestEarthquakes: [Earthquake]
    }

    extend type Mutation {
        fetchEarthquakes: [Earthquake]
        updateEarthquake(input: UpdateEarthquakeInput): Earthquake
        createEarthquake(input: CreateEarthquakeInput): Earthquake
    }

    type Earthquake {
        id: ID!
        name: String
        mag: Float!
        place: String
        tz: String
        url: URL
        detail: URL
        felt: String
        cdi: String
        mmi: String
        alert: String
        status: String
        tsunami: Int
        sig: Int
        net: String
        code: String
        ids: String
        sources: String
        types: String
        nst: Int
        dmin: Float
        rms: Float
        gap: Int
        magType: String
        type: String
        title: String
        geometry_type: String
        coordinates: [Float]
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    input CreateEarthquakeInput {
        name: String!
        mag: Float!
    }

    input UpdateEarthquakeInput {
        id: ID!
        name: String!
        mag: Float!
    }
`;

module.exports = {
    earthquake: earthquake
};

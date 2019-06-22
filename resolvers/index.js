const { GraphQLDateTime } = require("graphql-iso-date");
const { URL } = require("@okgrow/graphql-scalars");
const { earthquake } = require("./earthquake");

module.exports = {
    resolvers: [{ DateTime: GraphQLDateTime }, { URL: URL }, earthquake]
};

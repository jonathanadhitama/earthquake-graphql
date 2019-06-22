const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { schemas } = require("./schemas/index");
const { resolvers } = require("./resolvers/index");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const { ApolloServer } = require("apollo-server-express");
const db = require("./models/index");

let app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

const graphqlServer = new ApolloServer({
    typeDefs: schemas,
    resolvers
});
graphqlServer.applyMiddleware({ app });

db.sequelize
    .authenticate()
    .then(() => {
        console.log("MySQL Connection has been established successfully.");
    })
    .catch(err => {
        console.error("Unable to connect to the database:", err);
    });

module.exports = app;

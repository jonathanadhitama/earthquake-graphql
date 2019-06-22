# Technology Stack:

-   NodeJS
-   Express
-   Apollo-Server-Express
-   GraphQL
-   Sequelize
-   MySQL
-   Mocha, Chai, Supertest

# Environment Variable:

-   DB_USER: Username of the database
-   DB_PASSWORD: Password of the database user
-   DB_NAME: MySQL Database / Schema name
-   DB_HOST: Database Host

# Starting the application:

-   Navigate to project directory via Terminal
-   \$ npm i
-   Update environment variables
-   \$ node_modules/.bin/sequelize db:migrate
-   \$ DEBUG=earthquake:\* npm start

# Assumptions:

-   Fetching new earthquakes will delete the existing earthquakes entries in the database otherwise ID cannot be guaranteed to be unique
-   Earthquake ID stored is the same as the one retrieved from the API
-   When creating a new earthquake entry, the ID is generated from UUID
-   Earthquake time and updated is stored under columns "createdAt" and "updatedAt" respectively

# Query API Documentation:

### 1. earthquake -> retrieves the earthquake data based on the given ID

    -id: ID (required) the earthquake ID that we want to retrieve

### 2. biggestEarthquakes -> retrieves the top ten highest magnitude earthquakes within the last 24 hours

# Mutation API Documentation:

### 1. fetchEarthquakes -> retrieves 100 earthquakes from this [link](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson) and then puts in the database

### 2. updateEarthquake -> Updates an earthquake's name and magnitude

     - input.id: String (Required) the earthquake ID of the earthquake we want to update
     - input.name: String (Required) the name of the earthquake
     - input.mag: Float (Required) the magnitude of the earthquake

### 3. createEarthquake -> Create a new earthquake

     - input.name: String (Required) the name of the new earthquake
     - input.mag: Float (Required) the magnitude of the new earthquake

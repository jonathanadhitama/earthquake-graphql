Starting the application :

-   Navigate to project directory via Terminal
-   \$ npm i
-   Update environment variables
-   \$ node_modules/.bin/sequelize db:migrate
-   \$ DEBUG=earthquake:\* npm start

Assumptions:

-   Fetching new earthquakes will delete the existing earthquakes entries in the database otherwise ID cannot be guaranteed to be unique
-   Earthquake ID stored is the same as the one retrieved from the API
-   When creating a new earthquake entry, the ID is generated from UUID
-   Earthquake time is stored under the "createdAt" column

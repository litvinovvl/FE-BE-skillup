const {createConnection} = require("typeorm");

const connection = async () => await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "litvinov",
    password: "kZbYJ77G",
    database: "podcastsdb",
    entities: [
      "db/entity/*.ts"
    ],
    logging: true
});

module.exports = connection;
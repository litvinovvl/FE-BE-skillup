import { createConnection, Connection } from "typeorm";

const connection = async (): Promise<Connection> => await createConnection({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
      "db/entity/*.ts"
    ],
    logging: true
});

module.exports = connection;

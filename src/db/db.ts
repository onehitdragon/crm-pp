import { Sequelize } from "sequelize";

const db = new Sequelize({
    database: process.env.DATABASE_NAME,
    dialect: "mysql",
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT!),
    username: process.env.DATBASE_USER,
    password: process.env.DATABASE_PASS,
    timezone: "+07:00"
});

export default db;
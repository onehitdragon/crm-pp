import { Sequelize } from "sequelize";

const db = new Sequelize({
    database: "crmapp",
    dialect: "mysql",
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT!),
    username: process.env.DATBASE_USER,
    password: process.env.DATABASE_PASS
});

export default db;
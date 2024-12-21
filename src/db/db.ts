import { Sequelize } from "@sequelize/core";
import { MySqlDialect } from "@sequelize/mysql";
import City from "../models/City";
import Department from "../models/Department";

import "dotenv/config";

export const sequelize = new Sequelize({
    dialect: MySqlDialect,
    host: process.env.DB_HOST,
    // @ts-ignore
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    models: [City, Department]
});
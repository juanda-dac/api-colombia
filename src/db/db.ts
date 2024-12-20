import { Sequelize } from "@sequelize/core";
import { SqliteDialect } from "@sequelize/sqlite3";
import { City } from "../models/City";
import { Department } from "../models/Department";

export const sequelize = new Sequelize({
    dialect: SqliteDialect,
    storage: "api-colombia.sqlite",
    models: [City, Department]
});
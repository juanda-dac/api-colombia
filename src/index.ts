import express from "express";
import "dotenv/config";

import morgan from "morgan";
import path from "path";
// @ts-ignore
import { createStream } from "rotating-file-stream";


import { sequelize } from "./db/db";

const app = express();

const PORT = process.env.PORT || 3000;

const logStream = createStream("api-colombia.log", {
    interval: "1d",
    path: path.join(__dirname, "log")
})

// Middlewares
app.use(morgan("combined", {
    stream: logStream
}));


sequelize.sync({ alter:true }).then(() => {
    console.log("Database and tables created!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})




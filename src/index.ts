import express from "express";
import morgan from "morgan";
import path from "path";
// @ts-ignore
import { createStream } from "rotating-file-stream";
import { sequelize } from "./db/db";
import { createDepartments } from "./helpers/createDepartments";
import { createCities } from "./helpers/createCities";
import "dotenv/config";

// Import routes
import mainRouter from "./routes/main.routes";
import { create } from "domain";

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

// Register routes
app.use("/api/v1", mainRouter);

// Error handler
app.use((req, res) => {
    res.status(404).json({
        message: "Not found"
    });
})

sequelize.sync({ alter:true }).then(async () => {
    // await createDepartments();
    // await createCities();
    console.log("Database and tables created!");
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})




import express from "express";
import morgan from "morgan";
import path from "path";

import { rateLimit } from "express-rate-limit"

// @ts-ignore
import { createStream } from "rotating-file-stream";
import { sequelize } from "./db/db";
import { createDepartments } from "./helpers/createDepartments";
import { createCities } from "./helpers/createCities";
import "dotenv/config";

// Import routes
import mainRouter from "./routes/main.routes";

const app = express();

const PORT = process.env.PORT || 3000;

const logStream = createStream("api-colombia.log", {
    interval: "1d",
    path: path.join(__dirname, "log")
})

// Middlewares
app.use(express.json());
app.use(morgan("combined", {
    stream: logStream
}));

// Rate limit
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    message: "Too many requests",
}))


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




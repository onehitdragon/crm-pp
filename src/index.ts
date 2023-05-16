import express from "express";
import cors from "cors";
import dotenv from "dotenv"
dotenv.config();
import databaseRoute from "./routes/databaseRoute";
import customerRoute from "./routes/customerRoute";

const app = express();
app.listen(12345, () => {
    console.log("server listening 12345...");
});

// middleware
app.use(cors());
app.use(express.json());

// route
app.use("/api/v1/db", databaseRoute);
app.use("/api/v1/customer", customerRoute);
import express from "express";
import DatabaseController from "../controller/DatabaseController";

const databaseRoute = express.Router();

databaseRoute.post("/recreate", DatabaseController.recreate);
databaseRoute.post("/init", DatabaseController.init);

export default databaseRoute;
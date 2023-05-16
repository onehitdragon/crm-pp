import express from "express";
import CustomerCareController from "../controller/CustomerCareController";

const customerCareRoute = express.Router();

customerCareRoute.get("/:id", CustomerCareController.get);

export default customerCareRoute;
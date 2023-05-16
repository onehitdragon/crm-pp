import express from "express";
import CustomerController from "../controller/CustomerController";

const customerRoute = express.Router();

customerRoute.post("/", CustomerController.create);
customerRoute.get("/:id", CustomerController.get);
customerRoute.put("/:id", CustomerController.update);
customerRoute.delete("/:id", CustomerController.delete);

export default customerRoute;
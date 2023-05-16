import express from "express";
import TransactionController from "../controller/TransactionController";

const transactionRoute = express.Router();

transactionRoute.post("/", TransactionController.create);
transactionRoute.get("/", TransactionController.getAll);
transactionRoute.get("/:id", TransactionController.get);
transactionRoute.put("/:id", TransactionController.update);
transactionRoute.delete("/:id", TransactionController.delete);

export default transactionRoute;
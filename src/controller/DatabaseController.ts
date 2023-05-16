import { Request, Response } from "express";
import Customer from "../model/Customer";
import Product from "../model/Product";
import db from "../db/db";
import Transaction from "../model/Transaction";
import Contact from "../model/Contact";

class DatabaseController{
    public static async recreate(req: Request, res: Response<StandardResponseBody>){
        console.log(Customer, Product, Transaction, Contact);
        try{
            await db.sync({
                force: true
            })
        }
        catch(err){
            return res.status(500).json({
                status: "system error",
                msg: "recreate fail"
            });
        }

        return res.json({
            status: "success",
            msg: "recreate ok"
        });
    }
}

export default DatabaseController;
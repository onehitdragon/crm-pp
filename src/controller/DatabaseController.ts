import { Request, Response } from "express";
import Customer from "../model/Customer";
import Product from "../model/Product";
import db from "../db/db";
import Transaction from "../model/Transaction";
import Contact from "../model/Contact";

class DatabaseController{
    public static async recreate(req: Request, res: Response<StandardResponseBody>){
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

    public static async init(req: Request, res: Response<StandardResponseBody>){
        try{
            const customers = await Customer.bulkCreate([
                {
                    name: "Nguyen A",
                    phone: "0697422601",
                    address: "Quy Nhon",
                    email: "nguyena@gmail.com"
                },
                {
                    name: "Tran B",
                    phone: "0697422602",
                    address: "Ha Noi",
                    email: "tranb@gmail.com"
                },
                {
                    name: "Hong C",
                    phone: "0697422603",
                    address: "HCM City",
                    email: "hongc@gmail.com"
                },
                {
                    name: "Dai D",
                    phone: "0697422604",
                    address: "Vung Tau",
                    email: "daid@gmail.com"
                },
                {
                    name: "Thai E",
                    phone: "0697422605",
                    address: "Thai Nguyen",
                    email: "thaie@gmail.com"
                },
                {
                    name: "Duy F",
                    phone: "0697422606",
                    address: "Nha Trang",
                    email: "duyf@gmail.com"
                },
                {
                    name: "Tuyen G",
                    phone: "0697422607",
                    address: "Binh Dinh",
                    email: "tuyeng@gmail.com"
                }
            ]);
            const products = await Product.bulkCreate([
                {
                    name: "Tu Lanh LG",
                    price: 2200000,
                    availability: 13
                },
                {
                    name: "Tivi LG",
                    price: 4500000,
                    availability: 3
                },
                {
                    name: "Tivi Sony",
                    price: 8350000,
                    availability: 5
                },
                {
                    name: "May giat LG",
                    price: 10350000,
                    availability: 7
                },
                {
                    name: "May lanh Sony",
                    price: 9990000,
                    availability: 12
                }
            ]);
            await Transaction.bulkCreate([
                {
                    customerId: customers[0].id,
                    productId: products[0].id,
                    type: "purchase",
                    date: new Date(),
                    amount: 3
                },
                {
                    customerId: customers[0].id,
                    productId: products[1].id,
                    type: "purchase",
                    date: new Date(),
                    amount: 1
                },
                {
                    customerId: customers[0].id,
                    productId: products[1].id,
                    type: "return",
                    date: new Date(),
                    amount: 6
                },
                {
                    customerId: customers[1].id,
                    productId: products[3].id,
                    type: "return",
                    date: new Date(),
                    amount: 3
                },
                {
                    customerId: customers[2].id,
                    productId: products[4].id,
                    type: "purchase",
                    date: new Date(),
                    amount: 15
                },
                {
                    customerId: customers[3].id,
                    productId: products[0].id,
                    type: "guarantee",
                    date: new Date(),
                    amount: 3
                },
                {
                    customerId: customers[3].id,
                    productId: products[1].id,
                    type: "return",
                    date: new Date(),
                    amount: 3
                }
            ]);
            await Contact.bulkCreate([
                {
                    customerId: customers[0].id,
                    date: new Date(),
                    reason: "Can kiem tra lich su da mua",
                    outcome: "Da giai quyet"
                },
                {
                    customerId: customers[1].id,
                    date: new Date(),
                    reason: "Yeu cau tra hang",
                    outcome: "Khong chap nhan"
                },
                {
                    customerId: customers[1].id,
                    date: new Date(),
                    reason: "Yeu cau bao hanh",
                    outcome: "Khong chap nhan"
                },
                {
                    customerId: customers[2].id,
                    date: new Date(),
                    reason: "Yeu cau bao hanh",
                    outcome: "Chap nhan"
                }
            ]);
        }
        catch(err){
            return res.status(500).json({
                status: "system error",
                msg: "init fail",
                content: err
            });
        }

        return res.json({
            status: "success",
            msg: "init ok"
        });
    }
}

export default DatabaseController;
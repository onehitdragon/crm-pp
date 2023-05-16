import { Request, Response } from "express";
import z from "zod";
import { TransactionDTO } from "../dto";
import TransactionService from "../service/TransactionService";
import { UniqueConstraintError } from "sequelize";

const transactionCreationSchema = z.object({
    customerId: z.string().uuid(),
    productId: z.string().uuid(),
    type: z.union([z.literal("purchase"), z.literal("return"), z.literal("guarantee")]),
    date: z.coerce.date(),
    amount: z.number().min(1)
});

const transactionUpdationSchema = z.object({
    customerId: z.optional(z.string().uuid()),
    productId: z.optional(z.string().uuid()),
    type: z.optional(z.union([z.literal("purchase"), z.literal("return"), z.literal("guarantee")])),
    date: z.optional(z.coerce.date()),
    amount: z.optional(z.number().min(1))
});

class TransactionController{
    public static async create(req: Request, res: Response<StandardResponseBody>){
        const validate = transactionCreationSchema.safeParse(req.body);
        if(!validate.success){
            return res.status(400).json({
                status: "error",
                msg: "missing or wrong field",
                content: validate.error
            });
        }

        let transaction: TransactionDTO;
        try{
            transaction = await TransactionService.save(req.body);
        }
        catch(err){
            return res.status(500).json({
                status: "system error",
                msg: "create fail",
                content: err
            });
        }

        return res.json({
            status: "success",
            msg: "create ok",
            content: {
                transaction: transaction
            }
        });
    }

    public static async getAll(req: Request, res: Response<StandardResponseBody>){
        let transactions: TransactionDTO[];

        try{
            transactions = await TransactionService.findAll();
        }
        catch(err){
            return res.status(500).json({
                status: "system error",
                msg: "create fail",
                content: err
            });
        }

        return res.json({
            status: "success",
            msg: "get all ok",
            content: {
                transactions: transactions
            }
        });
    }

    public static async get(req: Request<{id: string}>, res: Response<StandardResponseBody>){
        const validate = (z.string().uuid()).safeParse(req.params.id);
        if(!validate.success){
            return res.status(400).json({
                status: "error",
                msg: "missing or wrong path",
                content: validate.error
            });
        }

        let transaction: TransactionDTO | null;
        try{
            transaction = await TransactionService.find(req.params.id);
        }
        catch(err){
            return res.status(500).json({
                status: "system error",
                msg: "get fail"
            });
        }
        if(transaction == null){
            return res.status(204).end();
        }

        return res.json({
            status: "success",
            msg: "get ok",
            content: {
                transaction: transaction
            }
        });
    }

    public static async update(req: Request<{id: string}>, res: Response<StandardResponseBody>){
        const validateId = (z.string().uuid()).safeParse(req.params.id);
        if(!validateId.success){
            return res.status(400).json({
                status: "error",
                msg: "missing or wrong path",
                content: validateId.error
            });
        }

        const validate = transactionUpdationSchema.safeParse(req.body);
        if(!validate.success){
            return res.status(400).json({
                status: "error",
                msg: "missing or wrong field",
                content: validate.error
            });
        }

        let effectedRow: number;
        let transaction: TransactionDTO | null;
        try{
            effectedRow = await TransactionService.update(req.params.id, req.body);
            transaction = await TransactionService.find(req.params.id);
        }
        catch(err){
            return res.status(500).json({
                status: "system error",
                msg: "update fail"
            });
        }

        return res.json({
            status: "success",
            msg: "update ok",
            content: {
                transaction,
                effectedRow
            }
        });
    }

    public static async delete(req: Request<{id: string}>, res: Response<StandardResponseBody>){
        const validate = (z.string().uuid()).safeParse(req.params.id);
        if(!validate.success){
            return res.status(400).json({
                status: "error",
                msg: "missing or wrong path",
                content: validate.error
            });
        }

        let effectedRow: number;
        try{
            effectedRow = await TransactionService.destroy(req.params.id);
        }
        catch(err){
            return res.status(500).json({
                status: "system error",
                msg: "delete fail"
            });
        }

        return res.json({
            status: "success",
            msg: "delete ok",
            content: {
                effectedRow
            }
        });
    }
}

export default TransactionController;
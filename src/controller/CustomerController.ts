import { Request, Response } from "express";
import CustomerService from "../service/CustomerService";
import { CustomerDTO } from "../dto";
import { z } from "zod";
import { UniqueConstraintError } from "sequelize";

const customerCreationSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string().min(10).max(11),
    address: z.string()
});

const customerUpdationSchema = z.object({
    name: z.optional(z.string()),
    email: z.optional(z.string().email()),
    phone: z.optional(z.string().min(10).max(11)),
    address: z.optional(z.string())
});

class CustomerController{
    public static async create(req: Request, res: Response<StandardResponseBody>){
        const validate = customerCreationSchema.safeParse(req.body);
        if(!validate.success){
            return res.status(400).json({
                status: "error",
                msg: "missing or wrong field",
                content: validate.error
            });
        }

        let customer: CustomerDTO;
        try{
            customer = await CustomerService.save(req.body);
        }
        catch(err){
            if(err instanceof UniqueConstraintError){
                return res.status(400).json({
                    status: "error",
                    msg: "create fail",
                    content: err.errors.map(e => e.message) 
                });
            }

            return res.status(500).json({
                status: "system error",
                msg: "create fail"
            });
        }

        return res.json({
            status: "success",
            msg: "create ok",
            content: {
                customer: customer
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

        let customer: CustomerDTO | null;
        try{
            customer = await CustomerService.find(req.params.id);
        }
        catch(err){
            return res.status(500).json({
                status: "system error",
                msg: "get fail"
            });
        }
        if(customer == null){
            return res.status(204).end();
        }

        return res.json({
            status: "success",
            msg: "get ok",
            content: {
                customer: customer
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

        const validate = customerUpdationSchema.safeParse(req.body);
        if(!validate.success){
            return res.status(400).json({
                status: "error",
                msg: "missing or wrong field",
                content: validate.error
            });
        }

        let effectedRow: number;
        let customer: CustomerDTO | null;
        try{
            effectedRow = await CustomerService.update(req.params.id, req.body);
            customer = await CustomerService.find(req.params.id);
        }
        catch(err){
            if(err instanceof UniqueConstraintError){
                return res.status(400).json({
                    status: "error",
                    msg: "update fail",
                    content: err.errors.map(e => e.message) 
                });
            }

            return res.status(500).json({
                status: "system error",
                msg: "update fail"
            });
        }

        return res.json({
            status: "success",
            msg: "update ok",
            content: {
                customer,
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
            effectedRow = await CustomerService.destroy(req.params.id);
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

export default CustomerController;
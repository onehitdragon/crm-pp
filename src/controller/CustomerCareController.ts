import { Request, Response } from "express";
import CustomerCareService from "../service/CustomerCareService";
import { z } from "zod";

class CustomerCareController{
    public static async get(req: Request<{id: string}>, res: Response<StandardResponseBody>){
        const validate = (z.string().uuid()).safeParse(req.params.id);
        if(!validate.success){
            return res.status(400).json({
                status: "error",
                msg: "missing or wrong path",
                content: validate.error
            });
        }

        let care;
        try{
            care = await CustomerCareService.find(req.params.id);
        }
        catch(err){
            return res.status(500).json({
                status: "system error",
                msg: "get fail",
                content: err
            });
        }

        return res.json({
            status: "success",
            msg: "get ok",
            content: {
                care
            }
        });
    }
}

export default CustomerCareController;
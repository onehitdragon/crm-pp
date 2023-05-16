import Contact from "../model/Contact";
import Customer from "../model/Customer";
import Product from "../model/Product";

class CustomerCareService{
    public static async find(idCustomer: string){
        const customerCare = await Customer.findOne({
            where: {
                id: idCustomer
            },
            include: [
                {
                    model: Product
                },
                {
                    model: Contact
                }
            ]
        });

        return customerCare;
    }
}

export default CustomerCareService;
import { CustomerCreationDTO, CustomerDTO, CustomerUpdationDTO } from "../dto";
import Customer from "../model/Customer";

class CustomerService{
    public static async save<TCustomerCreation extends CustomerCreationDTO>(customerCreation: TCustomerCreation): Promise<CustomerDTO>{
        const createdCustomer = await Customer.create(customerCreation);

        return createdCustomer.get();
    }

    public static async find(id: string): Promise<CustomerDTO | null>{
        const customer = Customer.findOne({
            where: {
                id: id
            }
        });

        return customer;
    }

    public static async update(id: string, customer: CustomerUpdationDTO): Promise<number>{
        const updatedCustomer = await Customer.update(customer, {
            where: {
                id: id
            }
        });

        return updatedCustomer[0];
    }

    public static async destroy(id: string): Promise<number>{
        const deletedCustomer = await Customer.destroy({
            where: {
                id: id
            }
        })

        return deletedCustomer;
    }
}

export default CustomerService;
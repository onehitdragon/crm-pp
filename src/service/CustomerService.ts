import { Op } from "sequelize";
import { CustomerCreationDTO, CustomerDTO, CustomerUpdationDTO } from "../dto";
import Customer from "../model/Customer";

class CustomerService{
    public static async save<TCustomerCreation extends CustomerCreationDTO>(customerCreation: TCustomerCreation): Promise<CustomerDTO>{
        const createdCustomer = await Customer.create(customerCreation);

        return createdCustomer;
    }

    public static async find(id: string): Promise<CustomerDTO | null>{
        const customer = await Customer.findOne({
            where: {
                id: id
            }
        });

        return customer;
    }

    public static async findAll<TFilter extends CustomerCreationDTO>(filter?: TFilter): Promise<CustomerDTO[] | null>{
        const customers = await Customer.findAll({
            where: {
                ...filter,
                name: filter?.name ? {
                    [Op.like]:  "%" + filter.name + "%"
                } : {
                    [Op.like]: "%%"
                },
                address: filter?.address ? {
                    [Op.like]:  "%" + filter.address + "%"
                } : {
                    [Op.like]: "%%"
                },
                phone: filter?.phone ? {
                    [Op.like]:  "%" + filter.phone + "%"
                } : {
                    [Op.like]: "%%"
                },
                email: filter?.email ? {
                    [Op.like]:  "%" + filter.email + "%"
                } : {
                    [Op.like]: "%%"
                }
            }
        });

        return customers;
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
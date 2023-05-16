import { InferAttributes } from "sequelize";
import Customer from "../model/Customer";

interface CustomerDTO extends InferAttributes<Customer>{}
interface CustomerCreationDTO extends Pick<CustomerDTO, "name" | "address" | "phone" | "email">{}
interface CustomerUpdationDTO extends Partial<CustomerCreationDTO>{}

import { InferAttributes } from "sequelize";
import Customer from "../model/Customer";
import Transaction from "../model/Transaction";

interface CustomerDTO extends InferAttributes<Customer>{}
interface CustomerCreationDTO extends Pick<CustomerDTO, "name" | "address" | "phone" | "email">{}
interface CustomerUpdationDTO extends Partial<CustomerCreationDTO>{}

interface TransactionDTO extends InferAttributes<Transaction>{}
interface TransactionCreationDTO extends Pick<TransactionDTO, "customerId" | "productId" | "type" | "date" | "amount">{}
interface TransactionUpdationDTO extends Partial<TransactionCreationDTO>{}


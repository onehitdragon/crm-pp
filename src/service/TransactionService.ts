import { TransactionCreationDTO, TransactionDTO, TransactionUpdationDTO } from "../dto";
import Transaction from "../model/Transaction";

class TransactionService{
    public static async save(transactionCreation: TransactionCreationDTO): Promise<TransactionDTO>{
        const createdTransaction = await Transaction.create(transactionCreation);

        return createdTransaction;
    }

    public static async findAll(): Promise<TransactionDTO[]>{
        const transactions = await Transaction.findAll();

        return transactions;
    }

    public static async find(id: string): Promise<TransactionDTO | null>{
        const transaction = await Transaction.findOne({
            where: {
                id: id
            }
        });

        return transaction;
    }

    public static async update(id: string, transaction: TransactionUpdationDTO): Promise<number>{
        const updatedTransaction = await Transaction.update(transaction, {
            where: {
                id: id
            }
        });

        return updatedTransaction[0];
    }

    public static async destroy(id: string): Promise<number>{
        const deletedTransaction = await Transaction.destroy({
            where: {
                id: id
            }
        });

        return deletedTransaction;
    }
}

export default TransactionService;
import { InferAttributes, Model, InferCreationAttributes, CreationOptional, ForeignKey, DataTypes } from "sequelize";
import db from "../db/db";
import Customer from "./Customer";
import Product from "./Product";

class Transaction extends Model<InferAttributes<Transaction>, InferCreationAttributes<Transaction>>{
    declare id: CreationOptional<string>;
    declare customerId: ForeignKey<string>;
    declare productId: ForeignKey<string>;
    declare type: "purchase" | "return" | "guarantee";
    declare date: Date;
    declare amount: number;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Transaction.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    type: DataTypes.ENUM("purchase", "return", "guarantee"),
    date: DataTypes.DATE,
    amount: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    sequelize: db,
    tableName: "Transactions"
});

Customer.belongsToMany(Product, {
    through: Transaction,
    foreignKey: {
        name: "customerId"
    }
});

Product.belongsToMany(Customer, {
    through: Transaction,
    foreignKey: {
        name: "productId"
    }
});

export default Transaction;
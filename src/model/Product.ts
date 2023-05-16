import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from "sequelize";
import db from "../db/db";

class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>>{
    declare id: CreationOptional<string>;
    declare name: string;
    declare price: number;
    declare availability: number;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Product.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    availability: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    sequelize: db,
    tableName: "Products"
});

export default Product;
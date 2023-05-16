import { InferAttributes, InferCreationAttributes, Model, CreationOptional, ForeignKey, DataTypes } from "sequelize";
import db from "../db/db";
import Customer from "./Customer";

class Contact extends Model<InferAttributes<Contact>, InferCreationAttributes<Contact>>{
    declare id: CreationOptional<string>;
    declare customerId: ForeignKey<string>;
    declare date: Date;
    declare reason: string;
    declare outcome: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Contact.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    date: DataTypes.DATE,
    reason: DataTypes.STRING,
    outcome: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    sequelize: db,
    tableName: "Contacts"
});

Customer.hasMany(Contact, {
    foreignKey: {
        name: "customerId"
    }
});

export default Contact;
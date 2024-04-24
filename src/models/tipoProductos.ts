import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";

export class TipoProductos extends Model {
    public id?: number;
    public nombre!: string;
}

export interface TipoProductosI {
    nombre: string;
}

TipoProductos.init(
    {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: "tipoProductos",
        sequelize: database,
        timestamps: false
    }
);
import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";

export class ProductoVentas extends Model {
    public productoId!: number;
    public ventaId!: number;
    public cantidad!: string;
    public precio!: string;
    public total!: string;
}

export interface ProductoVentasI {
    productoId: number;
    ventaId: number;
    cantidad: string;
    precio: string;
    total: string;
}

ProductoVentas.init(
    {
        cantidad: {
            type: DataTypes.STRING,
            allowNull: false
        },
        precio: {
            type: DataTypes.STRING,
            allowNull: false
        },
        total: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
    tableName: "productoVentas",
    sequelize: database,
    timestamps: false
}
);
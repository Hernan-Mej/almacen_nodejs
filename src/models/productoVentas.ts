import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";

export class ProductoVentas extends Model {
    public productoId!: number;
    public ventaId!: number;
}

export interface ProductoVentasI {
    productoId: number;
    ventaId: number;
}

ProductoVentas.init(
    {
    }, {
    tableName: "productoVentas",
    sequelize: database,
    timestamps: false
}
);
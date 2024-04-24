import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import { TipoProductos } from "./tipoProductos";

export class Productos extends Model {
    public id?: number;
    public nombre!: string;
    public marca!: string;
    public precio!: number;
    public stockMin!: number;
    public cantidad!: number;
    public tipoProductoID!: number;
}

export interface ProductosI {
    nombre: string;
    marca: string;
    precio: number;
    stockMin: number;
    cantidad: number;
    tipoProductoID: number;
}

Productos.init(
    {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        marca: {
            type: DataTypes.STRING,
            allowNull: false
        },
        precio: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        stockMin: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        tableName: "productos",
        sequelize: database,
        timestamps: false
    }
);

TipoProductos.hasMany(Productos, { foreignKey: 'tipoProductoID' });
Productos.belongsTo(TipoProductos, { foreignKey: 'tipoProductoID'});
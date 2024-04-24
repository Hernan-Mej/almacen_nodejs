import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import { Productos } from "./productos";
import { Cliente } from "./cliente";
import { ProductoVentas } from "./productoVentas";

export class Ventas extends Model {
  public id?: number;
  public fecha!: Date;
  public subtotal!: number;
  public impuestos!: number;
  public descuentos!: number;
  public total!: number;
  public clienteId!: number;
}

export interface VentasI {
  fecha: Date;
  subtotal: number;
  impuestos: number;
  descuentos: number;
  total: number;
  clienteId: number;
}

Ventas.init(
  {
    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    impuestos: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    descuentos: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
  },
  {
    tableName: "ventas",
    sequelize: database,
    timestamps: false
  }
);

Cliente.hasMany(Ventas, { foreignKey: 'clienteId' });
Ventas.belongsTo(Cliente, { foreignKey: 'clienteId'});

Ventas.belongsToMany(Productos, { through: ProductoVentas });
Productos.belongsToMany(Ventas, { through: ProductoVentas });
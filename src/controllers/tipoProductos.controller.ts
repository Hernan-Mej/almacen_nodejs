import { Request, Response } from "express";
import { TipoProductos, TipoProductosI } from "../models/tipoProductos";

export class TipoProductoController {
    public async getAllTipoProducto(req: Request, res: Response) {
        try {
            const tipoProductos = await TipoProductos.findAll() as TipoProductosI[];
            res.status(200).json(tipoProductos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Error interno" });
        }
    }

    public async getOneTipoProducto(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const tipoProducto = await TipoProductos.findOne({ where: { id } }) as TipoProductosI;
            if (!tipoProducto) return res.status(404).json({ msg: "El tipo de producto no existe" });
            return res.status(200).json(tipoProducto);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Error interno" });
        }
    }

    public async createTipoProducto(req: Request, res: Response) {
        try {
            const tipoProducto = req.body as TipoProductosI;
            if (!tipoProducto) return res.status(400).json({ msg: "Sin atributos" });
            const nuevoTipoProducto = await TipoProductos.create({ ...tipoProducto }) as TipoProductosI;
            res.status(201).json(nuevoTipoProducto);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Error interno" });
        }
    }

    public async updateTipoProducto(req: Request, res: Response) {
        try {
            const { id } = req.params;
            let nuevoTipoProducto = req.body as TipoProductosI;
            const tipoProducto = await TipoProductos.findByPk(id) as TipoProductosI;
            if (!tipoProducto) return res.status(404).json({ msg: "El tipo de producto no existe" });
            await TipoProductos.update(nuevoTipoProducto, { where: { id } });
            nuevoTipoProducto = await TipoProductos.findByPk(id) as TipoProductosI;
            return res.status(200).json(nuevoTipoProducto);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Error interno" });
        }
    }

    public async deleteTipoProducto(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const tipoProductoExist = await TipoProductos.findByPk(id) as TipoProductosI;
            if (!tipoProductoExist) return res.status(500).json({ msg: "El tipo de producto no existe" });
            await TipoProductos.destroy({ where: { id } });
            res.status(200).json({ msg: "Tipo de producto eliminado" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Error interno" });
        }
    }
}
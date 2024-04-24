import { Request, Response } from 'express';
import { Ventas, VentasI } from '../models/ventas';

export class VentasController {

    // Obtener todas las ventas
    public async getAllVentas(req: Request, res: Response) {
        try {
            const ventas = await Ventas.findAll() as VentasI[]; // Buscar todas las ventas en la base de datos
            res.status(200).json(ventas); // Devolver las ventas encontradas
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Error interno" }); // Devolver un error si algo sale mal en el servidor
        }
    }

    // Obtener una venta por su ID
    public async getOneVenta(req: Request, res: Response) {
        try {
            const { id } = req.params; // Obtener el ID de la venta de los parámetros de la solicitud
            const venta = await Ventas.findOne({ where: { id } }) as VentasI; // Buscar una venta por su ID en la base de datos
            if (!venta) return res.status(404).json({ msg: "La venta no existe" }); // Devolver un error si la venta no se encuentra
            return res.status(200).json(venta); // Devolver la venta encontrada
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Error interno" }); // Devolver un error si algo sale mal en el servidor
        }
    }

    // Crear una nueva venta
    public async createVenta(req: Request, res: Response) {
        try {
            const venta = req.body as VentasI; // Obtener los datos de la venta del cuerpo de la solicitud
            if (!venta) return res.status(400).json({ msg: "Sin atributos" }); // Devolver un error si no se proporcionan atributos
            const nuevaVenta = await Ventas.create({ ...venta }) as VentasI; // Crear una nueva venta en la base de datos
            res.status(201).json(nuevaVenta); // Devolver la nueva venta creada
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Error interno" }); // Devolver un error si algo sale mal en el servidor
        }
    }

    // Actualizar una venta existente
    public async updateVenta(req: Request, res: Response) {
        try {
            const { id } = req.params; // Obtener el ID de la venta de los parámetros de la solicitud
            let nuevaVenta = req.body as VentasI; // Obtener los datos actualizados de la venta del cuerpo de la solicitud
            const venta = await Ventas.findByPk(id) as VentasI; // Buscar una venta por su ID en la base de datos
            if (!venta) return res.status(404).json({ msg: "La venta no existe" }); // Devolver un error si la venta no se encuentra
            await Ventas.update(nuevaVenta, { where: { id } }); // Actualizar la venta en la base de datos
            nuevaVenta = await Ventas.findByPk(id) as VentasI; // Obtener la venta actualizada de la base de datos
            return res.status(200).json(nuevaVenta); // Devolver la venta actualizada
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Error interno" }); // Devolver un error si algo sale mal en el servidor
        }
    }

    // Eliminar una venta existente
    public async deleteVenta(req: Request, res: Response) {
        try {
            const { id } = req.params; // Obtener el ID de la venta de los parámetros de la solicitud
            const ventaExist = await Ventas.findByPk(id) as VentasI; // Buscar una venta por su ID en la base de datos
            if (!ventaExist) return res.status(404).json({ msg: "La venta no existe" }); // Devolver un error si la venta no se encuentra
            await Ventas.destroy({ where: { id } }); // Eliminar la venta de la base de datos
            res.status(200).json({ msg: "Venta eliminada" }); // Devolver un mensaje de éxito
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Error interno" }); // Devolver un error si algo sale mal en el servidor
        }
    }
}
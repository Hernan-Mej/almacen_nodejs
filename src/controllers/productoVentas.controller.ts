import { Request, Response } from 'express';
import { ProductoVentas, ProductoVentasI } from '../models/ventas';

export class ProductoVentasController {

    // Obtener todas las asociaciones entre producto y venta
    public async getAllProductoVentas(req: Request, res: Response) {
        try {
            const asociaciones = await ProductoVentas.findAll() as ProductoVentasI[]; // Buscar todas las asociaciones entre producto y venta en la base de datos
            res.status(200).json(asociaciones); // Devolver las asociaciones encontradas
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Error interno" }); // Devolver un error si algo sale mal en el servidor
        }
    }

    // Obtener una asociación entre producto y venta por su ID
    public async getOneProductoVenta(req: Request, res: Response) {
        try {
            const { productoId, ventaId } = req.params; // Obtener los IDs del producto y la venta de los parámetros de la solicitud
            const asociacion = await ProductoVentas.findOne({ where: { productoId, ventaId } }) as ProductoVentasI; // Buscar una asociación entre producto y venta por sus IDs en la base de datos
            if (!asociacion) return res.status(404).json({ msg: "La asociación no existe" }); // Devolver un error si la asociación no se encuentra
            res.status(200).json(asociacion); // Devolver la asociación encontrada
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Error interno" }); // Devolver un error si algo sale mal en el servidor
        }
    }

    // Actualizar una asociación entre producto y venta
    public async updateProductoVenta(req: Request, res: Response) {
        try {
            const { productoId, ventaId } = req.params; // Obtener los IDs del producto y la venta de los parámetros de la solicitud
            const nuevaAsociacion = req.body as ProductoVentasI; // Obtener los datos actualizados de la asociación del cuerpo de la solicitud
            const asociacionExistente = await ProductoVentas.findOne({ where: { productoId, ventaId } }); // Buscar la asociación existente entre producto y venta en la base de datos
            if (!asociacionExistente) return res.status(404).json({ msg: "La asociación no existe" }); // Devolver un error si la asociación no se encuentra
            await ProductoVentas.update(nuevaAsociacion, { where: { productoId, ventaId } }); // Actualizar la asociación entre producto y venta en la base de datos
            res.status(200).json(nuevaAsociacion); // Devolver la asociación actualizada
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Error interno" }); // Devolver un error si algo sale mal en el servidor
        }
    }

    // Crear una nueva asociación entre producto y venta
    public async createProductoVenta(req: Request, res: Response) {
        try {
            const { productoId, ventaId } = req.body as ProductoVentasI; // Obtener los IDs del producto y la venta del cuerpo de la solicitud
            if (!productoId || !ventaId) return res.status(400).json({ msg: "Faltan atributos" }); // Devolver un error si faltan atributos
            const asociacion = await ProductoVentas.create({ productoId, ventaId }) as ProductoVentasI; // Crear una nueva asociación entre producto y venta en la base de datos
            res.status(201).json(asociacion); // Devolver la asociación creada
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Error interno" }); // Devolver un error si algo sale mal en el servidor
        }
    }

    // Eliminar una asociación entre producto y venta
    public async deleteProductoVenta(req: Request, res: Response) {
        try {
            const { productoId, ventaId } = req.params; // Obtener los IDs del producto y la venta de los parámetros de la solicitud
            const asociacionExistente = await ProductoVentas.findOne({ where: { productoId, ventaId } }); // Buscar la asociación existente entre producto y venta en la base de datos
            if (!asociacionExistente) return res.status(404).json({ msg: "La asociación no existe" }); // Devolver un error si la asociación no se encuentra
            await ProductoVentas.destroy({ where: { productoId, ventaId } }); // Eliminar la asociación entre producto y venta de la base de datos
            res.status(200).json({ msg: "Asociación eliminada" }); // Devolver un mensaje de éxito
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Error interno" }); // Devolver un error si algo sale mal en el servidor
        }
    }
}
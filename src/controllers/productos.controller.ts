import { Request, Response } from 'express';
import { Productos, ProductosI } from '../models/productos';

export class ProductosController {

    // Obtener todos los productos
    public async getAllProductos(req: Request, res: Response) {
        try {
            const productos = await Productos.findAll() as ProductosI[]; // Buscar todos los productos en la base de datos
            res.status(200).json(productos); // Devolver los productos encontrados
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Error interno" }); // Devolver un error si algo sale mal en el servidor
        }
    }

    // Obtener un producto por su ID
    public async getOneProducto(req: Request, res: Response) {
        try {
            const { id } = req.params; // Obtener el ID del producto de los parámetros de la solicitud
            const producto = await Productos.findOne({ where: { id } }) as ProductosI; // Buscar un producto por su ID en la base de datos
            if (!producto) return res.status(404).json({ msg: "El producto no existe" }); // Devolver un error si el producto no se encuentra
            return res.status(200).json(producto); // Devolver el producto encontrado
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Error interno" }); // Devolver un error si algo sale mal en el servidor
        }
    }

    // Crear un nuevo producto
    public async createProducto(req: Request, res: Response) {
        try {
            const producto = req.body as ProductosI; // Obtener los datos del producto del cuerpo de la solicitud
            if (!producto) return res.status(400).json({ msg: "Sin atributos" }); // Devolver un error si no se proporcionan atributos
            const nuevoProducto = await Productos.create({ ...producto }) as ProductosI; // Crear un nuevo producto en la base de datos
            res.status(201).json(nuevoProducto); // Devolver el nuevo producto creado
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Error interno" }); // Devolver un error si algo sale mal en el servidor
        }
    }

    // Actualizar un producto existente
    public async updateProducto(req: Request, res: Response) {
        try {
            const { id } = req.params; // Obtener el ID del producto de los parámetros de la solicitud
            let nuevoProducto = req.body as ProductosI; // Obtener los datos actualizados del producto del cuerpo de la solicitud
            const producto = await Productos.findByPk(id) as ProductosI; // Buscar un producto por su ID en la base de datos
            if (!producto) return res.status(404).json({ msg: "El producto no existe" }); // Devolver un error si el producto no se encuentra
            await Productos.update(nuevoProducto, { where: { id } }); // Actualizar el producto en la base de datos
            nuevoProducto = await Productos.findByPk(id) as ProductosI; // Obtener el producto actualizado de la base de datos
            return res.status(200).json(nuevoProducto); // Devolver el producto actualizado
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Error interno" }); // Devolver un error si algo sale mal en el servidor
        }
    }

    // Eliminar un producto existente
    public async deleteProducto(req: Request, res: Response) {
        try {
            const { id } = req.params; // Obtener el ID del producto de los parámetros de la solicitud
            const productoExist = await Productos.findByPk(id) as ProductosI; // Buscar un producto por su ID en la base de datos
            if (!productoExist) return res.status(404).json({ msg: "El producto no existe" }); // Devolver un error si el producto no se encuentra
            await Productos.destroy({ where: { id } }); // Eliminar el producto de la base de datos
            res.status(200).json({ msg: "Producto eliminado" }); // Devolver un mensaje de éxito
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Error interno" }); // Devolver un error si algo sale mal en el servidor
        }
    }
}

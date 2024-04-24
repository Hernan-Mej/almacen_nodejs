import { Request, Response } from 'express';
import { Cliente, ClienteI } from '../models/cliente';

export class ClienteController {

    public async getAllCliente(req: Request, res: Response) {
        try {
            const clientes = await Cliente.findAll() as ClienteI[];
            res.status(200).json(clientes)
        } catch (error) { }
    }

    public async getOneCliente(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const cliente = await Cliente.findOne({where: { id }}) as ClienteI;
            if (!cliente) return res.status(404).json({ msg: "El Cliente no existe" });
            return res.status(200).json(cliente);
        } catch (error) {
            return res.status(500).json({ msg: "Error interno" })
        }
    }

    public async createCliente(req: Request, res: Response) {
        try {
            const cliente = req.body as ClienteI;
            if (!cliente) return res.status(400).json({ msg: "sin atributos" });
            const nuevoCliente = await Cliente.create({ ...cliente }) as ClienteI;
            res.status(201).json(nuevoCliente);
        } catch (error) {
            return res.status(400).json({ msg: "atributos invalidos" });
        }
    }

    public async updateCliente(req: Request, res: Response) {
        try {
            const { id } = req.params;
            let nuevoCliente = req.body as ClienteI;
            const cliente = await Cliente.findByPk(id) as ClienteI;
            if (!cliente) return res.status(404).json({ msg: "El Cliente No existe" });
            await Cliente.update(nuevoCliente, {where: { id }});
            nuevoCliente = await Cliente.findByPk(id) as ClienteI;
            if (cliente) return res.status(200).json(nuevoCliente);
        } catch (error) {
            return res.status(500).json({ msg: "Error interno" });
        }
    }

    public async deleteCliente(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const clienteExist = await Cliente.findByPk(id) as ClienteI;
            if (!clienteExist) return res.status(500).json({ msg: "El Cliente No existe" });
            await Cliente.destroy({where: { id }});
            res.status(200).json({ msg: "Cliente Eliminado" });
        } catch (error) {
        }
    }
}
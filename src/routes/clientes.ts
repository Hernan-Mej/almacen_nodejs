import { Application } from "express";
import { ClienteController } from '../controllers/clientes.controller';

export class ClientesRoutes {
    public clienteController: ClienteController =  new ClienteController();

    public routes(app: Application): void {
        app.route("/clientes")
            .get(this.clienteController.getAllCliente)
            .post(this.clienteController.createCliente);

        app.route("/clientes/:id")
            .get(this.clienteController.getOneCliente)
            .put(this.clienteController.updateCliente)
            .delete(this.clienteController.deleteCliente);
    }
}

import { Application } from "express";
import { VentasController } from "../controllers/ventas.controller";

export class VentasRoutes {
    private ventasController: VentasController = new VentasController();

    public routes(app: Application): void {
        app.route('/ventas')
            .get(this.ventasController.getAllVentas)
            .post(this.ventasController.createVenta);

        app.route('/ventas/:id')
            .get(this.ventasController.getOneVenta)
            .put(this.ventasController.updateVenta)
            .delete(this.ventasController.deleteVenta);
    }
}
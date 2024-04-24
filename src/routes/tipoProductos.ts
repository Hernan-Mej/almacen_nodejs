import { Application } from "express";
import { TipoProductoController } from "../controllers/tipoProductos.controller";

export class TipoProductoRoutes {
    private tipoProductoController: TipoProductoController = new TipoProductoController();
    
    public routes(app: Application): void {
        app.route('/tipoProductos')
            .get(this.tipoProductoController.getAllTipoProducto)
            .post(this.tipoProductoController.createTipoProducto);
        
        app.route('/tipoProductos/:id')
            .get(this.tipoProductoController.getOneTipoProducto)
            .put(this.tipoProductoController.updateTipoProducto)
            .delete(this.tipoProductoController.deleteTipoProducto);
    }
}
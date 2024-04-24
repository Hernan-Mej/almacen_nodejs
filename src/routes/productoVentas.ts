import { Application } from "express";
import { ProductoVentasController } from "../controllers/productoVentas.controller";

export class ProductoVentasRoutes {
    private productoVentasController: ProductoVentasController = new ProductoVentasController();
    public routes(app: Application) : void {
        app.route('/productoVentas')
            .get(this.productoVentasController.getAllProductoVentas)
            .post(this.productoVentasController.createProductoVenta);

        app.route('/productoVentas/:productoId/:ventaId')
            .get(this.productoVentasController.getOneProductoVenta)
            .put(this.productoVentasController.updateProductoVenta)
            .delete(this.productoVentasController.deleteProductoVenta);
    }
}
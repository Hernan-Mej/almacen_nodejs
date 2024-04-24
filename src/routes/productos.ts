import { Application } from "express";
import { ProductosController } from "../controllers/productos.controller";

export class ProductosRoutes {
    private productosController: ProductosController = new ProductosController();
    
    public routes(app: Application): void {
        app.route('/productos')
            .get(this.productosController.getAllProductos)
            .post(this.productosController.createProducto);
            
        app.route('/productos/:id')
            .get(this.productosController.getOneProducto)
            .put(this.productosController.updateProducto)
            .delete(this.productosController.deleteProducto);
    }
}
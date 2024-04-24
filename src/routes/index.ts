import { ClientesRoutes,  } from './clientes';
import { ProductosRoutes } from './productos';
import { VentasRoutes } from './ventas';
import { ProductoVentasRoutes } from './productoVentas';
import { TipoProductoRoutes } from './tipoProductos';


export class Routes {
    public clienteRoutes: ClientesRoutes = new ClientesRoutes();
    public productoRoutes: ProductosRoutes = new ProductosRoutes();
    public ventaRoutes: VentasRoutes = new VentasRoutes();
    public productoVentaRoutes: ProductoVentasRoutes = new ProductoVentasRoutes();
    public tipoProductoRoutes: TipoProductoRoutes = new TipoProductoRoutes();
}

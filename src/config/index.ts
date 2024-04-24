import express, { Application } from 'express';
import morgan from 'morgan';
import { Routes } from "../routes/index";

export class App {
    app: Application;
    public routePrv: Routes = new Routes();


    constructor(
        private port?: number | string
    ) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();

    }

    private settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    private middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json()); // leer json raw
        this.app.use(express.urlencoded({ extended: false })); //leer json form
    }


   async listen() {
        await this.app.listen(this.app.get('port'));
        // await this.app.listen(this.port);
        // console.log('Server on port', this.port);
        console.log('Server on port', this.app.get('port'));
    }

    private routes() {
        this.routePrv.clienteRoutes.routes(this.app);
        this.routePrv.productoRoutes.routes(this.app);
        this.routePrv.ventaRoutes.routes(this.app);
        this.routePrv.productoVentaRoutes.routes(this.app);
        this.routePrv.tipoProductoRoutes.routes(this.app);
    }
}
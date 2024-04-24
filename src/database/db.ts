import { Sequelize } from 'sequelize';

const DB_NAME = 'almacen_db';
const DB_USER = 'root';
const DB_PASS = '12345678';

export const database = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASS,
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    }
);

async function generateDb() {
    await database.sync({ force: true });
    console.log('Base de datos y tablas creadas');
}

generateDb();
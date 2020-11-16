import express from 'express';
import bodyParser from 'body-parser';
import ErrorHandling from './utils/ErrorHandling';
import ListsRoutes from './routes/ListsRoutes';
import ItemsRoutes from './routes/ItemsRoutes';

class Router {
    constructor(server: express.Express) {
        const router = express.Router();
        server.use(bodyParser.urlencoded({ extended: true }));
        server.use(bodyParser.json());

        const listsRoutes = new ListsRoutes();
        server.use('/lists', listsRoutes.router);

        const itemsRoutes = new ItemsRoutes();
        server.use('/items', itemsRoutes.router);

        server.use((err, req, res, next) => {
            ErrorHandling(err, req, res, next);
        });
        server.use('/', router);
    }
}

export default Router;

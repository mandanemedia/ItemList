import express from 'express';
import bodyParser from 'body-parser';
import handleError from './utils/handleError';
import GiphyRoutes from './routes/GiphyRoutes';

class Router {
    constructor(server: express.Express) {
        const router = express.Router();
        server.use(bodyParser.urlencoded({ extended: true }));
        server.use(bodyParser.json());

        const giphyRoutes = new GiphyRoutes();
        server.use('/giphy', giphyRoutes.router);

        server.use((err, req, res,
            next) => {
            handleError(err, req, res, next);
        });
        server.use('/', router);
    }
}

export default Router;

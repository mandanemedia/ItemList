import express from 'express';
import Giphy from '../controllers/Giphy';

class GiphyRoutes {
    public router;

    constructor() {
        this.router = express.Router();

        this.router.get('/', async (req, res, next) => {
            try {
                await Giphy.searchImages(req, res);
            } catch (err) {
                next(err);
            }
        });
    }
}

export default GiphyRoutes;

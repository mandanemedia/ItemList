import express from 'express';
import Joi from 'joi';
import lists from '../controllers/Lists';

class ItemsRoutes {
    public router;

    constructor() {
        this.router = express.Router();

        const idSchema = Joi.string().guid().required();

        // find all
        this.router.get('/', async (req, res, next) => {
            try {
                await lists.findAll(req, res);
            } catch (err) {
                next(err);
            }
        });

        // findOne by id
        this.router.get('/:id', async (req, res, next) => {
            try {
                const { error } = idSchema.validate(req.params.id);
                if (error) {
                    throw error;
                }
                await lists.findOneById(req, res);
            } catch (err) {
                next(err);
            }
        });

        // create
        this.router.post('/', async (req, res, next) => {
            try {
                const addSchema = Joi.object().required().keys({
                    listId: Joi.string().guid().required(),
                });
                const validate = addSchema.validate(req.body);
                if (validate.error) {
                    throw validate.error;
                }
                await lists.create(req, res);
            } catch (err) {
                next(err);
            }
        });

        // delete
        this.router.delete('/:id', async (req, res, next) => {
            try {
                const { error } = idSchema.validate(req.params.id);
                if (error) {
                    throw error;
                }
                await lists.delete(req, res);
            } catch (err) {
                next(err);
            }
        });
    }
}

export default ItemsRoutes;

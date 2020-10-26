import express from 'express';
import Joi from 'joi';
import items from '../controllers/Items';

class ItemsRoutes {
    public router;

    constructor() {
        this.router = express.Router();

        const idSchema = Joi.string().guid().required();
        const itemSchema = Joi.object().required().keys({
            listId: Joi.string().guid().required(),
            description: Joi.string().required(),
            order: Joi.number().positive().required(),
        });

        // find all
        this.router.get('/', async (req, res, next) => {
            try {
                const { error } = Joi.string().guid().validate(req.query.listId);
                if (error) {
                    throw error;
                }
                await items.findAll(req, res);
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
                await items.findOneById(req, res);
            } catch (err) {
                next(err);
            }
        });

        // create
        this.router.post('/', async (req, res, next) => {
            try {
                const { error } = itemSchema.validate(req.body);
                if (error) {
                    throw error;
                }
                await items.create(req, res);
            } catch (err) {
                next(err);
            }
        });

        // update
        this.router.put('/:id', async (req, res, next) => {
            try {
                const validate = itemSchema.validate(req.body);
                if (validate.error) {
                    throw validate.error;
                }
                const idValidate = idSchema.validate(req.params.id);
                if (idValidate.error) {
                    throw idValidate.error;
                }
                await items.update(req, res);
            } catch (err) {
                next(err);
            }
        });

        // update Order
        this.router.put('/:id/order/:order', async (req, res, next) => {
            try {
                const orderValidate = Joi.number().positive().required().validate(req.params.order);
                if (orderValidate.error) {
                    throw orderValidate.error;
                }
                const idValidate = idSchema.validate(req.params.id);
                if (idValidate.error) {
                    throw idValidate.error;
                }
                await items.updateOrder(req, res);
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
                await items.delete(req, res);
            } catch (err) {
                next(err);
            }
        });

        // delete By List Id
        this.router.delete('/list/:id', async (req, res, next) => {
            try {
                const { error } = idSchema.validate(req.params.id);
                if (error) {
                    throw error;
                }
                await items.deleteByListId(req, res);
            } catch (err) {
                next(err);
            }
        });
    }
}

export default ItemsRoutes;

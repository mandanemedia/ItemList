import express from 'express';
import Joi from 'joi';
import CustomError, { ErrorStatus } from '../utils/CustomError';
import ListsModel from '../models/ListsModel';

class ItemsRoutes {
    public router;

    constructor() {
        this.router = express.Router();

        const idSchema = Joi.string().guid().required();

        // find all
        this.router.get('/', async (req, res, next) => {
            try {
                await res.json(await ListsModel.findAll());
            } catch (err) {
                next(err);
            }
        });

        // findOne by id
        this.router.get('/:id', async (req, res, next) => {
            try {
                const { error } = idSchema.validate(req.params.id);
                if (error) {
                    throw new CustomError(ErrorStatus.Bad_Request,
                        'itemId is not in the valid format', error.details[0]);
                }

                const list = await ListsModel.findOneById(req.params.id);
                if (list) {
                    return res.json(list);
                }
                throw new CustomError(ErrorStatus.Not_Found, 'List Id is not valid!');
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

                const customer = await ListsModel.create(req.body.listId);
                await res.json(customer);
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

                const deletedCount = await ListsModel.delete(req.params.id);
                if (deletedCount === 1) {
                    await res.json({ id: req.params.id });
                }
                throw new CustomError(ErrorStatus.Not_Found, 'List Id is not valid!');
            } catch (err) {
                next(err);
            }
        });
    }
}

export default ItemsRoutes;

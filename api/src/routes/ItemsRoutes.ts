import express from 'express';
import Joi from 'joi';
import { v4 as uuid } from 'uuid';
import CustomError, { ErrorStatus } from '../utils/CustomError';
import ItemsModel from '../models/ItemsModel';

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
                const { listId } = req.query;
                await res.json(await ItemsModel.findAll(listId));
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
                const { id } = req.params;
                const item = await ItemsModel.findOneById(id);
                if (item) {
                    await res.json(item);
                }
                throw new CustomError(ErrorStatus.Not_Found, 'Item Id is not valid!');
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
                const { listId, description, order } = req.body;
                const itemId = uuid();
                const customer = await ItemsModel.create(itemId, listId, description, order);
                await res.json(customer);
            } catch (err) {
                next(err);
            }
        });

        // update
        this.router.put('/:id', async (req, res, next) => {
            try {
                const updateSchema = Joi.object().required().keys({
                    listId: Joi.string().guid().required(),
                    description: Joi.string().required(),
                });
                const validate = updateSchema.validate(req.body);
                if (validate.error) {
                    throw validate.error;
                }
                const idValidate = idSchema.validate(req.params.id);
                if (idValidate.error) {
                    throw idValidate.error;
                }
                const { listId, description } = req.body;
                const itemId = req.params.id;
                const updatedCount = await ItemsModel.update(itemId, listId, description);
                if (updatedCount[0] === 1) {
                    await res.json({
                        itemId, listId, description,
                    });
                }
                throw new CustomError(ErrorStatus.Not_Found, 'Item Id is not valid!');
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

                const { id, order } = req.params;
                await ItemsModel.updateOrder(id, order);
                await res.json({
                    id, order,
                });
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
                const { id } = req.params;
                const deletedCount = await ItemsModel.delete(id);
                if (deletedCount === 1) {
                    await res.json({ id });
                }
                throw new CustomError(ErrorStatus.Not_Found, 'Item Id is not valid!');
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
                const { id } = req.params;
                await ItemsModel.deleteByListId(id);
                await res.json({ id });
            } catch (err) {
                next(err);
            }
        });
    }
}

export default ItemsRoutes;

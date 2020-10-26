import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { HttpStatusCode } from '../models/types';
import BaseError from '../utils/BaseError';
import ItemsModel from '../models/ItemsModel';

class Items {
    static async findAll(req: Request, res: Response) {
        const { listId } = req.query;
        return res.json(await ItemsModel.findAll(listId));
    }

    static async findOneById(req: Request, res: Response) {
        const { id } = req.params;
        const item = await ItemsModel.findOneById(id);
        if (item) {
            return res.json(item);
        }
        throw new BaseError(HttpStatusCode.NOT_FOUND);
    }

    static async create(req: Request, res: Response) {
        const { listId, description, order } = req.body;
        const itemId = uuid();
        const customer = await ItemsModel.create(itemId, listId, description, order);
        return res.json(customer);
    }

    static async update(req: Request, res: Response) {
        const { listId, description } = req.body;
        const itemId = req.params.id;
        const updatedCount = await ItemsModel.update(itemId, listId, description);
        if (updatedCount[0] === 1) {
            return res.json({
                itemId, listId, description,
            });
        }
        // TODO need to handle cannot update the record
        throw new BaseError(HttpStatusCode.BAD_REQUEST);
    }

    static async updateOrder(req: Request, res: Response) {
        const { id, order } = req.params;
        // console.log(`id:${id} order:${order}`);
        await ItemsModel.updateOrder(id, order);
        return res.json({
            id, order,
        });
    }

    static async delete(req: Request, res: Response) {
        const { id } = req.params;
        const deletedCount = await ItemsModel.delete(id);
        if (deletedCount === 1) {
            return res.json({ id });
        }
        throw new BaseError(HttpStatusCode.NOT_FOUND);
    }

    static async deleteByListId(req: Request, res: Response) {
        const { id } = req.params;
        await ItemsModel.deleteByListId(id);
        return res.json({ id });
    }
}

export default Items;

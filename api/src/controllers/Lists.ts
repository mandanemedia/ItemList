import { Request, Response } from 'express';
import { HttpStatusCode } from '../models/types';
import BaseError from '../utils/BaseError';
import ListsModel from '../models/ListsModel';

class Items {
    static async findAll(req: Request, res: Response) {
        return res.json(await ListsModel.findAll());
    }

    static async findOneById(req: Request, res: Response) {
        const { id } = req.params;
        const list = await ListsModel.findOneById(id);
        if (list) {
            return res.json(list);
        }
        throw new BaseError(HttpStatusCode.NOT_FOUND);
    }

    static async create(req: Request, res: Response) {
        const { listId } = req.body;
        const customer = await ListsModel.create(listId);
        return res.json(customer);
    }

    static async delete(req: Request, res: Response) {
        const { id } = req.params;
        const deletedCount = await ListsModel.delete(id);
        if (deletedCount === 1) {
            return res.json({ id });
        }
        throw new BaseError(HttpStatusCode.NOT_FOUND);
    }
}

export default Items;

import { Op } from 'sequelize';
import BaseError from '../utils/BaseError';
import { HttpStatusCode } from './types';
import { item, list } from './dbModels';
import { sequelize } from '../config/db';

class ItemsModel {
    static findAll(listId:string) {
        if (listId) {
            return item.findAll({
                where: { listId },
                // include: [{
                //     model: list, required: false,
                // }],
                order: [
                    ['order', 'ASC'],
                ],
            });
        }
        return item.findAll({
            include: [{
                model: list, required: false,
            }],
        });
    }

    static findOneById(itemId:string) {
        return item.findOne({
            where: { itemId },
            // include: [{
            //     model: list, required: false,
            // }],
        });
    }

    static async create(itemId :string, listId :string, description :string, order: number) {
        try {
            // console.log(`itemId:${itemId}, listId:${listId}, description:${description}, order:${order}`);
            return await item.create({
                itemId, listId, description, order,
            });
        } catch (e) {
            if (e.name === 'SequelizeForeignKeyConstraintError') {
                throw new BaseError(HttpStatusCode.BAD_REQUEST);
            } else {
                throw new BaseError(HttpStatusCode.INTERNAL_SERVER);
            }
        }
    }

    static async update(itemId :string, listId :string, description :string) {
        try {
            return await item.update(
                { listId, description },
                {
                    where: {
                        itemId,
                    },
                },
            );
        } catch (e) {
            if (e.name === 'SequelizeForeignKeyConstraintError') {
                throw new BaseError(HttpStatusCode.CONFLICT);
            } else {
                throw new BaseError(HttpStatusCode.INTERNAL_SERVER);
            }
        }
    }

    static async updateOrder(itemId :string, order: number) {
        const transaction = await sequelize.transaction();
        try {
            const mainItem = await item.findOne({
                where: {
                    itemId,
                },
                lock: transaction.LOCK.UPDATE,
                transaction,
            });
            const otherItems = await item.findAll({
                where: {
                    listId: mainItem.listId,
                    itemId: {
                        [Op.not]: itemId,
                    },
                    order: {
                        [Op.gte]: order,
                    },
                },
                order: [
                    ['order', 'ASC'],
                ],
                lock: transaction.LOCK.UPDATE,
                transaction,
            });

            mainItem.order = parseInt(order) + otherItems.length + 1;
            await mainItem.save({ transaction });

            let newOrder = parseInt(order) + otherItems.length;
            for (let i = otherItems.length - 1; i >= 0; i -= 1) {
                const otherItem = otherItems[i];
                otherItem.order = newOrder;
                // console.log(`new order is :${newOrder}`);
                await otherItem.save({ transaction });
                newOrder -= 1;
            }

            mainItem.order = order;
            await mainItem.save({ transaction });

            await transaction.commit();
            return mainItem;
        } catch (e) {
            await transaction.rollback();
            if (e instanceof BaseError) {
                throw e;
            } else {
                throw new BaseError(HttpStatusCode.INTERNAL_SERVER);
            }
        }
    }

    static async delete(itemId:string) {
        try {
            return await item.destroy({
                where: {
                    itemId,
                },
            });
        } catch (e) {
            if (e.name === 'SequelizeForeignKeyConstraintError') {
                throw new BaseError(HttpStatusCode.CONFLICT);
            } else {
                throw new BaseError(HttpStatusCode.INTERNAL_SERVER);
            }
        }
    }

    static async deleteByListId(listId:string) {
        try {
            return await item.destroy({
                where: {
                    listId,
                },
            });
        } catch (e) {
            if (e.name === 'SequelizeForeignKeyConstraintError') {
                throw new BaseError(HttpStatusCode.CONFLICT);
            } else {
                throw new BaseError(HttpStatusCode.INTERNAL_SERVER);
            }
        }
    }
}

export default ItemsModel;

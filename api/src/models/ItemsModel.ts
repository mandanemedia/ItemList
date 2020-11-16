import { Op } from 'sequelize';
import CustomError, { ErrorStatus } from '../utils/CustomError';
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
                throw new CustomError(ErrorStatus.Bad_Request,
                    'This is not a valid request because of itemId, order or listId');
            } else if (e.name === 'SequelizeUniqueConstraintError') {
                throw new CustomError(ErrorStatus.Conflict,
                    'This is conflict in the request because of itemId, order or listId');
            } else {
                throw e;
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
                throw new CustomError(ErrorStatus.Bad_Request,
                    'This is not a valid request because of itemId or listId');
            } else if (e.name === 'SequelizeUniqueConstraintError') {
                throw new CustomError(ErrorStatus.Conflict,
                    'This is conflict in the request because of itemId, order or listId');
            } else {
                throw e;
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

            // Temporary Order
            mainItem.order = parseInt(order, 10) + otherItems.length + 100;
            await mainItem.save({ transaction });
            let newOrder = parseInt(order, 10) + otherItems.length + 99;
            for (let i = otherItems.length - 1; i >= 0; i -= 1) {
                const otherItem = otherItems[i];
                otherItem.order = newOrder;
                // console.log(`${otherItem.description} new order is :${newOrder}`);
                await otherItem.save({ transaction });
                newOrder -= 1;
            }
            // new Order
            newOrder = parseInt(order, 10) + otherItems.length;
            for (let i = otherItems.length - 1; i >= 0; i -= 1) {
                const otherItem = otherItems[i];
                otherItem.order = newOrder;
                // console.log(`${otherItem.description} new order is :${newOrder}`);
                await otherItem.save({ transaction });
                newOrder -= 1;
            }
            mainItem.order = order;
            await mainItem.save({ transaction });

            await transaction.commit();
            return mainItem;
        } catch (e) {
            await transaction.rollback();
            throw e;
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
                throw new CustomError(ErrorStatus.Bad_Request,
                    'This is not a valid request because of itemId, order or listId');
            } else {
                throw e;
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
                throw new CustomError(ErrorStatus.Bad_Request,
                    'This is not a valid request because of itemId, order or listId');
            } else {
                throw e;
            }
        }
    }
}

export default ItemsModel;

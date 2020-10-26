import BaseError from '../utils/BaseError';
import { HttpStatusCode } from './types';
import { list } from './dbModels';

class ListsModel {
    static findAll() {
        return list.findAll();
    }

    static findOneById(listId:string) {
        return list.findOne({
            where: {
                listId,
            },
        });
    }

    static async create(listId :string) {
        try {
            return await list.create({ listId });
        } catch (e) {
            if (e.name === 'SequelizeForeignKeyConstraintError') {
                throw new BaseError(HttpStatusCode.BAD_REQUEST);
            } else {
                throw new BaseError(HttpStatusCode.INTERNAL_SERVER);
            }
        }
    }

    static async delete(listId:string) {
        try {
            return await list.destroy({
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

export default ListsModel;

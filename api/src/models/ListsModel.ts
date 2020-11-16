import CustomError, { ErrorStatus } from '../utils/CustomError';
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
                throw new CustomError(ErrorStatus.Bad_Request, 'List Id is not Valid');
            } else {
                throw e;
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
                throw new CustomError(ErrorStatus.Bad_Request, 'List Id is not Valid');
            } else {
                throw e;
            }
        }
    }
}

export default ListsModel;

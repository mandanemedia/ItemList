import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

export const list = sequelize.define('list', {
    listId: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
}, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'list',
});

export const item = sequelize.define('item', {
    description: {
        type: DataTypes.STRING,
    },
    order: {
        type: DataTypes.INTEGER,
    },
    listId: {
        type: DataTypes.UUID,
    },
    itemId: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
}, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'item',
});

item.belongsTo(list, { foreignKey: 'listId' });

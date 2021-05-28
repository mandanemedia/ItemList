import { Sequelize } from 'sequelize';

const dbSettings = {
    database: process.env.POSTGRES_DB || 'postgres',
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'password',
    host: process.env.POSTGRES_HOST || 'localhost',
};

const options = {
    host: dbSettings.host,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 1,
        idle: 10000,
        acquire: 30000,
    },
    freezeTableName: true,
    operatorsAliases: 0,
};
export const sequelize = new Sequelize(dbSettings.database, dbSettings.user, dbSettings.password, options as any);

import { Sequelize } from "sequelize";
import { petTableInit} from "./pet";

// Change name or login details if necessary
const dbName = 'petDB';
const username = 'root';
const password = 'astrongandcomplicatedpassword';

// Change host and port if necessary
const sequelize = new Sequelize(dbName, username, password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

// This will create a table named "pet"
petTableInit(sequelize);

export const db = sequelize;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
const pet_1 = require("./pet");
// Change name or login details if necessary
const dbName = 'petDB';
const username = 'root';
const password = 'astrongandcomplicatedpassword';
// Change host and port if necessary
const sequelize = new sequelize_1.Sequelize(dbName, username, password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});
// This will create a table named "pet"
(0, pet_1.petTableInit)(sequelize);
exports.db = sequelize;

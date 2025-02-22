"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize("BDtest", "sa", "Axel123456", {
    host: "loaclhost",
    dialect: "mssql",
    port: 1433,
    dialectOptions: {
        Option: { encrypt: true, trustServerCertificate: true }
    },
    logging: false
});
exports.default = sequelize;

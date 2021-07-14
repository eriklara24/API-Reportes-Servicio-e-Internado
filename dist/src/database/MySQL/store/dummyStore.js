"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
const config = require("../../../../configuration.json");
const Dummy_1 = __importDefault(require("../../../resources/entities/Dummy"));
class DummyStore {
    constructor() {
        this.connection = mysql.createConnection({
            host: config.host,
            user: config.database.user,
            password: config.database.password,
            database: config.database.name,
        });
        this.connection.connect((err) => {
            if (err)
                throw err;
        });
    }
    /* Insert function using a Dummy object as parameter */
    createDummy(dummy, callback) {
        const insert = 'INSERT INTO dummy(id, dummy) VALUES (?, ?)';
        this.connection.query(insert, [String(dummy.getId()), dummy.getDummy()], (error) => {
            if (error) {
                throw error;
            }
            return callback(null, 'Dummy created!');
        });
    }
    /* Update function using a Dummy object as parameter */
    updateDummy(dummy, callback) {
        const update = 'UPDATE dummy SET id=?, dummy=? WHERE id=?';
        this.connection.query(update, [String(dummy.getId()), dummy.getDummy(), String(dummy.getId())], (error, res) => {
            if (error) {
                throw error;
            }
            return callback(null, `Dummy updated: ${res.message}`);
        });
    }
    /* Get function using a Dummy 'id' integer as parameter */
    getDummy(id, callback) {
        const select = 'SELECT * FROM dummy WHERE id = ?';
        this.connection.query(select, [String(id)], (error, res) => {
            if (error) {
                throw error;
            }
            if (res.length < 1) {
                return callback('The Dummy id does not exists', null);
            }
            const dummyData = new Dummy_1.default(res[0].id, res[0].dummy);
            return callback(null, dummyData);
        });
    }
    /* Delete function using a Dummy 'id' integer as parameter */
    deleteDummy(id, callback) {
        const del = 'DELETE FROM dummy WHERE id = ?';
        this.connection.query(del, [String(id)], (error, res) => {
            if (error) {
                throw error;
            }
            return callback(null, `Dummy deleted: ${res.message}`);
        });
    }
}
exports.default = DummyStore;
//# sourceMappingURL=DummyStore.js.map
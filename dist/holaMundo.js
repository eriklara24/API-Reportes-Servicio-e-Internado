"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("./configuration.json");
const DummyStore_1 = __importDefault(require("./src/database/MySQL/store/DummyStore"));
const Dummy_1 = __importDefault(require("./src/resources/entities/Dummy"));
const dummy = new DummyStore_1.default();
console.log(`Hola mundo. Estoy ejecutandome en ${config.host} en el puerto ${config.port}`);
/* DummyStore Functions */
// Create
dummy.createDummy(new Dummy_1.default(5, 'test dummy number 5'), (err, res) => {
    if (!err) {
        console.log(`Create: ${res}`);
    }
});
// Update
dummy.updateDummy(new Dummy_1.default(5, 'test dummy number 5 updated'), (err, res) => {
    if (!err) {
        console.log(`Update: ${res}`);
    }
});
// Get
dummy.getDummy(5, (err, res) => {
    if (!err) {
        console.log(`Get Dummy: ${res.getDummy()}`);
    }
    else {
        console.log(err);
    }
});
// Delete
dummy.deleteDummy(5, (err, res) => {
    if (!err) {
        console.log(res);
    }
});
//# sourceMappingURL=holaMundo.js.map
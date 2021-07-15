"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const config = require("./configuration.json");
const index_1 = __importDefault(require("./src/database/index"));
const Dummy_1 = __importDefault(require("./src/resources/entities/Dummy"));
console.log(`Hola mundo. Estoy ejecutandome en ${config.host} en el puerto ${config.port}`);
/* DummyStore Functions */
// Create
index_1.default.dummyStore.createDummy(new Dummy_1.default(5, 'test dummy number 5'), (err, res) => {
    if (!err) {
        console.log(`Create: ${res}`);
    }
});
// Update
index_1.default.dummyStore.updateDummy(new Dummy_1.default(5, 'test dummy number 5 updated'), (err, res) => {
    if (!err) {
        console.log(`Update: ${res}`);
    }
});
// Get
index_1.default.dummyStore.getDummy(5, (err, res) => {
    if (!err) {
        console.log(`Get Dummy: ${res.getDummy()}`);
    }
    else {
        console.log(err);
    }
});
// Delete
index_1.default.dummyStore.deleteDummy(5, (err, res) => {
    if (!err) {
        console.log(res);
    }
});

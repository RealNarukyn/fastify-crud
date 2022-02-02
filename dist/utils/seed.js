"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-await-in-loop */
/* eslint-disable camelcase */
const mongoose_1 = __importDefault(require("mongoose"));
// -- [ Globals ]
const config_1 = __importDefault(require("../config"));
// -- [ Models ]
const category_model_1 = require("../models/category.model");
const entry_model_1 = require("../models/entry.model");
const defaultTypes = ['Electric', 'Fight', 'Fire', 'Water', 'Steel'];
const num_entries = 10;
(() => __awaiter(void 0, void 0, void 0, function* () {
    // -- Open conn.
    yield mongoose_1.default
        .connect(config_1.default.MONGO.host)
        .then(() => console.log('Connected to Database'))
        .catch((err) => {
        throw new Error(err);
    });
    // -- Drop old database
    try {
        yield category_model_1.CategoryModel.collection.drop();
    }
    catch (error) {
        console.log("[ DIDN'T DROP CATEGORY COLLECTION ]");
    }
    try {
        yield entry_model_1.EntryModel.collection.drop();
    }
    catch (error) {
        console.log("[ DIDN'T DROP ENTRY COLLECTION ERR ]");
    }
    // -- Create default Categories
    const defaultCategories = [];
    for (let i = 0; i < defaultTypes.length; i++) {
        const newCategory = yield category_model_1.CategoryModel.create({
            category: defaultTypes[i],
            description: `Pokemons whose base type is ${defaultTypes[i]}.`
        });
        defaultCategories.push(newCategory);
    }
    // -- Create random Entries
    for (let i = 0; i < num_entries; i++) {
        const rand = Math.floor(Math.random() * defaultTypes.length);
        const newEntry = new entry_model_1.EntryModel({
            title: `Entry ${i}`,
            description: `Default description for Entry ${i}`,
            category: defaultCategories[rand]._id
        });
        yield newEntry.save();
    }
    // -- Close conn.
    yield mongoose_1.default.disconnect().then(() => console.log('Closing Database'));
}))();

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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
// -- Utils
const helper_1 = require("../utils/helper");
// -- Models
const category_model_1 = require("../models/category.model");
const entry_model_1 = require("../models/entry.model");
class EntryController {
}
_a = EntryController;
EntryController.main = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const entries = yield entry_model_1.EntryModel.find().lean();
    const categories = yield category_model_1.CategoryModel.find().lean();
    // -- Returning Object
    const data = [];
    // -- Get Related Categories
    for (let i = 0; i < entries.length; i++) {
        data.push({
            entry: entries[i],
            category: categories.filter((e) => e._id.equals(entries[i].category))[0]
        });
    }
    reply.view('views/entries.hbs', { data, categories });
});
EntryController.search = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(request.body);
    const { category } = request.body;
    const entries = yield entry_model_1.EntryModel.find({
        category
    }).lean();
    const categories = yield category_model_1.CategoryModel.find().lean();
    // -- Returning Object
    const data = [];
    // -- Get Related Categories
    for (let i = 0; i < entries.length; i++) {
        data.push({
            entry: entries[i],
            category: categories.filter((e) => e._id.equals(entries[i].category))[0]
        });
    }
    reply.view('views/entries.hbs', { data, categories });
});
EntryController.remove = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = request.query;
    yield entry_model_1.EntryModel.findByIdAndDelete(_id);
    reply.redirect('/entries');
});
EntryController.removeAll = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    yield entry_model_1.EntryModel.deleteMany();
    reply.redirect('/entries');
});
EntryController.add = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, category } = request.body;
    const cTitle = helper_1.Helper.capitalizeStrings(title);
    const newEntry = new entry_model_1.EntryModel({
        title: cTitle,
        description,
        category
    });
    yield newEntry.save();
    reply.redirect('/entries');
});
exports.default = EntryController;

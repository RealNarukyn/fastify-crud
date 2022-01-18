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
class CategoryController {
}
_a = CategoryController;
CategoryController.main = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield category_model_1.CategoryModel.find().lean();
    reply.view('views/categories.hbs', { data: categories });
});
CategoryController.remove = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = request.query;
    yield category_model_1.CategoryModel.findByIdAndDelete(_id);
    reply.redirect('/categories');
});
CategoryController.removeAll = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    yield category_model_1.CategoryModel.deleteMany();
    reply.redirect('/categories');
});
CategoryController.add = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { category, description } = request.body;
    const cCategory = helper_1.Helper.capitalizeStrings(category);
    const newCategory = new category_model_1.CategoryModel({
        category: cCategory,
        description
    });
    yield newCategory.save();
    reply.redirect('/categories');
});
exports.default = CategoryController;

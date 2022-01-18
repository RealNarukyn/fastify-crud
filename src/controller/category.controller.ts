import { FastifyReply, FastifyRequest } from 'fastify';

// -- Utils
import { Helper } from '../utils/helper';

// -- Models
import { CategoryModel } from '../models/category.model';

// -- Types
import { AddRQ, ICategory } from '../types/category.type';
import { RemoveRQ } from '../types/global.type';

class CategoryController {
  static main = async (request: FastifyRequest, reply: FastifyReply) => {
    const categories: Array<ICategory> = await CategoryModel.find().lean();

    reply.view('views/categories.hbs', { data: categories });
  };

  static remove = async (request: RemoveRQ, reply: FastifyReply) => {
    const { _id } = request.query;
    await CategoryModel.findByIdAndDelete(_id);

    reply.redirect('/categories');
  };

  static removeAll = async (request: FastifyRequest, reply: FastifyReply) => {
    await CategoryModel.deleteMany();

    reply.redirect('/categories');
  };

  static add = async (request: AddRQ, reply: FastifyReply) => {
    const { category, description } = request.body;

    const cCategory = Helper.capitalizeStrings(category);

    const newCategory: ICategory = new CategoryModel({
      category: cCategory,
      description
    });
    await newCategory.save();

    reply.redirect('/categories');
  };
}

export default CategoryController;

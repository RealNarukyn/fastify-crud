import { FastifyReply, FastifyRequest } from 'fastify';

// -- Utils
import { Helper } from '../utils/helper';

// -- Models
import { CategoryModel } from '../models/category.model';
import { EntryModel } from '../models/entry.model';

// -- Interfaces
import { ICategory } from '../types/category.type';
import { AddRQ, IEntry, SearchRQ } from '../types/entry.type';
import { RemoveRQ } from '../types/global.type';

class EntryController {
  static main = async (request: FastifyRequest, reply: FastifyReply) => {
    const entries: Array<IEntry> = await EntryModel.find().lean();
    const categories: Array<ICategory> = await CategoryModel.find().lean();

    // -- Returning Object
    const data: Array<{ entry: IEntry; category: ICategory }> = [];

    // -- Get Related Categories
    for (let i = 0; i < entries.length; i++) {
      data.push({
        entry: entries[i],
        category: categories.filter((e: ICategory) => e._id.equals(entries[i].category))[0]
      });
    }

    reply.view('views/entries.hbs', { data, categories });
  };

  static search = async (request: SearchRQ, reply: FastifyReply) => {
    console.log(request.body);

    const { category } = request.body;
    const entries: Array<IEntry> = await EntryModel.find({
      category
    }).lean();

    const categories: Array<ICategory> = await CategoryModel.find().lean();

    // -- Returning Object
    const data: Array<{ entry: IEntry; category: ICategory }> = [];

    // -- Get Related Categories
    for (let i = 0; i < entries.length; i++) {
      data.push({
        entry: entries[i],
        category: categories.filter((e: ICategory) => e._id.equals(entries[i].category))[0]
      });
    }

    reply.view('views/entries.hbs', { data, categories });
  };

  static remove = async (request: RemoveRQ, reply: FastifyReply) => {
    const { _id } = request.query;
    await EntryModel.findByIdAndDelete(_id);

    reply.redirect('/entries');
  };

  static removeAll = async (request: FastifyRequest, reply: FastifyReply) => {
    await EntryModel.deleteMany();

    reply.redirect('/entries');
  };

  static add = async (request: AddRQ, reply: FastifyReply) => {
    const { title, description, category } = request.body;

    const cTitle = Helper.capitalizeStrings(title);

    const newEntry: IEntry = new EntryModel({
      title: cTitle,
      description,
      category
    });
    await newEntry.save();

    reply.redirect('/entries');
  };
}

export default EntryController;

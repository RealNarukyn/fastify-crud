/* eslint-disable no-await-in-loop */
/* eslint-disable camelcase */
import mongoose from 'mongoose';

// -- [ Globals ]
import config from '../config';

// -- [ Models ]
import { CategoryModel } from '../models/category.model';
import { EntryModel } from '../models/entry.model';
import { ICategory } from '../types/category.type';
import { IEntry } from '../types/entry.type';

const defaultTypes = ['Electric', 'Fight', 'Fire', 'Water', 'Steel'];
const num_entries = 10;

(async () => {
  // -- Open conn.
  await mongoose
    .connect(config.MONGO.host)
    .then(() => console.log('Connected to Database'))
    .catch((err) => {
      throw new Error(err);
    });

  // -- Drop old database
  try {
    await CategoryModel.collection.drop();
  } catch (error) {
    console.log("[ DIDN'T DROP CATEGORY COLLECTION ]");
  }
  try {
    await EntryModel.collection.drop();
  } catch (error) {
    console.log("[ DIDN'T DROP ENTRY COLLECTION ERR ]");
  }

  // -- Create default Categories
  const defaultCategories: Array<ICategory> = [];

  for (let i = 0; i < defaultTypes.length; i++) {
    const newCategory: ICategory = await CategoryModel.create({
      category: defaultTypes[i],
      description: `Pokemons whose base type is ${defaultTypes[i]}.`
    });
    defaultCategories.push(newCategory);
  }

  // -- Create random Entries
  for (let i = 0; i < num_entries; i++) {
    const rand = Math.floor(Math.random() * defaultTypes.length);

    const newEntry: IEntry = new EntryModel({
      title: `Entry ${i}`,
      description: `Default description for Entry ${i}`,
      category: defaultCategories[rand]._id
    });
    await newEntry.save();
  }

  // -- Close conn.
  await mongoose.disconnect().then(() => console.log('Closing Database'));
})();

import bcrypt from 'bcryptjs';

export class Helper {
  static capitalizeStrings = (str: string): string => str
    .trim()
    .split(' ')
    .map(
      (e: string) => e.slice(0, 1).toUpperCase() + e.substring(1).toLowerCase()
    )
    .join(' ');

  static hash = (pass: string):string => bcrypt.hashSync(pass, bcrypt.genSaltSync(10));
}

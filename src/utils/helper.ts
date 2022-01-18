export class Helper {
  static capitalizeStrings = (str: string): string => {
    return str
      .trim()
      .split(' ')
      .map(
        (e: string) =>
          e.slice(0, 1).toUpperCase() + e.substring(1).toLowerCase()
      )
      .join(' ');
  };
}

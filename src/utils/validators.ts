export class Validators {
  static checkEnvVar = (variable: string, val?: string) => {
    if (!val) {
      throw new Error(
        `[ WATCHOUT! -- You passed ${variable} with value ${val} ]`
      );
    }
    return val;
  };
}

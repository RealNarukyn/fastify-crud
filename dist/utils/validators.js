"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validators = void 0;
class Validators {
}
exports.Validators = Validators;
Validators.checkEnvVar = (variable, val) => {
    if (!val) {
        throw new Error(`[ WATCHOUT! -- You passed ${variable} with value ${val} ]`);
    }
    return val;
};

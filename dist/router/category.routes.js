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
// -- My Controllers
const category_controller_1 = __importDefault(require("../controller/category.controller"));
const categoryRouter = (app) => __awaiter(void 0, void 0, void 0, function* () {
    // -- [ GET Routers ]
    app.get('/', category_controller_1.default.main);
    app.get('/rm', category_controller_1.default.remove);
    app.get('/rm-all', category_controller_1.default.removeAll);
    // -- [ POST Routers ]
    app.post('/', category_controller_1.default.add);
});
exports.default = categoryRouter;

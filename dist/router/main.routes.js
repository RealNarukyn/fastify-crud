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
const main_controller_1 = __importDefault(require("../controller/main.controller"));
// -- Routers
const entry_routes_1 = __importDefault(require("./entry.routes"));
const category_routes_1 = __importDefault(require("./category.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const mainRouter = (app) => __awaiter(void 0, void 0, void 0, function* () {
    // -- [ GET Routers ]
    app.get('/', main_controller_1.default.main);
    // -- [ Other Routers ]
    app.register(entry_routes_1.default, { prefix: '/entries' });
    app.register(category_routes_1.default, { prefix: '/categories' });
    app.register(auth_routes_1.default, { prefix: '/auth' });
});
exports.default = mainRouter;

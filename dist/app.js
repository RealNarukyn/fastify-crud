"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const fastify_static_1 = __importDefault(require("fastify-static"));
const point_of_view_1 = __importDefault(require("point-of-view"));
const handlebars = __importStar(require("handlebars"));
const path = __importStar(require("path"));
const fastify_formbody_1 = __importDefault(require("fastify-formbody"));
const mongoose_1 = __importDefault(require("mongoose"));
// -- Globals
const config_1 = __importDefault(require("./config"));
// -- Routes
const main_routes_1 = __importDefault(require("./router/main.routes"));
const entry_routes_1 = __importDefault(require("./router/entry.routes"));
const category_routes_1 = __importDefault(require("./router/category.routes"));
const mainApp = (app) => __awaiter(void 0, void 0, void 0, function* () {
    // -- Connect to the Database
    mongoose_1.default
        .connect(config_1.default.MONGO.host)
        .then(() => console.log('Connected to Database'))
        .catch((err) => {
        throw new Error(err);
    });
    // -- Serve static files
    app.register(fastify_static_1.default, {
        root: path.join(__dirname, '../public'),
        prefix: '/static/'
    });
    // -- Serve .hbs views
    app.register(point_of_view_1.default, {
        engine: { handlebars },
        layout: './views/layouts/main.hbs',
        options: {
            partials: {
                navbar: './views/partials/navbar.hbs',
                footer: './views/partials/footer.hbs',
                entry: './views/partials/entry.hbs',
                category: './views/partials/category.hbs'
            }
        }
    });
    // -- Accept Form Bodies
    app.register(fastify_formbody_1.default);
    // -- Router
    app.register(main_routes_1.default);
    app.register(entry_routes_1.default, { prefix: '/entries' });
    app.register(category_routes_1.default, { prefix: '/categories' });
});
exports.default = mainApp;

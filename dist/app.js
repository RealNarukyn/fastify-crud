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
const fastify_static_1 = __importDefault(require("fastify-static"));
const point_of_view_1 = __importDefault(require("point-of-view"));
const handlebars_1 = __importDefault(require("handlebars"));
const path_1 = __importDefault(require("path"));
const fastify_formbody_1 = __importDefault(require("fastify-formbody"));
const mongoose_1 = __importDefault(require("mongoose"));
const fastify_mongodb_1 = __importDefault(require("fastify-mongodb"));
const fastify_cookie_1 = __importDefault(require("fastify-cookie"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const session_1 = __importDefault(require("@fastify/session"));
// -- Passport Config
const passport_1 = require("./passport");
// -- Globals
const config_1 = __importDefault(require("./config"));
// -- Router
const main_routes_1 = __importDefault(require("./router/main.routes"));
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
        root: path_1.default.join(__dirname, '../public'),
        prefix: '/static/'
    });
    // -- Serve .hbs views
    app.register(point_of_view_1.default, {
        engine: { handlebars: handlebars_1.default },
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
    // -- Create connection to the database for sessions
    app.register(fastify_mongodb_1.default, {
        forceClose: true,
        url: config_1.default.MONGO.host,
        name: 'MONGO1'
    });
    // -- Prepare accepting cookies
    app.register(fastify_cookie_1.default, {
        secret: 'my-secret',
        parseOptions: {} // options for parsing cookies
    });
    // -- Set where to store the session in the database
    const store = connect_mongo_1.default.create({ mongoUrl: config_1.default.MONGO.host });
    app.register(session_1.default, {
        cookieName: 'YOUR_SESSION_COOKIE_NAME',
        secret: 'the secret must have length 32 or greater',
        cookie: {
            secure: false
        },
        store: store
    });
    // -- ???????
    app.addHook('preHandler', (request, reply, next) => {
        const { session } = request;
        request.sessionStore.set(session.sessionId, session, next);
    });
    // -- ???????
    app.addHook('preHandler', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        // eslint-disable-next-line no-param-reassign
        reply.locals = { user: request.user };
    }));
    yield (0, passport_1.preparePassport)(app);
    // -- Accept Form Bodies
    app.register(fastify_formbody_1.default);
    // -- Import all ROUTING
    app.register(main_routes_1.default);
});
exports.default = mainApp;

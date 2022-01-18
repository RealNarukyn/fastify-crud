"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MainController {
}
MainController.main = (req, reply) => {
    reply.view('views/index');
};
exports.default = MainController;

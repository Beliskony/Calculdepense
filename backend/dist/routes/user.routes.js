"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const router = express_1.default.Router();
//authentification
router.post('/inscription', user_controller_1.inscriptionUser);
router.post('/connexion', user_controller_1.connectUser);
//gestion des utilisateurs
router.get('/users', user_controller_1.getUsers);
router.get('/users/:id', user_controller_1.getUserById);
router.get('/users/:id', user_controller_1.updateUser);
router.get('/users/:id', user_controller_1.deleteUser);
exports.default = router;

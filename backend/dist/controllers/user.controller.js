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
exports.connectUser = exports.inscriptionUser = exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const inscriptionUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, contact, password } = req.body;
        const userExist = yield User_1.default.findOne({ where: email });
        if (userExist) {
            res.status(400).json({ message: 'Utilisateur existe déjà' });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = new User_1.default({ name, email, contact, password: hashedPassword });
        yield user.save();
        res.status(201).json({ message: 'Utilisateur créé avec succès' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
});
exports.inscriptionUser = inscriptionUser;
const connectUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ where: email });
        if (!user) {
            res.status(404).json({ message: 'Utiliseur non trouvé' });
            return;
        }
        const estIdentique = yield bcryptjs_1.default.compare(password, user.password);
        if (!estIdentique) {
            res.status(400).json({ message: 'Mot de passe incorrect' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user === null || user === void 0 ? void 0 : user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { id: user === null || user === void 0 ? void 0 : user.id, name: user === null || user === void 0 ? void 0 : user.name, email: user === null || user === void 0 ? void 0 : user.email, contact: user === null || user === void 0 ? void 0 : user.contact } });
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
});
exports.connectUser = connectUser;
// Simuler une base de données temporaire
let users = [
    { id: 1, name: "Axel", email: "axel@example.com" },
    { id: 2, name: "Sylvain", email: "sylvain@example.com" }
];
//Récupérer tous les utilisateurs
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json(users);
});
exports.getUsers = getUsers;
//Récupérer un utilisateur par son ID
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user)
        res.status(404).json({ message: "Utilisateur non trouvé" });
    res.status(200).json(user);
});
exports.getUserById = getUserById;
//Mettre à jour un utilisateur
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        res.status(404).json({ message: "Utilisateur non trouvé" });
        return;
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    res.status(200).json({ message: "Utilisateur mis à jour", user });
});
exports.updateUser = updateUser;
//Supprimer un utilisateur
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    users = users.filter(u => u.id !== parseInt(req.params.id));
    res.status(200).json({ message: "Utilisateur supprimé" });
});
exports.deleteUser = deleteUser;

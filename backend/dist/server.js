"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const database_1 = __importDefault(require("./config/database"));
//charger de la variable Environnement
dotenv_1.default.config();
const app = (0, express_1.default)();
//middlwares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//connexion db
database_1.default;
//les routes
app.use("/api/user", user_routes_1.default);
//test route
app.get('/', (req, res) => {
    res.send('serveur Ts en marche');
});
//demarrer serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`serveur lancer sur ${PORT}`);
});

import http from 'http';
import express from 'express';
import cors from 'cors';
import connectDB from './config/database';
import userByIdrouter from './routes/user.routes';
import userEnvoiById from './routes/user.envoi.routes';
import userDepenseById from './routes/user.depense.routes';
import userAddNewDepense from './routes/userNew.depense.routes';
import userAddNewEnvoi from './routes/userNew.envoie.routes';
import { register, login } from './controllers/authController';


export const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const PORT = process.env.PORT || 5000;

const startserver = async () => {
    try {
        const pool = await connectDB(); // ✅ Appel de `connectDB()`
        console.log("📡 Serveur en cours sur le port", PORT);

        app.listen(PORT);

    // afficher tout les utilisateurs
        app.get("/api/infos", async (req, res) => {
            try {
                const resultat = await pool.request().query("SELECT * FROM Utilisateurs");
                res.json(resultat.recordset)
            } catch (error) {
                console.error("❌ Erreur SQL :", error);
                res.status(500).json({ message: "Erreur interne du serveur" });
            }
            
        });

        //routes voir utilisateur par id
        app.use(userByIdrouter);

        //route voir envoi par id et utilisateur
        app.use(userEnvoiById);

        //route voir depense par id et utilisateur
        app.use(userDepenseById);

        //routes ajout de depenses une fois connecter
        app.use(userAddNewDepense);

        //routes ajout de envoi une fois connecter
        app.use(userAddNewEnvoi);

        //pour se connecter
        app.use("/api/login",login);

        //pour s'inscrire
        app.use("/api/register",register);

    } catch (error) {
        console.error("❌ Erreur lors du démarrage :", error);
        process.exit(1); // Arrêter l'application en cas d'échec
    }
    
};

startserver();
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import express from "express";
import sql from "mssql";
import connectDB from "../config/database";

const authRouter = express.Router();

// Clé secrète pour générer les tokens (stocke-la en variable d'environnement)
const JWT_SECRET = "monSuperSecret"; 

authRouter.post("/api/login", async (req: any, res: any) => {
    try {
        const { email, motDePasse } = req.body;

        // Vérifier si l'email et le mot de passe sont fournis
        if (!email || !motDePasse) {
            return res.status(400).json({ message: "Email et mot de passe requis" });
        }

        const pool = await connectDB();

        // Rechercher l'utilisateur dans la base de données
        const result = await pool
            .request()
            .input("email", sql.VarChar, email)
            .query("SELECT * FROM Utilisateurs WHERE Email = @email");

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        const user = result.recordset[0];

        // Vérifier le mot de passe
        const motDePasseValide = bcrypt.compareSync(motDePasse, user.MotDePasse);
        if (!motDePasseValide) {
            return res.status(401).json({ message: "Mot de passe incorrect" });
        }

        // Générer un token JWT
        const token = jwt.sign({ id: user.Id, email: user.Email }, JWT_SECRET, { expiresIn: "2h" });

        res.json({ message: "Connexion réussie", token });
    } catch (error) {
        console.error("❌ Erreur SQL :", error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
});

export default authRouter;

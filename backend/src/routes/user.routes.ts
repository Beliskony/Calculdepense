import express from 'express';
import connectDB from '../config/database';
import sql from 'mssql';
import authRouter from '../middleware/logingFun';

const userByIdrouter = express.Router();

userByIdrouter.get("/api/user/:id", async (req:any , res:any) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "ID invalide" });
        }

        const pool = await connectDB(); // ✅ Connexion à la BDD
        const resultat = await pool
            .request()
            .input("id", sql.Int, id) // ✅ Protection contre SQL Injection
            .query(`SELECT * FROM Utilisateurs WHERE id = ${id}`);

        if (resultat.recordset.length === 0) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        res.json(resultat.recordset[0]);
    } catch (error) {
        console.error("❌ Erreur SQL :", error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
});

userByIdrouter.post("/api/user/info/:id")

export default userByIdrouter;

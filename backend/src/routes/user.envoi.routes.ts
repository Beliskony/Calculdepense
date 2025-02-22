import express  from "express";
import sql from "mssql";
import connectDB from "../config/database";

const userEnvoiById = express.Router();

userEnvoiById.get("/api/user/envoi/:id", async(req:any, res:any) =>{
    try {
        const id = parseInt(req.params.id)
        if (isNaN(id)) {
            return res.status(400).json({ message: "ID invalide" });
        }

        const pool = await connectDB();
        const resultatEnvoi = await pool.request().input("id",sql.Int, id).query(`SELECT e.TransactionENVID, e.MontantEnv, e.DatetransacEnv, u.Nom, u.Email FROM ENVOIE e JOIN Utilisateurs u ON e.UtilisateurID = u.Id WHERE u.Id = ${id}`)
        
        if (resultatEnvoi.recordset.length === 0) {
            return res.status(404).json({Message: "aucun envoi"})
        }

        res.json(resultatEnvoi.recordset);
    } catch (error) {
        console.error("❌ Erreur SQL :", error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
})

export default userEnvoiById;
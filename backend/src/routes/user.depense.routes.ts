import express  from "express";
import sql from "mssql";
import connectDB from "../config/database";

const userDepenseById = express.Router();

userDepenseById.get("/api/user/depense/:id", async(req:any, res:any) =>{
    try {
        const id = parseInt(req.params.id)
        if (isNaN(id)) {
            return res.status(400).json({ message: "ID invalide" });
        }

        const pool = await connectDB();
        const resultatDepenses = await pool.request().input("id",sql.Int, id).query(`SELECT d.TransactionDepID, d.Montant, d.Datetransac, u.Nom, u.Email FROM DEPENSES d JOIN Utilisateurs u ON d.UtilisateurID = u.Id WHERE u.Id = @id`)
        
        if (resultatDepenses.recordset.length === 0) {
            return res.status(404).json({Message: "aucune depense"})
        }

        res.json(resultatDepenses.recordset);
    } catch (error) {
        console.error("❌ Erreur SQL :", error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
})

export default userDepenseById;
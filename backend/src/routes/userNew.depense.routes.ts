import express from 'express';
import sql from 'mssql';
import connectDB from '../config/database';

const userAddNewDepense = express.Router();

userAddNewDepense.post("/api/user/:id/depense" ,async (req:any, res:any) => {
    try {
        const { Montant} = req.body; // recuperations des donnees
        const id = parseInt(req.params.id)

        if (!Montant) {
            return res.status(400).json({message : "entrz toutes les informations"})
        }

        const pool = await connectDB();
       const resultat = await pool.request().input("Motant", sql.Int, Montant).query(`INSERT INTO DEPENSES (Montant, UtilisateurID) SELECT  @montant, Id FROM Utilisateurs WHERE Id = @UtilisateurID`)
     
      if (resultat.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "Utilisateur introuvable, dépense non enregistrée." });
      }
      res.status(201).json({ message: "Dépense ajoutée avec succès !" });

    } catch (error) {
        console.error("❌ Erreur SQL :", error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
})

export default userAddNewDepense;
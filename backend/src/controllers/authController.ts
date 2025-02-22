import sql from "mssql";
import connectDB from "../config/database";



// 🔹 INSCRIPTION
const register = async (req: any, res: any) => {
  try {
    const { Nom, Email, Contact ,MotDePasse } = req.body;
    const pool = await connectDB();

     // Vérifier si l'utilisateur existe déjà
     const existingUser = await pool
     .request()
     .input("Email", sql.VarChar, Email).input("Contact", sql.VarChar, Contact)
     .query("SELECT * FROM Utilisateurs WHERE Email = @email OR Contact = @Contact");

   if (existingUser.recordset.length > 0) {
     return res.status(400).json({ message: "L'utilisateur existe déjà." });
   }

    const inscription = await pool.request().input("Nom", sql.VarChar, Nom)
                                            .input("Email", sql.VarChar, Email)
                                            .input("Contact", sql.VarChar, Contact)
                                            .input("MotDePasse", sql.VarChar, MotDePasse)
                                            .query("INSERT INTO Utilisateurs (Nom, Email, Contact, MotDePasse) VALUES (@Nom, @Email, @Contact, @MotDePasse)")
    res.status(201).json(inscription.rowsAffected);
    console.log("Nom :", Nom);
console.log("Email :", Email);
console.log("Contact :", Contact);
console.log("MotDePasse :", MotDePasse);
  } catch(error){
    console.error("Erreur d'inscription :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};


// 🔹 CONNEXION
const login = async (req: any, res: any) => {
  try {
    const { Email, MotDePasse } = req.body;
    const pool = await connectDB();
    const connexion = await pool.request().input("Email", sql.VarChar, Email)
                                          .input("MotDePasse", sql.VarChar, MotDePasse)
                                          .query("SELECT * FROM Utilisateurs WHERE Email = @email AND MotDePasse = @MotDePasse")
    
     if (connexion.recordset.length > 0) {
      res.json({succes: true, message: "connexion reussi"})
     } else{
      res.json({succes: false, message: "identifiants incorrects"})
     }
    } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

export {register, login}
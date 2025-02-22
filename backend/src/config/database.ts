import sql, { ConnectionPool } from 'mssql';
import dotenv from "dotenv";

dotenv.config();

const DatabaseSQL = {
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  server: process.env.DB_HOST as string,
  database: process.env.DB_NAME as string,
  port: parseInt(process.env.DB_PORT as string),
  options: {
    encrypt: false, // Désactiver SSL si non nécessaire
    trustServerCertificate: true, // Utile pour les connexions locales
  },
  
};

export const connectDB = async (): Promise<ConnectionPool> => {
  try {
   const pool = await sql.connect(DatabaseSQL);
    return pool
    
  } catch (error) {
    console.error("❌ Erreur de connexion à SQL Server :", error);
    throw error;
  }
};

export default connectDB;

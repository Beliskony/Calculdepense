import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database';
import router from './routes/user.routes';


//charger de la variable Environnement
dotenv.config()

const app = express();

//middlwares
app.use(cors());
app.use(express.json());

//connexion db
connectDB();

//les routes
app.use("/api/user", router);

//test route
app.get('/', (req, res) => {
    res.send('serveur Ts en marche')
});


//demarrer serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`serveur lancer sur ${PORT}`);
    
});
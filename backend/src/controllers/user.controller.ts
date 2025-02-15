import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import User from "../models/User";

const inscriptionUser = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {name, email, contact, password} = req.body;

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({message: 'Utilisateur existe déjà'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, contact, password: hashedPassword });

        await user.save();
        res.status(201).json({ message: 'Utilisateur créé avec succès'});

    } catch (error) {
        res.status(500).json({message: 'Erreur serveur'});
    }

};


const connectUser = async(req: Request, res: Response,next: NextFunction) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if (!user) {
            return res.status(404).json({ message: 'Utiliseur non trouvé' });
        }


        const estIdentique = await bcrypt.compare(password, user.password);
        if (!estIdentique) {
            return res.status(400).json({message: 'Mot de passe incorrect'});
        }

        const token = jwt.sign({ id: user?._id}, process.env.JWT_SECRET as string, {expiresIn: '7d'});

        res.json({ token, user: {id: user?._id, name: user?.name, email: user?.email, contact: user?.contact} });

    } catch (error) {
        res.status(500).json({message: 'Erreur serveur'});
    }
};

export { inscriptionUser, connectUser};
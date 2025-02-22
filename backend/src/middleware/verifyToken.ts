import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const JWT_SECRET = "Motdepasse"; // Même clé que dans le login

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({ message: "Accès refusé, token manquant" });
    }

    try {
        const decoded = jwt.verify(token.split(" ")[1], JWT_SECRET);
        (req as any).user = decoded; // Stocker l'utilisateur dans la requête
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token invalide" });
    }
};

export default verifyToken;

import express from 'express';
import { inscriptionUser, connectUser } from '../controllers/user.controller';

const router = express.Router();

router.post('/inscription', inscriptionUser);
router.post('/connexion', connectUser);

export default router;

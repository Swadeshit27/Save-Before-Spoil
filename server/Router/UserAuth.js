
import express from "express";
import { createNonce, login, register } from "../Controller/UserControler.js";
const router = express.Router();

router.post('/resister', register);
router.post('/login', login); 
router.post('/nonce', createNonce)

export default router;
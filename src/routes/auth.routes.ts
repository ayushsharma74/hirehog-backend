import { Router } from "express";
import { googleAuth, googleAuthCallback } from "../controllers/auth.controllers";

const router = Router();



router.get('/auth', googleAuth);
router.get('/oauth2callback', googleAuthCallback);

export default router
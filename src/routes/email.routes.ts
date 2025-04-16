import { Router } from "express";
import { getEmails } from "../controllers/email.controllers";
const router = Router();

router.get("/emails", getEmails);

export default router;

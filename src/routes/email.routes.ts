import { Router } from "express";
import { getEmails } from "../controllers/email.controllers";
import { authCheck } from "../middleware";
const router = Router();

router.get("/emails", getEmails);

export default router;

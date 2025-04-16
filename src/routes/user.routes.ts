import { Router } from "express";
import { getUser } from "../controllers/user.controllers";
import { authCheck } from "../middleware";

const router = Router();

router.get('/get-user' ,authCheck, getUser)

export default router
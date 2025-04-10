import type { Request, Response } from "express";
import { fetchEmails } from "../services/email.service";

export const getEmails = async (req: Request, res: Response) => {
    const emails = await fetchEmails(req.headers.authorization?.split(' ')[1]); 
  
  res.json(emails);
};

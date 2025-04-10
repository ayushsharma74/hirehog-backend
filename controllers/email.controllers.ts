import type { Request, Response } from "express";
import { fetchEmails } from "../services/email.service";
import { classify } from "../services/nlp.service";

export const getEmails = async (req: Request, res: Response) => {
  const emails = await fetchEmails(req.headers.authorization?.split(" ")[1] as string);
  // const classification = await classify(emails[0].snippet);
  // console.log(classification.data);
  
  for (const email of emails) {
     email.classification = (await classify(email.snippet)).data;
  }
  res.json(emails);
};

import type { Request, Response } from "express";
import { oAuth2Client } from "../config/googleClient";

export const googleAuth = async (req: Request, res: Response) => {
  const url = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/gmail.readonly"],
  });
  res.redirect(url);
};

export const googleAuthCallback = async (req: Request, res: Response) => {
    // @ts-nocheck
  const { code } = req.query;
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  res.send("Authentication successful! You can now fetch emails.");
};

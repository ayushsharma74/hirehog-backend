import type { Request, Response } from "express";
import { oAuth2Client } from "../config/googleClient";

export const googleAuth = async (req: Request, res: Response) => {
  const url = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/gmail.readonly",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
  });
  res.redirect(url);
};

export const googleAuthCallback = async (req: Request, res: Response) => {
  const { code } = req.query;
  // @ts-nocheck
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  res.send("Authentication successful! You can now fetch emails.");
};

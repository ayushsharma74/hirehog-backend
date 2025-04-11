import type { Request, Response } from "express";
import { oAuth2Client } from "../config/googleClient";
import { google } from "googleapis";
import { User } from "../models/user.model";

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

  const oauth2 = google.oauth2({ version: "v2", auth: oAuth2Client });
  const { data } = await oauth2.userinfo.get();


  const createdUser = await User.findOneAndUpdate(
    { googleId: data.id },
    {
      googleId: data.id,
      email: data.email,
      name: data.name,
      image: data.picture,
      accessToken: tokens.access_token,
      tokenExpiryDate: new Date(tokens.expiry_date),
    },
    { upsert: true, new: true }
  )

  console.log(createdUser);
  res.send({ "Authentication successful! You can now fetch emails.": createdUser });
};

import type { Request, Response } from "express";
import { oAuth2Client } from "../config/googleClient";
import { google } from "googleapis";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";

export const googleAuth = async (_req: Request, res: Response) => {
  const url = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/gmail.readonly",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
  });
  res.redirect(url);
};

export const googleAuthCallback = async (req: Request, res: Response) => {
  try {
    const { code } = req.query;
    console.log("OAUTH2 CALLBACK",  code);

    if (!code)  res.status(400).send("Missing code");

    const { tokens } = await oAuth2Client.getToken(code as string);
    oAuth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({ version: "v2", auth: oAuth2Client });
    const { data } = await oauth2.userinfo.get();

    if (!data?.email) res.status(400).send("Email not found in Google profile");

    const createdUser = await User.findOneAndUpdate(
      { googleId: data.id },
      {
        googleId: data.id,
        email: data.email,
        name: data.name,
        image: data.picture,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token, // optionally store this
        tokenExpiryDate: tokens.expiry_date ? new Date(tokens.expiry_date) : undefined,
      },
      { upsert: true, new: true }
    );

    console.log("CREATED USER", createdUser);
    

    const appToken = jwt.sign(
      { email: createdUser.email, id: createdUser.googleId },
      process.env.JWT_SECRET || "default_dev_secret", // fallback for dev
      { expiresIn: "7d" }
    );

    console.log("APP TOKEN", appToken);
    

    res.cookie("token", appToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, 
      secure: false, // true in production (with HTTPS)
      sameSite: "lax",
    });

    res.redirect(`http://hirehog.vercel.app/dashboard`);
  } catch (error) {
    console.error("OAuth Callback Error:", error);
    res.status(500).send("Authentication failed");
  }
};

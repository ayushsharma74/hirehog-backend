import type { Request, Response } from "express";
import { oAuth2Client } from "../config/googleClient";
import { google } from "googleapis";

export const getEmails = async (req: Request, res: Response) => {
  console.log(req.headers.authorization?.split(" ")[1]);
  oAuth2Client.setCredentials({
    access_token: req.headers.authorization?.split(" ")[1] || "",
  });
  const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
  const response = await gmail.users.messages.list({
    userId: "me",
    maxResults: 5,
  });

  const emails = await Promise.all(
    response.data.messages.map(async (msg) => {
      const message = await gmail.users.messages.get({
        userId: "me",
        id: msg.id,
      });

      const snippet = message.data.snippet;
      return { id: msg.id, snippet };
    })
  );

  console.log(emails);

  res.json(emails);
};

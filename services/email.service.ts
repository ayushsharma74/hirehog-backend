import { google } from "googleapis";
import { oAuth2Client } from "../config/googleClient";

export const fetchEmails = async (accessToken: string ,query?: string ) => {
    oAuth2Client.setCredentials({access_token: accessToken });
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
  
    const response = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 10,
      q: query || 'subject:(job OR interview OR offer OR regret)', 
    });
  
    const emails = await Promise.all(
      response.data.messages.map(async (msg) => {
        const message = await gmail.users.messages.get({
          userId: 'me',
          id: msg.id,
        });
        return {
          id: msg.id,
          subject: message.data.payload.headers.find(h => h.name === 'Subject')?.value,
          snippet: message.data.snippet,
          classification: '',
        };
      })
    );
  
    return emails;
  };
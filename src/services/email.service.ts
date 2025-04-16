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

    if (!response.data.messages) {
      return [];
    }

    const emails = await Promise.all(
      response.data.messages
      .filter((msg): msg is { id: string } => !!msg.id)
      .map(async (msg) => {
        const message = await gmail.users.messages.get({
          userId: 'me',
          id: msg.id,
        });

        const headers = message.data.payload?.headers || [];
        const subject = headers.find(h => h.name === 'Subject')?.value || '(No Subject)';
        
        return {
          id: msg.id,
          subject: subject,
          snippet: message.data.snippet || '',
          classification: '',
        };
      })
    );
  
    return emails;
  };
import { google } from "googleapis"

const oAuth2Client = new google.auth.OAuth2(
    // process.env.GOOGLE_CLIENT_ID,
    "17678299438-jpbnql0tq9fknkg94mq71j9lsaj2ih0g.apps.googleusercontent.com",
    "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",
    'https://hirehog-backend.onrender.com/api/oauth2callback'
);

export { oAuth2Client }

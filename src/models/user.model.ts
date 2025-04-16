import mongoose from 'mongoose';

export interface UserSchema {
  googleId: string;
  email: string;
  image: string;
  name: string;
  accessToken: string;
  tokenExpiryDate: Date;
  jobEmails?: {
    messageId: string;
    subject: string;
    snippet: string;
    classification: string;
    receivedAt: Date;
  }[];
}

const userSchema = new mongoose.Schema<UserSchema>({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: String,
  name: String,
  accessToken: String,
  tokenExpiryDate: Date,

  jobEmails: [
    {
      messageId: String,
      subject: String,
      snippet: String,
      classification: {
        type: String, // "Selected", "Rejected", "Other"
      },
      receivedAt: Date,
    },
  ],

  
}, {timestamps: true});

export const User = mongoose.model('User', userSchema);

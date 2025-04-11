import mongoose from 'mongoose';
import { string } from 'zod';


const userSchema = new mongoose.Schema({
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

import mongoose from 'mongoose';


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
  name: String,

  // Tokens from Gmail OAuth
  accessToken: String,
//   refreshToken: String,
  tokenExpiryDate: Date,

  // Optional: Store classification results
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

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model('User', userSchema);

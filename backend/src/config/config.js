// config/config.js
import dotenv from 'dotenv';
dotenv.config();

const _config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI,
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
  },
};

export const config = Object.freeze(_config);

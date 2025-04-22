// config/config.js
import dotenv from 'dotenv';
dotenv.config();

const _config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI,
  geminiApiKey: process.env.GEMINI_API_KEY,
  assemblyKey:process.env.ASSEMBLY_API_KEY,
  elevenApiKey:process.env.ELEVEN_API_KEY,
  elevenVoiceId_en:process.ELEVEN_VOICE_ID_EN,
  elevenVoiceId_hi:process.ELEVEN_VOICE_ID_HI,
  elevenVoiceId_bi:process.ELEVEN_VOICE_ID_BI,
  corsOrigin:process.env.CORS_ORIGIN,
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
    accountSidIvr: process.env.TWILIO_ACCOUNT_SID_IVR,
    authTokenIvr: process.env.TWILIO_AUTH_TOKEN_IVR,
  },
  AGMARKNET_API_KEY: process.env.AGMARKNET_API_KEY,
  WEATHER_API_KEY: process.env.WEATHER_API_KEY,
  CROP_HEALTH_API_KEY: process.env.CROP_HEALTH_API_KEY,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
  JWT_COOKIE_EXPIRES_IN: process.env.JWT_COOKIE_EXPIRES_IN || "4h",

  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
  REFRESH_COOKIE_EXPIRES_IN: process.env.REFRESH_COOKIE_EXPIRES_IN || "7d",

  imageKit: {
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
  },

  redisHost:process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  redisPassword: process.env.REDIS_PASSWORD,
};

export const config = Object.freeze(_config);

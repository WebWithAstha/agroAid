import twilio from 'twilio';
import { config } from '../config/config.js';

const client = twilio(config.twilio.accountSid, config.twilio.authToken);

export const sendSMS = async (to, body) => {
  try {
    console.log(to,body);
    console.log(config.twilio.messagingServiceSid);
    
    const message = await client.messages.create({
      messagingServiceSid: config.twilio.messagingServiceSid,
      to,
      body,
    });
    console.log('Message SID:', message.sid);
    return message.sid;
  } catch (error) {
    console.error('Failed to send SMS:', error.message);
    throw error;
  }
};


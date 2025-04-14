import twilio from 'twilio';
import { User } from '../models/userModel.js';
const VoiceResponse = twilio.twiml.VoiceResponse;

const accountSid = "AC798d65b5b42ce1a7a29cecbae3d08877";
const authToken = 'UPAWJD5KYRCMJJSTNKX8MGYD';

// export const startCall = async (req, res) => {
//   console.log("start call hit")
//   try{
//     const twiml = new VoiceResponse();

//     twiml.say("Namaste! Apna sawal batayein. Hum jawab denge."); // Hindi prompt
//     twiml.record({
//       action: "https://agroaid.onrender.com/api/ivr/handle-recording", // where Twilio will send the recording
//       method: "POST",
//       maxLength: 30, // seconds
//       trim: "trim-silence"
//     });
  
//     res.type('text/xml');
//     res.send(twiml.toString());
// } catch (error) {
//     console.log(error);
//   }
// };


// export const handleRecording = async (req, res) => {
//   const { RecordingUrl, From } = req.body;

//   try {
//     // 1. Download the Twilio audio (MP3)
//     const audioResponse = await axios.get(`${RecordingUrl}.mp3`, {
//       responseType: 'arraybuffer',
//     });
//     const audioBuffer = audioResponse.data;

//     // 2. Find farmer by phone number
//     const user = await User.findOne({ phone: From });
//     const language = user?.language || 'en'; // fallback to English

//     // 3. Run AI assistant pipeline
//     // const text = await getTranscriptFromAssembly(audioBuffer, language);
//     // const answerText = await getResponseFromGemini(text, language);
//     // const voiceUrl = await getVoiceFromEleven(answerText, language);
//     const voiceUrl = 'https://firebasestorage.googleapis.com/v0/b/upload-images-da293.appspot.com/o/voice-messages%2Faudio_1744357350618.webm?alt=media&token=5c56babc-bef4-4db1-bf5e-909a2ad017bd';

//     // 4. Respond with TwiML to play audio
//     const twiml = new VoiceResponse();
//     twiml.play(voiceUrl);

//     res.type('text/xml');
//     res.send(twiml.toString());

//   } catch (err) {
//     console.error("IVR error:", err);
//     const twiml = new VoiceResponse();
//     twiml.say("Maaf kijiye. Kuch galti ho gayi.");
//     res.type('text/xml');
//     res.send(twiml.toString());
//   }
// };



const twilio = require("twilio");

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = 9475003036;
const myNumber = 7489098294;
const baseUrl = 'https://agroaid-bdsm.onrender.com/api';

const client = twilio(accountSid, authToken);

// Start the call
export const startCall = async (req, res) => {
  try {
    const call = await client.calls.create({
      url: `${baseUrl}/ivr/voice-menu`, // returns TwiML
      to: myNumber,
      from: twilioNumber,
    });

    res.status(200).json({ message: "Call initiated", callSid: call.sid });
  } catch (err) {
    console.error("Error starting call:", err);
    res.status(500).json({ error: "Call failed" });
  }
};

// Voice menu - TwiML
export const voiceMenu = (req, res) => {
  const VoiceResponse = twilio.twiml.VoiceResponse;
  const twiml = new VoiceResponse();

  const gather = twiml.gather({
    numDigits: 1,
    action: "/ivr/handle-input",
    method: "POST",
  });

  gather.say("Welcome to Astha's system. Press 1 to record a message. Press 2 to hear a joke.");

  res.type("text/xml");
  res.send(twiml.toString());
};

// Handle input (1 or 2)
export const handleInput = (req, res) => {
  const digit = req.body.Digits;
  const VoiceResponse = twilio.twiml.VoiceResponse;
  const twiml = new VoiceResponse();

  if (digit === "1") {
    twiml.say("Please record your message after the beep. Press the pound key when done.");
    twiml.record({
      maxLength: 30,
      finishOnKey: "#",
      action: "/ivr/handle-recording",
      method: "POST",
    });
  } else if (digit === "2") {
    twiml.say("Why did the developer go broke? Because he used up all his cache.");
    twiml.hangup();
  } else {
    twiml.say("Invalid input. Goodbye!");
    twiml.hangup();
  }

  res.type("text/xml");
  res.send(twiml.toString());
};

// Handle the recording
export const handleRecording = (req, res) => {
  const recordingUrl = req.body.RecordingUrl;
  const twiml = new twilio.twiml.VoiceResponse();

  twiml.say("Thank you. We have received your message.");
  twiml.hangup();

  console.log("📩 New recording at:", recordingUrl);

  res.type("text/xml");
  res.send(twiml.toString());
};

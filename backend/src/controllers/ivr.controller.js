import twilio from 'twilio';
import { User } from '../models/userModel.js';
import { config } from '../config/config.js';
const VoiceResponse = twilio.twiml.VoiceResponse;

// const accountSid = "AC798d65b5b42ce1a7a29cecbae3d08877";
// const authToken = 'UPAWJD5KYRCMJJSTNKX8MGYD';

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




// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;

const accountSid = config.twilio.accountSid;
const authToken = config.twilio.authToken;

const twilioNumber = '+19475003036';
const myNumber = '+917489098294';
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

// Language selection handler
export const voiceMenu = (req, res) => {
  try {
    console.log("📞 Incoming call - asking for language");

    const VoiceResponse = twilio.twiml.VoiceResponse;
    const twiml = new VoiceResponse();

    const gather = twiml.gather({
      numDigits: 1,
      action: "/ivr/select-language",
      method: "POST",
    });

    gather.say("Welcome to Agro Aid. Press 1 for Hindi. Press 2 for English. Press 3 for Punjabi. Press 4 for Tamil.");

    res.type("text/xml");
    res.send(twiml.toString());
  } catch (error) {
    console.error("❌ Error in voiceMenu:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Store selected language and ask for message
export const selectLanguage = (req, res) => {
  try {
    const digit = req.body.Digits;
    const twiml = new twilio.twiml.VoiceResponse();
    console.log("🌐 Language selected:", digit);

    const langMap = {
      1: "hi", // Hindi
      2: "en", // English
      3: "pa", // Punjabi
      4: "ta", // Tamil
    };

    const selectedLang = langMap[digit];

    if (!selectedLang) {
      twiml.say("Invalid selection. Goodbye!");
      twiml.hangup();
    } else {
      twiml.say(`You selected ${selectedLang}. Please record your message after the beep. Press the pound key when done.`);

      twiml.record({
        maxLength: 30,
        finishOnKey: "#",
        action: `/ivr/process-message?lang=${selectedLang}`,
        method: "POST",
      });
    }

    res.type("text/xml");
    res.send(twiml.toString());
  } catch (error) {
    console.error("❌ Error in selectLanguage:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Final handler: get transcript → Gemini → audio → respond
export const processMessage = async (req, res) => {
  try {
    const recordingUrl = req.body.RecordingUrl;
    const lang = req.query.lang;
    const twiml = new twilio.twiml.VoiceResponse();

    console.log("🎙️ Message recorded at:", recordingUrl);
    console.log("🌐 Language for processing:", lang);

    // // Step 1: Convert audio to text
    // const userText = await getTranscriptFromAssembly(recordingUrl, lang);
    // console.log("📝 Transcript:", userText);

    // // Step 2: Get Gemini response
    // const geminiReply = await getResponseFromGemini(userText, lang);
    // console.log("🤖 Gemini response:", geminiReply);

    // // Step 3: Convert response to voice
    // const voiceUrl = await getVoiceFromEleven(geminiReply, lang);
    // console.log("🔊 Voice response URL:", voiceUrl);

    const voiceUrl = 'https://firebasestorage.googleapis.com/v0/b/upload-images-da293.appspot.com/o/voice-messages%2Faudio_1744357350618.webm?alt=media&token=5c56babc-bef4-4db1-bf5e-909a2ad017bd';

    // Respond with audio playback
    twiml.play(voiceUrl);
    twiml.hangup();

    res.type("text/xml");
    res.send(twiml.toString());
  } catch (error) {
    console.error("❌ Error in processMessage:", error);
    const twiml = new twilio.twiml.VoiceResponse();
    twiml.say("Sorry, there was a problem processing your request. Goodbye.");
    twiml.hangup();
    res.type("text/xml").send(twiml.toString());
  }
};

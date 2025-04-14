import twilio from 'twilio';
import { User } from '../models/userModel.js';
const VoiceResponse = twilio.twiml.VoiceResponse;

// const accountSid = "AC798d65b5b42ce1a7a29cecbae3d08877";
// const authToken = process.env.TWILIO_AUTH_TOKEN;

export const startCall = async (req, res) => {
  try{
    const twiml = new VoiceResponse();

    twiml.say("Namaste! Apna sawal batayein. Hum jawab denge."); // Hindi prompt
    twiml.record({
      action: "/ivr/handle-recording", // where Twilio will send the recording
      method: "POST",
      maxLength: 30, // seconds
      trim: "trim-silence"
    });
  
    res.type('text/xml');
    res.send(twiml.toString());
} catch (error) {
    console.log(error);
  }
};


export const handleRecording = async (req, res) => {
  const { RecordingUrl, From } = req.body;

  try {
    // 1. Download the Twilio audio (MP3)
    const audioResponse = await axios.get(`${RecordingUrl}.mp3`, {
      responseType: 'arraybuffer',
    });
    const audioBuffer = audioResponse.data;

    // 2. Find farmer by phone number
    const user = await User.findOne({ phone: From });
    const language = user?.language || 'en'; // fallback to English

    // 3. Run AI assistant pipeline
    // const text = await getTranscriptFromAssembly(audioBuffer, language);
    // const answerText = await getResponseFromGemini(text, language);
    // const voiceUrl = await getVoiceFromEleven(answerText, language);
    const voiceUrl = 'https://firebasestorage.googleapis.com/v0/b/upload-images-da293.appspot.com/o/voice-messages%2Faudio_1744357350618.webm?alt=media&token=5c56babc-bef4-4db1-bf5e-909a2ad017bd';

    // 4. Respond with TwiML to play audio
    const twiml = new VoiceResponse();
    twiml.play(voiceUrl);

    res.type('text/xml');
    res.send(twiml.toString());

  } catch (err) {
    console.error("IVR error:", err);
    const twiml = new VoiceResponse();
    twiml.say("Maaf kijiye. Kuch galti ho gayi.");
    res.type('text/xml');
    res.send(twiml.toString());
  }
};

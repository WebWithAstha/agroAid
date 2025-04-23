import twilio from "twilio";
import { config } from "../config/config.js";
import { getTranscript, getTranscriptFromBuffer } from "../services/assembly.service.js";
import { getVoice } from "../services/elevenlabs.service.js";
import { callGeminiApi } from "../services/geminiCrop.service.js";
import axios from "axios";

const accountSid = config.twilio.accountSidIvr;
const authToken = config.twilio.authTokenIvr;

const twilioNumber = "+19475003036";
const myNumber = "+917489098294";
const baseUrl = "https://agroaid-bdsm.onrender.com/api";

const client = twilio(accountSid, authToken);
const recordedAudioUrl = ["https://ik.imagekit.io/b8twhzei3r/Anika-Hindi.mp3?updatedAt=1745299006241", "https://ik.imagekit.io/b8twhzei3r/Mahesh_English.mp3?updatedAt=1745299005956", "https://ik.imagekit.io/b8twhzei3r/Jeet%20Bihari.mp3?updatedAt=1745299005926"]

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
      action: `${baseUrl}/ivr/select-language`,
      method: "POST",
    });

    gather.say(
      "Welcome to Agro Aid. Press 1 for Hindi. Press 2 for English. Press 3 for Bihari."
    );

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
      3: "bi", // Punjabi
    };

    const selectedLang = langMap[digit];

    if (!selectedLang) {
      twiml.say("You select a wrong option. We are hanging up the call, please try again.");
      twiml.hangup();
    } else {

      twiml.play(recordedAudioUrl[digit - 1]);

      twiml.record({
        maxLength: 30,
        finishOnKey: "#",
        action: `${baseUrl}/ivr/process-message?lang=${selectedLang}`,
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



export const processMessage = async (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();
  try {
    const recordingUrl = req.body.RecordingUrl;
    const lang = req.query.lang || "en";
    
    if (!recordingUrl) {
      throw new Error("Recording URL is missing");
    }

    console.log("🎙️ Recording URL:", recordingUrl);
    console.log("🌐 Language:", lang);

    // Step 1: Fetch the audio buffer
    let audioResponse;
    try {
      const authString = Buffer.from(`${accountSid}:${authToken}`).toString("base64");

audioResponse = await axios.get(recordingUrl, {
  responseType: "arraybuffer",
  headers: {
    Authorization: `Basic ${authString}`,
  },
  maxRedirects: 5,
});
    } catch (fetchErr) {
      console.error("❌ Error fetching audio from Twilio:", fetchErr.message);
      throw new Error("Failed to fetch the recorded message.");
    }

    const audioBuffer = Buffer.from(audioResponse.data);

    // Step 2: Transcribe the message
    const transcript = await getTranscriptFromBuffer(
      audioBuffer,
      lang === "bi" ? "hi" : lang
    );

    if (!transcript) {
      console.warn("⚠️ No transcript generated");
      const fallbackMessage = "I'm sorry, I couldn't understand the message.";
      const fallbackVoice = await getVoice(fallbackMessage, lang);
      twiml.play(fallbackVoice);
      twiml.say("Please try again or call later.");
      twiml.hangup();
      return res.type("text/xml").send(twiml.toString());
    }

    console.log("📝 Transcript:", transcript);

    // Step 3: Get Gemini response
    const textResponse = await callGeminiApi(transcript);
    console.log("🤖 Gemini response:", textResponse);

    // Step 4: Convert to voice
    const voiceUrl = await getVoice(textResponse, lang);
    twiml.play(voiceUrl);

    // Step 5: Gather further input
    const gather = twiml.gather({
      numDigits: 1,
      action: `${baseUrl}/ivr/next-action?lang=${lang}`,
      method: "POST",
      timeout: 5,
    });

    const furtherPrompts = {
      en: "https://ik.imagekit.io/b8twhzei3r/RESMaheshEnglisj.mp3?updatedAt=1745304938610",
      hi: "https://ik.imagekit.io/b8twhzei3r/REsAnika%20-%20Hindi.mp3?updatedAt=1745304938861",
      bi: "https://ik.imagekit.io/b8twhzei3r/REsJeet%20-%20Hindi,%20Bihari.mp3?updatedAt=1745304938857",
    };

    if (furtherPrompts[lang]) {
      gather.play(furtherPrompts[lang]);
    }

    // Fallback if no input
    twiml.say(
      "We did not receive any input. Ending the call. Thank you for using AgroAid."
    );
    twiml.hangup();

    res.type("text/xml").send(twiml.toString());
  } catch (err) {
    console.error("❌ Error in processMessage:", err.message);
    twiml.say("Sorry, there was a problem processing your request. Goodbye.");
    twiml.hangup();
    res.type("text/xml").send(twiml.toString());
  }
};

export const nextAction = (req, res) => {
  const digit = req.body.Digits;
  const lang = req.query.lang;
  const twiml = new twilio.twiml.VoiceResponse();

  if (digit === "1") {
    // Go back to record another message
    twiml.say(
      "Okay, please record your next question after the beep. Press the pound key when done."
    );
    twiml.record({
      maxLength: 30,
      finishOnKey: "#",
      action: `${baseUrl}/ivr/process-message?lang=${lang}`,
      method: "POST",
    });
  } else {
    // End the call
    twiml.say("Thank you for using AgroAid. Goodbye!");
    twiml.hangup();
  }

  res.type("text/xml");
  res.send(twiml.toString());
};



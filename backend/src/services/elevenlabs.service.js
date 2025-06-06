import { config } from "../config/config.js";
import { uploadFileToImageKit } from "./ImageKit.service.js";

export const getVoice = async function(text,lan) {
    const api = config.elevenApiKey;
// default to English if unknown

    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/SV61h9yhBg4i91KIBwdz`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': api
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75
          }
        })
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }
      const audioBlob = await response.blob();
      const arrayBuffer = await audioBlob.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const audioFileName = `audio-${Date.now()}.mp3`;
      const fileData = {
        data: buffer, 
        name: audioFileName,
      };
      const uploadResponse = await uploadFileToImageKit(fileData);
      if (uploadResponse && uploadResponse.url) {
        return uploadResponse.url;
      }
      throw new Error("Failed to upload file to ImageKit");
    } catch (error) {
      console.error('Voice generation failed:', error.message);
      return null;
    }
  };
  
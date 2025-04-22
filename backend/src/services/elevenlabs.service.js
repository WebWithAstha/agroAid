import { config } from "../config/config.js";

export const getVoice = async function(text,lan) {
    const api = config.elevenApiKey;
    console.log("at get voice service")
    console.log(lan)
    
    const voiceMap = {
      hi: config.elevenVoiceId_hi,
      en: config.elevenVoiceId_en,
      bi: config.elevenVoiceId_bi
    };
    console.log(config)
    const voiceId = voiceMap[lan] || 'iLrek0aeAREetkK9NhwJ'; // default to English if unknown
    console.log("voice id  : ",voiceId)
    console.log("at get voice service")

  
    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
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
      const audioUrl = URL.createObjectURL(audioBlob);
      return audioUrl;
    } catch (error) {
      console.error('Voice generation failed:', error.message);
      return null;
    }
  };
  
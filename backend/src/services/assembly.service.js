import { AssemblyAI } from 'assemblyai';
import { config } from '../config/config.js';

const apiKey = config.assemblyKey;
const client = new AssemblyAI({
  apiKey,
});

/**
 * Fetches transcript text from an audio URL using AssemblyAI
 * @param {string} audioUrl - The public URL of the audio file to transcribe
 * @param {string} lan - The language code (e.g., 'en', 'hi', 'pb')
 * @returns {Promise<string>} - The transcribed text
 */
export const getTranscript = async (audioUrl, lan = 'en') => {
  try {
    const transcript = await client.transcripts.transcribe({
      audio: audioUrl,
      language_code: lan,
    });
    return transcript.text;
  } catch (error) {
    console.error('Error while fetching transcript:', error);
    throw error;
  }
};

// utils/transcriptionBuffer.js
import FormData from 'form-data';

export const getTranscriptFromBuffer = async (audioBuffer, lang = 'en') => {
  try {
    const form = new FormData();
    form.append('audio', audioBuffer, { filename: 'audio.wav' });
    form.append('language_code', lang);

    const response = await axios.post('https://api.assemblyai.com/v2/transcript', form, {
      headers: {
        ...form.getHeaders(),
        authorization: process.env.ASSEMBLYAI_API_KEY
      }
    });

    const pollingUrl = response.data.id ? `https://api.assemblyai.com/v2/transcript/${response.data.id}` : null;
    if (!pollingUrl) return null;

    // Poll for completion
    let transcript;
    while (true) {
      const pollRes = await axios.get(pollingUrl, {
        headers: { authorization: process.env.ASSEMBLYAI_API_KEY }
      });
      if (pollRes.data.status === 'completed') {
        transcript = pollRes.data.text;
        break;
      } else if (pollRes.data.status === 'error') {
        throw new Error(pollRes.data.error);
      }
      await new Promise(res => setTimeout(res, 2000)); // Wait 2 seconds
    }

    return transcript;
  } catch (err) {
    console.error("❌ Error while transcribing buffer:", err);
    return null;
  }
};


// Example usage:
// const transcriptText = await getTranscript('https://assembly.ai/sports_injuries.mp3');
// console.log(transcriptText);

  
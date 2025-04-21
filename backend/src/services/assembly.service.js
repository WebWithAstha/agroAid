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

// Example usage:
// const transcriptText = await getTranscript('https://assembly.ai/sports_injuries.mp3');
// console.log(transcriptText);

  
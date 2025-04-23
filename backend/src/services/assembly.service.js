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
  console.log("language got" , lan)
  try {
    const transcript = await client.transcripts.transcribe({
      audio: audioUrl,
      language_code: lan,
    });
    console.log(transcript)
    console.log(transcript.text)
    return transcript.text;
  } catch (error) {
    console.log(error)
    console.error('Error while fetching transcript:', error);
    throw error;
  }
};

// utils/transcriptionBuffer.js

export const getTranscriptFromBuffer = async (buffer) => {
  try {
    if (!buffer || !Buffer.isBuffer(buffer)) {
      throw new Error('Invalid or undefined buffer passed to getTranscriptFromBuffer');
    }

    // Upload the buffer to AssemblyAI
    const uploadResponse = await client.files.upload(buffer);
    console.log('Upload Response:', JSON.stringify(uploadResponse, null, 2));

    // Extract the audio URL
    const audioUrl = uploadResponse;

    if (!audioUrl) {
      throw new Error('Uploaded file URL is undefined');
    }

    console.log('Audio URL:', audioUrl);

    // Create a transcript from the uploaded audio
    const transcript = await client.transcripts.create({
      audio_url: audioUrl,
    });

    console.log('Transcript Creation Response:', transcript);

    let transcriptStatus = 'processing';
    let completedTranscript = null;

    while (transcriptStatus === 'processing') {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      completedTranscript = await client.transcripts.get(transcript.id);
      transcriptStatus = completedTranscript.status;
      console.log('Polling Status:', transcriptStatus);
    }
    if (completedTranscript.status === 'completed') {
      console.log('Transcript completed:', completedTranscript.text);
      return completedTranscript.text;
    } else {
      throw new Error('Transcription failed or was cancelled');
    }
  } catch (error) {
    console.error('Transcription Error:', error);
    throw error;
  }
};




// Example usage:
// const transcriptText = await getTranscript('https://assembly.ai/sports_injuries.mp3');
// console.log(transcriptText);

  
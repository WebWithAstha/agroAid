import { useState, useRef } from 'react';
import Header from '../Header';
import ChatMessages from '../assistant/QueryList';
import ChatInput from '../assistant/QueryInput';

const Assistant = () => {
  const [queries, setQueries] = useState([
    {
      _id: 1,
      userId: "user123", // Replace with actual user ID
      query: "https://firebasestorage.googleapis.com/v0/b/upload-images-da293.appspot.com/o/voice-messages%2Faudio_1744357350618.webm?alt=media&token=5c56babc-bef4-4db1-bf5e-909a2ad017bd", // voice query
      isVoice: true,
      language: "en",
      response: {
        text: "Based on your description, your tomato plants might be suffering from Early Blight or Septoria Leaf Spot...",
        audioUrl: "https://firebasestorage.googleapis.com/v0/b/upload-images-da293.appspot.com/o/voice-messages%2Fmenx27s-laughter-121577.mp3?alt=media&token=8a0515e0-1690-4e2b-8293-061b1288d7c2", // optional: AI voice response
      },
      createdAt: "Today, 10:23 AM",
      duration: "0:12",
    },
    {
      _id: 2,
      userId: "user123",
      query: "What's the best time to apply neem oil treatment?",
      isVoice: false,
      language: "en",
      response: {
        text: "The best time to apply neem oil is early morning or late evening when temperatures are cooler...",
        audioUrl: "https://firebasestorage.googleapis.com/v0/b/upload-images-da293.appspot.com/o/voice-messages%2Fmenx27s-laughter-121577.mp3?alt=media&token=8a0515e0-1690-4e2b-8293-061b1288d7c2", // optional
      },
      createdAt: "Today, 10:30 AM",
    },
    {
      _id: 3,
      userId: "user123",
      query: "https://firebasestorage.googleapis.com/v0/b/upload-images-da293.appspot.com/o/voice-messages%2Faudio_1744357350618.webm?alt=media&token=5c56babc-bef4-4db1-bf5e-909a2ad017bd",
      isVoice: true,
      language: "en",
      response: {
        text: "Yes, the symptoms you describe sound consistent with rice blast disease...",
        audioUrl: "https://firebasestorage.googleapis.com/v0/b/upload-images-da293.appspot.com/o/voice-messages%2Faudio_1744357350618.webm?alt=media&token=5c56babc-bef4-4db1-bf5e-909a2ad017bd",
      },
      createdAt: "Today, 11:15 AM",
      duration: "0:08",
    }
  ]);
  const [newQuery,setNewQuery] = useState();
 const [isVoiceQuery, setIsVoiceQuery] = useState(false)
  
  
    // Handle query (text or voice) submission
    const handleSendQuery = (queryText, isVoice = false) => {
      const newQuerySchema = {
        _id: queries.length + 1,
        userId: "user123",
        query: queryText,
        isVoice: isVoice,
        language: "en",
        response: {
          text: "Hi jim!!",
          audioUrl: "https://firebasestorage.googleapis.com/v0/b/upload-images-da293.appspot.com/o/voice-messages%2Fhi-jim-85869.mp3?alt=media&token=5015b912-adc2-4eb5-8209-3e14ba98cfeb",
        },
        createdAt: "Just now",
      };
    
      setQueries(prev => [...prev, newQuerySchema]);
    };
    

  
    return (
        <div className="flex flex-col h-screen bg-gray-50">
        <Header title="Farming Assistant" />
        <ChatMessages 
          queries={queries} 
        />
        <ChatInput
          setQueries={setQueries}
          newQuery={newQuery}
          setNewQuery={setNewQuery}
          setIsVoiceQuery={setIsVoiceQuery}
          handleSendQuery={handleSendQuery}
        />
      </div>
    );
  }

export default Assistant
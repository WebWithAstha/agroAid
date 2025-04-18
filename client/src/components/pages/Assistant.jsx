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

  
  
    // Handle text input submission
    const handleSendMessage = () => {
      if (inputText.trim() === '') return;
    
      // Create new query in new schema format
      const newQuery = {
        _id: queries.length + 1,
        userId: "user123", // replace with actual user ID
        query: inputText,
        isVoice: false,
        language: "en",
        response: {
          text: "", // AI will respond after delay
          audioUrl: "",
        },
        createdAt: "Just now",
      };
    
      setQueries([...queries, newQuery]);
      setInputText('');
    
      // Simulate assistant response
      setTimeout(() => {
        const updatedResponse = {
          ...newQuery,
          _id: queries.length + 2,
          response: {
            text:
              "Thank you for your question. I'll need more specific information about your crop issue to provide accurate advice. Could you please describe the symptoms in more detail? Information such as the affected plant parts, how long you've noticed the issue, and any recent changes in weather or farming practices would be helpful.",
            audioUrl: "", // optionally add TTS-generated audio link here
          },
          createdAt: "Just now",
        };
    
        setQueries(prevQueries => [...prevQueries, updatedResponse]);
      }, 1500);
    };

    
    // Toggle play state for voice queries
    const togglePlay = (id) => {
      setQueries(queries.map(query => {
        if (query.id === id) {
          return { ...query, isPlaying: !query.isPlaying };
        }
        // Pause any other playing query
        if (query.isPlaying) {
          return { ...query, isPlaying: false };
        }
        return query;
      }));
      
      // Auto-stop after duration
      const query = queries.find(m => m.id === id);
      if (query && !query.isPlaying) {
        const durationInSecs = parseInt(query.duration.split(':')[1]);
        setTimeout(() => {
          setQueries(prevqueries => prevqueries.map(m => 
            m.id === id ? { ...m, isPlaying: false } : m
          ));
        }, durationInSecs * 1000);
      }
    };
  
    // Toggle expanded text for assistant queries
    const toggleExpanded = (id) => {
      setQueries(queries.map(query => {
        if (query.id === id) {
          return { ...query, isExpanded: !query.isExpanded };
        }
        return query;
      }));
    };
  
    return (
        <div className="flex flex-col h-screen bg-gray-50">
        <Header title="Farming Assistant" />
        <ChatMessages 
          queries={queries} 
        />
        <ChatInput
          handleSendMessage={handleSendMessage}
        />
      </div>
    );
  }

export default Assistant
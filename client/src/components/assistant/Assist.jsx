import { useState, useRef } from 'react';
import { Mic, MicOff, Send, Play, Pause, ChevronDown, ChevronUp, User, Bot, MessageSquare, Volume2, Volume, Clock } from 'lucide-react';

export default function FarmerVoiceAssistant() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'farmer',
      type: 'voice',
      content: "I noticed yellow spots on my tomato leaves. What could be causing this?",
      timestamp: "Today, 10:23 AM",
      duration: "0:12",
      isPlaying: false,
    },
    {
      id: 2,
      sender: 'assistant',
      type: 'voice',
      content: "Based on your description, your tomato plants might be suffering from Early Blight or Septoria Leaf Spot. Both are fungal diseases that cause yellow spots on leaves. Early Blight shows concentric rings in the spots while Septoria causes smaller spots with dark borders. For treatment, remove affected leaves, ensure good air circulation, apply organic fungicides like copper spray or neem oil. Water at the base of plants to avoid wetting the leaves. For severe cases, consider chemical fungicides containing chlorothalonil or mancozeb, following the product instructions carefully.",
      timestamp: "Today, 10:24 AM",
      duration: "0:28",
      isPlaying: false,
      isExpanded: false,
    },
    {
      id: 3,
      sender: 'farmer',
      type: 'text',
      content: "What's the best time to apply neem oil treatment?",
      timestamp: "Today, 10:30 AM",
    },
    {
      id: 4,
      sender: 'assistant',
      type: 'voice',
      content: "The best time to apply neem oil is early morning or late evening when temperatures are cooler and beneficial insects are less active. Avoid application during hot midday sun as it can cause leaf burn. Ensure thorough coverage of both sides of the leaves. For preventative treatment, apply every 7-14 days. For active infestations, apply every 5-7 days until the problem is resolved. Don't apply if rain is expected within 24 hours, and avoid spraying when plants are water-stressed.",
      timestamp: "Today, 10:31 AM",
      duration: "0:22",
      isPlaying: false,
      isExpanded: false,
    },
    {
      id: 5,
      sender: 'farmer',
      type: 'voice',
      content: "My rice crop has some brownish lesions on the leaves. Is this rice blast?",
      timestamp: "Today, 11:15 AM",
      duration: "0:08",
      isPlaying: false,
    },
    {
      id: 6,
      sender: 'assistant',
      type: 'voice',
      content: "Yes, the symptoms you describe sound consistent with rice blast disease, which is caused by the fungus Magnaporthe oryzae. Rice blast typically appears as diamond-shaped lesions with brown or reddish-brown borders and grayish centers. This disease thrives in high humidity and temperatures between 24-28°C. For management, ensure balanced fertilization with not too much nitrogen, maintain proper water management, consider resistant varieties for future plantings, apply fungicides containing tricyclazole or azoxystrobin at first sign of infection, and practice good field sanitation by removing infected plant debris.",
      timestamp: "Today, 11:17 AM",
      duration: "0:31",
      isPlaying: false,
      isExpanded: true,
    }
  ]);
  
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const recordingTimerRef = useRef(null);

  // Handle text input submission
  const handleSendMessage = () => {
    if (inputText.trim() === '') return;
    
    const newMessage = {
      id: messages.length + 1,
      sender: 'farmer',
      type: 'text',
      content: inputText,
      timestamp: "Just now",
    };
    
    setMessages([...messages, newMessage]);
    setInputText('');
    
    // Simulate assistant response
    setTimeout(() => {
      const assistantResponse = {
        id: messages.length + 2,
        sender: 'assistant',
        type: 'voice',
        content: "Thank you for your question. I'll need more specific information about your crop issue to provide accurate advice. Could you please describe the symptoms in more detail? Information such as the affected plant parts, how long you've noticed the issue, and any recent changes in weather or farming practices would be helpful.",
        timestamp: "Just now",
        duration: "0:15",
        isPlaying: false,
        isExpanded: false,
      };
      
      setMessages(prevMessages => [...prevMessages, assistantResponse]);
    }, 1500);
  };

  // Handle recording start/stop
  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording
      clearInterval(recordingTimerRef.current);
      
      // Simulate sending voice message
      const newMessage = {
        id: messages.length + 1,
        sender: 'farmer',
        type: 'voice',
        content: "How often should I water my wheat crop during this hot weather?",
        timestamp: "Just now",
        duration: `0:${recordingTime < 10 ? '0' + recordingTime : recordingTime}`,
        isPlaying: false,
      };
      
      setMessages([...messages, newMessage]);
      setRecordingTime(0);
      
      // Simulate assistant response
      setTimeout(() => {
        const assistantResponse = {
          id: messages.length + 2,
          sender: 'assistant',
          type: 'voice',
          content: "During hot weather, wheat crops typically need more frequent watering. For wheat in the vegetative stage, water every 7-10 days, providing about 25mm each time. During flowering and grain filling stages, increase to every 5-7 days with 30-35mm per irrigation. Look for signs of water stress like leaf rolling or wilting as indicators. Early morning irrigation is best to minimize evaporation loss. Use soil moisture sensors if available to optimize your watering schedule. Remember that overwatering can be harmful too, potentially leading to disease issues.",
          timestamp: "Just now",
          duration: "0:26",
          isPlaying: false,
          isExpanded: false,
        };
        
        setMessages(prevMessages => [...prevMessages, assistantResponse]);
      }, 2000);
    } else {
      // Start recording
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    
    setIsRecording(!isRecording);
  };

  // Toggle play state for voice messages
  const togglePlay = (id) => {
    setMessages(messages.map(message => {
      if (message.id === id) {
        return { ...message, isPlaying: !message.isPlaying };
      }
      // Pause any other playing message
      if (message.isPlaying) {
        return { ...message, isPlaying: false };
      }
      return message;
    }));
    
    // Auto-stop after duration
    const message = messages.find(m => m.id === id);
    if (message && !message.isPlaying) {
      const durationInSecs = parseInt(message.duration.split(':')[1]);
      setTimeout(() => {
        setMessages(prevMessages => prevMessages.map(m => 
          m.id === id ? { ...m, isPlaying: false } : m
        ));
      }, durationInSecs * 1000);
    }
  };

  // Toggle expanded text for assistant messages
  const toggleExpanded = (id) => {
    setMessages(messages.map(message => {
      if (message.id === id) {
        return { ...message, isExpanded: !message.isExpanded };
      }
      return message;
    }));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <MessageSquare className="mr-2" /> Farming Assistant
          </h1>
        </div>
      </header>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="container mx-auto max-w-3xl">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex mb-4 ${message.sender === 'farmer' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`rounded-lg max-w-3/4 shadow-sm ${
                  message.sender === 'farmer' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-white border border-gray-200'
                }`}
              >
                {/* Message Header */}
                <div className="px-4 py-2 flex items-center border-b border-opacity-20 border-gray-300">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                    message.sender === 'farmer' 
                      ? 'bg-green-700' 
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {message.sender === 'farmer' 
                      ? <User size={16} /> 
                      : <Bot size={16} />
                    }
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-medium ${message.sender === 'farmer' ? 'text-white' : 'text-gray-900'}`}>
                      {message.sender === 'farmer' ? 'You' : 'Farming Assistant'}
                    </h3>
                    <p className={`text-xs ${message.sender === 'farmer' ? 'text-green-100' : 'text-gray-500'}`}>
                      {message.timestamp}
                    </p>
                  </div>
                  {message.type === 'voice' && (
                    <div className="flex items-center">
                      <span className={`text-xs mr-2 ${message.sender === 'farmer' ? 'text-green-100' : 'text-gray-500'}`}>
                        {message.duration}
                      </span>
                      <button 
                        onClick={() => togglePlay(message.id)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.sender === 'farmer' 
                            ? 'bg-green-700 hover:bg-green-800' 
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {message.isPlaying ? <Pause size={16} /> : <Play size={16} />}
                      </button>
                    </div>
                  )}
                </div>

                {/* Message Content */}
                <div className="p-4">
                  {/* For farmer, always show content */}
                  {message.sender === 'farmer' && (
                    <p className={message.sender === 'farmer' ? 'text-white' : 'text-gray-800'}>
                      {message.content}
                    </p>
                  )}
                  
                  {/* For assistant, show content based on expanded state */}
                  {message.sender === 'assistant' && (
                    <>
                      <div className="flex items-start mb-2">
                        <Volume2 size={16} className="mr-2 mt-1 text-green-600 flex-shrink-0" />
                        <p className="text-gray-700">
                          {message.isExpanded 
                            ? message.content 
                            : `${message.content.substring(0, 100)}...`}
                        </p>
                      </div>
                      <button
                        onClick={() => toggleExpanded(message.id)}
                        className="flex items-center text-sm text-green-600 hover:text-green-800 mt-1"
                      >
                        {message.isExpanded 
                          ? <>Show less <ChevronUp size={16} className="ml-1" /></>
                          : <>Show more <ChevronDown size={16} className="ml-1" /></>}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white p-4">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center">
            {/* Recording indicator */}
            {isRecording && (
              <div className="bg-red-100 text-red-700 px-3 py-2 rounded-lg flex items-center mr-3">
                <span className="inline-block w-2 h-2 bg-red-600 rounded-full mr-2 animate-pulse"></span>
                <Clock size={16} className="mr-1" />
                <span>{recordingTime < 10 ? `0:0${recordingTime}` : `0:${recordingTime}`}</span>
              </div>
            )}
            
            {/* Text input */}
            <div className="flex-1 bg-gray-100 rounded-lg flex items-center overflow-hidden">
              <input
                type="text"
                placeholder={isRecording ? "Recording..." : "Type your question..."}
                className="flex-1 px-4 py-3 bg-transparent focus:outline-none"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={isRecording}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
              />
              
              {/* Record button */}
              <button
                onClick={toggleRecording}
                className={`w-10 h-10 rounded-full flex items-center justify-center mr-2 ${
                  isRecording 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
              </button>
              
              {/* Send button */}
              <button
                onClick={handleSendMessage}
                disabled={inputText.trim() === '' || isRecording}
                className={`w-10 h-10 rounded-full flex items-center justify-center mr-2 ${
                  inputText.trim() === '' || isRecording
                    ? 'bg-gray-200 text-gray-400' 
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
          
          {/* Helper text */}
          <p className="text-xs text-gray-500 mt-2 text-center">
            {isRecording 
              ? "Click the microphone icon again to stop recording" 
              : "Ask any farming questions by voice or text"}
          </p>
        </div>
      </div>
    </div>
  );
}
import { Clock, Mic, MicOff, Send } from "lucide-react";
import { useRef, useState } from "react";

const ChatInput = ({ 
  handleSendMessage 
}) => {

    const [inputText, setInputText] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const recordingTimerRef = useRef(null);
    
        // Handle recording start/stop
        const toggleRecording = () => {
            if (isRecording) {
              // Stop recording
              clearInterval(recordingTimerRef.current);
              
              // Simulate sending voice message
              const newQuery = {
                userId: someUserId, // Replace with actual user ID from session/context
                query: "https://your-storage-service.com/uploads/voice-message.mp3", // URL to the recorded voice message
                isVoice: true,
                language: "en",
                response: {
                  audioUrl: "", // AI-generated audio response (if any)
                  text: "You should water your wheat crop every 5–7 days during hot weather, depending on soil type and humidity.",
                },
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
    
    return(
  <div className="border-t border-gray-200 bg-white p-4">
    <div className="container mx-auto max-w-3xl">
      <div className="flex items-center">
        {isRecording && (
          <div className="bg-red-100 text-red-700 px-3 py-2 rounded-lg flex items-center mr-3">
            <span className="inline-block w-2 h-2 bg-red-600 rounded-full mr-2 animate-pulse"></span>
            <Clock size={16} className="mr-1" />
            <span>{recordingTime < 10 ? `0:0${recordingTime}` : `0:${recordingTime}`}</span>
          </div>
        )}

        <div className="flex-1 bg-gray-100 rounded-lg flex items-center overflow-hidden">
          <input
            type="text"
            placeholder={isRecording ? "Recording..." : "Type your question..."}
            className="flex-1 px-4 py-3 bg-transparent focus:outline-none"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isRecording}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
          />
          <button
            onClick={toggleRecording}
            className={`w-10 h-10 rounded-full flex items-center justify-center mr-2 ${
              isRecording ? "bg-red-500 text-white hover:bg-red-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
          </button>
          <button
            onClick={handleSendMessage}
            disabled={inputText.trim() === "" || isRecording}
            className={`w-10 h-10 rounded-full flex items-center justify-center mr-2 ${
              inputText.trim() === "" || isRecording
                ? "bg-gray-200 text-gray-400"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-2 text-center">
        {isRecording ? "Click the microphone icon again to stop recording" : "Ask any farming questions by voice or text"}
      </p>
    </div>
  </div>
)};

export default ChatInput;

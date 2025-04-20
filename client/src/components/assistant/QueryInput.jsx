import { Clock, Mic, MicOff, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const QueryInput = ({ handleSendQuery }) => {
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const recordingTimerRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
handleSendQuery(audioUrl, true);
 // trigger the parent fn
        setRecordingTime(0);
      };

      mediaRecorder.start();
      setIsRecording(true);

      recordingTimerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  // Stop recording
  const stopRecording = () => {
    clearInterval(recordingTimerRef.current);
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const toggleRecording = () => {
    isRecording ? stopRecording() : startRecording();
  };

  const onTextSend = () => {
    if (inputText.trim() === '') return;
    handleSendQuery(inputText, false);
    setInputText('');
  };
  
  

  return (
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
                if (e.key === "Enter") onTextSend();
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
              onClick={onTextSend}
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
  );
};

export default QueryInput;

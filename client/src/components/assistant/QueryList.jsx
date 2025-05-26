import { useEffect, useRef } from "react";
import MessageCard from "./QueryCard";

const QueryList = ({ queries, togglePlay, toggleExpanded, botTyping }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [queries]);

  return (
    <div className="flex-1 overflow-y-auto p-2 sm:p-4">
      <div className="mx-auto w-full max-w-full sm:max-w-2xl md:max-w-3xl">
        {queries?.map((query, i) => (
          <MessageCard
            key={i}
            query={query}
            togglePlay={togglePlay}
            toggleExpanded={toggleExpanded}
          />
        ))}
        {botTyping && <BotTyping />}
      </div>
      <div ref={messagesEndRef} />
    </div>
  )
};

export default QueryList;

const BotTyping = () => (
  <div className="mx-auto w-full max-w-full sm:max-w-2xl md:max-w-3xl">
    <div className="flex items-center">
      <div className="animate-pulse w-2 h-2 rounded-full bg-gray-400 mr-1"></div>
      <div className="animate-pulse w-2 h-2 rounded-full bg-gray-400 mr-1"></div>
      <div className="animate-pulse w-2 h-2 rounded-full bg-gray-400"></div>
    </div>
  </div>
);



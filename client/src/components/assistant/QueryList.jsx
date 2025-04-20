import { useEffect, useRef } from "react";
import MessageCard from "./QueryCard";

const QueryList = ({ queries, togglePlay, toggleExpanded }) => {
  const messagesEndRef = useRef(null);

useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior:'auto' });
}, [queries]);

  
  return (
  <div className="flex-1 overflow-y-auto p-4">
    <div className="container mx-auto max-w-3xl">
      {queries.map((query,i) => (
        <MessageCard 
          key={i} 
          query={query} 
          togglePlay={togglePlay} 
          toggleExpanded={toggleExpanded} 
        />
      ))}
    </div>
    <div ref={messagesEndRef} />

  </div>
)};

export default QueryList;

import MessageCard from "./QueryCard";

const QueryList = ({ queries, togglePlay, toggleExpanded }) => (
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
  </div>
);

export default QueryList;

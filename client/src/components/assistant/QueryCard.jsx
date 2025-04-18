import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import AudioPlayer from "../partials/AudioPlayer";
import QueryHeader from "./QueryHeader";

const QueryCard = ({ query }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  if (!query) return null;

  return (
    <div className="mb-6 space-y-4">
      {/* Farmer’s Query */}
      <div className="flex justify-end">
        <div className="bg-green-600 text-white rounded-lg max-w-3/4 shadow-sm">
          <QueryHeader sender="you" time={query.createdAt} />
          <div className="p-4">
            {query.isVoice ? (
              <AudioPlayer audioUrl={query.query} />
            ) : (
              <p className="text-white">{query.query}</p>
            )}
          </div>
        </div>
      </div>

      {/* Assistant’s Response */}
      <div className="flex justify-start">
        <div className="bg-white border w-3/5 border-gray-200 rounded-lg max-w-3/4 shadow-sm">
          <QueryHeader sender="bot" time={query.createdAt} />

          {/* Audio Response */}
          {query.response?.audioUrl && (
            <div className="px-4 py-2 pb-4 border-b border-zinc-200">
              <AudioPlayer audioUrl={query.response.audioUrl} />
            </div>
          )}

          {/* Text Response */}
          <div className="px-4 py-2">
            <div className="flex items-start mb-2">
              <p className="text-gray-700">
                {isExpanded
                  ? query.response?.text
                  : `${query.response?.text?.substring(0, 100)}...`}
              </p>
            </div>

            {query.response?.text?.length > 100 && (
              <button
                onClick={handleToggleExpanded}
                className="flex items-center text-sm text-green-600 hover:text-green-800 mt-1"
              >
                {isExpanded ? (
                  <>
                    Show less <ChevronUp size={16} className="ml-1" />
                  </>
                ) : (
                  <>
                    Show more <ChevronDown size={16} className="ml-1" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryCard;

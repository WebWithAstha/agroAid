import AudioPlayer from "../partials/AudioPlayer";
import QueryHeader from "./QueryHeader";

const FarmerQuery = ({ query }) => (
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
);

const AssistantResponse = ({ response, createdAt }) => (
  response &&
  <div className="flex justify-start">
    <div className="bg-white border w-3/5 border-gray-200 rounded-lg max-w-3/4 shadow-sm">
      <QueryHeader sender="bot" time={createdAt} />

      {response?.audioUrl && (
        <div className="px-4 py-2 pb-4 border-b border-zinc-200">
          <AudioPlayer audioUrl={response.audioUrl} />
        </div>
      )}

      {response?.text && (
        <div className="px-4 py-2">
        <div className="flex items-start mb-2">
          <p className="text-gray-700">{response?.text}</p>
        </div>
      </div>
      )}
    </div>
  </div>
);

const QueryCard = ({ query }) => {
  if (!query) return null;

  return (
    <div className="mb-6 space-y-4">
      <FarmerQuery query={query} />
      <AssistantResponse response={query.response} createdAt={query.createdAt} />
    </div>
  );
};

export default QueryCard;

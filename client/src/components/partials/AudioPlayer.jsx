import React from 'react'

const AudioPlayer = ({ audioUrl }) => {
    return (
      <div className="mt-2">
        <audio
          controls
          preload="auto"
          className="w-full min-w-xs max-w-xs"
          src={audioUrl}
        >
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  };

export default AudioPlayer
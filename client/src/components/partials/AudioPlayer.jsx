import React from 'react';

const AudioPlayer = ({ audioUrl }) => {
  return (
    <div className="mt-2">
      <audio controls>
        <source src={audioUrl} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;

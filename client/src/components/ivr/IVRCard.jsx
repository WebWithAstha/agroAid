import {
  Phone,
  PhoneCall
} from 'lucide-react';
import { useState } from 'react';
import { initiateDemoCall } from '../../Services/ivr.service';

const IVRCard = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const initiateIVRCall = async () => {
    try {
      setIsPlaying(true);
      setIsDisabled(true);
      initiateDemoCall();

      // Stop animation after 15 seconds
      setTimeout(() =>{ 
        setIsPlaying(false)
        setIsDisabled(false)
      }, 10000);

    } catch (error) {
      console.error('API Error:', error);
      setIsPlaying(false);
      setIsDisabled(false);
    }
  };

  return (
    <div className="bg-green-50 p-8 pt-0 gap-4 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="px-6 py-4 w-full text-center border-b border-gray-200">
        <h3 className="text-xl font-semibold mx-auto w-fit text-gray-800 flex items-center">
          <Phone size={24} className="mr-2 text-green-600" /> Try IVR System Now
        </h3>
      </div>

      <div className="relative z-10 text-center">
        <div className="w-32 h-32 rounded-full bg-green-600 flex items-center justify-center text-white mx-auto mb-6">
          <Phone size={56} />
        </div>
        <p className="text-green-700 mb-4">Experience our IVR system firsthand</p>
        <button
          onClick={() => {
            if (!isPlaying && !isDisabled) {
              initiateIVRCall();
            }
          }}
          disabled={isDisabled}
          className={`${
            isDisabled ? 'bg-rose-600 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          } text-white px-4 py-2 rounded-full flex items-center mx-auto mb-4 transition duration-300`}
        >
          {isPlaying ? (
            <>
              <PhoneCall size={20} className="mr-2" /> Calling...
            </>
          ) : (
            <>
              <Phone size={20} className="mr-2" /> Initiate a Call
            </>
          )}
        </button>
        {/* {isPlaying && (
          <div className="relative w-full h-2 bg-green-200 rounded-full overflow-hidden">
            <div className="absolute inset-y-0 left-0 bg-green-600 rounded-full animate-progress"></div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default IVRCard;

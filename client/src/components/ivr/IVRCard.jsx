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
      setIsDisabled(true);
      await initiateDemoCall(setIsDisabled);

    } catch (error) {
      console.error('API Error:', error);
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

        <button onClick={initiateIVRCall}
         disabled={isDisabled}
         className={`${
           isDisabled ? 'bg-rose-600 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
         } text-white px-4 py-2 rounded-full flex items-center mx-auto mb-4 transition duration-300`}
       
         >{isDisabled?'Calling..':'Call'}</button>

      </div>
    </div>
  );
};

export default IVRCard;

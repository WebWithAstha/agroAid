import { Bot, User } from 'lucide-react';
import React from 'react'

const QueryHeader =  ({ sender, time }) => (
        <div
          className={`px-4 py-2 flex items-center border-b ${
            sender == "you" ? "border-green-700 text-white" : "border-gray-300"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full  ${
              sender == "you" ? "bg-green-700" : "bg-gray-300"
            } flex items-center justify-center mr-2`}
          >
            {sender == "you" ? <User size={16} /> : <Bot size={16} />}
          </div>
          <div className="flex-1">
            <h3 className="font-medium ">{sender}</h3>
            <p className="text-xs opacity-60">{time}</p>
          </div>
        </div>
      );

export default QueryHeader
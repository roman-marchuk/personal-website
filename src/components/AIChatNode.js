import React, { useState } from 'react';
import { sendChatMessage } from '../api';

const AIChatNode = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const newMessages = [...messages, { role: 'user', content: inputMessage }];
    setMessages(newMessages);
    setInputMessage('');

    try {
      const response = await sendChatMessage(newMessages);
      setMessages([...newMessages, { role: 'assistant', content: response.message }]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="bg-white bg-opacity-80 p-4 rounded-lg shadow-lg w-96 max-h-[80vh] flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold">AI Chat</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">Close</button>
      </div>
      <div className="flex-grow overflow-y-auto mb-2 p-2 bg-gray-100 rounded">
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
              {message.content}
            </span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-grow p-2 border rounded-l"
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-r">Send</button>
      </div>
    </div>
  );
};

export default AIChatNode;
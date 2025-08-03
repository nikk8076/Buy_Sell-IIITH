import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your shopping assistant. I can help you with product recommendations, answer questions about items, or assist with any other queries related to the Buy-Sell platform. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await axios.post('/chatbot', { 
        message: inputMessage
      });
      
      const botMessage = {
        id: messages.length + 2,
        text: response.data.response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to get response from chatbot');
      
      const errorMessage = {
        id: messages.length + 2,
        text: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm your shopping assistant. How can I help you today?",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="mt-16 sm:mt-20 mx-2 sm:mx-4 flex flex-col h-[400px] sm:h-[500px] lg:h-[600px] w-full border border-Gray rounded-lg shadow-lg">
      {/* Header */}
      <div className="bg-Blue text-white p-3 sm:p-4 rounded-t-lg flex justify-between items-center">
        <h2 className="text-base sm:text-lg font-semibold">Shopping Assistant</h2>
        <button
          onClick={clearChat}
          className="bg-Red hover:bg-opacity-80 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm"
        >
          Clear Chat
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[75%] lg:max-w-[70%] p-2 sm:p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-Blue text-white rounded-br-none'
                  : 'bg-white border border-Gray rounded-bl-none'
              }`}
            >
              <p className="text-xs sm:text-sm whitespace-pre-wrap break-words">{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.sender === 'user' ? 'text-Gray' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-Gray rounded-lg rounded-bl-none p-2 sm:p-3">
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 sm:p-4 border-t border-Gray bg-white rounded-b-lg">
        <div className="flex space-x-2">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            className="flex-1 border border-Gray rounded-lg px-2 sm:px-3 py-2 text-xs sm:text-sm resize-none focus:outline-none focus:ring-2 focus:ring-Blue"
            rows={1}
            style={{ minHeight: '36px', maxHeight: '120px' }}
          />
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap ${
              !inputMessage.trim() || isTyping
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-Blue text-white hover:bg-opacity-90'
            }`}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;

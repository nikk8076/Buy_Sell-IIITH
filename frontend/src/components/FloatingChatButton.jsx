import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FloatingChatButton = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link to="/chatbot">
        <div className="bg-Blue hover:bg-opacity-90 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
      </Link>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute -top-2 -right-2 bg-Red text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-opacity-80"
      >
        ×
      </button>
    </div>
  );
};

export default FloatingChatButton;

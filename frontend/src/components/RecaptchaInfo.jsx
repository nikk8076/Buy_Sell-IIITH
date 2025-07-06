import React from 'react';

const RecaptchaInfo = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md mx-4">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-Blue rounded-full flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-Blue">Security Verification Required</h3>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-600 mb-3">
            To prevent spam and ensure a safe chatting experience, we need to verify that you're a real person.
          </p>
          <p className="text-sm text-gray-500">
            Please complete the reCAPTCHA verification below to continue chatting with our AI assistant.
          </p>
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-Blue text-white px-4 py-2 rounded-lg hover:bg-opacity-90 text-sm"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecaptchaInfo;

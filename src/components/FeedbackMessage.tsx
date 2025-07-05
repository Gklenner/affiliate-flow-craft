
import React from 'react';

interface FeedbackMessageProps {
  message: string;
  type?: 'success' | 'info' | 'error';
}

const FeedbackMessage: React.FC<FeedbackMessageProps> = ({ message, type = 'info' }) => {
  const getBackgroundClass = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500/20 border-green-500/30 text-green-300';
      case 'error':
        return 'bg-red-500/20 border-red-500/30 text-red-300';
      default:
        return 'bg-blue-500/20 border-blue-500/30 text-blue-300';
    }
  };

  return (
    <div className={`${getBackgroundClass()} border rounded-lg p-4`}>
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default FeedbackMessage;

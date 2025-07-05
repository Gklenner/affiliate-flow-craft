
import React from 'react';
import { AppDownloadLinks } from '../types/landing';
import FeedbackMessage from './FeedbackMessage';

interface AppDownloadStepProps {
  isLoading: boolean;
  feedbackMessage: string;
  onDownload: (platform: 'android' | 'ios') => void;
}

const AppDownloadStep: React.FC<AppDownloadStepProps> = ({ 
  isLoading, 
  feedbackMessage, 
  onDownload 
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 animate-slide-up">
      <h2 className="text-3xl font-bold text-lp-light mb-4">
        📱 Baixe o App Oficial
      </h2>
      <p className="text-white/80 mb-6">
        Para validar seu acesso e liberar o material completo, 
        você precisa baixar o app oficial da plataforma.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={() => onDownload('android')}
          disabled={isLoading}
          className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
        >
          <span className="mr-2">📱</span>
          Baixar para Android
        </button>
        
        <button
          onClick={() => onDownload('ios')}
          disabled={isLoading}
          className="flex items-center justify-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50"
        >
          <span className="mr-2">🍎</span>
          Baixar para iOS
        </button>
      </div>

      {feedbackMessage && (
        <FeedbackMessage message={feedbackMessage} />
      )}
    </div>
  );
};

export default AppDownloadStep;


import React from 'react';
import FeedbackMessage from './FeedbackMessage';

interface VerificationStepProps {
  isLoading: boolean;
  feedbackMessage: string;
  onVerify: () => void;
}

const VerificationStep: React.FC<VerificationStepProps> = ({ 
  isLoading, 
  feedbackMessage, 
  onVerify 
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 animate-slide-up">
      <h2 className="text-3xl font-bold text-lp-light mb-4">
        🔐 Verificar Seu Acesso
      </h2>
      <p className="text-white/80 mb-6">
        Agora vamos verificar se sua conta foi criada corretamente 
        e se você tem acesso completo à plataforma.
      </p>
      
      <button
        onClick={onVerify}
        disabled={isLoading}
        className="px-8 py-4 bg-lp-cta text-white text-lg font-bold rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? '🔄 Verificando...' : '🚀 Verificar Meu Acesso'}
      </button>

      {feedbackMessage && (
        <div className="mt-6">
          <FeedbackMessage message={feedbackMessage} type="success" />
        </div>
      )}
    </div>
  );
};

export default VerificationStep;

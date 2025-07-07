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
        🔐 Verificar Instalação do App
      </h2>
      <p className="text-white/80 mb-6">
        Agora vamos verificar se o app foi instalado corretamente e liberar seu{' '}
        <span className="text-lp-orange font-bold">acesso premium</span> ao material estratégico exclusivo.
      </p>

      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-6 mb-6">
        <h3 className="text-xl font-bold text-lp-light mb-3">
          🎯 O que será liberado após verificação:
        </h3>
        <ul className="text-white/90 space-y-2">
          <li>📋 <strong>Checklist Completo:</strong> Passo a passo para primeiros R$ 5k</li>
          <li>🎬 <strong>Vídeos Exclusivos:</strong> Estratégias dos afiliados top</li>
          <li>📱 <strong>Templates Prontos:</strong> Stories, posts e reels que convertem</li>
          <li>🤖 <strong>Automações Setup:</strong> Configure tudo em 30 minutos</li>
          <li>💎 <strong>Método Secreto:</strong> A estratégia que mudará seu jogo</li>
        </ul>
      </div>
      
      <button
        onClick={onVerify}
        disabled={isLoading}
        className="w-full px-8 py-4 bg-lp-cta text-white text-xl font-bold rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 shadow-lg mb-4"
      >
        {isLoading ? '🔄 Verificando instalação...' : '🚀 Verificar e Liberar Material Premium'}
      </button>

      <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
        <p className="text-green-300 text-sm">
          ✅ <strong>Garantia:</strong> Após a verificação, você terá acesso imediato a todo o material estratégico e{' '}
          <span className="text-orange-300 font-bold">suporte especializado 24/7</span> para maximizar seus resultados!
        </p>
      </div>

      {feedbackMessage && (
        <div className="mt-6">
          <FeedbackMessage message={feedbackMessage} type="success" />
        </div>
      )}
    </div>
  );
};

export default VerificationStep;
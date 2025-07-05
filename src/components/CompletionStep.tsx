
import React from 'react';
import { UserProgress } from '../types/landing';
import FeedbackMessage from './FeedbackMessage';

interface CompletionStepProps {
  progress: UserProgress;
  isLoading: boolean;
  feedbackMessage: string;
  onEmailSend: () => void;
  onCopyLink: () => void;
}

const CompletionStep: React.FC<CompletionStepProps> = ({ 
  progress, 
  isLoading, 
  feedbackMessage, 
  onEmailSend, 
  onCopyLink 
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 animate-slide-up">
      <h2 className="text-3xl font-bold text-lp-light mb-4">
        🎉 Parabéns! Tudo Pronto Para Faturar!
      </h2>
      <p className="text-white/80 mb-6">
        Você completou todas as etapas! Agora vou liberar seu material 
        estratégico completo e seu link de afiliado definitivo.
      </p>

      <div className="bg-gradient-to-r from-orange-500/20 to-green-500/20 border border-orange-500/30 rounded-lg p-6 mb-6">
        <h3 className="text-xl font-bold text-lp-light mb-4">
          📚 Seu Material Estratégico Inclui:
        </h3>
        <ul className="text-white/90 space-y-2">
          <li>✅ 50+ Copies prontos para usar</li>
          <li>✅ Hashtags que convertem</li>
          <li>✅ Scripts para stories e reels</li>
          <li>✅ A sacada secreta dos top afiliados</li>
          <li>✅ Templates de posts que geram leads</li>
          <li>✅ Cronograma de postagens otimizado</li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={onEmailSend}
          disabled={isLoading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          📧 Enviar Material para Meu E-mail
        </button>
        
        <button
          onClick={onCopyLink}
          className="px-6 py-3 bg-lp-success text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          🔗 Copiar Meu Link de Afiliado
        </button>
      </div>

      {progress.affiliateLink && (
        <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-4 mb-4">
          <p className="text-xs text-white/60 mb-1">Seu link de afiliado:</p>
          <p className="text-white font-mono text-sm break-all">{progress.affiliateLink}</p>
        </div>
      )}

      {feedbackMessage && (
        <FeedbackMessage message={feedbackMessage} type="success" />
      )}
    </div>
  );
};

export default CompletionStep;

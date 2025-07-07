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
        🎉 PARABÉNS! Você Está Oficialmente Dentro!
      </h2>
      <p className="text-white/80 mb-6">
        Incrível! Você completou todo o processo e agora tem acesso ao{' '}
        <span className="text-lp-orange font-bold">sistema completo</span> + material estratégico premium dos afiliados que faturam R$ 50k+/mês.
      </p>

      <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-lg p-6 mb-6">
        <h3 className="text-xl font-bold text-lp-light mb-4">
          🚀 Seu Kit Estratégico Premium Inclui:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/90">
          <div>
            <h4 className="font-bold text-orange-300 mb-2">📚 Material Estratégico:</h4>
            <ul className="space-y-1 text-sm">
              <li>✅ 100+ Copies que convertem 10x mais</li>
              <li>✅ Scripts para stories e reels virais</li>
              <li>✅ Hashtags secretas de alta conversão</li>
              <li>✅ Templates de posts que geram leads</li>
              <li>✅ Cronograma otimizado de postagens</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-blue-300 mb-2">🎯 Estratégias Avançadas:</h4>
            <ul className="space-y-1 text-sm">
              <li>✅ Método dos R$ 15k no primeiro mês</li>
              <li>✅ Funil completo dos top afiliados</li>
              <li>✅ Automações que vendem 24/7</li>
              <li>✅ Técnicas de persuasão avançada</li>
              <li>✅ A sacada secreta que poucos conhecem</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-6 mb-6">
        <h3 className="text-xl font-bold text-lp-light mb-3">
          🎁 Bônus Exclusivos Desbloqueados:
        </h3>
        <ul className="text-white/90 space-y-2">
          <li>🤖 <strong>IA Setup Completo:</strong> Configure automações em 30min</li>
          <li>📱 <strong>App Premium:</strong> Acesso vitalício ao ecossistema</li>
          <li>👥 <strong>Comunidade VIP:</strong> Network com afiliados de alto nível</li>
          <li>🎬 <strong>Masterclass Exclusiva:</strong> Estratégias dos R$ 100k+/mês</li>
          <li>💎 <strong>Suporte Premium:</strong> Mentoria especializada 24/7</li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={onEmailSend}
          disabled={isLoading}
          className="flex-1 px-6 py-4 bg-blue-600 text-white text-lg font-bold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-lg"
        >
          📧 Enviar Todo Material para Meu E-mail
        </button>
        
        <button
          onClick={onCopyLink}
          className="flex-1 px-6 py-4 bg-lp-success text-white text-lg font-bold rounded-lg hover:bg-green-700 transition-colors shadow-lg"
        >
          🔗 Copiar Meu Link de Afiliado Premium
        </button>
      </div>

      {progress.affiliateLink && (
        <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-4 mb-4">
          <p className="text-xs text-white/60 mb-1">Seu link de afiliado premium:</p>
          <p className="text-white font-mono text-sm break-all">{progress.affiliateLink}</p>
        </div>
      )}

      <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-lg p-4 mb-4">
        <p className="text-orange-300 text-sm">
          🚀 <strong>Próximos Passos:</strong> Acesse o app, implemente as estratégias e comece a faturar! 
          Nosso suporte especializado estará disponível 24/7 para garantir seus resultados.
        </p>
      </div>

      {feedbackMessage && (
        <FeedbackMessage message={feedbackMessage} type="success" />
      )}
    </div>
  );
};

export default CompletionStep;
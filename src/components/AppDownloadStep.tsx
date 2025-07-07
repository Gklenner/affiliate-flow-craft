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
        📱 Baixe o App Premium Agora
      </h2>
      <p className="text-white/80 mb-6">
        Baixe o aplicativo oficial para acessar o <span className="text-lp-orange font-bold">ecossistema completo</span> com{' '}
        IA, CRM, chatbot e todas as ferramentas que os top afiliados usam para faturar alto.
      </p>

      <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-lg p-6 mb-6">
        <h3 className="text-xl font-bold text-lp-light mb-3">
          🎁 Bônus Exclusivo Após Download:
        </h3>
        <ul className="text-white/90 space-y-2">
          <li>📚 <strong>Estratégias Secretas:</strong> Como faturar R$ 15k+ no primeiro mês</li>
          <li>🎯 <strong>Scripts Prontos:</strong> Copies que convertem 10x mais</li>
          <li>📈 <strong>Funil Completo:</strong> Sistema usado pelos afiliados de R$ 50k+/mês</li>
          <li>🤖 <strong>Automações IA:</strong> Venda enquanto dorme</li>
          <li>💰 <strong>Método Exclusivo:</strong> A sacada que poucos conhecem</li>
        </ul>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={() => onDownload('android')}
          disabled={isLoading}
          className="flex items-center justify-center px-8 py-4 bg-green-600 text-white text-lg font-bold rounded-lg hover:bg-green-700 transition-all duration-300 disabled:opacity-50 shadow-lg hover:scale-105 active:scale-95"
        >
          <span className="mr-3 text-2xl">📱</span>
          {isLoading ? 'Processando...' : 'Baixar para Android'}
        </button>
        
        <button
          onClick={() => onDownload('ios')}
          disabled={isLoading}
          className="flex items-center justify-center px-8 py-4 bg-gray-800 text-white text-lg font-bold rounded-lg hover:bg-gray-900 transition-all duration-300 disabled:opacity-50 shadow-lg hover:scale-105 active:scale-95"
        >
          <span className="mr-3 text-2xl">🍎</span>
          {isLoading ? 'Processando...' : 'Baixar para iOS'}
        </button>
      </div>

      <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mb-6">
        <p className="text-blue-300 text-sm">
          ⚡ <strong>Importante:</strong> Após instalar o app, você será direcionado para uma área especial onde receberá{' '}
          <span className="text-orange-300 font-bold">todo o material estratégico premium</span> automaticamente!
        </p>
      </div>

      {feedbackMessage && (
        <FeedbackMessage message={feedbackMessage} />
      )}
    </div>
  );
};

export default AppDownloadStep;
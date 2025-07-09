import React from 'react';
import { Smartphone, Download, CheckCircle, Star } from 'lucide-react';
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
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 animate-slide-up max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <Smartphone className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-4xl font-bold text-lp-light mb-4">
          📱 Baixe o App AffiliateFlow Pro
        </h2>
        <p className="text-xl text-white/80 mb-6">
          Seu acesso ao <span className="text-lp-orange font-bold">ecossistema completo</span> está a um clique de distância!
        </p>
      </div>

      {/* App Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg p-6">
          <h3 className="text-xl font-bold text-lp-light mb-4 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-lp-green" />
            🚀 Recursos Premium
          </h3>
          <ul className="text-white/90 space-y-2 text-sm">
            <li>✅ IA integrada para automação de vendas</li>
            <li>✅ CRM completo para gestão de leads</li>
            <li>✅ Chatbot inteligente 24/7</li>
            <li>✅ Dashboard de performance em tempo real</li>
            <li>✅ Notificações de vendas instantâneas</li>
          </ul>
        </div>

        <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-lg p-6">
          <h3 className="text-xl font-bold text-lp-light mb-4 flex items-center gap-2">
            <Star className="w-6 h-6 text-lp-orange" />
            🎁 Bônus Exclusivos
          </h3>
          <ul className="text-white/90 space-y-2 text-sm">
            <li>📚 +500 templates de alta conversão</li>
            <li>🎬 Masterclass exclusiva dos top 1%</li>
            <li>📈 Scripts que convertem 10x mais</li>
            <li>🤖 Automações prontas para usar</li>
            <li>💎 Acesso à comunidade VIP</li>
          </ul>
        </div>
      </div>

      {/* Download Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button
          onClick={() => onDownload('android')}
          disabled={isLoading}
          className="flex-1 flex items-center justify-center gap-4 px-8 py-6 bg-gradient-to-r from-green-600 to-green-700 text-white text-lg font-bold rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 disabled:opacity-50 shadow-lg hover:scale-105 active:scale-95"
        >
          <div className="flex items-center gap-3">
            <Download className="w-6 h-6" />
            <div className="text-left">
              <div className="text-sm opacity-90">Baixar para</div>
              <div className="text-lg font-bold">Android</div>
            </div>
          </div>
          <div className="text-3xl">📱</div>
        </button>
        
        <button
          onClick={() => onDownload('ios')}
          disabled={isLoading}
          className="flex-1 flex items-center justify-center gap-4 px-8 py-6 bg-gradient-to-r from-gray-800 to-black text-white text-lg font-bold rounded-xl hover:from-gray-900 hover:to-gray-800 transition-all duration-300 disabled:opacity-50 shadow-lg hover:scale-105 active:scale-95"
        >
          <div className="flex items-center gap-3">
            <Download className="w-6 h-6" />
            <div className="text-left">
              <div className="text-sm opacity-90">Baixar para</div>
              <div className="text-lg font-bold">iPhone</div>
            </div>
          </div>
          <div className="text-3xl">🍎</div>
        </button>
      </div>

      {/* Security Badge */}
      <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-center gap-3 text-green-300">
          <CheckCircle className="w-5 h-5" />
          <span className="text-sm font-medium">
            🔒 App verificado e seguro • Mais de 1 milhão de downloads
          </span>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-6">
        <h4 className="text-lg font-bold text-lp-light mb-3">📋 Próximos Passos:</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2 text-blue-300">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">1</div>
            <span>Baixe e instale o app</span>
          </div>
          <div className="flex items-center gap-2 text-blue-300">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">2</div>
            <span>Faça login com seus dados</span>
          </div>
          <div className="flex items-center gap-2 text-blue-300">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">3</div>
            <span>Acesse todo o conteúdo</span>
          </div>
        </div>
      </div>

      {feedbackMessage && (
        <div className="mt-6">
          <FeedbackMessage message={feedbackMessage} />
        </div>
      )}
    </div>
  );
};

export default AppDownloadStep;
import React from 'react';
import { Shield, CheckCircle, Clock, Zap } from 'lucide-react';
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
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 animate-slide-up max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-20 h-20 gradient-secondary rounded-full flex items-center justify-center mx-auto mb-6">
          <Shield className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-4xl font-bold text-lp-light mb-4">
          🔐 Verificação de Acesso Premium
        </h2>
        <p className="text-xl text-white/80 mb-6">
          Vamos verificar sua instalação e liberar o{' '}
          <span className="text-lp-orange font-bold">acesso completo</span> ao material estratégico
        </p>
      </div>

      {/* Verification Process */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <h4 className="text-lg font-bold text-lp-light mb-2">Verificar App</h4>
          <p className="text-white/70 text-sm">Confirmamos se o app foi instalado corretamente</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h4 className="text-lg font-bold text-lp-light mb-2">Validar Conta</h4>
          <p className="text-white/70 text-sm">Verificamos sua conta e permissões de acesso</p>
        </div>

        <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h4 className="text-lg font-bold text-lp-light mb-2">Liberar Acesso</h4>
          <p className="text-white/70 text-sm">Desbloqueamos todo o conteúdo premium</p>
        </div>
      </div>

      {/* What Will Be Unlocked */}
      <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-lg p-6 mb-8">
        <h3 className="text-2xl font-bold text-lp-light mb-4 text-center">
          🎯 O que será liberado após verificação:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-bold text-orange-300 mb-3">📚 Material Estratégico Premium:</h4>
            <ul className="text-white/90 space-y-1 text-sm">
              <li>✅ +500 copies de alta conversão</li>
              <li>✅ Scripts para stories e reels virais</li>
              <li>✅ Templates de posts que geram leads</li>
              <li>✅ Hashtags secretas do nicho</li>
              <li>✅ Cronograma otimizado de postagens</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-blue-300 mb-3">🚀 Ferramentas Avançadas:</h4>
            <ul className="text-white/90 space-y-1 text-sm">
              <li>✅ Automações que vendem 24/7</li>
              <li>✅ IA para criação de conteúdo</li>
              <li>✅ Dashboard de performance completo</li>
              <li>✅ CRM integrado com WhatsApp</li>
              <li>✅ Relatórios detalhados de vendas</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Verification Button */}
      <div className="text-center mb-6">
        <button
          onClick={onVerify}
          disabled={isLoading}
          className="w-full max-w-md mx-auto px-8 py-6 bg-gradient-to-r from-lp-orange to-red-500 text-white text-xl font-bold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 disabled:opacity-50 shadow-lg hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
        >
          {isLoading ? (
            <>
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Verificando instalação...
            </>
          ) : (
            <>
              <Shield className="w-6 h-6" />
              Verificar e Liberar Acesso Premium
            </>
          )}
        </button>
      </div>

      {/* Security Info */}
      <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-center gap-3 text-green-300">
          <CheckCircle className="w-5 h-5" />
          <span className="text-sm font-medium">
            🔒 Verificação 100% segura • Processo automatizado em segundos
          </span>
        </div>
      </div>

      {/* Guarantee */}
      <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
        <p className="text-blue-300 text-sm text-center">
          ✅ <strong>Garantia Total:</strong> Após a verificação, você terá acesso imediato a todo o material estratégico e{' '}
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
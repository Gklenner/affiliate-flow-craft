
import React, { useState } from 'react';
import { UserProgress, AppDownloadLinks } from '../types/landing';
import { FeedbackUtils } from '../utils/animations';

interface StepContentProps {
  progress: UserProgress;
  onStepComplete: (stepId: number) => void;
}

const StepContent: React.FC<StepContentProps> = ({ progress, onStepComplete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const downloadLinks: AppDownloadLinks = {
    android: 'https://play.google.com/store/apps/details?id=com.exemplo.app',
    ios: 'https://apps.apple.com/app/exemplo-app/id123456789'
  };

  const handleAppDownload = async (platform: 'android' | 'ios') => {
    setIsLoading(true);
    setFeedbackMessage('📱 Redirecionando para a loja...');
    
    // Simula redirecionamento
    setTimeout(() => {
      window.open(downloadLinks[platform], '_blank');
      setFeedbackMessage('✅ Download iniciado! Complete a instalação e volte aqui.');
      onStepComplete(2);
      setIsLoading(false);
    }, 1500);
  };

  const handleVerification = async () => {
    setIsLoading(true);
    setFeedbackMessage('🔄 Verificando seu acesso...');
    
    // Simula verificação
    setTimeout(() => {
      setFeedbackMessage('✅ Acesso validado com sucesso!');
      onStepComplete(3);
      setIsLoading(false);
    }, 3000);
  };

  const handleEmailSend = async () => {
    setIsLoading(true);
    setFeedbackMessage('📧 Enviando material para seu e-mail...');
    
    // Simula envio de email
    setTimeout(() => {
      setFeedbackMessage('✅ Material enviado! Confira sua caixa de entrada.');
      setIsLoading(false);
    }, 2000);
  };

  const handleCopyLink = async () => {
    const success = await FeedbackUtils.copyToClipboard(progress.affiliateLink);
    if (success) {
      setFeedbackMessage('🔗 Link copiado! Cole onde quiser para começar a ganhar.');
      onStepComplete(4);
    } else {
      setFeedbackMessage('❌ Erro ao copiar. Tente novamente.');
    }
  };

  const renderStepContent = () => {
    switch (progress.currentStep) {
      case 1:
        return (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 animate-slide-up">
            <h2 className="text-3xl font-bold text-lp-light mb-4">
              ✅ Seu Link Foi Gerado!
            </h2>
            <p className="text-white/80 mb-6">
              Perfeito! Seu link de afiliado exclusivo está pronto. 
              Agora vamos para o próximo passo.
            </p>
            <div className="bg-lp-success/20 border border-green-500/30 rounded-lg p-4 mb-6">
              <p className="text-green-300 text-sm">
                💡 <strong>Dica:</strong> Quanto mais rápido você completar todas as etapas, 
                mais rápido começará a ganhar suas comissões!
              </p>
            </div>
          </div>
        );

      case 2:
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
                onClick={() => handleAppDownload('android')}
                disabled={isLoading}
                className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                <span className="mr-2">📱</span>
                Baixar para Android
              </button>
              
              <button
                onClick={() => handleAppDownload('ios')}
                disabled={isLoading}
                className="flex items-center justify-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50"
              >
                <span className="mr-2">🍎</span>
                Baixar para iOS
              </button>
            </div>

            {feedbackMessage && (
              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-300 text-sm">{feedbackMessage}</p>
              </div>
            )}
          </div>
        );

      case 3:
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
              onClick={handleVerification}
              disabled={isLoading}
              className="px-8 py-4 bg-lp-cta text-white text-lg font-bold rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '🔄 Verificando...' : '🚀 Verificar Meu Acesso'}
            </button>

            {feedbackMessage && (
              <div className="mt-6 bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                <p className="text-green-300 text-sm">{feedbackMessage}</p>
              </div>
            )}
          </div>
        );

      case 4:
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
                onClick={handleEmailSend}
                disabled={isLoading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                📧 Enviar Material para Meu E-mail
              </button>
              
              <button
                onClick={handleCopyLink}
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
              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                <p className="text-green-300">{feedbackMessage}</p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {renderStepContent()}
    </div>
  );
};

export default StepContent;

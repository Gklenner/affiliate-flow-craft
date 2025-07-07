
import React, { useState } from 'react';
import { UserProgress, AppDownloadLinks } from '../types/landing';
import { FeedbackUtils } from '../utils/animations';
import WelcomeStep from './WelcomeStep';
import AppDownloadStep from './AppDownloadStep';
import VerificationStep from './VerificationStep';
import CompletionStep from './CompletionStep';

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
    
    // Abre a loja imediatamente
    window.open(downloadLinks[platform], '_blank');
    
    // Simula tempo de download e avança automaticamente
    setTimeout(() => {
      setFeedbackMessage('✅ Download iniciado! Aguarde enquanto verificamos a instalação...');
      
      // Avança para próxima etapa após simular instalação
      setTimeout(() => {
        setFeedbackMessage('🎉 App instalado com sucesso! Avançando para verificação...');
        onStepComplete(2);
        setIsLoading(false);
      }, 2000);
    }, 1000);
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
        return <WelcomeStep />;

      case 2:
        return (
          <AppDownloadStep
            isLoading={isLoading}
            feedbackMessage={feedbackMessage}
            onDownload={handleAppDownload}
          />
        );

      case 3:
        return (
          <VerificationStep
            isLoading={isLoading}
            feedbackMessage={feedbackMessage}
            onVerify={handleVerification}
          />
        );

      case 4:
        return (
          <CompletionStep
            progress={progress}
            isLoading={isLoading}
            feedbackMessage={feedbackMessage}
            onEmailSend={handleEmailSend}
            onCopyLink={handleCopyLink}
          />
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

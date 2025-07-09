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
    android: 'https://play.google.com/store/apps/details?id=com.affiliateflow.app',
    ios: 'https://apps.apple.com/app/affiliateflow-pro/id123456789'
  };

  const handleAppDownload = async (platform: 'android' | 'ios') => {
    setIsLoading(true);
    setFeedbackMessage('📱 Redirecionando para a loja...');
    
    // Abre a loja imediatamente
    window.open(downloadLinks[platform], '_blank');
    
    // Simula processo de download mais realista
    setTimeout(() => {
      setFeedbackMessage('✅ Download iniciado! Aguarde a instalação...');
      
      // Simula instalação
      setTimeout(() => {
        setFeedbackMessage('🎉 App instalado com sucesso! Verificando configuração...');
        
        // Avança para próxima etapa
        setTimeout(() => {
          setFeedbackMessage('🚀 Configuração completa! Avançando para verificação...');
          onStepComplete(2);
          setIsLoading(false);
          setFeedbackMessage('');
        }, 1500);
      }, 2500);
    }, 1000);
  };

  const handleVerification = async () => {
    setIsLoading(true);
    setFeedbackMessage('🔄 Iniciando verificação de segurança...');
    
    // Simula processo de verificação em etapas
    setTimeout(() => {
      setFeedbackMessage('🔍 Verificando instalação do app...');
      
      setTimeout(() => {
        setFeedbackMessage('🔐 Validando credenciais de acesso...');
        
        setTimeout(() => {
          setFeedbackMessage('⚡ Liberando acesso premium...');
          
          setTimeout(() => {
            setFeedbackMessage('✅ Verificação concluída! Acesso premium liberado!');
            onStepComplete(3);
            setIsLoading(false);
          }, 1000);
        }, 1500);
      }, 1500);
    }, 1000);
  };

  const handleEmailSend = async () => {
    setIsLoading(true);
    setFeedbackMessage('📧 Preparando material estratégico...');
    
    // Simula envio de email mais detalhado
    setTimeout(() => {
      setFeedbackMessage('📦 Compilando +1.000 materiais premium...');
      
      setTimeout(() => {
        setFeedbackMessage('🚀 Enviando para seu e-mail...');
        
        setTimeout(() => {
          setFeedbackMessage('✅ Material enviado! Confira sua caixa de entrada e spam.');
          setIsLoading(false);
        }, 1500);
      }, 2000);
    }, 1000);
  };

  const handleCopyLink = async () => {
    const success = await FeedbackUtils.copyToClipboard(progress.affiliateLink);
    if (success) {
      setFeedbackMessage('🔗 Link copiado! Cole onde quiser para começar a ganhar comissões.');
      onStepComplete(4);
    } else {
      setFeedbackMessage('❌ Erro ao copiar. Tente selecionar e copiar manualmente.');
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
    <div className="max-w-6xl mx-auto">
      {renderStepContent()}
    </div>
  );
};

export default StepContent;
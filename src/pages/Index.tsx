
import React, { useState, useEffect } from 'react';
import LandingStateManager from '../utils/landingState';
import { UserProgress, StepState } from '../types/landing';
import { FeedbackUtils, AnimationManager } from '../utils/animations';
import ProgressBar from '../components/ProgressBar';
import HeroSection from '../components/HeroSection';
import StepContent from '../components/StepContent';

const Index: React.FC = () => {
  const [progress, setProgress] = useState<UserProgress>({
    currentStep: 0,
    completedSteps: [],
    affiliateLink: '',
    isVerified: false
  });
  const [steps, setSteps] = useState<StepState[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const stateManager = LandingStateManager.getInstance();

  useEffect(() => {
    // Inicializa o estado
    setProgress(stateManager.getProgress());
    setSteps(stateManager.getSteps());

    // Subscreve para updates
    const unsubscribe = stateManager.subscribe((newProgress) => {
      setProgress(newProgress);
      setSteps(stateManager.getSteps());
    });

    return unsubscribe;
  }, [stateManager]);

  const handleStartClick = async () => {
    setIsLoading(true);
    
    // Simula geração do link
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Gera link de afiliado
    const affiliateLink = FeedbackUtils.generateAffiliateLink();
    stateManager.setAffiliateLink(affiliateLink);
    stateManager.completeStep(0);
    
    setIsLoading(false);
  };

  const handleStepComplete = (stepId: number) => {
    stateManager.completeStep(stepId);
  };

  const resetProgress = () => {
    stateManager.reset();
  };

  return (
    <div className="min-h-screen bg-lp-primary">
      {/* Background decorativo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-bl from-blue-800/20 to-transparent rounded-full"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-orange-800/20 to-transparent rounded-full"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen">
        <header className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-2 bg-white/10 rounded-full mb-4">
            <span className="text-2xl mr-2">🚀</span>
            <span className="text-lp-light font-bold text-lg">AffiliateFlow Pro</span>
          </div>
        </header>

        <main>
          {progress.currentStep > 0 && (
            <ProgressBar 
              steps={steps}
              currentStep={progress.currentStep}
              completedSteps={progress.completedSteps}
            />
          )}

          {progress.currentStep === 0 ? (
            <HeroSection 
              onStartClick={handleStartClick}
              isLoading={isLoading}
            />
          ) : (
            <StepContent 
              progress={progress}
              onStepComplete={handleStepComplete}
            />
          )}
        </main>

        <footer className="text-center mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-white/60 text-sm">
            <span>© 2024 AffiliateFlow Pro</span>
            <span>•</span>
            <span>Suporte 24/7</span>
            <span>•</span>
            <button 
              onClick={resetProgress}
              className="text-orange-400 hover:text-orange-300 transition-colors"
            >
              🔄 Reiniciar Processo
            </button>
          </div>
          
          <div className="mt-4 text-xs text-white/40">
            {/* Comentário para integração futura */}
            {/* 
              INTEGRAÇÃO FUTURA:
              - Conectar com n8n para automação de e-mails
              - Integrar MailerLite para captura de leads
              - Adicionar pixel de conversão
              - Implementar tracking de eventos
            */}
            Desenvolvido para máxima conversão e performance
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;

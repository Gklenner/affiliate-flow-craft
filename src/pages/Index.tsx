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
    
    // Simula geração do link com mais realismo
    await new Promise(resolve => setTimeout(resolve, 2500));
    
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
    <div className="min-h-screen bg-lp-navy overflow-hidden">
      {/* Modern Background */}
      <div className="fixed inset-0 z-0">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 gradient-primary rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 gradient-secondary rounded-full opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] gradient-primary rounded-full opacity-10 blur-3xl"></div>
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>

      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-lp-navy/80 border-b border-white/10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">AF</span>
                </div>
                <div>
                  <div className="text-lp-light font-bold text-xl">AffiliateFlow</div>
                  <div className="text-lp-light/60 text-xs">Premium System</div>
                </div>
              </div>
              
              <div className="hidden md:flex items-center gap-6">
                <div className="flex items-center gap-2 text-lp-light/70 text-sm">
                  <div className="w-2 h-2 bg-lp-green rounded-full animate-pulse"></div>
                  <span>Sistema Ativo</span>
                </div>
                <div className="flex items-center gap-2 text-lp-light/70 text-sm">
                  <div className="w-2 h-2 bg-lp-orange rounded-full animate-pulse"></div>
                  <span>Suporte 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4">
          {progress.currentStep > 0 && (
            <div className="py-12">
              <ProgressBar 
                steps={steps}
                currentStep={progress.currentStep}
                completedSteps={progress.completedSteps}
              />
            </div>
          )}

          {progress.currentStep === 0 ? (
            <HeroSection 
              onStartClick={handleStartClick}
              isLoading={isLoading}
            />
          ) : (
            <div className="py-12">
              <StepContent 
                progress={progress}
                onStepComplete={handleStepComplete}
              />
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="relative border-t border-white/10 bg-lp-navy/50 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center">
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-lp-light/60 text-sm mb-8">
                <span>© 2024 AffiliateFlow Premium</span>
                <div className="hidden sm:block w-px h-4 bg-white/20"></div>
                <span>Tecnologia de Ponta</span>
                <div className="hidden sm:block w-px h-4 bg-white/20"></div>
                <span>Suporte Especializado 24/7</span>
                <div className="hidden sm:block w-px h-4 bg-white/20"></div>
                <button 
                  onClick={resetProgress}
                  className="text-lp-orange hover:text-lp-orange/80 transition-colors font-medium"
                >
                  🔄 Reiniciar Processo
                </button>
              </div>
              
              <div className="glass-dark rounded-2xl p-6 max-w-2xl mx-auto">
                <div className="text-xs text-lp-light/40 leading-relaxed">
                  Sistema desenvolvido com tecnologia de ponta para máxima conversão e performance.
                  Integração futura preparada para n8n, MailerLite, pixels de conversão e tracking avançado.
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
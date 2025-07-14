/**
 * Página Principal Otimizada - AffiliateFlow Pro
 * Versão completa com todas as integrações e otimizações
 */

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import LandingStateManager from '../utils/landingState';
import { UserProgress, StepState } from '../types/landing';
import { NichoAudiencia } from '../utils/emailMarketing';
import EmailMarketingManager from '../utils/emailMarketing';
import AnalyticsManager from '../utils/analytics';
import ABTestingManager from '../utils/abTesting';
import IntegrationsManager from '../utils/integrations';

// Componentes otimizados
import OptimizedHeroSection from '../components/OptimizedHeroSection';
import ProgressBar from '../components/ProgressBar';
import StepContent from '../components/StepContent';
import LeadCaptureForm from '../components/LeadCaptureForm';

const OptimizedIndex: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [progress, setProgress] = useState<UserProgress>({
    currentStep: 0,
    completedSteps: [],
    affiliateLink: '',
    isVerified: false
  });
  const [steps, setSteps] = useState<StepState[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userId] = useState(() => `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [nicho, setNicho] = useState<NichoAudiencia>('geral');
  const [showLeadForm, setShowLeadForm] = useState(false);

  // Managers
  const stateManager = LandingStateManager.getInstance();
  const emailManager = EmailMarketingManager.getInstance();
  const analyticsManager = AnalyticsManager.getInstance();
  const abTestingManager = ABTestingManager.getInstance();
  const integrationsManager = IntegrationsManager.getInstance();

  // UTM Parameters
  const utmParams = {
    utm_source: searchParams.get('utm_source') || '',
    utm_medium: searchParams.get('utm_medium') || '',
    utm_campaign: searchParams.get('utm_campaign') || '',
    utm_content: searchParams.get('utm_content') || '',
    utm_term: searchParams.get('utm_term') || ''
  };

  useEffect(() => {
    // Inicializar sistemas
    initializeSystems();
    
    // Detectar nicho baseado em UTM
    const detectedNicho = emailManager.detectarNicho('', utmParams);
    setNicho(detectedNicho);

    // Inicializar estado
    setProgress(stateManager.getProgress());
    setSteps(stateManager.getSteps());

    // Subscrever para updates
    const unsubscribe = stateManager.subscribe((newProgress) => {
      setProgress(newProgress);
      setSteps(stateManager.getSteps());
    });

    // Track page view
    analyticsManager.trackPageView(window.location.pathname, 'AffiliateFlow Pro - Renda Recorrente IA');

    return unsubscribe;
  }, []);

  const initializeSystems = () => {
    // Inicializar Analytics
    analyticsManager.initializeGA4();
    analyticsManager.initializeFacebookPixel();
    analyticsManager.initializeHotjar();

    // Inicializar A/B Testing
    abTestingManager.initialize();

    // Inicializar Email Marketing
    emailManager.initialize();

    console.log('✅ Todos os sistemas inicializados');
  };

  const handleStartClick = async () => {
    setIsLoading(true);
    
    try {
      // Verificar se deve mostrar formulário de lead primeiro
      if (progress.currentStep === 0 && !progress.email) {
        setShowLeadForm(true);
        setIsLoading(false);
        return;
      }

      // Simula processo de acesso ao sistema GRIP
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Gera link do GRIP para empresas
      const affiliateLink = 'https://grip.gaiodataos.com/?si=f722bc5f-c550-4368-a50f-d727e7abc368&ref=ia-empresas';
      stateManager.setAffiliateLink(affiliateLink);
      stateManager.completeStep(0);
      
      // Track conversão
      analyticsManager.trackConversion({
        event_name: 'complete_registration',
        value: 1
      });

      // Processar conversão nas integrações
      if (progress.email) {
        await integrationsManager.processConversion(
          progress.email,
          'registration_complete',
          1
        );
      }
      
    } catch (error) {
      console.error('Erro no processo de início:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeadCapture = async (leadData: any) => {
    try {
      // Salvar dados do lead no estado
      stateManager.setEmail(leadData.email);
      setProgress(prev => ({ ...prev, email: leadData.email }));
      
      // Atualizar nicho se detectado
      if (leadData.nicho !== 'geral') {
        setNicho(leadData.nicho);
      }

      // Identificar usuário no analytics
      analyticsManager.identifyUser(userId, {
        email: leadData.email,
        nicho: leadData.nicho,
        nome: leadData.nome
      });

      // Track lead generation
      analyticsManager.trackConversion({
        event_name: 'lead',
        value: 1
      });

      // Fechar formulário e continuar fluxo
      setShowLeadForm(false);
      
      // Continuar com o processo
      await handleStartClick();
      
    } catch (error) {
      console.error('Erro na captura de lead:', error);
    }
  };

  const handleStepComplete = (stepId: number) => {
    stateManager.completeStep(stepId);
    
    // Track step completion
    analyticsManager.trackEvent({
      action: 'step_complete',
      category: 'funnel',
      label: `step_${stepId}`,
      value: stepId,
      nicho: nicho
    });

    // Processar conversão se tiver email
    if (progress.email) {
      integrationsManager.processConversion(
        progress.email,
        `step_${stepId}_complete`,
        stepId
      );
    }
  };

  const resetProgress = () => {
    stateManager.reset();
    setShowLeadForm(false);
    
    // Track reset
    analyticsManager.trackEvent({
      action: 'funnel_reset',
      category: 'user_action',
      label: 'manual_reset',
      nicho: nicho
    });
  };

  // Renderizar formulário de lead se necessário
  if (showLeadForm) {
    return (
      <div className="min-h-screen bg-lp-navy flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <LeadCaptureForm
            onSubmit={handleLeadCapture}
            isLoading={isLoading}
            nicho={nicho}
            source="hero_cta"
            utmParams={utmParams}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lp-navy overflow-hidden">
      {/* Background moderno */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 gradient-primary rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 gradient-secondary rounded-full opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] gradient-primary rounded-full opacity-10 blur-3xl"></div>
        
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
        {/* Header otimizado */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-lp-navy/80 border-b border-white/10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🤖</span>
                </div>
                <div>
                  <div className="text-lp-light font-bold text-xl">GRIP IA Empresarial</div>
                  <div className="text-lp-light/60 text-xs">Renda Recorrente</div>
                </div>
              </div>
              
              <div className="hidden md:flex items-center gap-6">
                <div className="flex items-center gap-2 text-lp-light/70 text-sm">
                  <div className="w-2 h-2 bg-lp-green rounded-full animate-pulse"></div>
                  <span>2.847 empresas ativas</span>
                </div>
                <div className="flex items-center gap-2 text-lp-light/70 text-sm">
                  <div className="w-2 h-2 bg-lp-orange rounded-full animate-pulse"></div>
                  <span>R$ 3.2M em comissões</span>
                </div>
                {nicho !== 'geral' && (
                  <div className="bg-blue-500/20 border border-blue-500/30 rounded-full px-3 py-1">
                    <span className="text-blue-300 text-xs font-medium">
                      {nicho.charAt(0).toUpperCase() + nicho.slice(1)}
                    </span>
                  </div>
                )}
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
            <OptimizedHeroSection 
              onStartClick={handleStartClick}
              isLoading={isLoading}
              userId={userId}
              nicho={nicho}
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

        {/* Footer otimizado */}
        <footer className="relative border-t border-white/10 bg-lp-navy/50 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center">
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-lp-light/60 text-sm mb-8">
                <span>© 2024 GRIP IA Empresarial</span>
                <div className="hidden sm:block w-px h-4 bg-white/20"></div>
                <span>Renda Recorrente Indicando IA</span>
                <div className="hidden sm:block w-px h-4 bg-white/20"></div>
                <span>Suporte B2B Especializado</span>
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
                  Sistema GRIP desenvolvido para empresas que precisam de IA. 
                  Modelo de renda recorrente para indicadores especializados em soluções empresariais.
                  {nicho !== 'geral' && (
                    <span className="block mt-2 text-blue-300">
                      Conteúdo personalizado para {nicho}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default OptimizedIndex;
/**
 * Hero Section Otimizada com A/B Testing e Analytics
 * Versão profissional com todas as integrações
 */

import React, { useEffect, useState } from 'react';
import { Star, Users, Zap, TrendingUp, Shield, Award, Brain, Building2, Play, CheckCircle } from 'lucide-react';
import { useABTesting } from '../hooks/useABTesting';
import { useAnalytics } from '../hooks/useAnalytics';
import { NichoAudiencia } from '../utils/emailMarketing';

interface OptimizedHeroSectionProps {
  onStartClick: () => void;
  isLoading: boolean;
  userId: string;
  nicho?: NichoAudiencia;
}

const OptimizedHeroSection: React.FC<OptimizedHeroSectionProps> = ({ 
  onStartClick, 
  isLoading, 
  userId,
  nicho = 'geral'
}) => {
  const [videoPlaying, setVideoPlaying] = useState(false);
  
  // A/B Testing para headlines e CTAs
  const headlineTest = useABTesting('headline-test-1', userId, nicho);
  const ctaTest = useABTesting('cta-test-1', userId, nicho);
  const copyTest = useABTesting('copy-nicho-test-1', userId, nicho);

  // Analytics tracking
  const {
    trackLandingView,
    trackCTAClick,
    trackVideoPlay,
    trackElementClick
  } = useAnalytics({ userId, nicho, autoTrackPageViews: true });

  useEffect(() => {
    // Track landing page view
    trackLandingView(nicho);
  }, [nicho]);

  const handleStartClick = () => {
    // Track CTA click
    const ctaText = ctaTest.variant?.content?.text || 'INDICAR IA PARA EMPRESAS';
    trackCTAClick(ctaText, 'hero_primary', nicho);
    
    // Track A/B conversion
    ctaTest.trackConversion();
    
    // Abre o link do GRIP para empresas
    window.open('https://grip.gaiodataos.com/?si=f722bc5f-c550-4368-a50f-d727e7abc368&ref=ia-empresas', '_blank');
    
    // Executa a lógica do fluxo
    onStartClick();
  };

  const handleVideoPlay = () => {
    setVideoPlaying(true);
    trackVideoPlay('hero_demo_video', nicho);
    trackElementClick('video_play_button', nicho);
  };

  // Conteúdo baseado em A/B testing
  const getHeadlineContent = () => {
    if (headlineTest.isLoading) {
      return {
        title: 'Renda Recorrente Indicando IA para Empresas',
        subtitle: 'De R$ 15.000/mês até R$ 55.000/mês (Plano Enterprise)'
      };
    }

    return headlineTest.variant?.content || {
      title: 'Renda Recorrente Indicando IA para Empresas',
      subtitle: 'De R$ 15.000/mês até R$ 55.000/mês (Plano Enterprise)'
    };
  };

  const getCTAContent = () => {
    if (ctaTest.isLoading) {
      return {
        text: 'INDICAR IA PARA EMPRESAS',
        icon: '🤖',
        color: 'gradient-primary'
      };
    }

    return ctaTest.variant?.content || {
      text: 'INDICAR IA PARA EMPRESAS',
      icon: '🤖',
      color: 'gradient-primary'
    };
  };

  const getCopyContent = () => {
    if (copyTest.isLoading || !copyTest.variant?.nicho || copyTest.variant.nicho !== nicho) {
      return {
        headline: 'Renda Recorrente Indicando IA para Empresas',
        description: 'De R$ 15k a R$ 55k mensais sem investimento inicial',
        cta: 'Começar Agora'
      };
    }

    return copyTest.variant?.content || {
      headline: 'Renda Recorrente Indicando IA para Empresas',
      description: 'De R$ 15k a R$ 55k mensais sem investimento inicial',
      cta: 'Começar Agora'
    };
  };

  const headlineContent = getHeadlineContent();
  const ctaContent = getCTAContent();
  const copyContent = getCopyContent();

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      {/* Background Elements Otimizados */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 gradient-primary rounded-full opacity-10 blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 gradient-secondary rounded-full opacity-10 blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] gradient-primary rounded-full opacity-5 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {/* Badge Social Proof Dinâmico */}
        <div className="inline-flex items-center gap-3 glass rounded-full px-6 py-3 mb-8 animate-fade-in-down">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-lp-green rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-lp-light/90">+2.847 indicadores ativos</span>
          </div>
          <div className="w-px h-4 bg-white/20"></div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-lp-green" />
            <span className="text-sm font-medium text-lp-light/90">R$ 3.2M em comissões pagas</span>
          </div>
          <div className="w-px h-4 bg-white/20"></div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-lp-light/90">4.9/5 ⭐ (1.247 avaliações)</span>
          </div>
        </div>

        {/* Headline A/B Testing */}
        <h1 className="text-hero text-lp-light mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {nicho !== 'geral' && copyContent.headline !== headlineContent.title ? (
            <span className="gradient-text-secondary">{copyContent.headline}</span>
          ) : (
            <>
              <span className="gradient-text-secondary">Renda Recorrente</span>{' '}
              Indicando{' '}
              <span className="gradient-text-primary">IA para Empresas</span>
            </>
          )}
        </h1>

        {/* Subtitle A/B Testing */}
        <div className="text-subtitle text-lp-light/80 mb-8 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <p className="mb-4">
            {nicho !== 'geral' && copyContent.description ? (
              copyContent.description
            ) : (
              <>
                De <span className="gradient-text-secondary font-bold">R$ 15.000/mês</span> até{' '}
                <span className="gradient-text-primary font-bold">R$ 55.000/mês</span> (Plano Enterprise)
              </>
            )}
          </p>
          <p className="text-lg">
            Indique soluções de <span className="text-lp-orange font-bold">IA para empresas</span> e receba{' '}
            <span className="gradient-text-primary font-bold">comissões recorrentes</span> mensais
          </p>
        </div>

        {/* Vídeo Demonstração */}
        <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="relative max-w-4xl mx-auto">
            {!videoPlaying ? (
              <div 
                className="relative bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-2xl p-8 cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={handleVideoPlay}
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="w-20 h-20 bg-lp-orange rounded-full flex items-center justify-center shadow-glow-orange">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-lp-light mb-2">
                  🎬 Veja Como Funciona o Sistema GRIP
                </h3>
                <p className="text-lp-light/80">
                  Demonstração de 3 minutos: Como indicadores estão faturando R$ 55k/mês
                </p>
              </div>
            ) : (
              <div className="aspect-video bg-black rounded-2xl overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="Demonstração GRIP IA Empresarial"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        </div>

        {/* Business Model Cards Otimizados */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="glass-dark rounded-2xl p-6 hover-lift">
            <div className="flex items-center justify-center w-12 h-12 gradient-primary rounded-xl mb-4 mx-auto">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-lp-light mb-2">IA</div>
            <div className="text-sm text-lp-light/70">Soluções Empresariais</div>
            <div className="text-xs text-lp-green mt-2">+340% crescimento</div>
          </div>
          
          <div className="glass-dark rounded-2xl p-6 hover-lift" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-center w-12 h-12 gradient-secondary rounded-xl mb-4 mx-auto">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-lp-light mb-2">2.847</div>
            <div className="text-sm text-lp-light/70">Empresas Atendidas</div>
            <div className="text-xs text-lp-blue mt-2">Crescendo 40%/mês</div>
          </div>
          
          <div className="glass-dark rounded-2xl p-6 hover-lift" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-center w-12 h-12 gradient-primary rounded-xl mb-4 mx-auto">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-lp-light mb-2">R$ 55k</div>
            <div className="text-sm text-lp-light/70">Máximo Enterprise</div>
            <div className="text-xs text-lp-orange mt-2">Por empresa/mês</div>
          </div>

          <div className="glass-dark rounded-2xl p-6 hover-lift" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-center w-12 h-12 gradient-secondary rounded-xl mb-4 mx-auto">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-lp-light mb-2">Recorrente</div>
            <div className="text-sm text-lp-light/70">Renda Mensal</div>
            <div className="text-xs text-lp-green mt-2">95% margem</div>
          </div>
        </div>

        {/* Prova Social Específica por Nicho */}
        <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-2xl p-8 mb-12 max-w-5xl mx-auto animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <h3 className="text-2xl font-bold text-lp-light mb-6">
            {nicho === 'tech' && '👨‍💻 Desenvolvedores que Dominaram o Mercado de IA:'}
            {nicho === 'financas' && '📊 Analistas que 10x Renda com IA:'}
            {nicho === 'business' && '🏢 Empresários que Escalaram com IA:'}
            {nicho === 'ia' && '🤖 Especialistas IA Faturando Alto:'}
            {nicho === 'marketing' && '📱 Marketers que Automatizaram Vendas:'}
            {(nicho === 'geral' || !nicho) && '🚀 Indicadores que Transformaram Carreira:'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h4 className="text-lg font-bold text-lp-light mb-2">
                {nicho === 'tech' ? 'João - Full Stack' : 'Maria - Consultora'}
              </h4>
              <p className="text-white/80 text-sm mb-2">
                {nicho === 'tech' 
                  ? '"Em 3 meses indicando IA para startups, já faturei R$ 165k"'
                  : '"Transformei conhecimento em renda recorrente de R$ 45k/mês"'
                }
              </p>
              <div className="text-lp-green font-bold">R$ 55k/mês</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h4 className="text-lg font-bold text-lp-light mb-2">
                {nicho === 'financas' ? 'Carlos - Analista' : 'Pedro - Empreendedor'}
              </h4>
              <p className="text-white/80 text-sm mb-2">
                {nicho === 'financas'
                  ? '"ROI de 300% indicando IA para fintechs"'
                  : '"Escalei de R$ 15k para R$ 120k em 6 meses"'
                }
              </p>
              <div className="text-lp-orange font-bold">R$ 35k/mês</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h4 className="text-lg font-bold text-lp-light mb-2">
                {nicho === 'business' ? 'Ana - CEO' : 'Lucas - Especialista'}
              </h4>
              <p className="text-white/80 text-sm mb-2">
                {nicho === 'business'
                  ? '"Automatizei vendas B2B com IA e escalo indicações"'
                  : '"Portfolio de 12 empresas pagando mensalmente"'
                }
              </p>
              <div className="text-lp-blue font-bold">R$ 25k/mês</div>
            </div>
          </div>
        </div>

        {/* CTA Principal A/B Testing */}
        <div className="animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
          <button
            onClick={handleStartClick}
            disabled={isLoading}
            className={`
              btn-modern text-xl px-12 py-6 rounded-2xl
              disabled:opacity-50 disabled:cursor-not-allowed
              ${isLoading ? 'animate-pulse-glow' : ''}
              ${ctaContent.color === 'gradient-primary' ? 'gradient-primary' : 
                ctaContent.color === 'gradient-secondary' ? 'gradient-secondary' : 
                ctaContent.color}
              text-white shadow-2xl transform transition-all duration-300
              hover:scale-105 active:scale-95
            `}
          >
            {isLoading ? (
              <span className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Preparando acesso ao sistema IA...
              </span>
            ) : (
              <span className="flex items-center gap-3">
                <span className="text-2xl">{ctaContent.icon}</span>
                {ctaContent.text}
              </span>
            )}
          </button>
          
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-lp-light/60">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-lp-green" />
              <span>✅ Acesso ao sistema GRIP</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-lp-green" />
              <span>✅ Materiais IA Empresarial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-lp-green" />
              <span>✅ Suporte especializado</span>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-lp-light/50 text-sm mb-2">
              🤖 Após o cadastro, acesse o sistema GRIP para empresas
            </p>
            <p className="text-orange-300 text-sm font-medium">
              🎁 Bônus: Materiais IA Empresarial Exclusivos + Scripts de Indicação
            </p>
          </div>
        </div>

        {/* Urgência Estratégica */}
        <div className="mt-12 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-2xl p-6 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '1.4s' }}>
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-red-300 font-bold text-lg">⚠️ MERCADO DE IA EXPLODINDO</span>
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-white/90 text-lg">
            Demanda por <span className="text-red-300 font-bold">IA empresarial cresceu 340%</span> em 2024.{' '}
            <span className="text-orange-300 font-bold">Posicione-se agora</span> neste mercado bilionário!
          </p>
        </div>

        {/* Live Activity */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-8 animate-fade-in-up" style={{ animationDelay: '1.6s' }}>
          <div className="flex items-center gap-3 glass rounded-full px-6 py-3">
            <div className="relative">
              <div className="w-3 h-3 bg-lp-green rounded-full"></div>
              <div className="absolute inset-0 w-3 h-3 bg-lp-green rounded-full animate-ping opacity-75"></div>
            </div>
            <span className="text-sm font-medium text-lp-light/90">1.247 indicadores online agora</span>
          </div>
          
          <div className="flex items-center gap-3 glass rounded-full px-6 py-3">
            <Brain className="w-4 h-4 text-lp-orange" />
            <span className="text-sm font-medium text-lp-light/90">47 empresas contrataram IA hoje</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OptimizedHeroSection;
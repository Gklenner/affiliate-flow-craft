import React from 'react';
import { Star, Users, Zap, TrendingUp } from 'lucide-react';

interface HeroSectionProps {
  onStartClick: () => void;
  isLoading: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onStartClick, isLoading }) => {
  const handleStartClick = () => {
    // Primeiro abre o link de cadastro
    window.open('https://grip.gaiodataos.com/?si=f722bc5f-c550-4368-a50f-d727e7abc368', '_blank');
    // Depois executa a lógica do fluxo
    onStartClick();
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 gradient-primary rounded-full opacity-10 blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 gradient-secondary rounded-full opacity-10 blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] gradient-primary rounded-full opacity-5 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-3 glass rounded-full px-6 py-3 mb-8 animate-fade-in-down">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-lp-green rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-lp-light/90">+3.247 afiliados faturando</span>
          </div>
          <div className="w-px h-4 bg-white/20"></div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-lp-green" />
            <span className="text-sm font-medium text-lp-light/90">R$ 1.2M pagos em 30 dias</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-hero text-lp-light mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Descubra o{' '}
          <span className="gradient-text-secondary">Sistema Secreto</span>{' '}
          que está gerando{' '}
          <span className="gradient-text-primary">R$ 15.000/mês</span>{' '}
          para afiliados inteligentes
        </h1>

        {/* Subtitle */}
        <p className="text-subtitle text-lp-light/80 mb-12 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          Acesse o <span className="gradient-text-secondary font-bold">ecossistema completo</span> com IA, CRM, chatbot e material estratégico que os{' '}
          <span className="gradient-text-primary font-bold">top afiliados usam</span> para dominar o mercado
        </p>

        {/* Social Proof Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="glass-dark rounded-2xl p-6 hover-lift">
            <div className="flex items-center justify-center w-12 h-12 gradient-primary rounded-xl mb-4 mx-auto">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-lp-light mb-2">3.247</div>
            <div className="text-sm text-lp-light/70">Afiliados Premium</div>
          </div>
          
          <div className="glass-dark rounded-2xl p-6 hover-lift" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-center w-12 h-12 gradient-secondary rounded-xl mb-4 mx-auto">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-lp-light mb-2">4.9/5</div>
            <div className="text-sm text-lp-light/70">Satisfação Comprovada</div>
          </div>
          
          <div className="glass-dark rounded-2xl p-6 hover-lift" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-center w-12 h-12 gradient-primary rounded-xl mb-4 mx-auto">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-lp-light mb-2">24h</div>
            <div className="text-sm text-lp-light/70">Para Primeiros Resultados</div>
          </div>
        </div>

        {/* Urgency Alert */}
        <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-2xl p-6 mb-12 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-red-300 font-bold text-lg">⚠️ ATENÇÃO: VAGAS LIMITADAS</span>
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-white/90 text-lg">
            Apenas <span className="text-red-300 font-bold">47 vagas restantes</span> para acessar o sistema completo com{' '}
            <span className="text-orange-300 font-bold">material estratégico exclusivo</span> dos top afiliados
          </p>
        </div>

        {/* Live Activity */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <div className="flex items-center gap-3 glass rounded-full px-6 py-3">
            <div className="relative">
              <div className="w-3 h-3 bg-lp-green rounded-full"></div>
              <div className="absolute inset-0 w-3 h-3 bg-lp-green rounded-full animate-ping opacity-75"></div>
            </div>
            <span className="text-sm font-medium text-lp-light/90">1.847 pessoas acessando agora</span>
          </div>
          
          <div className="flex items-center gap-3 glass rounded-full px-6 py-3">
            <div className="relative">
              <div className="w-3 h-3 bg-lp-orange rounded-full"></div>
              <div className="absolute inset-0 w-3 h-3 bg-lp-orange rounded-full animate-ping opacity-75"></div>
            </div>
            <span className="text-sm font-medium text-lp-light/90">Último acesso há 12 segundos</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
          <button
            onClick={handleStartClick}
            disabled={isLoading}
            className={`
              btn-primary text-xl px-12 py-6 rounded-2xl
              disabled:opacity-50 disabled:cursor-not-allowed
              ${isLoading ? 'animate-pulse-glow' : ''}
              shadow-2xl transform transition-all duration-300
              hover:scale-105 active:scale-95
            `}
          >
            {isLoading ? (
              <span className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Preparando seu acesso exclusivo...
              </span>
            ) : (
              <span className="flex items-center gap-3">
                <Zap className="w-6 h-6" />
                QUERO ACESSO AO SISTEMA COMPLETO
              </span>
            )}
          </button>
          
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-lp-light/60">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 gradient-primary rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span>Acesso imediato ao ecossistema</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 gradient-secondary rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span>Material estratégico incluído</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 gradient-primary rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span>Suporte especializado 24/7</span>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-lp-light/50 text-sm mb-2">
              ⏰ Após o cadastro, você receberá acesso ao app premium
            </p>
            <p className="text-orange-300 text-sm font-medium">
              🎁 + Bônus exclusivo: Estratégias dos afiliados que faturam R$ 50k+/mês
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
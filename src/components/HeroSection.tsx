import React from 'react';
import { Star, Users, Zap, TrendingUp, Shield, Award, Brain, Building2 } from 'lucide-react';

interface HeroSectionProps {
  onStartClick: () => void;
  isLoading: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onStartClick, isLoading }) => {
  const handleStartClick = () => {
    // Abre o link do GRIP para empresas
    window.open('https://grip.gaiodataos.com/?si=f722bc5f-c550-4368-a50f-d727e7abc368', '_blank');
    // Executa a lógica do fluxo
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
            <span className="text-sm font-medium text-lp-light/90">+2.847 indicadores ativos</span>
          </div>
          <div className="w-px h-4 bg-white/20"></div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-lp-green" />
            <span className="text-sm font-medium text-lp-light/90">R$ 3.2M em comissões pagas</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-hero text-lp-light mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <span className="gradient-text-secondary">Renda Recorrente</span>{' '}
          Indicando{' '}
          <span className="gradient-text-primary">IA para Empresas</span>
        </h1>

        {/* Value Proposition */}
        <div className="text-subtitle text-lp-light/80 mb-8 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <p className="mb-4">
            De <span className="gradient-text-secondary font-bold">R$ 15.000/mês</span> até{' '}
            <span className="gradient-text-primary font-bold">R$ 55.000/mês</span> (Plano Enterprise)
          </p>
          <p className="text-lg">
            Indique soluções de <span className="text-lp-orange font-bold">IA para empresas</span> e receba{' '}
            <span className="gradient-text-primary font-bold">comissões recorrentes</span> mensais
          </p>
        </div>

        {/* Business Model Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="glass-dark rounded-2xl p-6 hover-lift">
            <div className="flex items-center justify-center w-12 h-12 gradient-primary rounded-xl mb-4 mx-auto">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-lp-light mb-2">IA</div>
            <div className="text-sm text-lp-light/70">Soluções Empresariais</div>
          </div>
          
          <div className="glass-dark rounded-2xl p-6 hover-lift" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-center w-12 h-12 gradient-secondary rounded-xl mb-4 mx-auto">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-lp-light mb-2">2.847</div>
            <div className="text-sm text-lp-light/70">Empresas Atendidas</div>
          </div>
          
          <div className="glass-dark rounded-2xl p-6 hover-lift" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-center w-12 h-12 gradient-primary rounded-xl mb-4 mx-auto">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-lp-light mb-2">R$ 55k</div>
            <div className="text-sm text-lp-light/70">Máximo Enterprise</div>
          </div>

          <div className="glass-dark rounded-2xl p-6 hover-lift" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-center w-12 h-12 gradient-secondary rounded-xl mb-4 mx-auto">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-lp-light mb-2">Recorrente</div>
            <div className="text-sm text-lp-light/70">Renda Mensal</div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-2xl p-8 mb-12 max-w-5xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <h3 className="text-2xl font-bold text-lp-light mb-6">🤖 Como Funciona o Modelo de Negócio:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h4 className="text-lg font-bold text-lp-light mb-2">Você Indica</h4>
              <p className="text-white/80 text-sm">Recomenda soluções de IA (GRIP) para empresas que precisam de automação</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h4 className="text-lg font-bold text-lp-light mb-2">Empresa Contrata</h4>
              <p className="text-white/80 text-sm">Empresa assina plano mensal (R$ 500 a R$ 2.500/mês) ou Enterprise (R$ 5.000+)</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h4 className="text-lg font-bold text-lp-light mb-2">Você Recebe</h4>
              <p className="text-white/80 text-sm">Comissão recorrente mensal: R$ 15k a R$ 55k (dependendo do plano)</p>
            </div>
          </div>
        </div>

        {/* Target Audience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12 animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <div className="glass-dark rounded-2xl p-6">
            <h4 className="text-xl font-bold text-lp-light mb-4">🎯 Ideal Para Influencers de:</h4>
            <ul className="text-white/90 space-y-2 text-sm">
              <li>✅ <strong>Tech & Inovação:</strong> Tecnologia, startups, desenvolvimento</li>
              <li>✅ <strong>Business & Gestão:</strong> Empreendedorismo, produtividade</li>
              <li>✅ <strong>Finanças:</strong> Investimentos, mercado financeiro</li>
              <li>✅ <strong>Marketing Digital:</strong> Automação, vendas online</li>
              <li>✅ <strong>Consultoria:</strong> Processos, otimização empresarial</li>
            </ul>
          </div>

          <div className="glass-dark rounded-2xl p-6">
            <h4 className="text-xl font-bold text-lp-light mb-4">🏢 Empresas que Precisam de IA:</h4>
            <ul className="text-white/90 space-y-2 text-sm">
              <li>✅ <strong>E-commerce:</strong> Atendimento automatizado, chatbots</li>
              <li>✅ <strong>Serviços:</strong> Agendamento, CRM inteligente</li>
              <li>✅ <strong>Saúde:</strong> Triagem, agendamentos automáticos</li>
              <li>✅ <strong>Educação:</strong> Suporte a alunos, automação</li>
              <li>✅ <strong>Varejo:</strong> Vendas online, suporte 24/7</li>
            </ul>
          </div>
        </div>

        {/* Urgency Alert */}
        <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-2xl p-6 mb-12 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
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
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 animate-fade-in-up" style={{ animationDelay: '1.4s' }}>
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

        {/* CTA Button */}
        <div className="animate-fade-in-up" style={{ animationDelay: '1.6s' }}>
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
                Preparando acesso ao sistema IA...
              </span>
            ) : (
              <span className="flex items-center gap-3">
                <Brain className="w-6 h-6" />
                INDICAR IA PARA EMPRESAS
              </span>
            )}
          </button>
          
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-lp-light/60">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 gradient-primary rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span>✅ Acesso ao sistema GRIP</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 gradient-secondary rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span>✅ Materiais IA Empresarial</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 gradient-primary rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
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
      </div>
    </section>
  );
};

export default HeroSection;
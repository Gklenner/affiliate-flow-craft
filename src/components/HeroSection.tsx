
import React from 'react';

interface HeroSectionProps {
  onStartClick: () => void;
  isLoading: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onStartClick, isLoading }) => {
  return (
    <section className="text-center mb-12 animate-fade-scale">
      <h1 className="text-4xl md:text-6xl font-bold text-lp-light mb-6 leading-tight">
        Quer ganhar{' '}
        <span className="gradient-text">renda recorrente</span>{' '}
        indicando uma IA que{' '}
        <span className="gradient-text">grandes empresas já usam</span>{' '}
        e milhares ainda precisam?
      </h1>
      
      <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-4xl mx-auto leading-relaxed">
        Descubra o sistema que já está gerando <strong>comissões de até R$ 15.000/mês</strong> 
        para afiliados inteligentes. Sem venda direta, sem complicação.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
        <div className="flex items-center text-white/90">
          <span className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
          <span className="text-sm">847 pessoas online agora</span>
        </div>
        <div className="flex items-center text-white/90">
          <span className="w-3 h-3 bg-orange-500 rounded-full mr-2 animate-pulse"></span>
          <span className="text-sm">Últimos 3 links gerados há 2 min</span>
        </div>
      </div>

      <button
        onClick={onStartClick}
        disabled={isLoading}
        className={`
          px-8 py-4 bg-lp-cta text-white text-xl font-bold rounded-lg
          transform transition-all duration-300 hover:scale-105 hover:shadow-2xl
          disabled:opacity-50 disabled:cursor-not-allowed
          ${isLoading ? 'animate-pulse' : 'animate-bounce-slow'}
        `}
      >
        {isLoading ? '🔄 Gerando seu link...' : '🚀 Quero Meu Link de Cadastro AGORA'}
      </button>

      <p className="text-sm text-white/60 mt-4">
        ⚡ Processo 100% automatizado • 🔒 Totalmente seguro • 💰 Sem investimento inicial
      </p>
    </section>
  );
};

export default HeroSection;

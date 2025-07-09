import React from 'react';
import { CheckCircle, Smartphone, Users, Zap, Award } from 'lucide-react';

const WelcomeStep: React.FC = () => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 animate-slide-up max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-4xl font-bold text-lp-light mb-4">
          ✅ Cadastro Realizado com Sucesso!
        </h2>
        <p className="text-xl text-white/80 mb-6">
          Perfeito! Sua conta foi criada na plataforma. Agora você precisa baixar o{' '}
          <span className="text-lp-orange font-bold">AffiliateFlow Pro</span> para acessar todo o ecossistema premium.
        </p>
      </div>
      
      {/* App Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg p-6">
          <h3 className="text-xl font-bold text-lp-light mb-4 flex items-center gap-2">
            <Smartphone className="w-6 h-6 text-lp-blue" />
            🚀 Recursos do App Premium:
          </h3>
          <ul className="text-white/90 space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-lp-green" />
              IA integrada para automação de vendas
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-lp-green" />
              CRM completo para gestão de leads
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-lp-green" />
              Chatbot inteligente 24/7
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-lp-green" />
              Dashboard de performance em tempo real
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-lp-green" />
              Notificações de vendas instantâneas
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-lg p-6">
          <h3 className="text-xl font-bold text-lp-light mb-4 flex items-center gap-2">
            <Award className="w-6 h-6 text-lp-orange" />
            🎁 Bônus Exclusivos Inclusos:
          </h3>
          <ul className="text-white/90 space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-lp-green" />
              +1.000 templates de alta conversão
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-lp-green" />
              Biblioteca de materiais premium
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-lp-green" />
              Scripts que convertem 10x mais
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-lp-green" />
              Automações prontas para usar
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-lp-green" />
              Comunidade exclusiva de top afiliados
            </li>
          </ul>
        </div>
      </div>

      {/* Success Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg p-4 text-center">
          <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-300">5.847</div>
          <div className="text-green-200 text-sm">Afiliados Ativos</div>
        </div>
        <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-lg p-4 text-center">
          <Zap className="w-8 h-8 text-blue-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-300">R$ 2.8M</div>
          <div className="text-blue-200 text-sm">Pagos em 30 dias</div>
        </div>
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-4 text-center">
          <Award className="w-8 h-8 text-purple-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-purple-300">4.9/5</div>
          <div className="text-purple-200 text-sm">Avaliação Média</div>
        </div>
      </div>

      {/* Next Step Info */}
      <div className="bg-gradient-to-r from-lp-green/20 to-blue-500/20 border border-green-500/30 rounded-lg p-6">
        <h4 className="text-lg font-bold text-lp-light mb-3 text-center">📱 Próximo Passo:</h4>
        <p className="text-green-300 text-center">
          Baixe o <span className="text-orange-300 font-bold">AffiliateFlow Pro</span> e após a instalação, 
          você receberá automaticamente o{' '}
          <span className="text-orange-300 font-bold">material estratégico exclusivo</span> que os 
          afiliados de R$ 50k+/mês usam para dominar o mercado!
        </p>
      </div>
    </div>
  );
};

export default WelcomeStep;
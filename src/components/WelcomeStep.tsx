import React from 'react';

const WelcomeStep: React.FC = () => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 animate-slide-up">
      <h2 className="text-3xl font-bold text-lp-light mb-4">
        ✅ Cadastro Realizado com Sucesso!
      </h2>
      <p className="text-white/80 mb-6">
        Perfeito! Sua conta foi criada na plataforma. Agora você precisa baixar o{' '}
        <span className="text-lp-orange font-bold">app premium</span> para acessar todo o ecossistema.
      </p>
      
      <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg p-6 mb-6">
        <h3 className="text-xl font-bold text-lp-light mb-3">
          🚀 O que você encontrará no app:
        </h3>
        <ul className="text-white/90 space-y-2">
          <li>✅ IA integrada para automação de vendas</li>
          <li>✅ CRM completo para gestão de leads</li>
          <li>✅ Chatbot inteligente 24/7</li>
          <li>✅ Dashboard de performance em tempo real</li>
          <li>✅ Biblioteca de materiais premium</li>
          <li>✅ Comunidade exclusiva de top afiliados</li>
        </ul>
      </div>

      <div className="bg-lp-success/20 border border-green-500/30 rounded-lg p-4">
        <p className="text-green-300 text-sm">
          💡 <strong>Próximo passo:</strong> Baixe o app e após a instalação, você receberá automaticamente o{' '}
          <span className="text-orange-300 font-bold">material estratégico exclusivo</span> que os afiliados de R$ 50k+/mês usam!
        </p>
      </div>
    </div>
  );
};

export default WelcomeStep;
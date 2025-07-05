
import React from 'react';

const WelcomeStep: React.FC = () => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 animate-slide-up">
      <h2 className="text-3xl font-bold text-lp-light mb-4">
        ✅ Seu Link Foi Gerado!
      </h2>
      <p className="text-white/80 mb-6">
        Perfeito! Seu link de afiliado exclusivo está pronto. 
        Agora vamos para o próximo passo.
      </p>
      <div className="bg-lp-success/20 border border-green-500/30 rounded-lg p-4 mb-6">
        <p className="text-green-300 text-sm">
          💡 <strong>Dica:</strong> Quanto mais rápido você completar todas as etapas, 
          mais rápido começará a ganhar suas comissões!
        </p>
      </div>
    </div>
  );
};

export default WelcomeStep;

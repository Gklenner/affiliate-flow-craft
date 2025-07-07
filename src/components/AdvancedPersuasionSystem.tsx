import React, { useState, useEffect } from 'react';
import { Eye, Heart, Zap, Target, TrendingUp, Users } from 'lucide-react';

/**
 * 🎯 SISTEMA AVANÇADO DE PERSUASÃO
 * 
 * Implementa técnicas de:
 * - Neuroeconomia (Paul Glimcher)
 * - Psicologia Comportamental (BJ Fogg)
 * - Ciência da Decisão (Dan Ariely)
 * - Neurociência do Marketing (Martin Lindstrom)
 */

interface PersuasionSystemProps {
  userProfile: {
    decisionStyle: 'analytical' | 'intuitive' | 'social' | 'impulsive';
    riskTolerance: 'low' | 'medium' | 'high';
    motivationType: 'gain' | 'loss-aversion' | 'status' | 'security';
  };
  onConversionTrigger: (trigger: string) => void;
}

const AdvancedPersuasionSystem: React.FC<PersuasionSystemProps> = ({ 
  userProfile, 
  onConversionTrigger 
}) => {
  const [activePersuasionLayer, setActivePersuasionLayer] = useState(0);
  const [emotionalState, setEmotionalState] = useState('neutral');

  // 🧠 CAMADAS DE PERSUASÃO BASEADAS EM NEUROCIÊNCIA
  const persuasionLayers = [
    {
      name: 'Atenção Primitiva',
      target: 'Sistema Límbico',
      techniques: [
        'Contraste visual extremo',
        'Movimento e animação',
        'Cores de alta ativação',
        'Padrões interrompidos'
      ],
      implementation: 'visual-attention-capture'
    },
    {
      name: 'Processamento Emocional',
      target: 'Córtex Cingulado',
      techniques: [
        'Storytelling neurológico',
        'Gatilhos de empatia',
        'Validação emocional',
        'Conexão aspiracional'
      ],
      implementation: 'emotional-resonance'
    },
    {
      name: 'Avaliação Cognitiva',
      target: 'Córtex Pré-frontal',
      techniques: [
        'Lógica de benefícios',
        'Prova científica',
        'Comparação racional',
        'Análise custo-benefício'
      ],
      implementation: 'cognitive-validation'
    },
    {
      name: 'Decisão e Ação',
      target: 'Córtex Motor',
      techniques: [
        'Redução de fricção',
        'Clareza de ação',
        'Feedback imediato',
        'Recompensa antecipada'
      ],
      implementation: 'action-optimization'
    }
  ];

  // 🎭 PERFIS PSICOLÓGICOS E ESTRATÉGIAS PERSONALIZADAS
  const personalizedStrategies = {
    analytical: {
      primaryTriggers: ['dados', 'evidências', 'comparações', 'ROI'],
      messaging: 'Baseado em 15.000+ casos validados cientificamente',
      cta: 'Analisar Resultados Comprovados',
      colors: ['blue', 'green'],
      layout: 'structured'
    },
    intuitive: {
      primaryTriggers: ['sentimentos', 'visão', 'potencial', 'transformação'],
      messaging: 'Sinta a transformação que vai mudar sua vida',
      cta: 'Descobrir Meu Potencial',
      colors: ['purple', 'orange'],
      layout: 'flowing'
    },
    social: {
      primaryTriggers: ['comunidade', 'status', 'reconhecimento', 'pertencimento'],
      messaging: 'Junte-se aos 3.247 afiliados de elite',
      cta: 'Entrar na Comunidade VIP',
      colors: ['gold', 'red'],
      layout: 'social-proof-heavy'
    },
    impulsive: {
      primaryTriggers: ['urgência', 'escassez', 'oportunidade', 'ação'],
      messaging: 'ÚLTIMAS HORAS - Acesso será bloqueado',
      cta: 'GARANTIR AGORA',
      colors: ['red', 'orange'],
      layout: 'urgent'
    }
  };

  // 🔬 ANÁLISE NEUROCIENTÍFICA EM TEMPO REAL
  const analyzeUserState = () => {
    // Simula análise de micro-expressões e comportamento
    const indicators = {
      mouseMovement: 'hesitant', // smooth, hesitant, erratic
      scrollPattern: 'scanning', // reading, scanning, skipping
      clickTiming: 'deliberate', // quick, deliberate, delayed
      focusAreas: ['headline', 'price', 'testimonials']
    };

    return indicators;
  };

  // 🎯 OTIMIZAÇÃO DINÂMICA DE CONVERSÃO
  const optimizeForConversion = () => {
    const userState = analyzeUserState();
    const strategy = personalizedStrategies[userProfile.decisionStyle];
    
    // Aplica estratégia personalizada
    onConversionTrigger(`${strategy.messaging} - ${strategy.cta}`);
  };

  // 🧬 SEQUÊNCIA DE PERSUASÃO NEUROLÓGICA
  const PersuasionSequence = () => (
    <div className="space-y-6">
      {persuasionLayers.map((layer, index) => (
        <div 
          key={index}
          className={`
            p-6 rounded-xl border transition-all duration-700
            ${activePersuasionLayer >= index 
              ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/50' 
              : 'bg-white/5 border-white/10 opacity-50'
            }
          `}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center
              ${activePersuasionLayer >= index ? 'bg-blue-500' : 'bg-gray-500'}
            `}>
              <span className="text-white font-bold">{index + 1}</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{layer.name}</h3>
              <p className="text-sm text-white/60">Target: {layer.target}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            {layer.techniques.map((technique, idx) => (
              <div key={idx} className="text-xs bg-black/20 rounded p-2 text-white/80">
                {technique}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  // 📊 DASHBOARD DE PERFORMANCE NEUROLÓGICA
  const NeuroDashboard = () => (
    <div className="bg-black/50 backdrop-blur-xl rounded-xl p-6 border border-purple-500/30">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <Eye className="w-6 h-6 text-purple-400" />
        Análise Neurocientífica
      </h3>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-500/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-300">87%</div>
          <div className="text-sm text-white/60">Atenção Capturada</div>
        </div>
        <div className="bg-green-500/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-300">94%</div>
          <div className="text-sm text-white/60">Engajamento Emocional</div>
        </div>
        <div className="bg-orange-500/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-orange-300">76%</div>
          <div className="text-sm text-white/60">Validação Cognitiva</div>
        </div>
        <div className="bg-purple-500/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-300">89%</div>
          <div className="text-sm text-white/60">Intenção de Ação</div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-white/80">Perfil Detectado:</span>
          <span className="text-purple-300 font-bold capitalize">{userProfile.decisionStyle}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-white/80">Estado Emocional:</span>
          <span className="text-green-300 font-bold capitalize">{emotionalState}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-white/80">Probabilidade Conversão:</span>
          <span className="text-orange-300 font-bold">87.3%</span>
        </div>
      </div>
    </div>
  );

  // Ativa camadas de persuasão progressivamente
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePersuasionLayer(prev => 
        prev < persuasionLayers.length - 1 ? prev + 1 : prev
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-4 left-4 z-50 max-w-sm">
      {process.env.NODE_ENV === 'development' && (
        <div className="space-y-4">
          <NeuroDashboard />
          <PersuasionSequence />
          
          <button
            onClick={optimizeForConversion}
            className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-bold hover:scale-105 transition-transform"
          >
            🧠 Otimizar Conversão
          </button>
        </div>
      )}
    </div>
  );
};

export default AdvancedPersuasionSystem;
import React, { useState, useEffect } from 'react';
import { Brain, Target, Zap, TrendingUp, Users, Award, Clock, Shield } from 'lucide-react';

interface NeuroMarketingEngineProps {
  onTriggerAction: (action: string, data?: any) => void;
}

/**
 * 🧠 NEUROMARKETING ENGINE - SISTEMA AVANÇADO DE PERSUASÃO
 * 
 * Baseado em:
 * - Neurociência Comportamental (Dr. Robert Cialdini)
 * - Psicologia Cognitiva (Daniel Kahneman - Sistema 1 vs Sistema 2)
 * - Economia Comportamental (Richard Thaler - Nudge Theory)
 * - Neuroeconomia (Paul Glimcher)
 * - Psicologia da Persuasão (BJ Fogg - Modelo de Comportamento)
 */

const NeuroMarketingEngine: React.FC<NeuroMarketingEngineProps> = ({ onTriggerAction }) => {
  const [activeStrategy, setActiveStrategy] = useState<string>('scarcity');
  const [userBehaviorData, setUserBehaviorData] = useState({
    timeOnPage: 0,
    scrollDepth: 0,
    clickPattern: 'explorer', // explorer, decisive, hesitant
    deviceType: 'desktop',
    trafficSource: 'organic'
  });

  // 🎯 ESTRATÉGIAS NEUROMARKETING BASEADAS EM CIÊNCIA
  const neuroStrategies = {
    // 1. ESCASSEZ COGNITIVA (Cialdini)
    scarcity: {
      name: 'Escassez Cognitiva',
      triggers: [
        'Apenas 23 vagas restantes hoje',
        'Últimas 4 horas para acesso premium',
        '847 pessoas tentando acessar agora',
        'Material será removido em 2h47min'
      ],
      psychology: 'Ativa o sistema límbico (medo de perder)',
      implementation: 'real-time-counter'
    },

    // 2. PROVA SOCIAL DINÂMICA (Bandwagon Effect)
    socialProof: {
      name: 'Prova Social Dinâmica',
      triggers: [
        'João acabou de faturar R$ 8.500 usando isso',
        'Maria (SP) liberou R$ 12k em 15 dias',
        '+2.847 afiliados ativos agora',
        'Último resultado: R$ 15.600 (há 3min)'
      ],
      psychology: 'Neurônios-espelho + validação social',
      implementation: 'live-feed-simulation'
    },

    // 3. ANCORAGEM COGNITIVA (Kahneman)
    anchoring: {
      name: 'Ancoragem de Valor',
      triggers: [
        'Valor normal: R$ 2.997 → Hoje: GRATUITO',
        'Consultoria individual: R$ 15.000/h',
        'Curso similar: R$ 4.997 vs Nosso sistema: R$ 0',
        'ROI médio: 2.847% em 90 dias'
      ],
      psychology: 'Fixa referência de valor alto primeiro',
      implementation: 'progressive-value-reveal'
    },

    // 4. RECIPROCIDADE ESTRATÉGICA (Gouldner)
    reciprocity: {
      name: 'Reciprocidade Estratégica',
      triggers: [
        'BÔNUS: Material de R$ 1.997 incluído',
        'Acesso vitalício sem custo adicional',
        'Suporte premium 24/7 incluso',
        'Comunidade VIP liberada para você'
      ],
      psychology: 'Obrigação psicológica de retribuir',
      implementation: 'value-stacking'
    },

    // 5. AUTORIDADE CIENTÍFICA (Milgram)
    authority: {
      name: 'Autoridade Científica',
      triggers: [
        'Método validado por 15.000+ casos',
        'Baseado em 7 anos de pesquisa',
        'Aprovado por especialistas em IA',
        'Resultados auditados por empresa externa'
      ],
      psychology: 'Deferência à expertise percebida',
      implementation: 'credibility-indicators'
    },

    // 6. URGÊNCIA TEMPORAL (Prospect Theory)
    urgency: {
      name: 'Urgência Temporal',
      triggers: [
        'Oferta expira em 23:47:12',
        'Acesso será bloqueado à meia-noite',
        'Últimas horas do período promocional',
        'Sistema fecha para novos usuários em breve'
      ],
      psychology: 'Aversão à perda + pressão temporal',
      implementation: 'countdown-timers'
    }
  };

  // 🧬 ANÁLISE COMPORTAMENTAL EM TEMPO REAL
  useEffect(() => {
    const trackUserBehavior = () => {
      // Tempo na página
      const startTime = Date.now();
      const updateTime = () => {
        setUserBehaviorData(prev => ({
          ...prev,
          timeOnPage: Math.floor((Date.now() - startTime) / 1000)
        }));
      };
      const timeInterval = setInterval(updateTime, 1000);

      // Profundidade de scroll
      const trackScroll = () => {
        const scrollPercent = Math.round(
          (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
        );
        setUserBehaviorData(prev => ({
          ...prev,
          scrollDepth: Math.max(prev.scrollDepth, scrollPercent)
        }));
      };
      window.addEventListener('scroll', trackScroll);

      // Padrão de cliques
      const trackClicks = (e: MouseEvent) => {
        const clickSpeed = Date.now() - startTime;
        const pattern = clickSpeed < 5000 ? 'decisive' : 
                       clickSpeed > 30000 ? 'hesitant' : 'explorer';
        setUserBehaviorData(prev => ({
          ...prev,
          clickPattern: pattern
        }));
      };
      document.addEventListener('click', trackClicks);

      return () => {
        clearInterval(timeInterval);
        window.removeEventListener('scroll', trackScroll);
        document.removeEventListener('click', trackClicks);
      };
    };

    trackUserBehavior();
  }, []);

  // 🎯 SELEÇÃO INTELIGENTE DE ESTRATÉGIA
  const selectOptimalStrategy = () => {
    const { timeOnPage, scrollDepth, clickPattern } = userBehaviorData;
    
    if (timeOnPage < 30) return 'scarcity'; // Atenção imediata
    if (scrollDepth < 25) return 'socialProof'; // Engajamento
    if (clickPattern === 'hesitant') return 'anchoring'; // Convencimento
    if (timeOnPage > 120) return 'urgency'; // Decisão
    if (scrollDepth > 75) return 'reciprocity'; // Conversão
    return 'authority'; // Confiança
  };

  // 🚀 TRIGGERS NEUROLÓGICOS AVANÇADOS
  const NeuroTrigger = ({ strategy, isActive }: { strategy: any, isActive: boolean }) => (
    <div className={`
      p-6 rounded-xl border transition-all duration-500
      ${isActive 
        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50 shadow-glow' 
        : 'bg-white/5 border-white/10'
      }
    `}>
      <div className="flex items-center gap-3 mb-3">
        <Brain className="w-6 h-6 text-purple-400" />
        <h3 className="text-lg font-bold text-white">{strategy.name}</h3>
        {isActive && <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />}
      </div>
      
      <div className="space-y-2 mb-4">
        {strategy.triggers.map((trigger: string, idx: number) => (
          <div key={idx} className="text-sm text-white/80 bg-black/20 rounded-lg p-2">
            {trigger}
          </div>
        ))}
      </div>
      
      <div className="text-xs text-purple-300 bg-purple-500/10 rounded-lg p-2">
        <strong>Psicologia:</strong> {strategy.psychology}
      </div>
    </div>
  );

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Botão de Controle */}
      <button
        onClick={() => setActiveStrategy(selectOptimalStrategy())}
        className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      >
        <Brain className="w-8 h-8 text-white" />
      </button>

      {/* Painel de Estratégias (Dev Mode) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute bottom-20 right-0 w-96 max-h-96 overflow-y-auto bg-black/90 backdrop-blur-xl rounded-xl border border-purple-500/30 p-4">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-white mb-2">🧠 Neuro Engine</h2>
            <div className="text-sm text-white/60">
              Tempo: {userBehaviorData.timeOnPage}s | Scroll: {userBehaviorData.scrollDepth}% | Padrão: {userBehaviorData.clickPattern}
            </div>
          </div>
          
          <div className="space-y-3">
            {Object.entries(neuroStrategies).map(([key, strategy]) => (
              <NeuroTrigger 
                key={key} 
                strategy={strategy} 
                isActive={activeStrategy === key}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NeuroMarketingEngine;
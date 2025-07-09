import React from 'react';
import { Trophy, Gift, Download, Copy, Star, Crown, Brain, Building2 } from 'lucide-react';
import { UserProgress } from '../types/landing';
import FeedbackMessage from './FeedbackMessage';

interface CompletionStepProps {
  progress: UserProgress;
  isLoading: boolean;
  feedbackMessage: string;
  onEmailSend: () => void;
  onCopyLink: () => void;
}

const CompletionStep: React.FC<CompletionStepProps> = ({ 
  progress, 
  isLoading, 
  feedbackMessage, 
  onEmailSend, 
  onCopyLink 
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 animate-slide-up max-w-5xl mx-auto">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="w-24 h-24 gradient-secondary rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
          <Brain className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-4xl font-bold text-lp-light mb-4">
          🎉 Sistema GRIP Ativado com Sucesso!
        </h2>
        <p className="text-xl text-white/80 mb-6">
          Perfeito! Agora você tem acesso completo ao{' '}
          <span className="text-lp-orange font-bold">sistema de IA para empresas</span> + materiais estratégicos exclusivos!
        </p>
      </div>

      {/* Achievement Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-r from-gold-500/20 to-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 text-center">
          <Brain className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
          <div className="text-yellow-300 font-bold text-sm">IA Expert</div>
        </div>
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg p-4 text-center">
          <Building2 className="w-8 h-8 text-blue-400 mx-auto mb-2" />
          <div className="text-blue-300 font-bold text-sm">B2B Premium</div>
        </div>
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg p-4 text-center">
          <Gift className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <div className="text-green-300 font-bold text-sm">Materiais Liberados</div>
        </div>
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-4 text-center">
          <Trophy className="w-8 h-8 text-purple-400 mx-auto mb-2" />
          <div className="text-purple-300 font-bold text-sm">Renda Recorrente</div>
        </div>
      </div>

      {/* IA Business Kit */}
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-6 mb-8">
        <h3 className="text-2xl font-bold text-lp-light mb-4 text-center flex items-center justify-center gap-2">
          <Brain className="w-8 h-8 text-purple-400" />
          🚀 Seu Kit IA Empresarial Completo
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-bold text-orange-300 mb-3 flex items-center gap-2">
              <Download className="w-5 h-5" />
              📚 Materiais IA Empresarial:
            </h4>
            <ul className="text-white/90 space-y-1 text-sm">
              <li>✅ Scripts para indicar IA para empresas</li>
              <li>✅ Templates de propostas comerciais</li>
              <li>✅ Cases de sucesso empresariais</li>
              <li>✅ Demonstrações de IA prontas</li>
              <li>✅ Estratégias de abordagem B2B</li>
              <li>✅ Planilhas de controle de indicações</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-blue-300 mb-3 flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              🎯 Sistema GRIP Completo:
            </h4>
            <ul className="text-white/90 space-y-1 text-sm">
              <li>✅ Plataforma de IA empresarial</li>
              <li>✅ Chatbots personalizáveis</li>
              <li>✅ CRM com automação avançada</li>
              <li>✅ Dashboard de performance</li>
              <li>✅ Integração WhatsApp Business</li>
              <li>✅ Relatórios empresariais detalhados</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-green-300 mb-3 flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              💰 Modelo de Renda Recorrente:
            </h4>
            <ul className="text-white/90 space-y-1 text-sm">
              <li>✅ R$ 15k/mês (Plano Básico)</li>
              <li>✅ R$ 25k/mês (Plano Pro)</li>
              <li>✅ R$ 55k/mês (Plano Enterprise)</li>
              <li>✅ Comissões mensais recorrentes</li>
              <li>✅ Sem limite de indicações</li>
              <li>✅ Suporte especializado B2B</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <button
          onClick={onEmailSend}
          disabled={isLoading}
          className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 disabled:opacity-50 shadow-lg hover:scale-105 active:scale-95"
        >
          <Download className="w-6 h-6" />
          📧 Receber Materiais IA Empresarial
        </button>
        
        <button
          onClick={onCopyLink}
          className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-lp-green to-emerald-600 text-white text-lg font-bold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:scale-105 active:scale-95"
        >
          <Copy className="w-6 h-6" />
          🔗 Copiar Link GRIP Empresarial
        </button>
      </div>

      {/* Affiliate Link Display */}
      {progress.affiliateLink && (
        <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs text-white/60 mb-1">Seu link GRIP para empresas:</p>
              <p className="text-white font-mono text-sm break-all">{progress.affiliateLink}</p>
            </div>
            <button
              onClick={onCopyLink}
              className="ml-4 px-4 py-2 bg-lp-orange text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Business Strategy */}
      <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-lg p-6 mb-6">
        <h4 className="text-xl font-bold text-lp-light mb-4 text-center">🚀 Estratégia para Indicar IA para Empresas:</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold text-lg">1</div>
            <h5 className="font-bold text-orange-300 mb-2">Identifique Empresas</h5>
            <p className="text-white/80 text-sm">E-commerce, clínicas, varejo que precisam de automação</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold text-lg">2</div>
            <h5 className="font-bold text-orange-300 mb-2">Apresente a Solução</h5>
            <p className="text-white/80 text-sm">Use os scripts e demonstrações do GRIP</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold text-lg">3</div>
            <h5 className="font-bold text-orange-300 mb-2">Receba Recorrente</h5>
            <p className="text-white/80 text-sm">Ganhe de R$ 15k a R$ 55k/mês por empresa</p>
          </div>
        </div>
      </div>

      {/* Support Info */}
      <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
        <p className="text-blue-300 text-sm text-center">
          💬 <strong>Suporte Especializado B2B:</strong> Nossa equipe está disponível para ajudar você a{' '}
          <span className="text-orange-300 font-bold">indicar IA para empresas e gerar renda recorrente!</span>
        </p>
      </div>

      {feedbackMessage && (
        <div className="mt-6">
          <FeedbackMessage message={feedbackMessage} type="success" />
        </div>
      )}
    </div>
  );
};

export default CompletionStep;
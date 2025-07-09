import React from 'react';
import { CheckCircle, Brain, Building2, TrendingUp, Award } from 'lucide-react';

const WelcomeStep: React.FC = () => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 animate-slide-up max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-4xl font-bold text-lp-light mb-4">
          ✅ Acesso ao Sistema GRIP Liberado!
        </h2>
        <p className="text-xl text-white/80 mb-6">
          Perfeito! Agora você tem acesso à <span className="text-lp-orange font-bold">plataforma de IA para empresas</span>.{' '}
          Baixe o app para começar a indicar e ganhar comissões recorrentes!
        </p>
      </div>
      
      {/* IA Business Model */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg p-6">
          <h3 className="text-xl font-bold text-lp-light mb-4 flex items-center gap-2">
            <Brain className="w-6 h-6 text-lp-blue" />
            🤖 Sistema GRIP - IA Empresarial:
          </h3>
          <ul className="text-white/90 space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-lp-green" />
              Chatbots inteligentes para empresas
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-lp-green" />
              Automação de atendimento 24/7
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-lp-green" />
              CRM com IA integrada
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-lp-green" />
              Análise de dados empresariais
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-lp-green" />
              Integração com WhatsApp Business
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-lg p-6">
          <h3 className="text-xl font-bold text-lp-light mb-4 flex items-center gap-2">
            <Award className="w-6 h-6 text-lp-orange" />
            💰 Modelo de Comissões Recorrentes:
          </h3>
          <ul className="text-white/90 space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-lp-green" />
              <strong>Plano Básico:</strong> R$ 15.000/mês de comissão
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-lp-green" />
              <strong>Plano Pro:</strong> R$ 25.000/mês de comissão
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-lp-green" />
              <strong>Plano Enterprise:</strong> R$ 55.000/mês de comissão
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-lp-green" />
              Pagamento mensal recorrente
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-lp-green" />
              Sem limite de indicações
            </li>
          </ul>
        </div>
      </div>

      {/* Target Market */}
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-lp-light mb-4 text-center flex items-center justify-center gap-2">
          <Building2 className="w-6 h-6 text-purple-400" />
          🏢 Empresas que Mais Contratam IA:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl mb-2">🛒</div>
            <h4 className="font-bold text-purple-300 mb-2">E-commerce</h4>
            <p className="text-white/80 text-sm">Atendimento automatizado, chatbots de vendas</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">🏥</div>
            <h4 className="font-bold text-purple-300 mb-2">Saúde & Clínicas</h4>
            <p className="text-white/80 text-sm">Agendamentos, triagem, suporte a pacientes</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">🏪</div>
            <h4 className="font-bold text-purple-300 mb-2">Varejo & Serviços</h4>
            <p className="text-white/80 text-sm">Suporte 24/7, automação de processos</p>
          </div>
        </div>
      </div>

      {/* Success Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg p-4 text-center">
          <Building2 className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-300">2.847</div>
          <div className="text-green-200 text-sm">Empresas Usando IA</div>
        </div>
        <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-lg p-4 text-center">
          <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-300">R$ 3.2M</div>
          <div className="text-blue-200 text-sm">Comissões Pagas</div>
        </div>
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-4 text-center">
          <Award className="w-8 h-8 text-purple-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-purple-300">340%</div>
          <div className="text-purple-200 text-sm">Crescimento IA 2024</div>
        </div>
      </div>

      {/* Next Step Info */}
      <div className="bg-gradient-to-r from-lp-green/20 to-blue-500/20 border border-green-500/30 rounded-lg p-6">
        <h4 className="text-lg font-bold text-lp-light mb-3 text-center">📱 Próximo Passo:</h4>
        <p className="text-green-300 text-center">
          Baixe o <span className="text-orange-300 font-bold">app GRIP</span> e acesse os{' '}
          <span className="text-orange-300 font-bold">Materiais IA Empresarial Exclusivos</span> com scripts,{' '}
          templates e estratégias para indicar IA para empresas e gerar renda recorrente!
        </p>
      </div>
    </div>
  );
};

export default WelcomeStep;
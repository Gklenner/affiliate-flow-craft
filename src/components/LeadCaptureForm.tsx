/**
 * Formulário de Captura de Leads Otimizado
 * Com segmentação automática por nicho e integração completa
 */

import React, { useState, useEffect } from 'react';
import { Mail, User, ArrowRight, CheckCircle, Gift, Brain, TrendingUp } from 'lucide-react';
import { useFormTracking } from '../hooks/useAnalytics';
import { useABTesting } from '../hooks/useABTesting';
import EmailMarketingManager, { NichoAudiencia } from '../utils/emailMarketing';
import IntegrationsManager from '../utils/integrations';

interface LeadCaptureFormProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
  nicho?: NichoAudiencia;
  source?: string;
  utmParams?: Record<string, string>;
}

const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({
  onSubmit,
  isLoading = false,
  nicho = 'geral',
  source = 'landing_page',
  utmParams = {}
}) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    nicho: nicho,
    aceita_termos: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Hooks para tracking e A/B testing
  const {
    trackFormStart,
    trackFormFieldFocus,
    trackFormError,
    trackFormSubmitSuccess
  } = useFormTracking('lead_capture_form', nicho);

  const formTest = useABTesting('form-test-1', 'anonymous', nicho);

  // Managers
  const emailManager = EmailMarketingManager.getInstance();
  const integrationsManager = IntegrationsManager.getInstance();

  useEffect(() => {
    // Detectar nicho automaticamente se não fornecido
    if (formData.email && nicho === 'geral') {
      const detectedNicho = emailManager.detectarNicho(formData.email, utmParams);
      setFormData(prev => ({ ...prev, nicho: detectedNicho }));
    }
  }, [formData.email, utmParams]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    } else if (formData.nome.trim().length < 2) {
      newErrors.nome = 'Nome deve ter pelo menos 2 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.aceita_termos) {
      newErrors.aceita_termos = 'Você deve aceitar os termos';
    }

    setErrors(newErrors);

    // Track errors
    Object.keys(newErrors).forEach(field => {
      trackFormError(`${field}_validation`);
    });

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Dados do lead
      const leadData = {
        ...formData,
        fonte: source,
        utm_source: utmParams.utm_source,
        utm_medium: utmParams.utm_medium,
        utm_campaign: utmParams.utm_campaign,
        step_atual: 1,
        timestamp: new Date().toISOString()
      };

      // Processar lead através das integrações
      const processSuccess = await integrationsManager.processNewLead(leadData);
      
      if (processSuccess) {
        // Capturar lead no sistema de email marketing
        await emailManager.capturarLead(leadData);
        
        // Track sucesso
        trackFormSubmitSuccess();
        formTest.trackConversion();
        
        setSubmitSuccess(true);
        onSubmit(leadData);
        
        // Reset form após 3 segundos
        setTimeout(() => {
          setFormData({
            nome: '',
            email: '',
            nicho: nicho,
            aceita_termos: false
          });
          setSubmitSuccess(false);
        }, 3000);
      } else {
        throw new Error('Falha no processamento do lead');
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      trackFormError('submission_failed');
      setErrors({ submit: 'Erro ao enviar. Tente novamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFieldFocus = (fieldName: string) => {
    trackFormFieldFocus(fieldName);
    if (fieldName === 'nome' && !formData.nome) {
      trackFormStart();
    }
  };

  const getLeadMagnet = () => {
    return emailManager.getLeadMagnet(formData.nicho);
  };

  const leadMagnet = getLeadMagnet();

  // Conteúdo A/B testing para formulário
  const getFormVariant = () => {
    if (formTest.isLoading || !formTest.variant) {
      return {
        title: 'Receba Acesso Gratuito ao Sistema GRIP',
        subtitle: 'Materiais IA Empresarial + Scripts de Indicação',
        buttonText: 'QUERO ACESSO GRATUITO'
      };
    }

    return formTest.variant.content;
  };

  const formVariant = getFormVariant();

  if (submitSuccess) {
    return (
      <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-2xl p-8 text-center animate-scale-in">
        <div className="w-16 h-16 bg-lp-green rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-lp-light mb-4">
          ✅ Cadastro Realizado com Sucesso!
        </h3>
        <p className="text-lp-light/80 mb-4">
          Enviamos o acesso ao sistema GRIP e os materiais IA empresarial para seu email.
        </p>
        <div className="bg-lp-navy/50 rounded-lg p-4">
          <p className="text-lp-orange font-bold">
            🎁 Bônus Liberado: {leadMagnet.titulo}
          </p>
          <p className="text-lp-light/70 text-sm mt-2">
            Verifique sua caixa de entrada e spam
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <Gift className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-lp-light mb-2">
          {formVariant.title}
        </h3>
        <p className="text-lp-light/80">
          {formVariant.subtitle}
        </p>
      </div>

      {/* Lead Magnet Preview */}
      <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3">
          <Brain className="w-6 h-6 text-lp-orange" />
          <div>
            <div className="font-bold text-lp-light text-sm">{leadMagnet.titulo}</div>
            <div className="text-lp-light/70 text-xs">{leadMagnet.descricao}</div>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nome */}
        <div>
          <label className="block text-lp-light text-sm font-medium mb-2">
            Nome Completo
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-lp-light/50" />
            <input
              type="text"
              value={formData.nome}
              onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
              onFocus={() => handleFieldFocus('nome')}
              className="w-full pl-10 pr-4 py-3 bg-lp-navy/50 border border-lp-light/20 rounded-lg text-lp-light placeholder-lp-light/50 focus:border-lp-blue focus:ring-2 focus:ring-lp-blue/20 transition-all"
              placeholder="Seu nome completo"
              disabled={isSubmitting}
            />
          </div>
          {errors.nome && (
            <p className="text-red-400 text-xs mt-1">{errors.nome}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-lp-light text-sm font-medium mb-2">
            Email Profissional
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-lp-light/50" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              onFocus={() => handleFieldFocus('email')}
              className="w-full pl-10 pr-4 py-3 bg-lp-navy/50 border border-lp-light/20 rounded-lg text-lp-light placeholder-lp-light/50 focus:border-lp-blue focus:ring-2 focus:ring-lp-blue/20 transition-all"
              placeholder="seu@email.com"
              disabled={isSubmitting}
            />
          </div>
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Nicho Detectado */}
        {formData.nicho !== 'geral' && (
          <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 text-sm font-medium">
                Nicho detectado: {formData.nicho.charAt(0).toUpperCase() + formData.nicho.slice(1)}
              </span>
            </div>
            <p className="text-blue-200 text-xs mt-1">
              Você receberá conteúdo personalizado para sua área
            </p>
          </div>
        )}

        {/* Termos */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="aceita_termos"
            checked={formData.aceita_termos}
            onChange={(e) => setFormData(prev => ({ ...prev, aceita_termos: e.target.checked }))}
            className="mt-1 w-4 h-4 text-lp-blue bg-lp-navy/50 border-lp-light/20 rounded focus:ring-lp-blue focus:ring-2"
            disabled={isSubmitting}
          />
          <label htmlFor="aceita_termos" className="text-lp-light/80 text-xs">
            Aceito receber emails com conteúdo sobre IA empresarial e posso cancelar a qualquer momento.
          </label>
        </div>
        {errors.aceita_termos && (
          <p className="text-red-400 text-xs">{errors.aceita_termos}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="w-full py-4 bg-gradient-to-r from-lp-orange to-red-500 text-white font-bold rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Processando...
            </>
          ) : (
            <>
              {formVariant.buttonText}
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>

        {errors.submit && (
          <p className="text-red-400 text-sm text-center">{errors.submit}</p>
        )}
      </form>

      {/* Security Badge */}
      <div className="mt-6 text-center">
        <div className="flex items-center justify-center gap-2 text-lp-light/60 text-xs">
          <CheckCircle className="w-4 h-4 text-lp-green" />
          <span>🔒 Seus dados estão seguros • Não fazemos spam</span>
        </div>
      </div>
    </div>
  );
};

export default LeadCaptureForm;
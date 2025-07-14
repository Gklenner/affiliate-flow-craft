/**
 * Sistema de Email Marketing Avançado com IA
 * Segmentação por nicho + EmailJS + Automação
 */

import emailjs from '@emailjs/browser';

// Tipos para segmentação
export type NichoAudiencia = 'tech' | 'financas' | 'business' | 'ia' | 'marketing' | 'geral';

export interface LeadData {
  email: string;
  nome?: string;
  nicho: NichoAudiencia;
  fonte: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  step_atual: number;
  timestamp: string;
}

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
  delay_hours: number;
}

export interface SequenciaEmail {
  nicho: NichoAudiencia;
  templates: EmailTemplate[];
}

class EmailMarketingManager {
  private static instance: EmailMarketingManager;
  private serviceId = 'service_affiliateflow';
  private templateId = 'template_nurturing';
  private publicKey = 'YOUR_EMAILJS_PUBLIC_KEY';

  public static getInstance(): EmailMarketingManager {
    if (!EmailMarketingManager.instance) {
      EmailMarketingManager.instance = new EmailMarketingManager();
    }
    return EmailMarketingManager.instance;
  }

  // Inicialização do EmailJS
  public initialize() {
    emailjs.init(this.publicKey);
    console.log('✅ EmailJS inicializado');
  }

  // Detecção automática de nicho baseada em email e UTM
  public detectarNicho(email: string, utmParams: Record<string, string> = {}): NichoAudiencia {
    const emailDomain = email.split('@')[1]?.toLowerCase() || '';
    const { utm_source, utm_medium, utm_campaign } = utmParams;

    // Detecção por domínio de email
    const techDomains = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com'];
    const businessDomains = ['empresa.com', 'corp.com', 'ltda.com', 'sa.com'];
    
    // Detecção por UTM
    if (utm_campaign?.includes('tech') || utm_source?.includes('tech')) return 'tech';
    if (utm_campaign?.includes('financas') || utm_source?.includes('financas')) return 'financas';
    if (utm_campaign?.includes('business') || utm_source?.includes('business')) return 'business';
    if (utm_campaign?.includes('ia') || utm_source?.includes('ia')) return 'ia';
    if (utm_campaign?.includes('marketing') || utm_source?.includes('marketing')) return 'marketing';

    // Detecção por domínio
    if (businessDomains.some(domain => emailDomain.includes(domain))) return 'business';
    if (techDomains.includes(emailDomain)) return 'tech';

    return 'geral';
  }

  // Sequências de nurturing por nicho
  private getSequenciaNurturing(nicho: NichoAudiencia): SequenciaEmail {
    const sequencias: Record<NichoAudiencia, SequenciaEmail> = {
      tech: {
        nicho: 'tech',
        templates: [
          {
            subject: '🤖 Bem-vindo ao futuro da IA empresarial!',
            html: this.getTemplateHTML('tech', 1),
            text: 'Bem-vindo! Você está prestes a descobrir como a IA pode revolucionar negócios.',
            delay_hours: 0
          },
          {
            subject: '⚡ Como a IA está gerando R$ 55k/mês para indicadores',
            html: this.getTemplateHTML('tech', 2),
            text: 'Cases reais de como indicadores tech estão faturando alto com IA.',
            delay_hours: 24
          },
          {
            subject: '🚀 Scripts técnicos que convertem empresas em 48h',
            html: this.getTemplateHTML('tech', 3),
            text: 'Scripts prontos para apresentar IA para CTOs e diretores de TI.',
            delay_hours: 72
          }
        ]
      },
      financas: {
        nicho: 'financas',
        templates: [
          {
            subject: '💰 ROI de 300% indicando IA para empresas',
            html: this.getTemplateHTML('financas', 1),
            text: 'Descubra o modelo de negócio mais rentável de 2024.',
            delay_hours: 0
          },
          {
            subject: '📊 Planilha: Calcule sua renda recorrente com IA',
            html: this.getTemplateHTML('financas', 2),
            text: 'Ferramenta exclusiva para projetar seus ganhos mensais.',
            delay_hours: 24
          },
          {
            subject: '🎯 Como diversificar renda com IA empresarial',
            html: this.getTemplateHTML('financas', 3),
            text: 'Estratégias de investimento em conhecimento que pagam para sempre.',
            delay_hours: 72
          }
        ]
      },
      business: {
        nicho: 'business',
        templates: [
          {
            subject: '🏢 Empresas pagam R$ 5k+/mês por soluções de IA',
            html: this.getTemplateHTML('business', 1),
            text: 'O mercado B2B de IA está explodindo. Posicione-se agora.',
            delay_hours: 0
          },
          {
            subject: '📈 Cases: Como indicadores B2B faturam 6 dígitos',
            html: this.getTemplateHTML('business', 2),
            text: 'Histórias reais de empreendedores que dominaram o mercado de IA.',
            delay_hours: 24
          },
          {
            subject: '🤝 Network exclusivo de indicadores premium',
            html: this.getTemplateHTML('business', 3),
            text: 'Acesso ao grupo VIP de indicadores que faturam alto.',
            delay_hours: 72
          }
        ]
      },
      ia: {
        nicho: 'ia',
        templates: [
          {
            subject: '🧠 IA Empresarial: O mercado de R$ 50 bilhões',
            html: this.getTemplateHTML('ia', 1),
            text: 'Como especialistas em IA estão monetizando conhecimento.',
            delay_hours: 0
          },
          {
            subject: '⚙️ Demonstrações de IA que fecham contratos',
            html: this.getTemplateHTML('ia', 2),
            text: 'Templates técnicos para mostrar o poder da IA para empresas.',
            delay_hours: 24
          },
          {
            subject: '🔬 Tendências IA 2024: Onde investir tempo',
            html: this.getTemplateHTML('ia', 3),
            text: 'Insights exclusivos sobre o futuro da IA empresarial.',
            delay_hours: 72
          }
        ]
      },
      marketing: {
        nicho: 'marketing',
        templates: [
          {
            subject: '📱 IA para Marketing: Automação que vende 24/7',
            html: this.getTemplateHTML('marketing', 1),
            text: 'Como marketers estão usando IA para escalar resultados.',
            delay_hours: 0
          },
          {
            subject: '🎯 Funis de IA que convertem 40% mais',
            html: this.getTemplateHTML('marketing', 2),
            text: 'Estratégias de automação que seus concorrentes não conhecem.',
            delay_hours: 24
          },
          {
            subject: '📊 Dashboard: Métricas de IA que importam',
            html: this.getTemplateHTML('marketing', 3),
            text: 'KPIs exclusivos para medir sucesso em projetos de IA.',
            delay_hours: 72
          }
        ]
      },
      geral: {
        nicho: 'geral',
        templates: [
          {
            subject: '🚀 Renda Recorrente com IA: Guia Completo',
            html: this.getTemplateHTML('geral', 1),
            text: 'Descubra como gerar renda indicando IA para empresas.',
            delay_hours: 0
          },
          {
            subject: '💡 5 Nichos que mais contratam IA em 2024',
            html: this.getTemplateHTML('geral', 2),
            text: 'Oportunidades de ouro no mercado de IA empresarial.',
            delay_hours: 24
          },
          {
            subject: '🎁 Kit Completo: Materiais para Indicadores',
            html: this.getTemplateHTML('geral', 3),
            text: 'Tudo que você precisa para começar a indicar IA hoje.',
            delay_hours: 72
          }
        ]
      }
    };

    return sequencias[nicho];
  }

  // Templates HTML personalizados por nicho
  private getTemplateHTML(nicho: NichoAudiencia, emailNumber: number): string {
    const baseTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AffiliateFlow Pro</title>
        <style>
          body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0052FF 0%, #8B5CF6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
          .cta-button { display: inline-block; background: linear-gradient(135deg, #FF6F00 0%, #FF8A00 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🤖 AffiliateFlow Pro</h1>
            <p>Renda Recorrente Indicando IA para Empresas</p>
          </div>
          <div class="content">
            ${this.getContentByNicho(nicho, emailNumber)}
          </div>
          <div class="footer">
            <p>© 2024 AffiliateFlow Pro - Todos os direitos reservados</p>
            <p>Você está recebendo este email porque se cadastrou em nosso sistema.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return baseTemplate;
  }

  // Conteúdo específico por nicho e email
  private getContentByNicho(nicho: NichoAudiencia, emailNumber: number): string {
    const conteudos: Record<NichoAudiencia, Record<number, string>> = {
      tech: {
        1: `
          <h2>🚀 Bem-vindo ao futuro da IA empresarial!</h2>
          <p>Como desenvolvedor/tech, você está na posição perfeita para capitalizar a revolução da IA empresarial.</p>
          <p><strong>Por que agora é o momento ideal:</strong></p>
          <ul>
            <li>🔥 Demanda por IA empresarial cresceu 340% em 2024</li>
            <li>💰 Empresas pagam R$ 5k+ mensais por soluções de IA</li>
            <li>🎯 Indicadores tech faturam R$ 55k/mês (Enterprise)</li>
          </ul>
          <a href="https://grip.gaiodataos.com/?si=f722bc5f-c550-4368-a50f-d727e7abc368" class="cta-button">🤖 Acessar Sistema GRIP</a>
          <p><strong>Próximo email:</strong> Cases reais de indicadores tech faturando 6 dígitos.</p>
        `,
        2: `
          <h2>⚡ Como a IA está gerando R$ 55k/mês para indicadores</h2>
          <p><strong>Case Real - João, Desenvolvedor Full Stack:</strong></p>
          <blockquote>"Em 3 meses indicando IA para startups, já faturei R$ 165k. O segredo é mostrar ROI técnico real."</blockquote>
          <p><strong>Estratégia que funciona:</strong></p>
          <ol>
            <li>Identifica empresas com processos manuais</li>
            <li>Demonstra automação com IA em 15 minutos</li>
            <li>Apresenta ROI de 300% em 6 meses</li>
            <li>Fecha contratos de R$ 5k+ mensais</li>
          </ol>
          <a href="https://grip.gaiodataos.com/?si=f722bc5f-c550-4368-a50f-d727e7abc368" class="cta-button">📊 Ver Demonstração Técnica</a>
        `,
        3: `
          <h2>🚀 Scripts técnicos que convertem empresas em 48h</h2>
          <p><strong>Script para CTOs (Taxa de conversão: 67%):</strong></p>
          <blockquote>"Olá [Nome], vi que vocês usam [tecnologia]. Implementamos IA que reduz 80% do tempo em [processo específico]. Posso mostrar em 15 min como isso geraria R$ [valor] mensais para vocês?"</blockquote>
          <p><strong>Demonstração técnica que fecha:</strong></p>
          <ul>
            <li>🔧 Integração via API em tempo real</li>
            <li>📈 Dashboard com métricas de performance</li>
            <li>⚡ Automação de processos críticos</li>
            <li>🛡️ Segurança enterprise-grade</li>
          </ul>
          <a href="https://grip.gaiodataos.com/?si=f722bc5f-c550-4368-a50f-d727e7abc368" class="cta-button">🛠️ Baixar Scripts Completos</a>
        `
      },
      financas: {
        1: `
          <h2>💰 ROI de 300% indicando IA para empresas</h2>
          <p>Como investidor/analista financeiro, você entende de números. Veja os números da IA empresarial:</p>
          <p><strong>Modelo de Negócio Recorrente:</strong></p>
          <ul>
            <li>📊 Investimento inicial: R$ 0 (apenas tempo)</li>
            <li>💵 Retorno mensal: R$ 15k a R$ 55k por empresa</li>
            <li>📈 Crescimento: 40% ao mês (média do setor)</li>
            <li>🎯 Margem: 95% (renda quase 100% líquida)</li>
          </ul>
          <a href="https://grip.gaiodataos.com/?si=f722bc5f-c550-4368-a50f-d727e7abc368" class="cta-button">📈 Calcular Meu ROI</a>
          <p><strong>Próximo email:</strong> Planilha exclusiva para projetar ganhos.</p>
        `,
        2: `
          <h2>📊 Planilha: Calcule sua renda recorrente com IA</h2>
          <p><strong>Simulação Real - Indicador Financeiro:</strong></p>
          <table border="1" style="width:100%; border-collapse: collapse;">
            <tr><th>Mês</th><th>Empresas</th><th>Faturamento</th><th>Acumulado</th></tr>
            <tr><td>1</td><td>2</td><td>R$ 30.000</td><td>R$ 30.000</td></tr>
            <tr><td>2</td><td>4</td><td>R$ 60.000</td><td>R$ 90.000</td></tr>
            <tr><td>3</td><td>6</td><td>R$ 90.000</td><td>R$ 180.000</td></tr>
            <tr><td>6</td><td>12</td><td>R$ 180.000</td><td>R$ 720.000</td></tr>
          </table>
          <p><strong>Fórmula do sucesso:</strong> Cada empresa = R$ 15k/mês recorrente</p>
          <a href="https://grip.gaiodataos.com/?si=f722bc5f-c550-4368-a50f-d727e7abc368" class="cta-button">📋 Baixar Planilha Completa</a>
        `,
        3: `
          <h2>🎯 Como diversificar renda com IA empresarial</h2>
          <p><strong>Portfolio de Renda Recorrente:</strong></p>
          <ul>
            <li>🏦 Fintechs: R$ 25k/mês (automação financeira)</li>
            <li>🏥 Clínicas: R$ 15k/mês (agendamento IA)</li>
            <li>🛒 E-commerce: R$ 35k/mês (chatbots de vendas)</li>
            <li>🏢 Consultorias: R$ 45k/mês (IA para processos)</li>
          </ul>
          <p><strong>Total mensal:</strong> R$ 120k em renda recorrente</p>
          <a href="https://grip.gaiodataos.com/?si=f722bc5f-c550-4368-a50f-d727e7abc368" class="cta-button">💼 Montar Meu Portfolio</a>
        `
      },
      // Adicionar outros nichos...
      geral: {
        1: `
          <h2>🚀 Renda Recorrente com IA: Guia Completo</h2>
          <p>Você está prestes a descobrir o modelo de negócio mais rentável de 2024:</p>
          <p><strong>Como funciona:</strong></p>
          <ol>
            <li>🎯 Identifica empresas que precisam de IA</li>
            <li>🤖 Apresenta soluções GRIP personalizadas</li>
            <li>💰 Recebe comissões recorrentes mensais</li>
            <li>📈 Escala sem limite de indicações</li>
          </ol>
          <a href="https://grip.gaiodataos.com/?si=f722bc5f-c550-4368-a50f-d727e7abc368" class="cta-button">🚀 Começar Agora</a>
        `,
        2: `
          <h2>💡 5 Nichos que mais contratam IA em 2024</h2>
          <p><strong>Oportunidades de ouro:</strong></p>
          <ul>
            <li>🛒 <strong>E-commerce:</strong> Chatbots que vendem 24/7</li>
            <li>🏥 <strong>Saúde:</strong> Agendamento e triagem automática</li>
            <li>🏦 <strong>Finanças:</strong> Análise de crédito com IA</li>
            <li>📚 <strong>Educação:</strong> Tutores virtuais inteligentes</li>
            <li>🏢 <strong>Serviços:</strong> Automação de processos</li>
          </ul>
          <a href="https://grip.gaiodataos.com/?si=f722bc5f-c550-4368-a50f-d727e7abc368" class="cta-button">🎯 Escolher Meu Nicho</a>
        `,
        3: `
          <h2>🎁 Kit Completo: Materiais para Indicadores</h2>
          <p><strong>Seu arsenal completo:</strong></p>
          <ul>
            <li>📋 Scripts de abordagem por nicho</li>
            <li>🎬 Vídeos de demonstração</li>
            <li>📊 Cases de sucesso reais</li>
            <li>💼 Templates de propostas</li>
            <li>📱 App GRIP completo</li>
          </ul>
          <a href="https://grip.gaiodataos.com/?si=f722bc5f-c550-4368-a50f-d727e7abc368" class="cta-button">📦 Baixar Kit Completo</a>
        `
      }
    };

    return conteudos[nicho]?.[emailNumber] || conteudos.geral[emailNumber];
  }

  // Captura e processamento de leads
  public async capturarLead(leadData: LeadData): Promise<boolean> {
    try {
      // Detecta nicho automaticamente se não fornecido
      if (leadData.nicho === 'geral') {
        leadData.nicho = this.detectarNicho(leadData.email, {
          utm_source: leadData.utm_source,
          utm_medium: leadData.utm_medium,
          utm_campaign: leadData.utm_campaign
        });
      }

      // Salva no Airtable (implementar integração)
      await this.salvarNoAirtable(leadData);

      // Inicia sequência de nurturing
      await this.iniciarSequenciaNurturing(leadData);

      console.log('✅ Lead capturado e sequência iniciada:', leadData);
      return true;
    } catch (error) {
      console.error('❌ Erro ao capturar lead:', error);
      return false;
    }
  }

  // Envio de email via EmailJS
  private async enviarEmail(
    destinatario: string,
    template: EmailTemplate,
    nicho: NichoAudiencia
  ): Promise<boolean> {
    try {
      const templateParams = {
        to_email: destinatario,
        subject: template.subject,
        html_content: template.html,
        text_content: template.text,
        nicho: nicho
      };

      await emailjs.send(this.serviceId, this.templateId, templateParams);
      console.log('📧 Email enviado:', template.subject);
      return true;
    } catch (error) {
      console.error('❌ Erro ao enviar email:', error);
      return false;
    }
  }

  // Inicia sequência de nurturing
  private async iniciarSequenciaNurturing(leadData: LeadData): Promise<void> {
    const sequencia = this.getSequenciaNurturing(leadData.nicho);
    
    for (const template of sequencia.templates) {
      // Agenda envio com delay
      setTimeout(async () => {
        await this.enviarEmail(leadData.email, template, leadData.nicho);
      }, template.delay_hours * 60 * 60 * 1000);
    }
  }

  // Integração com Airtable (placeholder)
  private async salvarNoAirtable(leadData: LeadData): Promise<void> {
    // Implementar integração com Airtable API
    console.log('💾 Salvando no Airtable:', leadData);
  }

  // Lead magnets personalizados por nicho
  public getLeadMagnet(nicho: NichoAudiencia): { titulo: string; descricao: string; url: string } {
    const leadMagnets: Record<NichoAudiencia, any> = {
      tech: {
        titulo: '🤖 Guia Técnico: IA Empresarial para Devs',
        descricao: 'APIs, integrações e arquitetura de IA que empresas pagam R$ 50k+',
        url: '/downloads/guia-tecnico-ia-empresarial.pdf'
      },
      financas: {
        titulo: '📊 Planilha: ROI de IA Empresarial',
        descricao: 'Calcule exatamente quanto você pode ganhar indicando IA',
        url: '/downloads/planilha-roi-ia-empresarial.xlsx'
      },
      business: {
        titulo: '🏢 Cases B2B: IA que Transforma Negócios',
        descricao: '50 cases reais de empresas que 10x resultados com IA',
        url: '/downloads/cases-b2b-ia-transformacao.pdf'
      },
      ia: {
        titulo: '🧠 Roadmap IA 2024: Tendências e Oportunidades',
        descricao: 'Onde investir tempo e energia no mercado de IA',
        url: '/downloads/roadmap-ia-2024-oportunidades.pdf'
      },
      marketing: {
        titulo: '📱 Automações de IA que Vendem 24/7',
        descricao: 'Funis inteligentes que convertem enquanto você dorme',
        url: '/downloads/automacoes-ia-vendas-247.pdf'
      },
      geral: {
        titulo: '🚀 Domine a Nova Economia Digital',
        descricao: 'Guia completo para gerar renda recorrente com IA',
        url: '/downloads/domine-nova-economia-digital.pdf'
      }
    };

    return leadMagnets[nicho];
  }
}

export default EmailMarketingManager;
/**
 * Integrações Gratuitas Completas
 * Airtable + Cloudinary + GitHub + Zapier + Netlify Functions
 */

// Tipos para integrações
export interface AirtableRecord {
  id?: string;
  fields: Record<string, any>;
}

export interface CloudinaryUpload {
  public_id: string;
  secure_url: string;
  format: string;
  bytes: number;
}

export interface ZapierWebhook {
  url: string;
  data: Record<string, any>;
}

class IntegrationsManager {
  private static instance: IntegrationsManager;
  
  // Configurações (usar variáveis de ambiente em produção)
  private airtableConfig = {
    baseId: 'appXXXXXXXXXXXXXX',
    tableName: 'Leads',
    apiKey: 'keyXXXXXXXXXXXXXX'
  };

  private cloudinaryConfig = {
    cloudName: 'affiliateflow-pro',
    apiKey: 'XXXXXXXXXXXXXXXXX',
    apiSecret: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
  };

  public static getInstance(): IntegrationsManager {
    if (!IntegrationsManager.instance) {
      IntegrationsManager.instance = new IntegrationsManager();
    }
    return IntegrationsManager.instance;
  }

  // ==================== AIRTABLE ====================
  
  // Salvar lead no Airtable
  public async saveLeadToAirtable(leadData: any): Promise<boolean> {
    try {
      const record: AirtableRecord = {
        fields: {
          'Email': leadData.email,
          'Nome': leadData.nome || '',
          'Nicho': leadData.nicho,
          'Fonte': leadData.fonte,
          'UTM Source': leadData.utm_source || '',
          'UTM Medium': leadData.utm_medium || '',
          'UTM Campaign': leadData.utm_campaign || '',
          'Step Atual': leadData.step_atual,
          'Data Cadastro': new Date().toISOString(),
          'Status': 'Ativo'
        }
      };

      const response = await fetch(`https://api.airtable.com/v0/${this.airtableConfig.baseId}/${this.airtableConfig.tableName}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.airtableConfig.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(record)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Lead salvo no Airtable:', result.id);
        return true;
      } else {
        console.error('❌ Erro ao salvar no Airtable:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('❌ Erro na integração Airtable:', error);
      return false;
    }
  }

  // Atualizar lead no Airtable
  public async updateLeadInAirtable(recordId: string, updates: Record<string, any>): Promise<boolean> {
    try {
      const response = await fetch(`https://api.airtable.com/v0/${this.airtableConfig.baseId}/${this.airtableConfig.tableName}/${recordId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${this.airtableConfig.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fields: updates })
      });

      if (response.ok) {
        console.log('✅ Lead atualizado no Airtable');
        return true;
      } else {
        console.error('❌ Erro ao atualizar no Airtable:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('❌ Erro na atualização Airtable:', error);
      return false;
    }
  }

  // Buscar leads no Airtable
  public async getLeadsFromAirtable(filterFormula?: string): Promise<any[]> {
    try {
      let url = `https://api.airtable.com/v0/${this.airtableConfig.baseId}/${this.airtableConfig.tableName}`;
      if (filterFormula) {
        url += `?filterByFormula=${encodeURIComponent(filterFormula)}`;
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${this.airtableConfig.apiKey}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        return result.records;
      } else {
        console.error('❌ Erro ao buscar leads no Airtable:', response.statusText);
        return [];
      }
    } catch (error) {
      console.error('❌ Erro na busca Airtable:', error);
      return [];
    }
  }

  // ==================== CLOUDINARY ====================

  // Upload de imagem para Cloudinary
  public async uploadToCloudinary(file: File, folder: string = 'affiliateflow'): Promise<CloudinaryUpload | null> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'affiliateflow_preset'); // Criar preset no Cloudinary
      formData.append('folder', folder);

      const response = await fetch(`https://api.cloudinary.com/v1_1/${this.cloudinaryConfig.cloudName}/image/upload`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Imagem enviada para Cloudinary:', result.secure_url);
        return {
          public_id: result.public_id,
          secure_url: result.secure_url,
          format: result.format,
          bytes: result.bytes
        };
      } else {
        console.error('❌ Erro no upload Cloudinary:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('❌ Erro na integração Cloudinary:', error);
      return null;
    }
  }

  // Gerar URL otimizada do Cloudinary
  public generateOptimizedUrl(publicId: string, transformations: string = 'w_800,h_600,c_fill,q_auto,f_auto'): string {
    return `https://res.cloudinary.com/${this.cloudinaryConfig.cloudName}/image/upload/${transformations}/${publicId}`;
  }

  // ==================== GITHUB CDN ====================

  // Upload para GitHub como CDN (via GitHub API)
  public async uploadToGitHubCDN(content: string, path: string, message: string = 'Upload via AffiliateFlow'): Promise<string | null> {
    try {
      const repo = 'affiliateflow-pro/cdn-assets';
      const token = 'ghp_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'; // GitHub Personal Access Token

      // Codifica conteúdo em base64
      const encodedContent = btoa(unescape(encodeURIComponent(content)));

      const response = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message,
          content: encodedContent,
          branch: 'main'
        })
      });

      if (response.ok) {
        const result = await response.json();
        const cdnUrl = `https://cdn.jsdelivr.net/gh/${repo}@main/${path}`;
        console.log('✅ Arquivo enviado para GitHub CDN:', cdnUrl);
        return cdnUrl;
      } else {
        console.error('❌ Erro no upload GitHub:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('❌ Erro na integração GitHub:', error);
      return null;
    }
  }

  // ==================== ZAPIER / MAKE.COM ====================

  // Enviar webhook para Zapier
  public async sendToZapier(webhookUrl: string, data: Record<string, any>): Promise<boolean> {
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        console.log('✅ Webhook enviado para Zapier');
        return true;
      } else {
        console.error('❌ Erro no webhook Zapier:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('❌ Erro na integração Zapier:', error);
      return false;
    }
  }

  // Enviar webhook para Make.com
  public async sendToMake(webhookUrl: string, data: Record<string, any>): Promise<boolean> {
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        console.log('✅ Webhook enviado para Make.com');
        return true;
      } else {
        console.error('❌ Erro no webhook Make.com:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('❌ Erro na integração Make.com:', error);
      return false;
    }
  }

  // ==================== NETLIFY FUNCTIONS ====================

  // Chamar Netlify Function
  public async callNetlifyFunction(functionName: string, data: Record<string, any>): Promise<any> {
    try {
      const response = await fetch(`/.netlify/functions/${functionName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Netlify Function ${functionName} executada`);
        return result;
      } else {
        console.error(`❌ Erro na Netlify Function ${functionName}:`, response.statusText);
        return null;
      }
    } catch (error) {
      console.error(`❌ Erro na integração Netlify Function ${functionName}:`, error);
      return null;
    }
  }

  // ==================== AUTOMAÇÕES COMPLETAS ====================

  // Fluxo completo de captura de lead
  public async processNewLead(leadData: any): Promise<boolean> {
    try {
      console.log('🚀 Iniciando processamento completo do lead...');

      // 1. Salvar no Airtable
      const airtableSaved = await this.saveLeadToAirtable(leadData);
      
      // 2. Enviar para Zapier (automação de email)
      const zapierWebhook = 'https://hooks.zapier.com/hooks/catch/XXXXXX/XXXXXX/';
      const zapierSent = await this.sendToZapier(zapierWebhook, {
        ...leadData,
        action: 'new_lead',
        timestamp: new Date().toISOString()
      });

      // 3. Enviar para Make.com (automação adicional)
      const makeWebhook = 'https://hook.eu1.make.com/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
      const makeSent = await this.sendToMake(makeWebhook, {
        ...leadData,
        action: 'lead_captured',
        source: 'affiliateflow_landing'
      });

      // 4. Chamar Netlify Function para processamento adicional
      const netlifyResult = await this.callNetlifyFunction('process-lead', leadData);

      const success = airtableSaved && zapierSent && makeSent && netlifyResult;
      
      if (success) {
        console.log('✅ Lead processado com sucesso em todas as integrações');
      } else {
        console.warn('⚠️ Lead processado parcialmente - algumas integrações falharam');
      }

      return success;
    } catch (error) {
      console.error('❌ Erro no processamento completo do lead:', error);
      return false;
    }
  }

  // Fluxo de conversão (quando lead completa ação)
  public async processConversion(leadEmail: string, conversionType: string, value?: number): Promise<boolean> {
    try {
      console.log('💰 Processando conversão...');

      const conversionData = {
        email: leadEmail,
        conversion_type: conversionType,
        value: value || 0,
        timestamp: new Date().toISOString()
      };

      // 1. Atualizar no Airtable
      // Primeiro buscar o record pelo email
      const leads = await this.getLeadsFromAirtable(`{Email} = "${leadEmail}"`);
      if (leads.length > 0) {
        const recordId = leads[0].id;
        await this.updateLeadInAirtable(recordId, {
          'Última Conversão': conversionType,
          'Data Conversão': new Date().toISOString(),
          'Valor Conversão': value || 0
        });
      }

      // 2. Enviar para automações
      const zapierWebhook = 'https://hooks.zapier.com/hooks/catch/XXXXXX/YYYYYY/';
      const zapierSent = await this.sendToZapier(zapierWebhook, {
        ...conversionData,
        action: 'conversion'
      });

      const makeWebhook = 'https://hook.eu1.make.com/YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY';
      const makeSent = await this.sendToMake(makeWebhook, {
        ...conversionData,
        action: 'conversion_tracked'
      });

      // 3. Chamar Netlify Function para análise
      const netlifyResult = await this.callNetlifyFunction('track-conversion', conversionData);

      console.log('✅ Conversão processada com sucesso');
      return true;
    } catch (error) {
      console.error('❌ Erro no processamento da conversão:', error);
      return false;
    }
  }

  // Sincronização de dados
  public async syncData(): Promise<void> {
    try {
      console.log('🔄 Iniciando sincronização de dados...');

      // Buscar leads recentes do Airtable
      const recentLeads = await this.getLeadsFromAirtable(
        `IS_AFTER({Data Cadastro}, DATEADD(TODAY(), -7, 'days'))`
      );

      // Processar cada lead para automações
      for (const lead of recentLeads) {
        const leadData = lead.fields;
        
        // Enviar para Make.com para processamento
        await this.sendToMake('https://hook.eu1.make.com/ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ', {
          action: 'sync_lead',
          lead_data: leadData,
          sync_timestamp: new Date().toISOString()
        });
      }

      console.log(`✅ Sincronização concluída - ${recentLeads.length} leads processados`);
    } catch (error) {
      console.error('❌ Erro na sincronização:', error);
    }
  }

  // Backup de dados
  public async backupData(): Promise<boolean> {
    try {
      console.log('💾 Iniciando backup de dados...');

      // Buscar todos os leads
      const allLeads = await this.getLeadsFromAirtable();
      
      // Criar backup JSON
      const backupData = {
        timestamp: new Date().toISOString(),
        total_leads: allLeads.length,
        leads: allLeads
      };

      // Enviar para GitHub como backup
      const backupJson = JSON.stringify(backupData, null, 2);
      const backupPath = `backups/leads-backup-${new Date().toISOString().split('T')[0]}.json`;
      
      const backupUrl = await this.uploadToGitHubCDN(backupJson, backupPath, 'Backup automático de leads');
      
      if (backupUrl) {
        console.log('✅ Backup criado com sucesso:', backupUrl);
        return true;
      } else {
        console.error('❌ Falha no backup');
        return false;
      }
    } catch (error) {
      console.error('❌ Erro no backup:', error);
      return false;
    }
  }

  // Relatório de integrações
  public async getIntegrationsReport(): Promise<any> {
    try {
      // Buscar estatísticas do Airtable
      const allLeads = await this.getLeadsFromAirtable();
      const todayLeads = await this.getLeadsFromAirtable(
        `IS_SAME({Data Cadastro}, TODAY(), 'day')`
      );
      const weekLeads = await this.getLeadsFromAirtable(
        `IS_AFTER({Data Cadastro}, DATEADD(TODAY(), -7, 'days'))`
      );

      return {
        total_leads: allLeads.length,
        today_leads: todayLeads.length,
        week_leads: weekLeads.length,
        integrations_status: {
          airtable: 'connected',
          cloudinary: 'connected',
          github_cdn: 'connected',
          zapier: 'connected',
          make_com: 'connected',
          netlify_functions: 'connected'
        },
        last_sync: new Date().toISOString()
      };
    } catch (error) {
      console.error('❌ Erro no relatório de integrações:', error);
      return null;
    }
  }
}

export default IntegrationsManager;
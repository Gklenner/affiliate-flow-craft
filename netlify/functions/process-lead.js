/**
 * Netlify Function para Processamento de Leads
 * Integração serverless para AffiliateFlow Pro
 */

const https = require('https');

// Configurações (usar environment variables em produção)
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY || 'keyXXXXXXXXXXXXXX';
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || 'appXXXXXXXXXXXXXX';
const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID || 'service_affiliateflow';
const ZAPIER_WEBHOOK = process.env.ZAPIER_WEBHOOK || 'https://hooks.zapier.com/hooks/catch/XXXXXX/XXXXXX/';

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const leadData = JSON.parse(event.body);
    
    console.log('🚀 Processando lead:', leadData.email);

    // Validação básica
    if (!leadData.email || !leadData.nome) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Email e nome são obrigatórios',
          success: false 
        })
      };
    }

    // Processar lead em paralelo
    const results = await Promise.allSettled([
      saveToAirtable(leadData),
      sendToZapier(leadData),
      enrichLeadData(leadData)
    ]);

    // Verificar resultados
    const airtableResult = results[0];
    const zapierResult = results[1];
    const enrichResult = results[2];

    const response = {
      success: true,
      lead_id: leadData.email,
      timestamp: new Date().toISOString(),
      integrations: {
        airtable: airtableResult.status === 'fulfilled',
        zapier: zapierResult.status === 'fulfilled',
        enrichment: enrichResult.status === 'fulfilled'
      },
      enriched_data: enrichResult.status === 'fulfilled' ? enrichResult.value : null
    };

    // Log para debugging
    console.log('✅ Lead processado com sucesso:', response);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response)
    };

  } catch (error) {
    console.error('❌ Erro no processamento do lead:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Erro interno do servidor',
        success: false,
        timestamp: new Date().toISOString()
      })
    };
  }
};

// Salvar no Airtable
async function saveToAirtable(leadData) {
  const record = {
    fields: {
      'Email': leadData.email,
      'Nome': leadData.nome || '',
      'Nicho': leadData.nicho || 'geral',
      'Fonte': leadData.fonte || 'landing_page',
      'UTM Source': leadData.utm_source || '',
      'UTM Medium': leadData.utm_medium || '',
      'UTM Campaign': leadData.utm_campaign || '',
      'Step Atual': leadData.step_atual || 1,
      'Data Cadastro': new Date().toISOString(),
      'Status': 'Ativo',
      'IP': leadData.ip || '',
      'User Agent': leadData.user_agent || ''
    }
  };

  const options = {
    hostname: 'api.airtable.com',
    port: 443,
    path: `/v0/${AIRTABLE_BASE_ID}/Leads`,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json'
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          const result = JSON.parse(data);
          console.log('✅ Salvo no Airtable:', result.id);
          resolve(result);
        } else {
          console.error('❌ Erro Airtable:', res.statusCode, data);
          reject(new Error(`Airtable error: ${res.statusCode}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ Erro na requisição Airtable:', error);
      reject(error);
    });

    req.write(JSON.stringify(record));
    req.end();
  });
}

// Enviar para Zapier
async function sendToZapier(leadData) {
  const webhookData = {
    ...leadData,
    action: 'new_lead',
    timestamp: new Date().toISOString(),
    source: 'netlify_function'
  };

  const url = new URL(ZAPIER_WEBHOOK);
  
  const options = {
    hostname: url.hostname,
    port: 443,
    path: url.pathname + url.search,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log('✅ Enviado para Zapier');
          resolve({ success: true });
        } else {
          console.error('❌ Erro Zapier:', res.statusCode, data);
          reject(new Error(`Zapier error: ${res.statusCode}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ Erro na requisição Zapier:', error);
      reject(error);
    });

    req.write(JSON.stringify(webhookData));
    req.end();
  });
}

// Enriquecer dados do lead
async function enrichLeadData(leadData) {
  // Detectar nicho baseado no email
  const emailDomain = leadData.email.split('@')[1]?.toLowerCase() || '';
  
  const enrichedData = {
    email_domain: emailDomain,
    is_business_email: !['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com'].includes(emailDomain),
    detected_nicho: detectNicho(leadData.email, leadData),
    lead_score: calculateLeadScore(leadData),
    estimated_value: estimateLeadValue(leadData)
  };

  // Adicionar dados de geolocalização (se disponível)
  if (leadData.ip) {
    try {
      // Implementar geolocalização via API gratuita
      enrichedData.geo_data = await getGeoData(leadData.ip);
    } catch (error) {
      console.warn('Erro na geolocalização:', error);
    }
  }

  return enrichedData;
}

// Detectar nicho baseado em dados
function detectNicho(email, leadData) {
  const domain = email.split('@')[1]?.toLowerCase() || '';
  const { utm_campaign, utm_source } = leadData;

  // Detecção por UTM
  if (utm_campaign?.includes('tech') || utm_source?.includes('tech')) return 'tech';
  if (utm_campaign?.includes('financas') || utm_source?.includes('financas')) return 'financas';
  if (utm_campaign?.includes('business') || utm_source?.includes('business')) return 'business';
  if (utm_campaign?.includes('ia') || utm_source?.includes('ia')) return 'ia';
  if (utm_campaign?.includes('marketing') || utm_source?.includes('marketing')) return 'marketing';

  // Detecção por domínio
  const techDomains = ['tech', 'dev', 'software', 'digital'];
  const businessDomains = ['corp', 'ltda', 'sa', 'company', 'business'];
  const financeDomains = ['bank', 'finance', 'invest', 'capital'];

  if (techDomains.some(keyword => domain.includes(keyword))) return 'tech';
  if (businessDomains.some(keyword => domain.includes(keyword))) return 'business';
  if (financeDomains.some(keyword => domain.includes(keyword))) return 'financas';

  return 'geral';
}

// Calcular score do lead
function calculateLeadScore(leadData) {
  let score = 50; // Base score

  // Email corporativo (+20)
  const domain = leadData.email.split('@')[1]?.toLowerCase() || '';
  if (!['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com'].includes(domain)) {
    score += 20;
  }

  // Nome completo (+10)
  if (leadData.nome && leadData.nome.split(' ').length >= 2) {
    score += 10;
  }

  // UTM tracking (+15)
  if (leadData.utm_source || leadData.utm_campaign) {
    score += 15;
  }

  // Nicho específico (+5)
  if (leadData.nicho && leadData.nicho !== 'geral') {
    score += 5;
  }

  return Math.min(score, 100);
}

// Estimar valor do lead
function estimateLeadValue(leadData) {
  const baseValue = 50; // R$ 50 base
  const nichoMultipliers = {
    'tech': 2.5,
    'business': 2.0,
    'financas': 1.8,
    'ia': 2.2,
    'marketing': 1.5,
    'geral': 1.0
  };

  const multiplier = nichoMultipliers[leadData.nicho] || 1.0;
  const leadScore = calculateLeadScore(leadData);
  
  return Math.round(baseValue * multiplier * (leadScore / 100));
}

// Obter dados de geolocalização (implementação básica)
async function getGeoData(ip) {
  // Implementar com serviço gratuito como ipapi.co
  return new Promise((resolve) => {
    // Placeholder - implementar API real
    resolve({
      country: 'BR',
      region: 'SP',
      city: 'São Paulo',
      timezone: 'America/Sao_Paulo'
    });
  });
}
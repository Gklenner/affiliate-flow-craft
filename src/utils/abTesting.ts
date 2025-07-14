/**
 * Sistema CRO com Testes A/B Automáticos
 * Otimização de conversão baseada em dados
 */

export type VariantType = 'headline' | 'cta' | 'form' | 'design' | 'copy';
export type NichoAudiencia = 'tech' | 'financas' | 'business' | 'ia' | 'marketing' | 'geral';

export interface Variant {
  id: string;
  type: VariantType;
  name: string;
  content: any;
  weight: number; // Peso para distribuição de tráfego
  nicho?: NichoAudiencia;
}

export interface TestResult {
  variant_id: string;
  conversions: number;
  views: number;
  conversion_rate: number;
  confidence: number;
  is_winner: boolean;
}

export interface ABTest {
  id: string;
  name: string;
  type: VariantType;
  status: 'running' | 'completed' | 'paused';
  variants: Variant[];
  results: TestResult[];
  start_date: string;
  end_date?: string;
  min_sample_size: number;
  confidence_threshold: number;
}

class ABTestingManager {
  private static instance: ABTestingManager;
  private activeTests: Map<string, ABTest> = new Map();
  private userVariants: Map<string, string> = new Map(); // userId -> variantId

  public static getInstance(): ABTestingManager {
    if (!ABTestingManager.instance) {
      ABTestingManager.instance = new ABTestingManager();
    }
    return ABTestingManager.instance;
  }

  // Inicialização com testes pré-configurados
  public initialize() {
    this.setupDefaultTests();
    this.loadFromStorage();
    console.log('✅ Sistema A/B Testing inicializado');
  }

  // Configuração de testes padrão para AffiliateFlow Pro
  private setupDefaultTests() {
    // Teste de Headlines
    this.createTest({
      id: 'headline-test-1',
      name: 'Headlines Principais',
      type: 'headline',
      status: 'running',
      variants: [
        {
          id: 'headline-a',
          type: 'headline',
          name: 'Renda Recorrente (Original)',
          content: {
            title: 'Renda Recorrente Indicando IA para Empresas',
            subtitle: 'De R$ 15.000/mês até R$ 55.000/mês (Plano Enterprise)'
          },
          weight: 50
        },
        {
          id: 'headline-b',
          type: 'headline',
          name: 'Faturamento Alto (Variante)',
          content: {
            title: 'Fature R$ 55k/mês Indicando IA para Empresas',
            subtitle: 'Sistema GRIP: Renda Recorrente Garantida para Indicadores'
          },
          weight: 50
        }
      ],
      results: [],
      start_date: new Date().toISOString(),
      min_sample_size: 100,
      confidence_threshold: 95
    });

    // Teste de CTAs
    this.createTest({
      id: 'cta-test-1',
      name: 'Botões de Ação Principal',
      type: 'cta',
      status: 'running',
      variants: [
        {
          id: 'cta-a',
          type: 'cta',
          name: 'Indicar IA (Original)',
          content: {
            text: 'INDICAR IA PARA EMPRESAS',
            icon: '🤖',
            color: 'gradient-primary'
          },
          weight: 33
        },
        {
          id: 'cta-b',
          type: 'cta',
          name: 'Começar Agora (Urgência)',
          content: {
            text: 'COMEÇAR A FATURAR AGORA',
            icon: '🚀',
            color: 'gradient-secondary'
          },
          weight: 33
        },
        {
          id: 'cta-c',
          type: 'cta',
          name: 'Acesso Gratuito (Benefício)',
          content: {
            text: 'ACESSO GRATUITO AO SISTEMA',
            icon: '🎁',
            color: 'bg-lp-green'
          },
          weight: 34
        }
      ],
      results: [],
      start_date: new Date().toISOString(),
      min_sample_size: 150,
      confidence_threshold: 95
    });

    // Teste de Copy por Nicho
    this.createTest({
      id: 'copy-nicho-test-1',
      name: 'Copy Personalizado por Nicho',
      type: 'copy',
      status: 'running',
      variants: [
        {
          id: 'copy-tech',
          type: 'copy',
          name: 'Tech Focus',
          content: {
            headline: 'Desenvolvedores: Monetize seu Conhecimento em IA',
            description: 'APIs, integrações e soluções técnicas que empresas pagam R$ 50k+',
            cta: 'Ver Demonstração Técnica'
          },
          weight: 20,
          nicho: 'tech'
        },
        {
          id: 'copy-financas',
          type: 'copy',
          name: 'Finanças Focus',
          content: {
            headline: 'ROI de 300% Indicando IA para Empresas',
            description: 'Modelo de negócio recorrente com margem de 95%',
            cta: 'Calcular Meu ROI'
          },
          weight: 20,
          nicho: 'financas'
        },
        {
          id: 'copy-business',
          type: 'copy',
          name: 'Business Focus',
          content: {
            headline: 'Empresas Pagam R$ 5k+/mês por Soluções de IA',
            description: 'Posicione-se no mercado B2B mais rentável de 2024',
            cta: 'Acessar Oportunidades'
          },
          weight: 20,
          nicho: 'business'
        },
        {
          id: 'copy-ia',
          type: 'copy',
          name: 'IA Focus',
          content: {
            headline: 'Especialistas em IA: Mercado de R$ 50 Bilhões',
            description: 'Como monetizar expertise técnica em IA empresarial',
            cta: 'Explorar Mercado'
          },
          weight: 20,
          nicho: 'ia'
        },
        {
          id: 'copy-geral',
          type: 'copy',
          name: 'Geral',
          content: {
            headline: 'Renda Recorrente Indicando IA para Empresas',
            description: 'De R$ 15k a R$ 55k mensais sem investimento inicial',
            cta: 'Começar Agora'
          },
          weight: 20,
          nicho: 'geral'
        }
      ],
      results: [],
      start_date: new Date().toISOString(),
      min_sample_size: 200,
      confidence_threshold: 90
    });
  }

  // Criação de novo teste
  public createTest(test: ABTest): void {
    this.activeTests.set(test.id, test);
    this.saveToStorage();
  }

  // Obter variante para usuário
  public getVariantForUser(testId: string, userId: string, nicho?: NichoAudiencia): Variant | null {
    const test = this.activeTests.get(testId);
    if (!test || test.status !== 'running') return null;

    // Verifica se usuário já tem variante atribuída
    const existingVariant = this.userVariants.get(`${userId}-${testId}`);
    if (existingVariant) {
      return test.variants.find(v => v.id === existingVariant) || null;
    }

    // Filtra variantes por nicho se aplicável
    let availableVariants = test.variants;
    if (nicho && test.type === 'copy') {
      const nichoVariants = test.variants.filter(v => v.nicho === nicho);
      if (nichoVariants.length > 0) {
        availableVariants = nichoVariants;
      }
    }

    // Seleção baseada em peso
    const totalWeight = availableVariants.reduce((sum, v) => sum + v.weight, 0);
    const random = Math.random() * totalWeight;
    
    let currentWeight = 0;
    for (const variant of availableVariants) {
      currentWeight += variant.weight;
      if (random <= currentWeight) {
        // Atribui variante ao usuário
        this.userVariants.set(`${userId}-${testId}`, variant.id);
        this.saveToStorage();
        
        // Registra visualização
        this.trackView(testId, variant.id);
        
        return variant;
      }
    }

    return availableVariants[0] || null;
  }

  // Registrar visualização
  public trackView(testId: string, variantId: string): void {
    const test = this.activeTests.get(testId);
    if (!test) return;

    let result = test.results.find(r => r.variant_id === variantId);
    if (!result) {
      result = {
        variant_id: variantId,
        conversions: 0,
        views: 0,
        conversion_rate: 0,
        confidence: 0,
        is_winner: false
      };
      test.results.push(result);
    }

    result.views++;
    this.updateConversionRate(result);
    this.saveToStorage();
  }

  // Registrar conversão
  public trackConversion(testId: string, variantId: string): void {
    const test = this.activeTests.get(testId);
    if (!test) return;

    let result = test.results.find(r => r.variant_id === variantId);
    if (!result) return;

    result.conversions++;
    this.updateConversionRate(result);
    
    // Verifica se teste atingiu significância estatística
    this.checkStatisticalSignificance(testId);
    
    this.saveToStorage();
  }

  // Atualizar taxa de conversão
  private updateConversionRate(result: TestResult): void {
    result.conversion_rate = result.views > 0 ? (result.conversions / result.views) * 100 : 0;
  }

  // Verificar significância estatística
  private checkStatisticalSignificance(testId: string): void {
    const test = this.activeTests.get(testId);
    if (!test || test.results.length < 2) return;

    // Ordena resultados por taxa de conversão
    const sortedResults = [...test.results].sort((a, b) => b.conversion_rate - a.conversion_rate);
    const winner = sortedResults[0];
    const runner_up = sortedResults[1];

    // Verifica tamanho mínimo da amostra
    const totalViews = test.results.reduce((sum, r) => sum + r.views, 0);
    if (totalViews < test.min_sample_size) return;

    // Cálculo simplificado de significância (Z-test)
    const p1 = winner.conversion_rate / 100;
    const p2 = runner_up.conversion_rate / 100;
    const n1 = winner.views;
    const n2 = runner_up.views;

    if (n1 === 0 || n2 === 0) return;

    const pooled_p = (winner.conversions + runner_up.conversions) / (n1 + n2);
    const se = Math.sqrt(pooled_p * (1 - pooled_p) * (1/n1 + 1/n2));
    const z = Math.abs(p1 - p2) / se;
    
    // Z-score para 95% de confiança ≈ 1.96
    const confidence = (1 - 2 * (1 - this.normalCDF(Math.abs(z)))) * 100;
    
    winner.confidence = confidence;
    
    if (confidence >= test.confidence_threshold) {
      winner.is_winner = true;
      test.status = 'completed';
      test.end_date = new Date().toISOString();
      
      console.log(`🏆 Teste ${testId} concluído! Vencedor: ${winner.variant_id} (${confidence.toFixed(1)}% confiança)`);
    }
  }

  // Função de distribuição cumulativa normal (aproximação)
  private normalCDF(x: number): number {
    return 0.5 * (1 + this.erf(x / Math.sqrt(2)));
  }

  // Função erro (aproximação)
  private erf(x: number): number {
    const a1 =  0.254829592;
    const a2 = -0.284496736;
    const a3 =  1.421413741;
    const a4 = -1.453152027;
    const a5 =  1.061405429;
    const p  =  0.3275911;

    const sign = x >= 0 ? 1 : -1;
    x = Math.abs(x);

    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

    return sign * y;
  }

  // Obter resultados de teste
  public getTestResults(testId: string): ABTest | null {
    return this.activeTests.get(testId) || null;
  }

  // Obter todos os testes ativos
  public getActiveTests(): ABTest[] {
    return Array.from(this.activeTests.values()).filter(test => test.status === 'running');
  }

  // Pausar teste
  public pauseTest(testId: string): void {
    const test = this.activeTests.get(testId);
    if (test) {
      test.status = 'paused';
      this.saveToStorage();
    }
  }

  // Retomar teste
  public resumeTest(testId: string): void {
    const test = this.activeTests.get(testId);
    if (test) {
      test.status = 'running';
      this.saveToStorage();
    }
  }

  // Finalizar teste manualmente
  public completeTest(testId: string, winnerVariantId: string): void {
    const test = this.activeTests.get(testId);
    if (test) {
      test.status = 'completed';
      test.end_date = new Date().toISOString();
      
      // Marca vencedor
      test.results.forEach(result => {
        result.is_winner = result.variant_id === winnerVariantId;
      });
      
      this.saveToStorage();
    }
  }

  // Salvar no localStorage
  private saveToStorage(): void {
    try {
      localStorage.setItem('ab_tests', JSON.stringify(Array.from(this.activeTests.entries())));
      localStorage.setItem('user_variants', JSON.stringify(Array.from(this.userVariants.entries())));
    } catch (error) {
      console.error('Erro ao salvar testes A/B:', error);
    }
  }

  // Carregar do localStorage
  private loadFromStorage(): void {
    try {
      const testsData = localStorage.getItem('ab_tests');
      if (testsData) {
        const tests = JSON.parse(testsData);
        this.activeTests = new Map(tests);
      }

      const variantsData = localStorage.getItem('user_variants');
      if (variantsData) {
        const variants = JSON.parse(variantsData);
        this.userVariants = new Map(variants);
      }
    } catch (error) {
      console.error('Erro ao carregar testes A/B:', error);
    }
  }

  // Limpar dados (para desenvolvimento)
  public clearData(): void {
    this.activeTests.clear();
    this.userVariants.clear();
    localStorage.removeItem('ab_tests');
    localStorage.removeItem('user_variants');
    this.setupDefaultTests();
  }

  // Obter estatísticas resumidas
  public getTestSummary(): any {
    const tests = Array.from(this.activeTests.values());
    const running = tests.filter(t => t.status === 'running').length;
    const completed = tests.filter(t => t.status === 'completed').length;
    const paused = tests.filter(t => t.status === 'paused').length;

    const totalViews = tests.reduce((sum, test) => 
      sum + test.results.reduce((testSum, result) => testSum + result.views, 0), 0
    );

    const totalConversions = tests.reduce((sum, test) => 
      sum + test.results.reduce((testSum, result) => testSum + result.conversions, 0), 0
    );

    const overallConversionRate = totalViews > 0 ? (totalConversions / totalViews) * 100 : 0;

    return {
      total_tests: tests.length,
      running,
      completed,
      paused,
      total_views: totalViews,
      total_conversions: totalConversions,
      overall_conversion_rate: overallConversionRate.toFixed(2)
    };
  }
}

export default ABTestingManager;
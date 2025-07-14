/**
 * Hook personalizado para Testes A/B
 * Integração com React para otimização de conversão
 */

import { useState, useEffect } from 'react';
import ABTestingManager, { Variant, ABTest } from '../utils/abTesting';
import { NichoAudiencia } from '../utils/emailMarketing';

interface UseABTestingReturn {
  variant: Variant | null;
  isLoading: boolean;
  trackConversion: () => void;
  testResults: ABTest | null;
}

export const useABTesting = (
  testId: string,
  userId: string,
  nicho?: NichoAudiencia
): UseABTestingReturn => {
  const [variant, setVariant] = useState<Variant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [testResults, setTestResults] = useState<ABTest | null>(null);

  const abTestingManager = ABTestingManager.getInstance();

  useEffect(() => {
    const loadVariant = async () => {
      try {
        setIsLoading(true);
        
        // Obter variante para o usuário
        const userVariant = abTestingManager.getVariantForUser(testId, userId, nicho);
        setVariant(userVariant);
        
        // Obter resultados do teste
        const results = abTestingManager.getTestResults(testId);
        setTestResults(results);
        
      } catch (error) {
        console.error('Erro ao carregar variante A/B:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadVariant();
  }, [testId, userId, nicho]);

  const trackConversion = () => {
    if (variant) {
      abTestingManager.trackConversion(testId, variant.id);
      
      // Atualizar resultados após conversão
      const updatedResults = abTestingManager.getTestResults(testId);
      setTestResults(updatedResults);
    }
  };

  return {
    variant,
    isLoading,
    trackConversion,
    testResults
  };
};

// Hook para múltiplos testes A/B
export const useMultipleABTests = (
  tests: Array<{ testId: string; userId: string; nicho?: NichoAudiencia }>
) => {
  const [variants, setVariants] = useState<Record<string, Variant | null>>({});
  const [isLoading, setIsLoading] = useState(true);

  const abTestingManager = ABTestingManager.getInstance();

  useEffect(() => {
    const loadVariants = async () => {
      try {
        setIsLoading(true);
        const newVariants: Record<string, Variant | null> = {};

        for (const test of tests) {
          const variant = abTestingManager.getVariantForUser(
            test.testId,
            test.userId,
            test.nicho
          );
          newVariants[test.testId] = variant;
        }

        setVariants(newVariants);
      } catch (error) {
        console.error('Erro ao carregar variantes A/B:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadVariants();
  }, [tests]);

  const trackConversion = (testId: string) => {
    const variant = variants[testId];
    if (variant) {
      abTestingManager.trackConversion(testId, variant.id);
    }
  };

  return {
    variants,
    isLoading,
    trackConversion
  };
};

// Hook para estatísticas de testes
export const useABTestingStats = () => {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const abTestingManager = ABTestingManager.getInstance();

  useEffect(() => {
    const loadStats = () => {
      try {
        setIsLoading(true);
        const summary = abTestingManager.getTestSummary();
        const activeTests = abTestingManager.getActiveTests();
        
        setStats({
          summary,
          activeTests,
          lastUpdated: new Date().toISOString()
        });
      } catch (error) {
        console.error('Erro ao carregar estatísticas A/B:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
    
    // Atualizar a cada 30 segundos
    const interval = setInterval(loadStats, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    stats,
    isLoading,
    refresh: () => {
      const summary = abTestingManager.getTestSummary();
      const activeTests = abTestingManager.getActiveTests();
      setStats({
        summary,
        activeTests,
        lastUpdated: new Date().toISOString()
      });
    }
  };
};
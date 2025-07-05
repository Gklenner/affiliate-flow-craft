
import { UserProgress, StepState, StepStatus } from '../types/landing';

/**
 * Singleton para gerenciar estado da landing page
 * Otimizado para performance de memória
 */
class LandingStateManager {
  private static instance: LandingStateManager;
  private progress: UserProgress;
  private steps: StepState[];
  private listeners: Set<(progress: UserProgress) => void>;

  private constructor() {
    this.listeners = new Set();
    this.initializeState();
  }

  public static getInstance(): LandingStateManager {
    if (!LandingStateManager.instance) {
      LandingStateManager.instance = new LandingStateManager();
    }
    return LandingStateManager.instance;
  }

  private initializeState(): void {
    // Recupera estado do localStorage ou inicializa
    const savedProgress = localStorage.getItem('landing_progress');
    
    this.progress = savedProgress 
      ? JSON.parse(savedProgress)
      : {
          currentStep: 0,
          completedSteps: [],
          affiliateLink: '',
          isVerified: false
        };

    this.steps = [
      { id: 0, completed: false, active: true, title: 'Início', description: 'Clique para começar' },
      { id: 1, completed: false, active: false, title: 'Link Gerado', description: 'Seu link foi criado' },
      { id: 2, completed: false, active: false, title: 'App Baixado', description: 'Download realizado' },
      { id: 3, completed: false, active: false, title: 'Acesso Verificado', description: 'Conta validada' },
      { id: 4, completed: false, active: false, title: 'Material Liberado', description: 'Pronto para faturar!' }
    ];

    this.updateStepsState();
  }

  private updateStepsState(): void {
    const { currentStep, completedSteps } = this.progress;
    
    this.steps.forEach(step => {
      step.completed = completedSteps.includes(step.id);
      step.active = step.id === currentStep;
    });
  }

  private saveProgress(): void {
    localStorage.setItem('landing_progress', JSON.stringify(this.progress));
    this.notifyListeners();
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.progress));
  }

  public subscribe(listener: (progress: UserProgress) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  public getProgress(): UserProgress {
    return { ...this.progress };
  }

  public getSteps(): StepState[] {
    return [...this.steps];
  }

  public completeStep(stepId: number): void {
    if (!this.progress.completedSteps.includes(stepId)) {
      this.progress.completedSteps.push(stepId);
    }
    
    this.progress.currentStep = Math.min(stepId + 1, 4);
    this.updateStepsState();
    this.saveProgress();
  }

  public setAffiliateLink(link: string): void {
    this.progress.affiliateLink = link;
    this.saveProgress();
  }

  public setEmail(email: string): void {
    this.progress.email = email;
    this.saveProgress();
  }

  public setVerified(verified: boolean): void {
    this.progress.isVerified = verified;
    this.saveProgress();
  }

  public reset(): void {
    localStorage.removeItem('landing_progress');
    this.initializeState();
    this.notifyListeners();
  }
}

export default LandingStateManager;

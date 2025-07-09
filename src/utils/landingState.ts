import { UserProgress, StepState, StepStatus } from '../types/landing';

/**
 * Singleton para gerenciar estado da landing page IA Empresarial
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
    const savedProgress = localStorage.getItem('grip_ia_progress');
    
    this.progress = savedProgress 
      ? JSON.parse(savedProgress)
      : {
          currentStep: 0,
          completedSteps: [],
          affiliateLink: '',
          isVerified: false
        };

    this.steps = [
      { id: 0, completed: false, active: true, title: 'Acesso ao GRIP', description: 'Sistema IA para empresas' },
      { id: 1, completed: false, active: false, title: 'GRIP Ativado', description: 'Plataforma IA liberada' },
      { id: 2, completed: false, active: false, title: 'App Instalado', description: 'Sistema empresarial acessível' },
      { id: 3, completed: false, active: false, title: 'Verificação Completa', description: 'Materiais IA liberados' },
      { id: 4, completed: false, active: false, title: 'Renda Recorrente', description: 'Indicando IA para empresas!' }
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
    localStorage.setItem('grip_ia_progress', JSON.stringify(this.progress));
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
    
    // Avança para próxima etapa automaticamente
    this.progress.currentStep = Math.min(stepId + 1, this.steps.length - 1);
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
    localStorage.removeItem('grip_ia_progress');
    this.initializeState();
    this.notifyListeners();
  }
}

export default LandingStateManager;
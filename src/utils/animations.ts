
/**
 * Classe para gerenciar animações e transições
 * Otimizada para performance e reutilização
 */
export class AnimationManager {
  private static readonly ANIMATION_CLASSES = {
    slideUp: 'animate-slide-up',
    fadeScale: 'animate-fade-scale',
    pulse: 'animate-pulse-slow',
    bounce: 'animate-bounce-slow'
  } as const;

  public static async simulateLoading(
    element: HTMLElement,
    loadingText: string,
    duration: number = 2000
  ): Promise<void> {
    return new Promise((resolve) => {
      element.textContent = loadingText;
      element.classList.add(this.ANIMATION_CLASSES.pulse);
      
      setTimeout(() => {
        element.classList.remove(this.ANIMATION_CLASSES.pulse);
        resolve();
      }, duration);
    });
  }

  public static addSlideUpAnimation(element: HTMLElement): void {
    element.classList.add(this.ANIMATION_CLASSES.slideUp);
  }

  public static addFadeScaleAnimation(element: HTMLElement): void {
    element.classList.add(this.ANIMATION_CLASSES.fadeScale);
  }

  public static addBounceAnimation(element: HTMLElement): void {
    element.classList.add(this.ANIMATION_CLASSES.bounce);
  }

  public static removeBounceAnimation(element: HTMLElement): void {
    element.classList.remove(this.ANIMATION_CLASSES.bounce);
  }
}

/**
 * Utilitários para feedback visual
 */
export class FeedbackUtils {
  public static async copyToClipboard(text: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.error('Erro ao copiar para clipboard:', error);
      return false;
    }
  }

  public static showSuccessMessage(element: HTMLElement, message: string): void {
    const originalContent = element.innerHTML;
    element.innerHTML = `✅ ${message}`;
    element.classList.add('bg-lp-success', 'text-white');
    
    setTimeout(() => {
      element.innerHTML = originalContent;
      element.classList.remove('bg-lp-success', 'text-white');
    }, 3000);
  }

  public static generateAffiliateLink(): string {
    const baseUrl = 'https://app.exemplo.com/ref/';
    const userId = Math.random().toString(36).substring(2, 15);
    return `${baseUrl}${userId}`;
  }
}

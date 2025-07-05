
export interface StepState {
  id: number;
  completed: boolean;
  active: boolean;
  title: string;
  description: string;
}

export interface UserProgress {
  currentStep: number;
  completedSteps: number[];
  affiliateLink: string;
  email?: string;
  isVerified: boolean;
}

export interface AppDownloadLinks {
  android: string;
  ios: string;
}

export enum StepStatus {
  PENDING = 'pending',
  LOADING = 'loading',
  COMPLETED = 'completed',
  ERROR = 'error'
}

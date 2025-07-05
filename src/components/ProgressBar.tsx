
import React from 'react';
import { StepState } from '../types/landing';
import { CheckCircle, Circle, Clock } from 'lucide-react';

interface ProgressBarProps {
  steps: StepState[];
  currentStep: number;
  completedSteps: number[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ steps, currentStep, completedSteps }) => {
  const progressPercentage = (completedSteps.length / (steps.length - 1)) * 100;

  return (
    <div className="w-full max-w-6xl mx-auto mb-16 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="glass-dark rounded-2xl px-6 py-3">
          <span className="text-lg font-semibold text-lp-light">
            Etapa {currentStep} de {steps.length - 1}
          </span>
        </div>
        <div className="glass-dark rounded-2xl px-6 py-3">
          <span className="text-lg font-semibold gradient-text-secondary">
            {Math.round(progressPercentage)}% Concluído
          </span>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="relative mb-12">
        <div className="w-full h-3 bg-lp-gray/30 rounded-full overflow-hidden">
          <div 
            className="h-full gradient-secondary rounded-full transition-all duration-1000 ease-out shadow-glow-orange"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        {/* Progress Indicator */}
        <div 
          className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 gradient-secondary rounded-full shadow-glow-orange transition-all duration-1000 ease-out"
          style={{ left: `calc(${progressPercentage}% - 12px)` }}
        >
          <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.slice(1).map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isActive = step.active;
          const stepNumber = index + 1;
          
          return (
            <div
              key={step.id}
              className={`
                relative group glass-dark rounded-2xl p-6 transition-all duration-500
                ${isCompleted 
                  ? 'bg-gradient-to-br from-lp-green/20 to-lp-green/10 border-lp-green/30 shadow-glow' 
                  : isActive 
                    ? 'bg-gradient-to-br from-lp-blue/20 to-lp-purple/10 border-lp-blue/30 shadow-glow animate-pulse-glow'
                    : 'hover:bg-white/5'
                }
              `}
            >
              {/* Step Number/Icon */}
              <div className="flex items-center gap-4 mb-4">
                <div className={`
                  w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg
                  ${isCompleted 
                    ? 'bg-lp-green text-white' 
                    : isActive 
                      ? 'gradient-primary text-white'
                      : 'bg-lp-gray text-lp-light/60'
                  }
                `}>
                  {isCompleted ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : isActive ? (
                    <Clock className="w-6 h-6 animate-spin" />
                  ) : (
                    <Circle className="w-6 h-6" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className={`
                    font-bold text-lg mb-1
                    ${isCompleted 
                      ? 'text-lp-green' 
                      : isActive 
                        ? 'gradient-text-primary'
                        : 'text-lp-light/60'
                    }
                  `}>
                    {step.title}
                  </div>
                  <div className={`
                    text-sm leading-relaxed
                    ${isCompleted 
                      ? 'text-lp-light/90' 
                      : isActive 
                        ? 'text-lp-light/80'
                        : 'text-lp-light/50'
                    }
                  `}>
                    {step.description}
                  </div>
                </div>
              </div>

              {/* Completion Badge */}
              {isCompleted && (
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-lp-green rounded-full flex items-center justify-center shadow-lg animate-scale-in">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
              )}

              {/* Active Indicator */}
              {isActive && !isCompleted && (
                <div className="absolute inset-0 rounded-2xl border-2 border-lp-blue/50 pointer-events-none animate-pulse"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Completion Message */}
      {progressPercentage === 100 && (
        <div className="mt-12 text-center animate-fade-in-up">
          <div className="glass-dark rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="w-16 h-16 gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold gradient-text-secondary mb-3">
              🎉 Parabéns! Todas as etapas concluídas!
            </h3>
            <p className="text-lp-light/80">
              Você está oficialmente pronto para começar a faturar como afiliado premium!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;

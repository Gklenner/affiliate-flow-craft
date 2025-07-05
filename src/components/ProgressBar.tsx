
import React from 'react';
import { StepState } from '../types/landing';

interface ProgressBarProps {
  steps: StepState[];
  currentStep: number;
  completedSteps: number[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ steps, currentStep, completedSteps }) => {
  const progressPercentage = (completedSteps.length / (steps.length - 1)) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-lp-light">
          Etapa {currentStep} de {steps.length - 1}
        </span>
        <span className="text-sm font-medium text-lp-light">
          {Math.round(progressPercentage)}% Concluído
        </span>
      </div>
      
      <div className="w-full bg-white/20 rounded-full h-3 mb-6">
        <div 
          className="bg-gradient-to-r from-orange-500 to-green-500 h-3 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {steps.slice(1).map((step) => (
          <div
            key={step.id}
            className={`
              p-3 rounded-lg text-center transition-all duration-300
              ${completedSteps.includes(step.id) 
                ? 'bg-lp-success text-white' 
                : step.active 
                  ? 'bg-lp-cta text-white animate-pulse-slow'
                  : 'bg-white/10 text-white/60'
              }
            `}
          >
            <div className="text-xs font-medium mb-1">{step.title}</div>
            <div className="text-xs opacity-80">{step.description}</div>
            {completedSteps.includes(step.id) && (
              <div className="mt-1">✅</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;

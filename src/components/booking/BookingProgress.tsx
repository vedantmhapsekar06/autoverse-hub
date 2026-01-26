import { Check } from 'lucide-react';

interface BookingProgressProps {
  currentStep: number;
  steps: string[];
}

export const BookingProgress = ({ currentStep, steps }: BookingProgressProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step} className="flex flex-1 items-center">
            <div className="progress-step">
              <div
                className={`step-circle ${
                  index < currentStep
                    ? 'completed'
                    : index === currentStep
                    ? 'active'
                    : 'pending'
                }`}
              >
                {index < currentStep ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span
                className={`hidden text-sm font-medium sm:block ${
                  index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`mx-2 h-0.5 flex-1 rounded ${
                  index < currentStep ? 'bg-success' : 'bg-border'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

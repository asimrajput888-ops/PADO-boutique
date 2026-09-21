// components/customizer/StepIndicator.tsx

"use client";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const stepLabels = ["Fabric", "Style", "Details", "Fit", "Measurements", "Preview"];

  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div key={i} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                  currentStep > i + 1
                    ? "bg-amber-600 text-white"
                    : currentStep === i + 1
                    ? "bg-neutral-900 text-white ring-4 ring-amber-200"
                    : "bg-neutral-200 text-neutral-500"
                }`}
              >
                {currentStep > i + 1 ? "✓" : i + 1}
              </div>
              <span
                className={`mt-2 text-[10px] uppercase tracking-widest transition-colors hidden md:block ${
                  currentStep === i + 1 ? "text-neutral-900 font-semibold" : "text-neutral-400"
                }`}
              >
                {stepLabels[i]}
              </span>
            </div>
            {i < totalSteps - 1 && (
              <div
                className={`flex-1 h-[2px] mx-2 transition-colors duration-500 ${
                  currentStep > i + 1 ? "bg-amber-600" : "bg-neutral-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

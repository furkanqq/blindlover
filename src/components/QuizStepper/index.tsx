import React from 'react';

type QuizStepperProps = {
  currentQuestion: number; // Şu anda hangi sorudasın (1-50)
  totalQuestions: number; // Toplam soru sayısı (50)
  steps: number; // Kaç parçaya bölmek istiyorsun (5)
};

const QuizStepper: React.FC<QuizStepperProps> = ({ currentQuestion, totalQuestions, steps }) => {
  const stepSize = totalQuestions / steps; // Her bir stepte kaç soru var
  const currentStep = Math.ceil(currentQuestion / stepSize); // Hangi steptesin
  const progressInStep = ((currentQuestion % stepSize) / stepSize) * 100 || 0; // Mevcut stepteki ilerleme

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="w-full flex justify-between items-center gap-2">
        {Array.from({ length: steps }, (_, i) => (
          <div key={i} className="flex-1 flex flex-col items-center">
            <div
              className={`h-2 w-full rounded ${
                i + 1 <= currentStep ? 'bg-primaryDisabled/60' : 'bg-gray-300'
              } relative overflow-hidden`}
            >
              {i + 1 === currentStep && (
                <div
                  className="absolute top-0 left-0 h-full bg-primaryColor transition-all"
                  style={{ width: `${progressInStep}%` }}
                />
              )}
            </div>
            <span className={`w-28 text-xs mt-2 ${i + 1 <= currentStep ? 'text-blue-600' : 'text-gray-500'}`}></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizStepper;

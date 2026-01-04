import React, { useState } from 'react';
import { StudentProfile } from '../types';

interface OnboardingQuizProps {
  onComplete: (data: Partial<StudentProfile>) => void;
  initialName: string;
}

const OnboardingQuiz: React.FC<OnboardingQuizProps> = ({ onComplete, initialName }) => {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<Partial<StudentProfile>>({});

  const handleSelect = (key: keyof StudentProfile, value: any) => {
    // Haptic feedback
    if (navigator.vibrate) navigator.vibrate(50);
    
    setSelections(prev => ({ ...prev, [key]: value }));
    setTimeout(() => {
      if (step < questions.length - 1) {
        setStep(step + 1);
      } else {
        onComplete({ ...selections, [key]: value });
      }
    }, 300);
  };

  const questions = [
    {
      title: `Hi ${initialName}! 👋`,
      subtitle: "Let's personalize your learning experience. How do you prefer to learn?",
      key: 'learningStyle' as keyof StudentProfile,
      options: [
        { label: 'Watching Videos', icon: '🎬', value: 'VISUAL', color: 'bg-blue-100 border-blue-200 text-blue-700' },
        { label: 'Reading Notes', icon: '📖', value: 'READING', color: 'bg-emerald-100 border-emerald-200 text-emerald-700' },
        { label: 'Listening to Audio', icon: '🎧', value: 'AUDITORY', color: 'bg-purple-100 border-purple-200 text-purple-700' },
        { label: 'Doing Quizzes', icon: '🧩', value: 'INTERACTIVE', color: 'bg-orange-100 border-orange-200 text-orange-700' },
      ]
    },
    {
      title: "What is your main goal right now?",
      subtitle: "We'll help you get there!",
      key: 'primaryGoal' as keyof StudentProfile,
      options: [
        { label: 'Ace My Exams', icon: '🏆', value: 'Toppers', color: 'bg-yellow-100 border-yellow-200 text-yellow-700' },
        { label: 'Understand Concepts', icon: '🧠', value: 'Understanding', color: 'bg-indigo-100 border-indigo-200 text-indigo-700' },
        { label: 'Finish Homework', icon: '⚡', value: 'Homework', color: 'bg-pink-100 border-pink-200 text-pink-700' },
        { label: 'Learn New Things', icon: '🚀', value: 'Curiosity', color: 'bg-cyan-100 border-cyan-200 text-cyan-700' },
      ]
    },
    {
      title: "How fast do you want to go?",
      subtitle: "No pressure, you can change this later.",
      key: 'learningPace' as keyof StudentProfile,
      options: [
        { label: 'Take it Slow', icon: '🐢', value: 'SLOW', color: 'bg-green-100 border-green-200 text-green-700' },
        { label: 'Steady Pace', icon: '🚶', value: 'MEDIUM', color: 'bg-blue-100 border-blue-200 text-blue-700' },
        { label: 'Fast Track', icon: '🐆', value: 'FAST', color: 'bg-red-100 border-red-200 text-red-700' },
      ]
    }
  ];

  const currentQ = questions[step];

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="flex gap-2 mb-8 justify-center">
          {questions.map((_, i) => (
            <div 
              key={i} 
              className={`h-2 rounded-full transition-all duration-500 ${i <= step ? 'w-8 bg-indigo-600' : 'w-2 bg-slate-200'}`}
            />
          ))}
        </div>

        <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200 text-center animate-fadeIn">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">{currentQ.title}</h2>
          <p className="text-slate-500 mb-8 text-lg">{currentQ.subtitle}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentQ.options.map((opt) => (
              <button
                key={opt.label}
                onClick={() => handleSelect(currentQ.key, opt.value)}
                className={`
                  p-6 rounded-2xl border-2 text-left transition-all duration-200
                  hover:scale-105 active:scale-95 flex items-center gap-4
                  ${opt.color} hover:shadow-lg
                `}
              >
                <span className="text-3xl">{opt.icon}</span>
                <span className="font-bold text-lg">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default OnboardingQuiz;
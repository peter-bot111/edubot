import React from 'react';
import { StudentProfile, ToolId } from '../types';

interface SmartSuggestionsProps {
  profile: StudentProfile;
  onSelectTool: (id: ToolId) => void;
}

const SmartSuggestions: React.FC<SmartSuggestionsProps> = ({ profile, onSelectTool }) => {
  // Logic to determine suggestion based on profile
  const getSuggestion = () => {
    if (profile.learningStyle === 'VISUAL') {
      return {
        title: "Visualize Your Success",
        message: `Since you love visual learning, try creating a diagram for ${profile.weakSubjects[0] || 'Physics'}.`,
        tool: ToolId.VISUAL_DIAGRAMS,
        icon: '🎨',
        color: 'from-purple-500 to-indigo-600'
      };
    } else if (profile.learningStyle === 'AUDITORY') {
      return {
        title: "Listen & Learn",
        message: "Turn your notes into a podcast while you relax.",
        tool: ToolId.AUDIO_NOTES,
        icon: '🎧',
        color: 'from-pink-500 to-rose-600'
      };
    } else if (profile.learningStyle === 'INTERACTIVE') {
      return {
        title: "Challenge Yourself",
        message: "Ready to beat your high score? Take a quick quiz!",
        tool: ToolId.INTERACTIVE_QUIZ,
        icon: '🧩',
        color: 'from-orange-500 to-amber-600'
      };
    } else {
      return {
        title: "Smart Summary",
        message: "Get a quick revision summary for your next exam.",
        tool: ToolId.LESSON_SUMMARY,
        icon: '⚡',
        color: 'from-blue-500 to-cyan-600'
      };
    }
  };

  const suggestion = getSuggestion();

  return (
    <div className="mb-10 animate-slideDown">
      <div className="flex items-center justify-between mb-4 px-2">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <span>✨</span> Recommended for You
        </h2>
      </div>
      
      <div 
        onClick={() => {
            if (navigator.vibrate) navigator.vibrate(50);
            onSelectTool(suggestion.tool);
        }}
        className={`
          relative overflow-hidden rounded-3xl p-6 sm:p-8 cursor-pointer
          bg-gradient-to-r ${suggestion.color} text-white shadow-lg shadow-indigo-100
          transform transition-all duration-300 hover:scale-[1.01] hover:shadow-xl
          group
        `}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-white/20 transition-colors"></div>
        
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-white/20">
              <span>🎯</span> Daily Quest
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-2">{suggestion.title}</h3>
            <p className="text-white/90 text-lg">{suggestion.message}</p>
          </div>
          
          <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold shadow-md flex items-center gap-2 group-hover:scale-105 transition-transform whitespace-nowrap">
            <span>{suggestion.icon}</span>
            <span>Start Now</span>
          </button>
        </div>
      </div>
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown {
          animation: slideDown 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SmartSuggestions;
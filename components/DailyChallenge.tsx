import React from 'react';
import { DailyChallengeTask } from '../types';

interface DailyChallengeProps {
  challenge: DailyChallengeTask;
  onStart: () => void;
  onClaim: () => void;
}

const DailyChallenge: React.FC<DailyChallengeProps> = ({ challenge, onStart, onClaim }) => {
  if (challenge.claimed) {
     return (
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-6 text-white shadow-lg mb-8 flex flex-col sm:flex-row items-center justify-between animate-fadeIn gap-4">
            <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="text-4xl bg-white/20 p-3 rounded-full shrink-0">✅</div>
                <div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-1">Challenge Complete! 🎉</h3>
                    <p className="opacity-90 text-sm sm:text-base">You earned {challenge.rewardXp} XP and {challenge.rewardStars} Stars today.</p>
                </div>
            </div>
        </div>
     );
  }

  return (
    <div className="bg-white rounded-3xl p-1 shadow-lg shadow-yellow-100 border border-yellow-100 mb-10 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-100 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-yellow-200 transition-colors"></div>
      
      <div className="p-5 sm:p-8 flex flex-col md:flex-row items-center gap-6 relative z-10">
         {/* Icon */}
         <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-yellow-50 flex items-center justify-center text-3xl sm:text-4xl shadow-sm border border-yellow-100 shrink-0">
            🏆
         </div>

         {/* Content */}
         <div className="flex-1 text-center md:text-left w-full">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                 <span className="bg-yellow-100 text-yellow-700 text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">Daily Challenge</span>
                 <span className="text-[10px] sm:text-xs text-gray-400 font-medium">Expires in 12h</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{challenge.title}</h3>
            <p className="text-gray-500 text-sm mb-4 line-clamp-2 md:line-clamp-none">{challenge.description}</p>
            
            <div className="flex items-center justify-center md:justify-start gap-4 text-sm font-bold">
               <span className="flex items-center gap-1 text-indigo-600">
                 ⚡ {challenge.rewardXp} XP
               </span>
               <span className="flex items-center gap-1 text-yellow-600">
                 ⭐ {challenge.rewardStars} Stars
               </span>
            </div>
         </div>

         {/* Action */}
         <div className="shrink-0 w-full md:w-auto mt-2 md:mt-0">
             {challenge.completed ? (
                 <button 
                   onClick={onClaim}
                   className="w-full md:w-auto bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 sm:px-8 sm:py-3 rounded-xl font-bold shadow-lg shadow-orange-200 hover:scale-105 active:scale-95 transition-all animate-pulse flex items-center justify-center gap-2 text-sm sm:text-base"
                 >
                   <span>Claim Reward</span>
                   <span>🎁</span>
                 </button>
             ) : (
                <button 
                  onClick={onStart}
                  className="w-full md:w-auto bg-gray-900 text-white px-6 py-3 sm:px-8 sm:py-3 rounded-xl font-bold shadow-lg hover:bg-gray-800 transition-colors text-sm sm:text-base"
                >
                  Start Now
                </button>
             )}
         </div>
      </div>
    </div>
  );
};

export default DailyChallenge;
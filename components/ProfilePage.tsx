import React, { useState, useRef } from 'react';
import { StudentProfile, Achievement, Goal, ChartDataPoint } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

interface ProfilePageProps {
  profile: StudentProfile;
  performanceData: ChartDataPoint[];
  onEditProfile: () => void;
  onUpdateProfile: (profile: StudentProfile) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ profile, performanceData, onEditProfile, onUpdateProfile }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'learning' | 'gamification' | 'settings'>('overview');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateProfile({ ...profile, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // --- MOCK DATA ---
  const achievements: Achievement[] = [
    { id: '1', name: '7-Day Warrior', icon: '🔥', description: 'Studied for 7 days in a row', dateEarned: 'Dec 15', locked: false },
    { id: '2', name: 'Chapter Master', icon: '📚', description: 'Completed 10 chapters', dateEarned: 'Dec 20', locked: false },
    { id: '3', name: 'High Achiever', icon: '🎯', description: 'Scored 90%+ in a test', dateEarned: 'Jan 05', locked: false },
    { id: '4', name: 'Early Bird', icon: '🌅', description: 'Studied before 7 AM', locked: true },
    { id: '5', name: 'Helper', icon: '🤝', description: 'Answered a community doubt', locked: true },
  ];

  const goals: Goal[] = [
    { id: '1', title: 'Complete Math Syllabus', progress: 80, targetDate: 'Jan 31', type: 'Academic' },
    { id: '2', title: 'Score 95% in Science', progress: 60, targetDate: 'Feb 15', type: 'Exam' },
    { id: '3', title: 'Study 3 Hours Daily', progress: 40, targetDate: 'Daily', type: 'Habit' },
  ];

  const rpgStats = [
    { subject: 'Strength (Math)', A: 85, fullMark: 100 },
    { subject: 'Intell. (Sci)', A: 92, fullMark: 100 },
    { subject: 'Charisma (Eng)', A: 78, fullMark: 100 },
    { subject: 'Wisdom (Soc)', A: 88, fullMark: 100 },
    { subject: 'Creativity (Art)', A: 70, fullMark: 100 },
  ];

  // --- SECTIONS ---

  const renderHeader = () => (
    <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 shadow-xl shadow-indigo-100 mb-8 border border-indigo-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-24 sm:h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-90"></div>
      
      <div className="relative pt-8 sm:pt-12 flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-6 text-center md:text-left">
        <div className="relative group">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg bg-slate-100 flex items-center justify-center text-5xl sm:text-6xl overflow-hidden cursor-pointer" onClick={handleAvatarClick}>
            {profile.avatar ? (
              <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              '🎓'
            )}
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
          <button 
            onClick={handleAvatarClick}
            className="absolute bottom-1 right-0 bg-white p-2 rounded-full shadow-md text-gray-600 hover:text-indigo-600 transition-colors z-10"
            title="Upload Photo"
          >
            📸
          </button>
        </div>
        
        <div className="flex-1 mb-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{profile.name}</h1>
          <p className="text-gray-500 text-base sm:text-lg">Class {profile.classNumber} • {profile.region} Board</p>
          <div className="flex gap-2 mt-2 justify-center md:justify-start">
             <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-bold">⭐ {profile.stars} Stars</span>
             <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full font-bold">🏆 {profile.xp} XP</span>
          </div>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
           <button 
             onClick={onEditProfile}
             className="flex-1 md:flex-none px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all text-sm sm:text-base"
           >
             Edit Profile
           </button>
        </div>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-8 animate-fadeIn">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: 'Progress', val: '78%', icon: '🎯', color: 'bg-green-50 text-green-600' },
          { label: 'Chapters', val: '27/45', icon: '📚', color: 'bg-blue-50 text-blue-600' },
          { label: 'Streak', val: '15 Days', icon: '🔥', color: 'bg-orange-50 text-orange-600' },
          { label: 'Doubts', val: '156', icon: '💬', color: 'bg-purple-50 text-purple-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all text-center sm:text-left">
            <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center text-xl mb-3 mx-auto sm:mx-0`}>
              {stat.icon}
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gray-800">{stat.val}</p>
            <p className="text-[10px] sm:text-xs text-gray-500 uppercase font-bold tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Goals Section */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">My Goals 🎯</h3>
            <button className="text-indigo-600 text-sm font-bold hover:bg-indigo-50 px-3 py-1 rounded-lg">Add New</button>
          </div>
          <div className="space-y-4">
            {goals.map(goal => (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-gray-700">{goal.title}</span>
                  <span className="text-gray-500">{goal.progress}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000" 
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-400 text-right">Target: {goal.targetDate}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule Preview */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
           <h3 className="text-xl font-bold text-gray-800 mb-6">Today's Schedule 📅</h3>
           <div className="space-y-4 relative">
             <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gray-200"></div>
             {[
               { time: '6:00 AM', subject: 'Mathematics', status: 'completed' },
               { time: '4:00 PM', subject: 'Science', status: 'completed' },
               { time: '7:00 PM', subject: 'English', status: 'upcoming' },
             ].map((slot, i) => (
               <div key={i} className="flex items-center gap-4 relative z-10">
                 <div className={`w-4 h-4 rounded-full border-2 border-white shadow-sm ${slot.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                 <div className={`flex-1 p-3 rounded-xl border ${slot.status === 'completed' ? 'bg-green-50 border-green-100' : 'bg-white border-gray-100'}`}>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-800">{slot.subject}</span>
                      <span className="text-xs font-medium text-gray-500">{slot.time}</span>
                    </div>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );

  const renderLearning = () => (
    <div className="space-y-8 animate-fadeIn">
      {/* Subject Performance */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Subject Performance 📊</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="subject" tick={{fontSize: 12}} />
              <YAxis domain={[0, 100]} tick={{fontSize: 12}} />
              <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
              <Bar dataKey="score" radius={[4, 4, 0, 0]} fill="#6366f1" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">🤖</span>
            <h3 className="text-xl font-bold">AI Learning Profile</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-slate-400 text-sm mb-1 uppercase font-bold tracking-wider">Learning Style</p>
              <p className="text-2xl font-bold text-indigo-300">{profile.learningStyle} Learner (70%)</p>
              <p className="text-slate-300 mt-2 text-sm leading-relaxed">
                You retain information best when using <strong>Visual Diagrams</strong> and <strong>Videos</strong>. 
                Try to convert text notes into flowcharts.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-slate-400 text-sm mb-1 uppercase font-bold tracking-wider">Strengths</p>
                <div className="flex flex-wrap gap-2">
                  {profile.strongSubjects.map(s => (
                    <span key={s} className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-medium border border-green-500/30">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-1 uppercase font-bold tracking-wider">Focus Areas</p>
                <div className="flex flex-wrap gap-2">
                  {profile.weakSubjects.map(s => (
                    <span key={s} className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm font-medium border border-red-500/30">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGamification = () => (
    <div className="space-y-8 animate-fadeIn">
      {/* Avatar Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Avatar Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center relative overflow-hidden">
           <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-indigo-50 to-white"></div>
           <div className="w-32 h-32 rounded-full bg-white border-4 border-indigo-100 shadow-xl flex items-center justify-center text-6xl relative z-10 mb-4 overflow-hidden">
             {profile.avatar ? (
                <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
             ) : (
                '🦸'
             )}
             <div className="absolute -bottom-2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">Lvl {Math.floor(profile.xp / 500) + 1}</div>
           </div>
           <h3 className="text-xl font-bold text-gray-900">Knowledge Knight</h3>
           <p className="text-gray-500 text-sm mb-6">{profile.xp} XP</p>
           
           <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden mb-2">
             <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${(profile.xp % 500) / 5}%` }}></div>
           </div>
           <p className="text-xs text-indigo-600 font-bold">To Level {Math.floor(profile.xp / 500) + 2}</p>
        </div>

        {/* RPG Stats Radar */}
        <div className="md:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
           <h3 className="text-lg font-bold text-gray-800 mb-2 w-full text-left">Character Stats</h3>
           <div className="w-full h-64">
             <ResponsiveContainer width="100%" height="100%">
               <RadarChart cx="50%" cy="50%" outerRadius="80%" data={rpgStats}>
                 <PolarGrid />
                 <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#64748b' }} />
                 <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                 <Radar name="Student" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
               </RadarChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>

      {/* Badges */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Badge Collection 🏆</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {achievements.map(badge => (
            <div key={badge.id} className={`flex flex-col items-center text-center group ${badge.locked ? 'opacity-50 grayscale' : ''}`}>
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl mb-3 shadow-sm border border-gray-100 group-hover:-translate-y-2 transition-transform duration-300">
                {badge.locked ? '🔒' : badge.icon}
              </div>
              <h4 className="font-bold text-gray-800 text-xs sm:text-sm">{badge.name}</h4>
              <p className="text-[10px] sm:text-xs text-gray-500 mt-1">{badge.description}</p>
              {!badge.locked && <span className="text-[10px] text-indigo-500 font-bold mt-2 bg-indigo-50 px-2 py-0.5 rounded-md">{badge.dateEarned}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fadeIn">
      {renderHeader()}

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 mb-8 no-scrollbar pb-2">
        {['overview', 'learning', 'gamification', 'settings'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`
              px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all text-sm sm:text-base
              ${activeTab === tab 
                ? 'bg-gray-900 text-white shadow-lg' 
                : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200'}
            `}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-[500px]">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'learning' && renderLearning()}
        {activeTab === 'gamification' && renderGamification()}
        {activeTab === 'settings' && (
          <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-gray-100 text-center text-gray-500">
            <span className="text-4xl mb-4 block">⚙️</span>
            <h3 className="text-xl font-bold text-gray-800">Advanced Settings</h3>
            <p className="text-sm sm:text-base mb-6">More granular control over privacy and notifications coming soon.</p>
            <button 
              onClick={onEditProfile}
              className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition-colors"
            >
              Edit Basic Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
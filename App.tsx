import React, { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import MarkdownOutput from './components/MarkdownOutput';
import AuthScreen from './components/AuthScreen';
import OnboardingQuiz from './components/OnboardingQuiz';
import SmartSuggestions from './components/SmartSuggestions';
import DailyChallenge from './components/DailyChallenge';
import ChatInterface from './components/ChatInterface';
import Confetti from './components/Confetti';
import ProfilePage from './components/ProfilePage';
import { ToolId, StudentProfile, ChartDataPoint, ToolConfig, ClassLevelGroup, Message, DailyChallengeTask } from './types';
import { PROMPT_TEMPLATES, TOOLS, MATERIALS, QUICK_VIEWS, INTERACTIVE_TOOLS, SOCIAL_TOOLS, WELLNESS_TOOLS, LEVEL_THEMES } from './constants';
import { generateEducationResponse, generateChatResponse, hydratePrompt } from './services/geminiService';

const DEFAULT_PROFILE: StudentProfile = {
  name: "Alex",
  classNumber: "8",
  subjects: ["Math", "Physics", "Chemistry", "Biology", "English", "History"],
  learningPace: "MEDIUM",
  weakSubjects: ["Physics"],
  strongSubjects: ["Math", "English"],
  learningStyle: 'VISUAL',
  accessibility: {
    dyslexiaFriendly: false,
    highContrast: false
  },
  region: 'Tamil Nadu',
  xp: 1250,
  stars: 45
};

const MOCK_PERFORMANCE_DATA: ChartDataPoint[] = [
  { subject: 'Math', score: 85, fullMark: 100 },
  { subject: 'Physics', score: 62, fullMark: 100 },
  { subject: 'Chem', score: 78, fullMark: 100 },
  { subject: 'Bio', score: 88, fullMark: 100 },
  { subject: 'Eng', score: 92, fullMark: 100 },
  { subject: 'Hist', score: 70, fullMark: 100 },
];

const ALL_ITEMS = [...TOOLS, ...MATERIALS, ...QUICK_VIEWS, ...INTERACTIVE_TOOLS, ...SOCIAL_TOOLS, ...WELLNESS_TOOLS];

const getClassLevelGroup = (classNum: string): ClassLevelGroup => {
  const num = parseInt(classNum);
  if (num <= 5) return 'PRIMARY';
  if (num <= 8) return 'MIDDLE';
  return 'HIGH';
};

// --- Settings Modal ---
const SettingsModal = ({ 
  profile, 
  onUpdate, 
  onClose 
}: { 
  profile: StudentProfile, 
  onUpdate: (p: StudentProfile) => void, 
  onClose: () => void 
}) => {
  const [formData, setFormData] = useState(profile);

  const handleSave = () => {
    onUpdate(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-6 text-white flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span>⚙️</span> Edit Profile
          </h2>
          <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors">✕</button>
        </div>
        
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {/* Personal Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Student Profile</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Name</label>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full p-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Class</label>
                <select 
                  value={formData.classNumber} 
                  onChange={e => setFormData({...formData, classNumber: e.target.value})}
                  className="w-full p-2 border rounded-xl bg-white"
                >
                  {Array.from({length: 12}, (_, i) => i + 1).map(n => (
                    <option key={n} value={n.toString()}>{n}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Learning Style */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Learning Preferences</h3>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">Learning Style</label>
              <div className="grid grid-cols-2 gap-2">
                {['VISUAL', 'AUDITORY', 'READING', 'INTERACTIVE'].map(style => (
                  <button
                    key={style}
                    onClick={() => setFormData({...formData, learningStyle: style as any})}
                    className={`p-2 rounded-xl text-sm font-medium border transition-all ${
                      formData.learningStyle === style 
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700' 
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">Learning Pace</label>
              <div className="flex bg-gray-100 rounded-xl p-1">
                {['SLOW', 'MEDIUM', 'FAST'].map(pace => (
                  <button
                    key={pace}
                    onClick={() => setFormData({...formData, learningPace: pace as any})}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      formData.learningPace === pace 
                      ? 'bg-white shadow-sm text-indigo-600' 
                      : 'text-gray-400'
                    }`}
                  >
                    {pace}
                  </button>
                ))}
              </div>
            </div>
            <div>
               <label className="text-xs font-semibold text-gray-500 mb-1 block">Region / Culture</label>
               <select
                  value={formData.region}
                  onChange={e => setFormData({...formData, region: e.target.value as any})}
                  className="w-full p-2 border rounded-xl bg-white"
               >
                 <option value="Tamil Nadu">Tamil Nadu (Local Examples)</option>
                 <option value="General">General / International</option>
               </select>
            </div>
          </div>

          {/* Accessibility */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <span>♿</span> Accessibility
            </h3>
            
            <label className="flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer">
              <span className="font-medium text-gray-700">Dyslexia Friendly Font</span>
              <input 
                type="checkbox" 
                checked={formData.accessibility.dyslexiaFriendly}
                onChange={e => setFormData({
                  ...formData, 
                  accessibility: { ...formData.accessibility, dyslexiaFriendly: e.target.checked }
                })}
                className="w-5 h-5 accent-indigo-600"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer">
              <span className="font-medium text-gray-700">High Contrast Mode</span>
              <input 
                type="checkbox" 
                checked={formData.accessibility.highContrast}
                onChange={e => setFormData({
                  ...formData, 
                  accessibility: { ...formData.accessibility, highContrast: e.target.checked }
                })}
                className="w-5 h-5 accent-indigo-600"
              />
            </label>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg">Cancel</button>
          <button onClick={handleSave} className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

// --- Class Selection Screen Component ---
const ClassSelectionScreen = ({ onSelect }: { onSelect: (c: string) => void }) => {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-4 sm:p-8 font-sans selection:bg-indigo-100 animate-fadeIn">
      <div className="max-w-6xl w-full mx-auto">
        <div className="text-center mb-10 sm:mb-16 space-y-4">
           <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-3xl flex items-center justify-center text-white font-bold text-3xl sm:text-4xl shadow-xl shadow-indigo-200 mx-auto transform hover:rotate-12 transition-transform duration-500">
             E
           </div>
           <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight px-2">
             Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">EduBot</span>
           </h1>
           <p className="text-base sm:text-lg text-slate-500 max-w-lg mx-auto px-4">
             Your AI-powered learning companion. Select your class level to get a personalized experience.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 px-2 sm:px-4">
          {/* Primary School Card */}
          <div className="group relative bg-white rounded-[2.5rem] p-2 shadow-xl shadow-orange-100/50 hover:shadow-2xl hover:shadow-orange-200/50 transition-all duration-500 hover:-translate-y-2 border border-orange-50">
            <div className="absolute inset-x-0 top-0 h-28 sm:h-32 bg-gradient-to-br from-yellow-300 via-orange-400 to-red-400 rounded-t-[2.5rem] opacity-90 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative pt-12 sm:pt-16 px-6 pb-8 flex flex-col items-center h-full">
               <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-3xl shadow-lg flex items-center justify-center text-4xl sm:text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                 🎨
               </div>
               <h3 className="text-2xl font-bold text-gray-800 mb-2">Primary School</h3>
               <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-8">Classes 1 - 5</p>
               
               <div className="grid grid-cols-5 gap-2 sm:gap-3 w-full mt-auto">
                 {['1','2','3','4','5'].map(num => (
                   <button
                     key={num}
                     onClick={() => onSelect(num)}
                     className="aspect-square rounded-2xl bg-orange-50 text-orange-600 font-bold text-base sm:text-lg hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
                   >
                     {num}
                   </button>
                 ))}
               </div>
            </div>
          </div>

          {/* Middle School Card */}
          <div className="group relative bg-white rounded-[2.5rem] p-2 shadow-xl shadow-blue-100/50 hover:shadow-2xl hover:shadow-blue-200/50 transition-all duration-500 hover:-translate-y-2 border border-blue-50">
            <div className="absolute inset-x-0 top-0 h-28 sm:h-32 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-500 rounded-t-[2.5rem] opacity-90 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative pt-12 sm:pt-16 px-6 pb-8 flex flex-col items-center h-full">
               <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-3xl shadow-lg flex items-center justify-center text-4xl sm:text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                 🚀
               </div>
               <h3 className="text-2xl font-bold text-gray-800 mb-2">Middle School</h3>
               <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-8">Classes 6 - 8</p>
               
               <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full px-4 mt-auto">
                 {['6','7','8'].map(num => (
                   <button
                     key={num}
                     onClick={() => onSelect(num)}
                     className="aspect-square rounded-2xl bg-blue-50 text-blue-600 font-bold text-lg sm:text-xl hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
                   >
                     {num}
                   </button>
                 ))}
               </div>
            </div>
          </div>

          {/* High School Card */}
          <div className="group relative bg-white rounded-[2.5rem] p-2 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/50 transition-all duration-500 hover:-translate-y-2 border border-slate-100">
            <div className="absolute inset-x-0 top-0 h-28 sm:h-32 bg-gradient-to-br from-slate-600 via-slate-800 to-black rounded-t-[2.5rem] opacity-90 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative pt-12 sm:pt-16 px-6 pb-8 flex flex-col items-center h-full">
               <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-3xl shadow-lg flex items-center justify-center text-4xl sm:text-5xl mb-6 group-hover:scale-100 transition-transform duration-300">
                 🎓
               </div>
               <h3 className="text-2xl font-bold text-gray-800 mb-2">High School</h3>
               <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-8">Classes 9 - 12</p>
               
               <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full mt-auto">
                 {['9','10','11','12'].map(num => (
                   <button
                     key={num}
                     onClick={() => onSelect(num)}
                     className="aspect-square rounded-2xl bg-slate-100 text-slate-700 font-bold text-base sm:text-lg hover:bg-slate-800 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
                   >
                     {num}
                   </button>
                 ))}
               </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 sm:mt-16 text-center text-gray-400 text-xs sm:text-sm pb-8">
           Designed for students • Powered by Gemini AI
        </div>
      </div>
    </div>
  );
};
// ------------------------------------

// Horizontal Auto-Scroll Carousel Component
const Carousel: React.FC<{
  id?: string;
  title: string;
  items: ToolConfig[];
  activeToolId: ToolId;
  onSelect: (id: ToolId) => void;
  theme: any;
  autoScroll?: boolean;
}> = ({ id, title, items, activeToolId, onSelect, theme, autoScroll = true }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate items only if autoScroll is enabled to create seamless infinite scroll effect
  const displayItems = autoScroll ? [...items, ...items] : items;

  // Auto-scroll effect
  useEffect(() => {
    if (!autoScroll) return;
    
    const container = scrollRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      if (!isPaused) {
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += 1;
        }
      }
    }, 30); // Adjust speed for smoothness

    return () => clearInterval(interval);
  }, [isPaused, autoScroll]);

  // Manual Scroll Function
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 320; // Approximate card width + gap
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div id={id} className="mb-12" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="flex items-center justify-between mb-6 px-1">
        <div className="flex items-baseline gap-2 sm:gap-4">
            <h2 className={`text-xl sm:text-2xl font-bold ${theme.label === 'High (9-12)' ? 'text-slate-800' : 'text-gray-900'}`}>{title}</h2>
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex gap-2">
            <button 
                onClick={() => scroll('left')}
                className="p-2 rounded-full bg-white border border-gray-200 shadow-sm text-gray-600 hover:bg-gray-50 hover:text-indigo-600 transition-colors active:scale-95"
                aria-label="Scroll left"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button 
                onClick={() => scroll('right')}
                className="p-2 rounded-full bg-white border border-gray-200 shadow-sm text-gray-600 hover:bg-gray-50 hover:text-indigo-600 transition-colors active:scale-95"
                aria-label="Scroll right"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex overflow-x-auto pb-8 gap-6 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 select-none snap-x"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {displayItems.map((tool, index) => (
          <div 
            key={`${tool.id}-${index}`}
            onClick={() => onSelect(tool.id)}
            className={`
              shrink-0 w-[240px] sm:w-[300px] h-[280px] sm:h-[340px] bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden group snap-center
              ${theme.cardStyle}
              ${activeToolId === tool.id ? 'ring-4 ring-opacity-50 ring-offset-2' : ''}
            `}
            style={{ '--tw-ring-color': tool.color.replace('text-', '') } as React.CSSProperties}
          >
            {/* Card Header (Gradient) */}
            <div className={`h-[50%] p-6 flex flex-col justify-between ${tool.cardGradient} relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
              
              <div className="flex justify-between items-start relative z-10">
                <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-lg border border-white/20 uppercase tracking-wide">
                  {tool.category}
                </span>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-lg sm:text-xl font-bold text-white leading-tight mb-2 drop-shadow-sm">{tool.name}</h3>
                <div className="inline-block bg-black/20 backdrop-blur-sm px-2 py-1 rounded-md">
                  <span className="text-white/90 text-[10px] font-semibold uppercase tracking-wider">{tool.status}</span>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between bg-white relative">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl bg-gray-50 w-8 h-8 rounded-full flex items-center justify-center">{tool.icon}</span>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Resource</span>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">{tool.description}</p>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                <span className="text-[10px] font-medium text-gray-400">Tap to Open</span>
                <div className="text-gray-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showClassSelection, setShowClassSelection] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  // Navigation State
  const [currentView, setCurrentView] = useState<'dashboard' | 'profile'>('dashboard');

  const [activeToolId, setActiveToolId] = useState<ToolId>(ToolId.DOUBT_SOLVER);
  const [profile, setProfile] = useState<StudentProfile>(DEFAULT_PROFILE);
  const [language, setLanguage] = useState<'English' | 'Tamil'>('English');
  
  // Daily Challenge State
  const [dailyChallenge, setDailyChallenge] = useState<DailyChallengeTask>({
    id: 'dc-001',
    title: 'Quiz Master 🧠',
    description: 'Use the Interactive Quiz tool to generate a quiz on any topic.',
    toolId: ToolId.INTERACTIVE_QUIZ,
    rewardXp: 500,
    rewardStars: 25,
    completed: false,
    claimed: false
  });

  // Chat State
  const [chatHistory, setChatHistory] = useState<Message[]>([]);

  // Form States
  const [subject, setSubject] = useState(profile.subjects[0]);
  const [topic, setTopic] = useState("");
  const [query, setQuery] = useState("");
  const [chapterContent, setChapterContent] = useState("");
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState("Medium");
  const [examDuration, setExamDuration] = useState("45");
  // New Form States for Writing/Predictor/Social
  const [writingType, setWritingType] = useState("Essay");
  const [writingTone, setWritingTone] = useState("Formal");
  const [studyHours, setStudyHours] = useState("2");
  const [recentScores, setRecentScores] = useState("");
  const [roomType, setRoomType] = useState("Lo-Fi Study Beats");
  // Wellness Form States
  const [currentMood, setCurrentMood] = useState("Stressed");
  const [stressLevel, setStressLevel] = useState("7");

  // AI State
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const workspaceRef = useRef<HTMLDivElement>(null);

  // Derived State
  const levelGroup = getClassLevelGroup(profile.classNumber);
  const currentTheme = LEVEL_THEMES[levelGroup];

  // Global Styles for Accessibility
  useEffect(() => {
    const root = document.documentElement;
    if (profile.accessibility.dyslexiaFriendly) {
        root.style.setProperty('font-family', '"Comic Sans MS", "Chalkboard SE", sans-serif');
        root.style.setProperty('letter-spacing', '0.05em');
        root.style.setProperty('line-height', '1.8');
    } else {
        root.style.removeProperty('font-family');
        root.style.removeProperty('letter-spacing');
        root.style.removeProperty('line-height');
    }

    if (profile.accessibility.highContrast) {
        root.style.filter = 'contrast(125%)';
    } else {
        root.style.filter = 'none';
    }
  }, [profile.accessibility]);

  // Helper to get adapted tool config
  const getAdaptedTool = (tool: ToolConfig) => {
    const override = currentTheme.overrides[tool.id];
    if (override) {
      return { ...tool, ...override };
    }
    return tool;
  };

  const adaptedTools = TOOLS.map(getAdaptedTool);
  const adaptedMaterials = MATERIALS.map(getAdaptedTool);
  const adaptedQuickViews = QUICK_VIEWS.map(getAdaptedTool);
  const adaptedInteractive = INTERACTIVE_TOOLS.map(getAdaptedTool);
  const adaptedSocial = SOCIAL_TOOLS.map(getAdaptedTool);
  const adaptedWellness = WELLNESS_TOOLS.map(getAdaptedTool);
  
  const activeTool = getAdaptedTool(ALL_ITEMS.find(t => t.id === activeToolId)!);

  // Reset output when tool changes
  useEffect(() => {
    setResult(null);
    setTopic("");
    setQuery("");
    setChapterContent("");
    setDifficulty("Medium");
    setExamDuration("45");
  }, [activeToolId]);

  const handleToolSelect = (id: ToolId) => {
    setActiveToolId(id);
    setCurrentView('dashboard'); // Switch back to dashboard if tool selected from profile?
    // Smooth scroll to workspace
    setTimeout(() => {
        workspaceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };
  
  const handleStartChallenge = () => {
    handleToolSelect(dailyChallenge.toolId);
  };

  const handleClaimReward = () => {
    setProfile(prev => ({
      ...prev,
      xp: prev.xp + dailyChallenge.rewardXp,
      stars: prev.stars + dailyChallenge.rewardStars
    }));
    setDailyChallenge(prev => ({ ...prev, claimed: true }));
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const handleClassSelect = (cls: string) => {
    setProfile(prev => ({ ...prev, classNumber: cls }));
    setShowClassSelection(false);
    setShowOnboarding(true); // Proceed to onboarding
  };
  
  const handleOnboardingComplete = (data: Partial<StudentProfile>) => {
    setProfile(prev => ({ ...prev, ...data }));
    setShowOnboarding(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowClassSelection(true);
    setShowOnboarding(false);
  };

  const handleChatMessage = async (message: string) => {
    setIsLoading(true);
    
    // Add user message to history
    const userMsg: Message = { role: 'user', content: message, timestamp: new Date() };
    const updatedHistory = [...chatHistory, userMsg];
    setChatHistory(updatedHistory);

    try {
      const responseText = await generateChatResponse(
        updatedHistory,
        message,
        profile,
        language
      );

      const aiMsg: Message = { role: 'model', content: responseText, timestamp: new Date() };
      setChatHistory(prev => [...prev, aiMsg]);
      
      if (navigator.vibrate) navigator.vibrate(50);
    } catch (e) {
      console.error(e);
      const errorMsg: Message = { role: 'model', content: "Sorry, I'm having trouble connecting right now.", timestamp: new Date() };
      setChatHistory(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);
    setShowConfetti(false);

    try {
      let promptVariables: Record<string, string> = {
        CLASS_NUMBER: profile.classNumber,
        SUBJECT: subject,
        STUDENT_NAME: profile.name,
        LEARNING_PACE: profile.learningPace,
      };

      // Construct variables based on tool
      // Common variables mapping
      promptVariables = { ...promptVariables, TOPIC: topic || "General" };

      switch (activeToolId) {
        case ToolId.DOUBT_SOLVER:
          promptVariables = { ...promptVariables, STUDENT_QUESTION: query };
          break;
        case ToolId.LESSON_SUMMARY:
          promptVariables = { ...promptVariables, CHAPTER_NAME: topic, FULL_CHAPTER_CONTENT: chapterContent };
          break;
        case ToolId.STUDY_SCHEDULER:
          promptVariables = { 
            ...promptVariables, 
            SUBJECT_LIST: profile.subjects.join(", "),
            DATE: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(), // 1 week from now
            HOURS: "3",
            SESSION_LENGTH: currentTheme.studySession // Inject adaptive session length
          };
          break;
        case ToolId.EXAM_GENERATOR:
          promptVariables = { 
            ...promptVariables, 
            CHAPTER_NAME: topic, 
            DIFFICULTY: difficulty, 
            NUMBER_OF_QUESTIONS: "5",
            EXAM_DURATION: examDuration
          };
          break;
        case ToolId.SIMPLIFIER:
          promptVariables = { ...promptVariables, TOPIC: topic || query };
          break;
        case ToolId.PERFORMANCE_ANALYSIS:
          promptVariables = { ...promptVariables, SCORE: score.toString(), TOTAL_MARKS: "100" };
          break;

        // Advanced AI Tools
        case ToolId.WRITING_ASSISTANT:
          promptVariables = {
            ...promptVariables,
            WRITING_TYPE: writingType,
            TONE: writingTone,
            WORD_COUNT: "300"
          };
          break;
        case ToolId.SCORE_PREDICTOR:
          promptVariables = {
            ...promptVariables,
            RECENT_SCORES: recentScores,
            STUDY_HOURS: studyHours,
            SUBJECT_DIFFICULTY: difficulty
          };
          break;
          
        // Quick Views using Source Material
        case ToolId.AUDIO_OVERVIEW:
        case ToolId.VIDEO_OVERVIEW:
        case ToolId.MIND_MAP:
        case ToolId.REPORT_GENERATOR:
        case ToolId.FLASHCARD_GENERATOR:
        case ToolId.INTERACTIVE_QUIZ:
           promptVariables = { 
             ...promptVariables, 
             TOPIC: topic || "General Topic",
             SOURCE_MATERIAL: chapterContent || "No specific source provided, please generate based on the topic."
           };
           break;
        
        // Interactive Tools
        case ToolId.VIRTUAL_LAB:
        case ToolId.AR_3D_MODEL:
        case ToolId.GAMIFIED_JOURNEY:
        case ToolId.REAL_WORLD_VIDEO:
          promptVariables = {
            ...promptVariables,
            TOPIC: topic || "General"
          };
          break;
          
        // Social Tools
        case ToolId.STUDY_BUDDY:
        case ToolId.PTS_PLATFORM:
          promptVariables = {
             ...promptVariables,
             TOPIC: topic || "General Studies"
          };
          break;
        case ToolId.DOUBT_COMMUNITY:
           promptVariables = {
            ...promptVariables,
            STUDENT_QUESTION: query,
            TOPIC: topic || "General"
           };
           break;
        case ToolId.VIRTUAL_STUDY_ROOM:
           promptVariables = {
            ...promptVariables,
            ROOM_TYPE: roomType,
            TOPIC: topic || "Focus Session"
           };
           break;
           
        // Wellness Tools
        case ToolId.WELLNESS_COACH:
        case ToolId.MOTIVATOR:
           promptVariables = {
             ...promptVariables,
             MOOD: currentMood,
             STRESS_LEVEL: stressLevel,
             TOPIC: topic || "School"
           };
           break;
        case ToolId.EXAM_RELIEF:
           promptVariables = {
             ...promptVariables,
             TOPIC: topic || "Upcoming Exam",
             STRESS_LEVEL: stressLevel
           };
           break;
        case ToolId.BREAK_ZONE:
           promptVariables = {
             ...promptVariables,
             MOOD: currentMood,
             STUDY_HOURS: studyHours
           };
           break;
        
        // For materials, TOPIC is already set above
      }

      const template = PROMPT_TEMPLATES[activeToolId];
      if (!template) throw new Error("Prompt template not found");

      const systemPrompt = hydratePrompt(template, promptVariables);
      // Pass the full profile to the service for deep personalization
      const response = await generateEducationResponse(systemPrompt, profile, language);
      setResult(response);
      
      // Check for Daily Challenge Completion
      if (activeToolId === dailyChallenge.toolId && !dailyChallenge.completed) {
        setDailyChallenge(prev => ({ ...prev, completed: true }));
      }
      
      // Trigger Celebration
      setShowConfetti(true);
      if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
      setTimeout(() => setShowConfetti(false), 5000);

    } catch (error) {
      console.error(error);
      setResult("Sorry, I encountered an error while processing your request.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderFormInputs = () => {
    // Default form for most Material Library items
    const renderTopicForm = (placeholder: string) => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Subject</label>
          <select 
            value={subject} 
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            {profile.subjects.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Topic</label>
          <input 
            type="text" 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder={placeholder}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
      </div>
    );
    
    // Quick View Form (Topic + Source Material)
    const renderSourceForm = (topicPlaceholder: string) => (
       <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="space-y-1">
               <label className="text-sm font-medium text-gray-700">Subject</label>
               <select 
                 value={subject} 
                 onChange={(e) => setSubject(e.target.value)}
                 className="w-full p-2.5 border border-gray-300 rounded-lg bg-white"
               >
                 {profile.subjects.map(s => <option key={s} value={s}>{s}</option>)}
               </select>
             </div>
             <div className="space-y-1">
               <label className="text-sm font-medium text-gray-700">Topic</label>
               <input 
                 type="text" 
                 value={topic}
                 onChange={(e) => setTopic(e.target.value)}
                 placeholder={topicPlaceholder}
                 className="w-full p-2.5 border border-gray-300 rounded-lg"
                 required
               />
             </div>
          </div>
          <div className="space-y-1">
             <label className="text-sm font-medium text-gray-700">Source Material (Optional)</label>
             <textarea 
               value={chapterContent}
               onChange={(e) => setChapterContent(e.target.value)}
               placeholder="Paste text, notes, or article content here. If empty, AI will generate based on the topic."
               className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-indigo-500 resize-none text-sm"
             />
          </div>
       </div>
    );

    switch (activeToolId) {
      case ToolId.DOUBT_SOLVER:
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Subject</label>
                <select 
                  value={subject} 
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  {profile.subjects.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Topic (Optional)</label>
                <input 
                  type="text" 
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Algebra"
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Your Question</label>
              <textarea 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What specifically do you need help with?"
                className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-indigo-500 resize-none"
                required
              />
            </div>
          </>
        );

      // ... existing cases ...
      default:
        return renderTopicForm("e.g. Topic");
    }
  };

  // --- RENDER CONDITIONAL ---
  if (!isLoggedIn) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  if (showClassSelection) {
    return <ClassSelectionScreen onSelect={handleClassSelect} />;
  }

  if (showOnboarding) {
    return <OnboardingQuiz onComplete={handleOnboardingComplete} initialName={profile.name} />;
  }

  // View Routing
  if (currentView === 'profile') {
    return (
      <div className={`min-h-screen font-sans text-gray-900 pb-16 transition-colors duration-500 ${currentTheme.bg} relative`}>
        {/* Navigation Bar (Duplicate for Profile View consistency) */}
        <nav className={`sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200`}>
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20 items-center">
              <div className="flex items-center gap-4 cursor-pointer" onClick={() => setCurrentView('dashboard')}>
                 <div className={`w-10 h-10 bg-gradient-to-tr ${currentTheme.navGradient} rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg`}>
                   E
                 </div>
                 <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">EduBot</span>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => setCurrentView('dashboard')}
                  className="px-4 py-2 text-gray-500 hover:text-indigo-600 font-bold transition-colors"
                >
                  Dashboard
                </button>
                <button 
                  className="px-4 py-2 text-indigo-600 font-bold border-b-2 border-indigo-600"
                >
                  Profile
                </button>
              </div>
            </div>
          </div>
        </nav>
        
        <ProfilePage 
          profile={profile} 
          performanceData={MOCK_PERFORMANCE_DATA} 
          onEditProfile={() => setShowSettings(true)}
          onUpdateProfile={setProfile}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen font-sans text-gray-900 pb-16 transition-colors duration-500 ${currentTheme.bg} relative`}>
      {showConfetti && <Confetti />}
      
      {showSettings && (
        <SettingsModal 
          profile={profile} 
          onUpdate={setProfile} 
          onClose={() => setShowSettings(false)} 
        />
      )}

      {/* Top Navigation */}
      <nav className={`sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200`}>
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => setCurrentView('dashboard')}>
               <div className={`w-10 h-10 bg-gradient-to-tr ${currentTheme.navGradient} rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg`}>
                 E
               </div>
               <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">EduBot</span>
            </div>

            {/* Navigation Tabs (Desktop) */}
            <div className="hidden md:flex items-center gap-6 mr-auto ml-12">
               <button 
                 onClick={() => setCurrentView('dashboard')}
                 className="text-gray-900 font-bold text-lg border-b-2 border-indigo-600"
               >
                 Dashboard
               </button>
               <button 
                 onClick={() => setCurrentView('profile')}
                 className="text-gray-500 hover:text-indigo-600 font-bold text-lg transition-colors"
               >
                 Profile
               </button>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-4" id="nav-profile">
                 <div className="flex items-center gap-3 pl-2 cursor-pointer" onClick={() => setCurrentView('profile')} title="Go to Profile">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${currentTheme.navGradient} flex items-center justify-center text-white font-bold border-2 border-white shadow-sm hover:scale-105 transition-transform overflow-hidden`}>
                      {profile.avatar ? (
                        <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        profile.name[0]
                      )}
                    </div>
                    <div className="hidden lg:block text-sm">
                       <p className="font-bold text-gray-900 leading-none">{profile.name}</p>
                       <p className="text-gray-500 mt-1 leading-none">Class {profile.classNumber}</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Adaptive Hero Section */}
        <div className={`relative overflow-hidden ${currentTheme.cardStyle} bg-gradient-to-r ${currentTheme.heroGradient} shadow-xl mb-12 border-0`}>
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
           <div className="relative p-10 sm:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 text-white">
              <div>
                 <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">{currentTheme.welcome}</h1>
                 <p className="text-white/80 text-lg">{currentTheme.studySession} • {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric'})}</p>
              </div>
              
              <button 
                id="hero-start-btn"
                onClick={() => handleToolSelect(ToolId.AI_TUTOR)}
                className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:bg-white/30 hover:scale-105 transition-all flex items-center gap-2"
              >
                 <span>Start AI Tutor 🤖</span>
              </button>
           </div>
        </div>

        {/* Daily Challenge */}
        <DailyChallenge 
            challenge={dailyChallenge}
            onStart={handleStartChallenge}
            onClaim={handleClaimReward}
        />

        {/* Smart Suggestions */}
        <SmartSuggestions profile={profile} onSelectTool={handleToolSelect} />

        {/* Carousels with Adapted Items */}
        <Carousel 
          id="carousel-tools"
          title={levelGroup === 'PRIMARY' ? "Fun Tools 🛠️" : "AI Learning Tools"} 
          items={adaptedTools} 
          activeToolId={activeToolId} 
          onSelect={handleToolSelect}
          theme={currentTheme}
          autoScroll={true}
        />
        <Carousel 
          title={levelGroup === 'PRIMARY' ? "My Library 📚" : "Materials Library"} 
          items={adaptedMaterials} 
          activeToolId={activeToolId} 
          onSelect={handleToolSelect} 
          theme={currentTheme}
          autoScroll={true}
        />
        <Carousel 
          title={levelGroup === 'PRIMARY' ? "Create Magic ✨" : "Quick View Generators"} 
          items={adaptedQuickViews} 
          activeToolId={activeToolId} 
          onSelect={handleToolSelect} 
          theme={currentTheme}
          autoScroll={true}
        />
        <Carousel 
          title={levelGroup === 'PRIMARY' ? "Experience Zone 🧪" : "Interactive Zone 🎮"} 
          items={adaptedInteractive} 
          activeToolId={activeToolId} 
          onSelect={handleToolSelect} 
          theme={currentTheme}
          autoScroll={false}
        />
        <Carousel 
          title={levelGroup === 'PRIMARY' ? "Friends & Fun 👯" : "Social & Connect 👥"} 
          items={adaptedSocial} 
          activeToolId={activeToolId} 
          onSelect={handleToolSelect} 
          theme={currentTheme}
          autoScroll={false}
        />
        <Carousel 
          title={levelGroup === 'PRIMARY' ? "Happy Thoughts ☁️" : "Wellness & Focus 🧘"} 
          items={adaptedWellness} 
          activeToolId={activeToolId} 
          onSelect={handleToolSelect} 
          theme={currentTheme}
          autoScroll={false}
        />

        {/* Workspace Area */}
        <div ref={workspaceRef} className="mt-8" id="workspace-area">
           
           {/* Conditional Rendering: Chat Interface OR Standard Tool Interface */}
           {activeToolId === ToolId.AI_TUTOR ? (
              <ChatInterface 
                messages={chatHistory} 
                onSendMessage={handleChatMessage} 
                isLoading={isLoading}
                studentName={profile.name}
              />
           ) : (
            <div className="flex flex-col lg:flex-row gap-8 min-h-[auto] lg:min-h-[700px]">
               {/* Left Input Panel */}
               <div className="w-full lg:w-2/5 flex flex-col gap-6">
                  <div className={`bg-white shadow-lg border-gray-100 p-8 flex flex-col h-full ${currentTheme.cardStyle}`}>
                     <div className="flex items-center gap-4 mb-8">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-md ${activeTool?.color.replace('text-', 'bg-').replace('600', '100')}`}>
                          {activeTool?.icon}
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">{activeTool?.name}</h2>
                          <p className="text-gray-500 text-sm">{activeTool.description}</p>
                        </div>
                     </div>

                     <form onSubmit={handleSubmit} className="flex flex-col flex-1 gap-6">
                        {renderFormInputs()}
                        
                        <div className="mt-auto pt-6">
                          <button 
                            type="submit" 
                            disabled={isLoading}
                            onClick={() => { if(navigator.vibrate) navigator.vibrate(50); }}
                            className={`
                              w-full py-4 px-6 rounded-2xl text-white font-bold shadow-lg transition-all transform hover:translate-y-[-2px]
                              flex items-center justify-center gap-3 text-lg
                              ${isLoading ? 'bg-gray-400 cursor-not-allowed' : currentTheme.buttonGradient}
                            `}
                          >
                            {isLoading ? (
                              <>
                                <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Wait...
                              </>
                            ) : (
                              <>Generate {levelGroup === 'PRIMARY' ? '✨' : '⚡'}</>
                            )}
                          </button>
                        </div>
                     </form>
                  </div>
               </div>

               {/* Right Output Panel */}
               <div className="w-full lg:w-3/5">
                  <div className={`
                    bg-white shadow-lg border-gray-100 h-full min-h-[500px] lg:min-h-[700px]
                    flex flex-col relative overflow-hidden transition-all
                    ${currentTheme.cardStyle}
                    ${!result && !isLoading ? 'items-center justify-center bg-gray-50/50 border-dashed' : ''}
                  `}>
                    
                    {!result && !isLoading && (
                       <div className="text-center p-8 text-gray-400 max-w-sm">
                         <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl grayscale opacity-50">
                            {activeTool?.icon}
                         </div>
                         <h3 className="text-xl font-bold text-gray-600 mb-2">Ready to Assist</h3>
                         <p>Select parameters on the left and click Generate.</p>
                         {language === 'Tamil' && <p className="text-sm text-indigo-500 mt-2 font-medium">தமிழ் மொழி பயன்முறை இயக்கத்தில் உள்ளது</p>}
                       </div>
                    )}

                    {isLoading && (
                      <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                        <div className={`w-20 h-20 border-4 rounded-full animate-spin mb-6 ${levelGroup === 'PRIMARY' ? 'border-orange-200 border-t-orange-500' : 'border-indigo-100 border-t-indigo-600'}`}></div>
                        <h3 className="text-xl font-bold text-gray-800 animate-pulse">Thinking...</h3>
                      </div>
                    )}

                    {result && (
                      <div className="flex-1 flex flex-col h-full animate-fadeIn relative">
                         {/* Visual Breathing Aid for Wellness Coach */}
                         {activeToolId === ToolId.WELLNESS_COACH && (
                           <div className="absolute top-4 right-4 hidden lg:block">
                              <div className="w-24 h-24 rounded-full bg-teal-100 flex items-center justify-center animate-pulse">
                                <div className="w-16 h-16 rounded-full bg-teal-200 flex items-center justify-center animate-ping">
                                   <span className="text-2xl">🧘‍♀️</span>
                                </div>
                              </div>
                           </div>
                         )}

                         <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div className="flex items-center gap-2">
                               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                               <span className="text-sm font-semibold text-gray-600">AI Response</span>
                            </div>
                            <div className="flex gap-2">
                               <button 
                                onClick={() => {
                                  navigator.clipboard.writeText(result);
                                  if (navigator.vibrate) navigator.vibrate(50);
                                }}
                                className="p-2 hover:bg-white rounded-lg transition-colors text-gray-500" title="Copy"
                               >
                                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                               </button>
                            </div>
                         </div>
                         <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                            <div className="prose prose-lg prose-indigo max-w-none">
                              <MarkdownOutput content={result} />
                            </div>
                         </div>
                      </div>
                    )}
                  </div>
               </div>
            </div>
           )}

        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;
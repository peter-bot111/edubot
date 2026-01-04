import React, { useState, useEffect } from 'react';

interface AuthScreenProps {
  onLogin: () => void;
}

type MascotEmotion = 'idle' | 'typing' | 'password' | 'success';

const Mascot = ({ emotion }: { emotion: MascotEmotion }) => {
  // SVG Path definitions for different eye states
  const eyes = {
    open: (
      <g>
        <circle cx="85" cy="120" r="8" fill="#1e293b" />
        <circle cx="115" cy="120" r="8" fill="#1e293b" />
        <circle cx="87" cy="118" r="3" fill="white" />
        <circle cx="117" cy="118" r="3" fill="white" />
      </g>
    ),
    happy: (
      <g stroke="#1e293b" strokeWidth="3" fill="none">
        <path d="M 78 120 Q 85 110 92 120" />
        <path d="M 108 120 Q 115 110 122 120" />
      </g>
    ),
    closed: ( // For peeking or thinking
      <g stroke="#1e293b" strokeWidth="3" fill="none">
        <line x1="78" y1="120" x2="92" y2="120" />
        <line x1="108" y1="120" x2="122" y2="120" />
      </g>
    )
  };

  const mouth = {
    idle: <path d="M 95 135 Q 100 138 105 135" stroke="#1e293b" strokeWidth="2" fill="none" />,
    happy: <path d="M 90 132 Q 100 145 110 132" stroke="#1e293b" strokeWidth="2" fill="#ff9999" opacity="0.6" />
  };

  // Hand positions based on state
  const getHandTransform = (side: 'left' | 'right') => {
    const base = side === 'left' ? 'translate(0,0)' : 'translate(0,0)';
    
    if (emotion === 'password') {
      return side === 'left' 
        ? 'translate(25px, -45px) rotate(150deg)' 
        : 'translate(-25px, -45px) rotate(-150deg)';
    }
    if (emotion === 'success') {
      return side === 'left'
        ? 'translate(-20px, -50px) rotate(-30deg)'
        : 'translate(20px, -50px) rotate(30deg)';
    }
    if (emotion === 'typing') {
      return 'translate(0, 10px)';
    }
    return base;
  };

  return (
    <div className="w-48 h-40 mx-auto relative transition-all duration-300">
      <svg viewBox="0 0 200 180" className="w-full h-full drop-shadow-xl">
        {/* Ears */}
        <g className={`transition-transform duration-500 origin-bottom ${emotion === 'success' ? 'animate-bounce' : ''}`}>
          <ellipse cx="60" cy="50" rx="15" ry="40" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="4" transform="rotate(-15 60 90)" />
          <ellipse cx="60" cy="50" rx="8" ry="25" fill="#ffedd5" transform="rotate(-15 60 90)" />
          
          <ellipse cx="140" cy="50" rx="15" ry="40" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="4" transform="rotate(15 140 90)" />
          <ellipse cx="140" cy="50" rx="8" ry="25" fill="#ffedd5" transform="rotate(15 140 90)" />
        </g>

        {/* Head */}
        <circle cx="100" cy="110" r="50" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="4" />

        {/* Face */}
        {emotion === 'success' || emotion === 'password' ? eyes.happy : eyes.open}
        {emotion === 'success' ? mouth.happy : mouth.idle}
        
        {/* Cheeks */}
        <circle cx="75" cy="128" r="6" fill="#ffedd5" opacity="0.6" />
        <circle cx="125" cy="128" r="6" fill="#ffedd5" opacity="0.6" />

        {/* Hands (Paws) */}
        <g style={{ transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }} transform={getHandTransform('left')}>
           <ellipse cx="50" cy="160" rx="14" ry="18" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="4" />
           <ellipse cx="50" cy="160" rx="8" ry="10" fill="white" />
        </g>
        <g style={{ transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }} transform={getHandTransform('right')}>
           <ellipse cx="150" cy="160" rx="14" ry="18" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="4" />
           <ellipse cx="150" cy="160" rx="8" ry="10" fill="white" />
        </g>
      </svg>
      
      {/* Sparkles for success */}
      {emotion === 'success' && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-10 text-2xl animate-bounce">✨</div>
          <div className="absolute top-4 right-10 text-2xl animate-pulse delay-100">🎉</div>
          <div className="absolute bottom-10 -right-4 text-2xl animate-bounce delay-200">⭐</div>
        </div>
      )}
    </div>
  );
};

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [mascotEmotion, setMascotEmotion] = useState<MascotEmotion>('idle');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Focus handlers
  const handleEmailFocus = () => setMascotEmotion('typing');
  const handlePasswordFocus = () => setMascotEmotion('password');
  const handleBlur = () => {
    if (mascotEmotion !== 'success') setMascotEmotion('idle');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setMascotEmotion('success');
      setTimeout(onLogin, 1500); // Wait for celebration animation
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#fefce8] flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute -top-20 -left-20 w-64 h-64 bg-yellow-200 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob"></div>
         <div className="absolute top-0 -right-20 w-72 h-72 bg-orange-200 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob animation-delay-2000"></div>
         <div className="absolute -bottom-32 left-20 w-80 h-80 bg-pink-200 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-orange-100 border border-white p-8 relative z-10 transition-all duration-500 hover:shadow-orange-200">
        
        {/* Mascot Area */}
        <div className="-mt-24 mb-6">
          <Mascot emotion={mascotEmotion} />
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            {isLogin ? 'Welcome Back!' : 'Join the Fun!'}
          </h2>
          <p className="text-slate-500">
            {isLogin ? 'Ready to learn something new?' : 'Create an account to start your journey.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600 ml-2">Email</label>
            <div className="relative group">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={handleEmailFocus}
                onBlur={handleBlur}
                className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-indigo-400 focus:bg-white transition-all duration-300 text-slate-700 font-medium group-hover:border-slate-200"
                placeholder="hello@student.com"
              />
              <span className="absolute right-4 top-4 text-xl opacity-30">✉️</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600 ml-2">Password</label>
            <div className="relative group">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={handlePasswordFocus}
                onBlur={handleBlur}
                className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-indigo-400 focus:bg-white transition-all duration-300 text-slate-700 font-medium group-hover:border-slate-200"
                placeholder="••••••••"
              />
              <span className="absolute right-4 top-4 text-xl opacity-30">🔒</span>
            </div>
            {isLogin && (
              <div className="text-right">
                <a href="#" className="text-xs font-bold text-indigo-400 hover:text-indigo-600 transition-colors">Forgot Password?</a>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold text-lg shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 transform hover:-translate-y-1 active:translate-y-0 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Checking...
              </span>
            ) : (
              isLogin ? 'Login' : 'Sign Up'
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-500 font-medium text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setMascotEmotion('idle');
              }}
              className="text-indigo-600 font-bold hover:underline ml-1"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
      
      <div className="mt-8 text-slate-400 text-xs font-medium">
        Powered by EduBot AI
      </div>
    </div>
  );
};

export default AuthScreen;

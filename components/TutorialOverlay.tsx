import React, { useState, useEffect, useRef } from 'react';

export interface TutorialStep {
  targetId?: string;
  title: string;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

interface TutorialOverlayProps {
  steps: TutorialStep[];
  onComplete: () => void;
}

const TutorialOverlay: React.FC<TutorialOverlayProps> = ({ steps, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const updateRect = () => {
      const step = steps[currentStep];
      if (step.targetId) {
        const element = document.getElementById(step.targetId);
        if (element) {
          const r = element.getBoundingClientRect();
          setRect(r);
          // Scroll element into view nicely
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          setRect(null); // Fallback to center if element not found
        }
      } else {
        setRect(null);
      }
    };

    updateRect();
    // Re-calculate on resize or scroll
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect);
    
    // Slight delay to allow DOM to settle
    const timer = setTimeout(updateRect, 300);

    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
      clearTimeout(timer);
    };
  }, [currentStep, steps]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const step = steps[currentStep];
  const isCentered = !step.targetId || !rect;

  // Calculate tooltip position based on target rect
  let tooltipStyle: React.CSSProperties = {};
  if (rect && !isCentered) {
    const position = step.position || 'bottom';
    const gap = 20;
    
    // Base Transforms based on position
    let baseTransform = '';

    switch (position) {
      case 'bottom':
        tooltipStyle = { 
          top: rect.bottom + gap, 
          left: rect.left + rect.width / 2, 
        };
        baseTransform = 'translateX(-50%)';
        break;
      case 'top':
        tooltipStyle = { 
          top: rect.top - gap, 
          left: rect.left + rect.width / 2, 
        };
        baseTransform = 'translateX(-50%) translateY(-100%)';
        break;
      case 'left':
        tooltipStyle = { 
          top: rect.top + rect.height / 2, 
          left: rect.left - gap, 
        };
        baseTransform = 'translateY(-50%) translateX(-100%)';
        break;
      case 'right':
        tooltipStyle = { 
          top: rect.top + rect.height / 2, 
          left: rect.right + gap, 
        };
        baseTransform = 'translateY(-50%)';
        break;
    }
    
    tooltipStyle.transform = baseTransform;
  } else {
    // Centered logic
    tooltipStyle.transform = 'translate(0, 0)';
  }

  // Common Overlay Style for blocking
  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    transition: 'all 0.5s ease-out',
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Spotlight Effect using 4 divs to darken area around target */}
      {rect ? (
        <>
          {/* Top Block */}
          <div style={{ ...overlayStyle, top: 0, left: 0, right: 0, height: Math.max(0, rect.top) }} />
          {/* Bottom Block */}
          <div style={{ ...overlayStyle, top: rect.bottom, left: 0, right: 0, bottom: 0 }} />
          {/* Left Block */}
          <div style={{ ...overlayStyle, top: rect.top, left: 0, width: Math.max(0, rect.left), height: rect.height }} />
          {/* Right Block */}
          <div style={{ ...overlayStyle, top: rect.top, left: rect.right, right: 0, height: rect.height }} />
          
          {/* Highlight Border (Visual only) */}
          <div 
            className="absolute border-4 border-indigo-400 rounded-xl shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all duration-500 ease-out pointer-events-none"
            style={{ 
              top: rect.top - 4, 
              left: rect.left - 4, 
              width: rect.width + 8, 
              height: rect.height + 8 
            }}
          />
        </>
      ) : (
        // Full backdrop for centered modals
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-500" />
      )}

      {/* Tooltip Card */}
      <div 
        className={`
          absolute p-6 bg-white rounded-2xl shadow-2xl max-w-sm w-[90%] transition-all duration-100 ease-out border border-indigo-50
          ${isCentered ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : ''}
        `}
        style={tooltipStyle}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
           <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
             {step.title}
           </h3>
           <span className="text-xs font-bold text-indigo-500 bg-indigo-50 px-2 py-1 rounded-full border border-indigo-100 whitespace-nowrap ml-2">
             {currentStep + 1} / {steps.length}
           </span>
        </div>
        
        <p className="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base">
          {step.content}
        </p>
        
        <div className="flex justify-between items-center pt-2 border-t border-gray-50">
          <button 
            onClick={onComplete}
            className="text-gray-400 hover:text-gray-600 text-sm font-medium px-2 py-1 rounded hover:bg-gray-100 transition-colors"
          >
            Skip Tour
          </button>
          <button 
            onClick={handleNext}
            className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transform active:scale-95 transition-all flex items-center gap-2"
          >
            {currentStep === steps.length - 1 ? "Let's Go!" : "Next →"}
          </button>
        </div>
        
        {/* Decorative Arrow for tooltip */}
        {!isCentered && (
           <div className={`absolute w-4 h-4 bg-white transform rotate-45 border-r border-b border-gray-100 -z-10 ${
             step.position === 'top' ? 'bottom-[-8px] left-1/2 -translate-x-1/2 border-t-0 border-l-0 border-r border-b' :
             step.position === 'bottom' ? 'top-[-8px] left-1/2 -translate-x-1/2 border-b-0 border-r-0 border-l border-t' : 
             step.position === 'left' ? 'right-[-8px] top-1/2 -translate-y-1/2' :
             'left-[-8px] top-1/2 -translate-y-1/2'
           }`}></div>
        )}
      </div>
    </div>
  );
};

export default TutorialOverlay;
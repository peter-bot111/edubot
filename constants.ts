import { ToolId, ToolConfig, ClassLevelGroup } from './types';

export const TOOLS: ToolConfig[] = [
  {
    id: ToolId.AI_TUTOR,
    name: "AI Personal Tutor",
    icon: "🤖",
    description: "Chat with a smart tutor that remembers your conversation.",
    color: "text-indigo-600",
    cardGradient: "bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700",
    category: "Advanced AI",
    status: "Conversational"
  },
  {
    id: ToolId.WRITING_ASSISTANT,
    name: "Writing Assistant",
    icon: "✍️",
    description: "AI co-pilot for essays, reports, and creative writing.",
    color: "text-pink-600",
    cardGradient: "bg-gradient-to-br from-pink-500 via-rose-500 to-red-500",
    category: "Advanced AI",
    status: "Editor"
  },
  {
    id: ToolId.SCORE_PREDICTOR,
    name: "Score Predictor",
    icon: "🔮",
    description: "Predict future scores based on current trends.",
    color: "text-emerald-600",
    cardGradient: "bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600",
    category: "Analytics",
    status: "Predictive"
  },
  {
    id: ToolId.DOUBT_SOLVER,
    name: "Doubt Solver",
    icon: "❓",
    description: "Get step-by-step explanations for any difficult question immediately.",
    color: "text-indigo-600",
    cardGradient: "bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600",
    category: "Learning",
    status: "Popular"
  },
  {
    id: ToolId.LESSON_SUMMARY,
    name: "Lesson Summarizer",
    icon: "📚",
    description: "Adaptive chapter summaries personalized to your learning pace.",
    color: "text-orange-600",
    cardGradient: "bg-gradient-to-br from-orange-400 via-amber-500 to-orange-600",
    category: "Revision",
    status: "Adaptive"
  },
  {
    id: ToolId.STUDY_SCHEDULER,
    name: "Study Planner",
    icon: "📅",
    description: "Create a personalized day-by-day study schedule for exams.",
    color: "text-pink-600",
    cardGradient: "bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600",
    category: "Planning",
    status: "New"
  },
  {
    id: ToolId.EXAM_GENERATOR,
    name: "Exam Creator",
    icon: "📝",
    description: "Generate practice tests with answer keys and marking schemes.",
    color: "text-emerald-600",
    cardGradient: "bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600",
    category: "Practice",
    status: "High Yield"
  },
  {
    id: ToolId.SIMPLIFIER,
    name: "Topic Simplifier",
    icon: "💡",
    description: "Explain complex educational topics in simple, easy terms.",
    color: "text-violet-600",
    cardGradient: "bg-gradient-to-br from-violet-500 via-purple-500 to-violet-600",
    category: "Learning",
    status: "Easy Read"
  },
  {
    id: ToolId.PERFORMANCE_ANALYSIS,
    name: "Performance Analyst",
    icon: "📊",
    description: "Analyze your test scores and get actionable improvement feedback.",
    color: "text-cyan-600",
    cardGradient: "bg-gradient-to-br from-cyan-400 via-blue-500 to-cyan-600",
    category: "Analytics",
    status: "Insightful"
  }
];

export const MATERIALS: ToolConfig[] = [
  {
    id: ToolId.PDF_NOTES,
    name: "PDF Notes",
    icon: "📄",
    description: "Comprehensive notes with multiple difficulty levels.",
    color: "text-red-600",
    cardGradient: "bg-gradient-to-br from-red-500 via-rose-500 to-red-600",
    category: "Notes",
    status: "Easy • Med • Hard"
  },
  {
    id: ToolId.VIDEO_LESSONS,
    name: "Video Lessons",
    icon: "▶️",
    description: "Visual learning modules with timestamped breakdowns.",
    color: "text-blue-600",
    cardGradient: "bg-gradient-to-br from-blue-500 via-indigo-500 to-blue-600",
    category: "Video",
    status: "15m • 2.4k views"
  },
  {
    id: ToolId.PRACTICE_EXERCISES,
    name: "Practice Exercises",
    icon: "✍️",
    description: "Topic-wise exercises with progress tracking.",
    color: "text-green-600",
    cardGradient: "bg-gradient-to-br from-green-500 via-emerald-500 to-green-600",
    category: "Practice",
    status: "0% Complete"
  },
  {
    id: ToolId.VISUAL_DIAGRAMS,
    name: "Visual Diagrams",
    icon: "🖼️",
    description: "Interactive illustrations and concept maps.",
    color: "text-yellow-600",
    cardGradient: "bg-gradient-to-br from-yellow-500 via-amber-500 to-yellow-600",
    category: "Visuals",
    status: "Interactive"
  },
  {
    id: ToolId.AUDIO_NOTES,
    name: "Audio Notes",
    icon: "🎧",
    description: "Podcast-style revision materials for learning on the go.",
    color: "text-purple-600",
    cardGradient: "bg-gradient-to-br from-purple-500 via-fuchsia-500 to-purple-600",
    category: "Audio",
    status: "Podcast"
  },
  {
    id: ToolId.QUICK_SUMMARIES,
    name: "Quick Summaries",
    icon: "⚡",
    description: "One-page cheat sheets for last-minute revision.",
    color: "text-teal-600",
    cardGradient: "bg-gradient-to-br from-teal-500 via-cyan-500 to-teal-600",
    category: "Summary",
    status: "1 Page"
  }
];

export const QUICK_VIEWS: ToolConfig[] = [
  {
    id: ToolId.AUDIO_OVERVIEW,
    name: "Audio Overview",
    icon: "🎙️",
    description: "Generate a broadcast style overview based on your sources.",
    color: "text-rose-600",
    cardGradient: "bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600",
    category: "Audio",
    status: "Broadcast"
  },
  {
    id: ToolId.VIDEO_OVERVIEW,
    name: "Video Overview",
    icon: "📹",
    description: "Generate an explainer video script presented by AI.",
    color: "text-sky-600",
    cardGradient: "bg-gradient-to-br from-sky-500 via-blue-500 to-sky-600",
    category: "Video",
    status: "Explainer"
  },
  {
    id: ToolId.MIND_MAP,
    name: "Mind Map",
    icon: "🧠",
    description: "Generate a structured mind map based on your sources.",
    color: "text-violet-600",
    cardGradient: "bg-gradient-to-br from-violet-500 via-purple-500 to-violet-600",
    category: "Visual",
    status: "Structure"
  },
  {
    id: ToolId.REPORT_GENERATOR,
    name: "Reports",
    icon: "📑",
    description: "Generate comprehensive reports based on your sources.",
    color: "text-slate-600",
    cardGradient: "bg-gradient-to-br from-slate-500 via-gray-500 to-slate-600",
    category: "Summary",
    status: "Professional"
  },
  {
    id: ToolId.FLASHCARD_GENERATOR,
    name: "Flashcards",
    icon: "📇",
    description: "Generate study flashcards based on your sources.",
    color: "text-amber-600",
    cardGradient: "bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600",
    category: "Revision",
    status: "Study Aid"
  },
  {
    id: ToolId.INTERACTIVE_QUIZ,
    name: "Interactive Quiz",
    icon: "🧩",
    description: "Generate an AI interactive quiz based on your sources.",
    color: "text-lime-600",
    cardGradient: "bg-gradient-to-br from-lime-500 via-green-500 to-lime-600",
    category: "Practice",
    status: "Interactive"
  }
];

export const INTERACTIVE_TOOLS: ToolConfig[] = [
  {
    id: ToolId.VIRTUAL_LAB,
    name: "Virtual Lab",
    icon: "🧪",
    description: "Simulate science experiments safely on your screen.",
    color: "text-cyan-600",
    cardGradient: "bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-600",
    category: "Simulation",
    status: "Exp 01"
  },
  {
    id: ToolId.AR_3D_MODEL,
    name: "3D Models",
    icon: "🧊",
    description: "Explore complex concepts with detailed 3D structure descriptions.",
    color: "text-fuchsia-600",
    cardGradient: "bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-600",
    category: "AR / 3D",
    status: "Immersive"
  },
  {
    id: ToolId.GAMIFIED_JOURNEY,
    name: "Level Up Journey",
    icon: "🎮",
    description: "Turn your chapter into a gamified quest with levels and bosses.",
    color: "text-orange-600",
    cardGradient: "bg-gradient-to-br from-orange-500 via-red-500 to-pink-600",
    category: "Game",
    status: "Level 1"
  },
  {
    id: ToolId.REAL_WORLD_VIDEO,
    name: "Real World App",
    icon: "🌍",
    description: "See how textbook concepts apply to real life situations.",
    color: "text-green-600",
    cardGradient: "bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700",
    category: "Video",
    status: "Applied"
  }
];

export const SOCIAL_TOOLS: ToolConfig[] = [
  {
    id: ToolId.STUDY_BUDDY,
    name: "Study Buddy Match",
    icon: "👥",
    description: "Find a study partner based on your subjects and learning style.",
    color: "text-pink-600",
    cardGradient: "bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600",
    category: "Social",
    status: "Connect"
  },
  {
    id: ToolId.DOUBT_COMMUNITY,
    name: "Community Q&A",
    icon: "🙋‍♂️",
    description: "Ask the community and get answers from peers and teachers.",
    color: "text-blue-600",
    cardGradient: "bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600",
    category: "Forum",
    status: "Active"
  },
  {
    id: ToolId.VIRTUAL_STUDY_ROOM,
    name: "Virtual Focus Room",
    icon: "🎧",
    description: "Join a distraction-free room with ambient vibes and timers.",
    color: "text-violet-600",
    cardGradient: "bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600",
    category: "Room",
    status: "Live"
  },
  {
    id: ToolId.PTS_PLATFORM,
    name: "Parent Connect",
    icon: "👨‍👩‍👧",
    description: "Bridge the gap between parents, teachers, and students.",
    color: "text-emerald-600",
    cardGradient: "bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600",
    category: "Admin",
    status: "Reports"
  }
];

export const WELLNESS_TOOLS: ToolConfig[] = [
  {
    id: ToolId.WELLNESS_COACH,
    name: "Mindfulness & Breath",
    icon: "🧘‍♀️",
    description: "Guided meditation and breathing exercises to reduce stress.",
    color: "text-teal-600",
    cardGradient: "bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500",
    category: "Calm",
    status: "Breath"
  },
  {
    id: ToolId.EXAM_RELIEF,
    name: "Exam Anxiety Relief",
    icon: "😌",
    description: "Instant calming techniques and CBT-based grounding exercises.",
    color: "text-indigo-600",
    cardGradient: "bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400",
    category: "Support",
    status: "Help"
  },
  {
    id: ToolId.MOTIVATOR,
    name: "Motivational Coach",
    icon: "🦁",
    description: "Get a personalized pep talk to boost your confidence.",
    color: "text-orange-600",
    cardGradient: "bg-gradient-to-br from-orange-400 via-red-400 to-pink-500",
    category: "Coach",
    status: "Energy"
  },
  {
    id: ToolId.BREAK_ZONE,
    name: "Smart Break Planner",
    icon: "☕",
    description: "Suggests refreshing non-screen activities based on your energy.",
    color: "text-green-600",
    cardGradient: "bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500",
    category: "Break",
    status: "Refresh"
  }
];

// Adaptive Theme Configuration
export const LEVEL_THEMES: Record<ClassLevelGroup, any> = {
  PRIMARY: {
    label: "Primary (1-5)",
    bg: "bg-yellow-50",
    navGradient: "from-yellow-400 via-orange-400 to-red-400",
    heroGradient: "from-yellow-300 via-orange-300 to-pink-300",
    cardStyle: "rounded-[2.5rem] border-2 border-orange-100",
    buttonGradient: "bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600",
    welcome: "Hi Friend! Ready to play and learn? 🌟",
    studySession: "30 min study + 10 min break",
    overrides: {
      [ToolId.AI_TUTOR]: { name: "My Buddy", icon: "🤖", description: "Talk to your smart robot friend!" },
      [ToolId.STUDY_SCHEDULER]: { name: "My Time Table", icon: "⏰", description: "Plan your day with fun activities!" },
      [ToolId.DOUBT_SOLVER]: { name: "Ask a Friend", icon: "🙋", description: "Stuck? Let's figure it out together!" },
      [ToolId.PDF_NOTES]: { name: "Picture Stories", icon: "📖", description: "Fun stories with colorful pictures." },
      [ToolId.PRACTICE_EXERCISES]: { name: "Fun Games", icon: "🎮", description: "Play number games and quizzes." },
      [ToolId.EXAM_GENERATOR]: { name: "Quiz Time", icon: "⭐", description: "Earn stars with mini-quizzes!" },
      [ToolId.VIDEO_LESSONS]: { name: "Cartoon Lessons", icon: "🎬", description: "Watch fun videos with songs." },
      
      // Quick View Overrides for Kids
      [ToolId.AUDIO_OVERVIEW]: { name: "Radio Show", icon: "📻", description: "Listen to a fun story about this!" },
      [ToolId.VIDEO_OVERVIEW]: { name: "Cartoon Show", icon: "📺", description: "Imagine a cartoon explaining this!" },
      [ToolId.MIND_MAP]: { name: "Idea Tree", icon: "🌳", description: "See how ideas connect like branches." },
      [ToolId.REPORT_GENERATOR]: { name: "My Project", icon: "📝", description: "Write a cool project about this." },
      [ToolId.FLASHCARD_GENERATOR]: { name: "Memory Cards", icon: "🎴", description: "Flip cards to remember better!" },
      [ToolId.INTERACTIVE_QUIZ]: { name: "Fun Quiz", icon: "🧩", description: "Play a guessing game!" },
      
      // Interactive overrides
      [ToolId.VIRTUAL_LAB]: { name: "Magic Lab", icon: "🧪", description: "Mix potions and see what happens!" },
      [ToolId.GAMIFIED_JOURNEY]: { name: "Adventure Mode", icon: "🏰", description: "Go on a quest to learn!" },
      
      // Social overrides
      [ToolId.STUDY_BUDDY]: { name: "Playmate Finder", icon: "👯", description: "Find friends to learn with!" },
      [ToolId.PTS_PLATFORM]: { name: "For Mom & Dad", icon: "👪", description: "Show your parents what you learned!" },

      // Wellness overrides
      [ToolId.WELLNESS_COACH]: { name: "Calm Corner", icon: "☁️", description: "Take deep breaths with clouds." },
      [ToolId.EXAM_RELIEF]: { name: "Worry Wiper", icon: "🧹", description: "Make the scary thoughts go away." },
      [ToolId.MOTIVATOR]: { name: "Cheerleader", icon: "🦁", description: "You can do it! Yay!" },
      [ToolId.BREAK_ZONE]: { name: "Fun Break", icon: "🪁", description: "Time to play outside!" },
    }
  },
  MIDDLE: {
    label: "Middle (6-8)",
    bg: "bg-blue-50",
    navGradient: "from-blue-500 via-indigo-500 to-purple-500",
    heroGradient: "from-cyan-400 via-blue-500 to-indigo-500",
    cardStyle: "rounded-[2rem] border border-blue-100",
    buttonGradient: "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700",
    welcome: "Welcome back! Ready to explore new topics? 🚀",
    studySession: "45 min study + 15 min break",
    overrides: {} // Standard names
  },
  HIGH: {
    label: "High (9-12)",
    bg: "bg-slate-50",
    navGradient: "from-slate-700 to-slate-900",
    heroGradient: "from-slate-600 via-slate-800 to-black",
    cardStyle: "rounded-xl border border-gray-200",
    buttonGradient: "bg-gradient-to-r from-slate-700 to-black hover:from-slate-800 hover:to-gray-900",
    welcome: "Academic Dashboard - Exam Prep Mode 🎯",
    studySession: "60 min study + 15 min break",
    overrides: {
      [ToolId.STUDY_SCHEDULER]: { name: "Exam Strategy", icon: "📅", description: "Intensive preparation roadmap." },
      [ToolId.EXAM_GENERATOR]: { name: "Mock Tests", icon: "📝", description: "Full-length competitive style tests." },
      [ToolId.PDF_NOTES]: { name: "Deep Dive Notes", icon: "📑", description: "Detailed concepts & formulas." },
      [ToolId.PERFORMANCE_ANALYSIS]: { name: "Rank Analytics", icon: "📈", description: "Compare with toppers." },
      [ToolId.SCORE_PREDICTOR]: { name: "Rank Predictor", icon: "🔮", description: "AI prediction of competitive rank." }
    }
  }
};

export const PROMPT_TEMPLATES = {
  // Advanced AI Prompts
  [ToolId.WRITING_ASSISTANT]: `
You are an expert academic writing assistant for a Class {CLASS_NUMBER} student.

TASK:
Write a {WRITING_TYPE} on the topic "{TOPIC}".

REQUIREMENTS:
- Tone: {TONE}
- Approximate Word Count: {WORD_COUNT}
- Structure: Introduction, Body Paragraphs, Conclusion
- Style: Academic but accessible for the student's level.

OUTPUT:
# ✍️ {WRITING_TYPE}: {TOPIC}
  `,

  [ToolId.SCORE_PREDICTOR]: `
You are an advanced predictive analytics engine for education.

STUDENT DATA:
- Class: {CLASS_NUMBER}
- Recent Scores: {RECENT_SCORES}
- Study Hours/Day: {STUDY_HOURS}
- Subject Difficulty: {SUBJECT_DIFFICULTY}

TASK:
1. Predict the likely score range for the final exam.
2. Provide a confidence percentage.
3. List 3 key actions to improve the prediction by 10%.

OUTPUT FORMAT:
# 🔮 Score Prediction Report

**Predicted Score Range**: [X% - Y%]
**Confidence**: [High/Medium/Low]

## 📈 Trend Analysis
[Analysis of current trajectory]

## 🚀 How to Improve (+10% Boost)
1. [Actionable Step 1]
2. [Actionable Step 2]
3. [Actionable Step 3]
  `,

  // Standard Prompts
  [ToolId.DOUBT_SOLVER]: `
You are a patient and knowledgeable tutor helping a Class {CLASS_NUMBER} student with their doubts.

STUDENT CONTEXT:
- Class: {CLASS_NUMBER}
- Subject: {SUBJECT}
- Topic: {TOPIC}
- Student's learning pace: {LEARNING_PACE}

TASK:
Answer the student's question: "{STUDENT_QUESTION}"

INSTRUCTIONS:
1. First, acknowledge the question positively
2. Break down the concept into simple steps
3. Use real-life examples or analogies
4. Include diagrams or visual descriptions if helpful
5. Provide a practice question at the end
6. Ask if they need further clarification

RESPONSE FORMAT:
**Understanding Your Question:**
[Rephrase what they're asking]

**Simple Explanation:**
[Step-by-step explanation]

**Example:**
[Real-world example]

**Let's Practice:**
[A simple practice question]

**Need More Help?**
[Encouraging closing statement]
`,

  [ToolId.LESSON_SUMMARY]: `
You are an AI content adapter that personalizes study materials based on student learning capacity.

STUDENT PROFILE:
- Class: {CLASS_NUMBER}
- Subject: {SUBJECT}
- Chapter: {CHAPTER_NAME}
- Learning Capacity: {LEARNING_PACE}

ORIGINAL LESSON CONTENT:
{FULL_CHAPTER_CONTENT}

TASK:
Create a personalized summary based on the student's learning capacity.

FOR SLOW LEARNERS: Use extremely simple language, break into very small sections, include more examples.
FOR AVERAGE LEARNERS: Use clear, standard language, balance detail and simplicity.
FOR FAST LEARNERS: Use advanced terminology, include additional depth.

OUTPUT FORMAT:
**📚 Chapter: {CHAPTER_NAME}**

**🎯 Key Concepts:**
[Main points to remember]

**📖 Detailed Explanation:**
[Adapted content]

**💡 Important Points:**
[Highlighted critical information]

**✍️ Practice Questions:**
[2-3 questions]
`,

  [ToolId.STUDY_SCHEDULER]: `
You are an AI study planner creating a personalized study schedule for a student.

STUDENT INFORMATION:
- Class: {CLASS_NUMBER}
- Subjects: {SUBJECT_LIST}
- Exam Date: {DATE}
- Study Hours Available Per Day: {HOURS}
- Suggested Session Length: {SESSION_LENGTH}

TASK:
Create a day-by-day study schedule that prioritizes incomplete syllabus and balances all subjects.
Use {SESSION_LENGTH} intervals.

OUTPUT FORMAT:
**📅 Your Personalized Study Schedule**

**Week Plan:**
[Day by day breakdown]

**Daily Tips:**
[Specific advice]

**Motivation:**
[Encouraging message]
`,

  [ToolId.EXAM_GENERATOR]: `
You are an AI exam creator generating practice questions for students.

EXAM PARAMETERS:
- Class: {CLASS_NUMBER}
- Subject: {SUBJECT}
- Chapter: {CHAPTER_NAME}
- Difficulty Level: {DIFFICULTY}
- Number of Questions: {NUMBER_OF_QUESTIONS}
- Duration: {EXAM_DURATION} minutes

TASK:
Generate a balanced practice test.

OUTPUT FORMAT:

**📝 Practice Test: {CHAPTER_NAME}**
**Class: {CLASS_NUMBER} | Subject: {SUBJECT} | Time: {EXAM_DURATION} mins**

---
**Questions**
[List questions]

---
**ANSWER KEY & EXPLANATIONS**
[Provide answers and brief explanations]
`,

  [ToolId.SIMPLIFIER]: `
You are an expert at explaining complex educational concepts in simple, age-appropriate language.

INPUT:
- Class Level: {CLASS_NUMBER}
- Original Content/Topic: {TOPIC}
- Subject: {SUBJECT}

TASK:
Rewrite the content/explain the topic to make it easily understandable for a Class {CLASS_NUMBER} student.

OUTPUT FORMAT:

**🎓 Simplified Explanation**

**What is {TOPIC}?**
[Simple definition]

**Understanding It Better:**
[Detailed explanation using simple language]

**Real-Life Example:**
[Relatable scenario]

**Think of It Like This:**
[Analogy]
`,

  [ToolId.PERFORMANCE_ANALYSIS]: `
You are an AI learning analyst providing personalized performance feedback.

STUDENT DATA:
- Name: {STUDENT_NAME}
- Class: {CLASS_NUMBER}
- Subject: {SUBJECT}
- Score: {SCORE}/{TOTAL_MARKS}

TASK:
Provide a comprehensive, encouraging performance analysis with actionable improvement suggestions.

OUTPUT FORMAT:
**📊 Your Performance Report**

**🎯 Overall:**
[Feedback]

**💪 Strengths & Weaknesses:**
[Analysis]

**✅ Action Plan:**
[3 specific steps to improve]

**🌟 Motivation:**
[Encouraging message]
`,
  [ToolId.PDF_NOTES]: `
You are generating a structured content outline meant to be exported as a PDF.

TOPIC: {TOPIC}
SUBJECT: {SUBJECT}
CLASS: {CLASS_NUMBER}

TASK:
Create detailed, structured notes on the topic. Organize into three difficulty sections.

OUTPUT FORMAT:
# 📄 {TOPIC} - Study Notes

## 🟢 Level 1: Fundamentals (Easy)
- **Key Definitions**: [List]
- **Basic Concepts**: [Explanation]

## 🟡 Level 2: Core Analysis (Medium)
- **Detailed Explanation**: [Content]
- **Diagram Description**: [Describe key visual elements]

## 🔴 Level 3: Advanced Applications (Hard)
- **Complex Scenarios**: [Content]
- **Exam Corner**: [Important questions]
  `,
  [ToolId.VIDEO_LESSONS]: `
You are an AI educational content director scriptwriting a video lesson.

TOPIC: {TOPIC}
TARGET DURATION: 10-15 minutes

TASK:
Create a video lesson script/structure with timestamps.

OUTPUT FORMAT:
# ▶️ Video Lesson: {TOPIC}
**Duration**: 12:30 | **Views**: 2.4k | **Rating**: 4.8/5

## 🎬 Video Structure
- **0:00 - 1:30**: Introduction & Hook (What you will learn)
- **1:30 - 4:00**: Core Concept Visualization (Visual cues: [Describe animation])
- **4:00 - 8:00**: Deep Dive & Examples
- **8:00 - 10:30**: Real-world Application
- **10:30 - 12:30**: Summary & Challenge Question

## 📝 Script Highlights
[Key explanation points for the main segment]
  `,
  [ToolId.PRACTICE_EXERCISES]: `
You are creating an interactive practice sheet.

TOPIC: {TOPIC}

TASK:
Create a list of 5 practice exercises with progress checkboxes.

OUTPUT FORMAT:
# ✍️ Practice Exercises: {TOPIC}
**Progress**: 0/5 Completed

- [ ] **Exercise 1 (Basic)**: [Question]
  *Hint: [Hint]*

- [ ] **Exercise 2 (Basic)**: [Question]

- [ ] **Exercise 3 (Medium)**: [Question]

- [ ] **Exercise 4 (Medium)**: [Question]

- [ ] **Exercise 5 (Hard)**: [Question]

## 🗝️ Answer Key (Hidden - Click to Reveal)
1. [Answer]
2. [Answer]
...
  `,
  [ToolId.VISUAL_DIAGRAMS]: `
You are a visual learning assistant.

TOPIC: {TOPIC}

TASK:
Create a text-based visual representation (ASCII art, flowchart text, or diagram description) for the topic.

OUTPUT FORMAT:
# 🖼️ Visual Guide: {TOPIC}

## 🔍 Concept Map
[Use ASCII art or structured text arrows -> to show relationships]

## 🎨 Illustration Description
**Figure 1**: [Detailed description of what the diagram looks like]
**Labels**:
- A: [Label]
- B: [Label]

## 🧬 Interactive Elements
- [Clickable Area 1]: Explains [Concept]
  `,
  [ToolId.AUDIO_NOTES]: `
You are a podcast host for "EduBot Audio".

TOPIC: {TOPIC}

TASK:
Write a conversational, engaging audio script for a revision podcast.

OUTPUT FORMAT:
# 🎧 Audio Note: {TOPIC}
**Duration**: 5:45 | **Format**: Podcast

**(Upbeat Intro Music)**

**Host**: "Welcome back class! Today we're cracking the code on {TOPIC}."

**Segment 1: The Hook**
[Conversational explanation]

**Segment 2: The Meat**
[Detailed breakdown using analogies]

**Segment 3: The Takeaway**
[Summary]

**(Outro Music)**
  `,
  [ToolId.QUICK_SUMMARIES]: `
You are creating a "Cheat Sheet" for last minute revision.

TOPIC: {TOPIC}

TASK:
Create a high-density, one-page summary.

OUTPUT FORMAT:
# ⚡ Quick Cheat Sheet: {TOPIC}

| Key Term | Definition |
|----------|------------|
| [Term] | [Def] |
| [Term] | [Def] |

## 🧠 Memory Mnemonics
- [Mnemonic 1]
- [Mnemonic 2]

## ⚠️ Common Pitfalls
- [Mistake to avoid]

## 🔢 Key Formulas/Dates
- [Formula 1]
- [Date 1]
  `,

  // Quick View Prompts
  [ToolId.AUDIO_OVERVIEW]: `
You are creating a script for an educational "Radio Broadcast" or "Podcast Overview".
TOPIC: {TOPIC}
SOURCE MATERIAL: {SOURCE_MATERIAL}
CLASS: {CLASS_NUMBER}

TASK:
Create a dialogue between two hosts (Host A and Host B) summarizing the key points of the source material. Host A is the expert, Host B asks curious questions.

OUTPUT FORMAT:
# 🎙️ Audio Overview: {TOPIC}

**Host A**: Welcome back listeners! Today we're diving into {TOPIC}.
**Host B**: Sounds interesting! What's the main idea?
[Continue dialogue summarizing the source material...]
  `,

  [ToolId.VIDEO_OVERVIEW]: `
You are a video scriptwriter for an educational explainer video.
TOPIC: {TOPIC}
SOURCE MATERIAL: {SOURCE_MATERIAL}
CLASS: {CLASS_NUMBER}

TASK:
Create a script with visual descriptions for an AI avatar to explain the topic.

OUTPUT FORMAT:
# 📹 Video Overview: {TOPIC}

**Scene 1: Introduction**
- **Visual**: [Describe background/animation]
- **Audio**: [Script for narrator]

**Scene 2: Core Concept**
- **Visual**: [Describe visual]
- **Audio**: [Script]

[Continue...]
  `,

  [ToolId.MIND_MAP]: `
You are an expert at structuring information visually.
TOPIC: {TOPIC}
SOURCE MATERIAL: {SOURCE_MATERIAL}

TASK:
Create a text-based Mind Map or hierarchical outline representing the relationships in the source material.

OUTPUT FORMAT:
# 🧠 Mind Map: {TOPIC}

[Central Idea: {TOPIC}]
  |
  +-- [Main Branch 1]
  |     +-- [Sub-branch]
  |     +-- [Sub-branch]
  |
  +-- [Main Branch 2]
        +-- [Sub-branch]
  
  [Use clear indentation and connection lines]
  `,

  [ToolId.REPORT_GENERATOR]: `
You are an academic reporter.
TOPIC: {TOPIC}
SOURCE MATERIAL: {SOURCE_MATERIAL}
CLASS: {CLASS_NUMBER}

TASK:
Generate a structured report summarizing the source material.

OUTPUT FORMAT:
# 📑 Report: {TOPIC}

## 1. Executive Summary
[Brief overview]

## 2. Key Findings
- [Point 1]
- [Point 2]

## 3. Analysis
[Detailed analysis of sources]

## 4. Conclusion
[Final thoughts]
  `,

  [ToolId.FLASHCARD_GENERATOR]: `
You are creating study flashcards.
TOPIC: {TOPIC}
SOURCE MATERIAL: {SOURCE_MATERIAL}

TASK:
Create 5-10 Flashcards based on the source material.

OUTPUT FORMAT:
# 📇 Flashcards: {TOPIC}

---
**Card 1**
**Front (Question/Term):** [Question]
**Back (Answer/Definition):** [Answer]
---
**Card 2**
**Front:** [Question]
**Back:** [Answer]
---
[Continue...]
  `,

  [ToolId.INTERACTIVE_QUIZ]: `
You are a quiz master creating a fun interactive quiz.
TOPIC: {TOPIC}
SOURCE MATERIAL: {SOURCE_MATERIAL}
CLASS: {CLASS_NUMBER}

TASK:
Create 5 interactive quiz questions. Format the answer so the user has to click/reveal it (simulate this with text).

OUTPUT FORMAT:
# 🧩 Quiz Time: {TOPIC}

**Question 1:**
[Question text]
> **Click to Reveal Answer**: || [Answer] ||

**Question 2:**
[Question text]
> **Click to Reveal Answer**: || [Answer] ||

[Continue...]
  `,

  // INTERACTIVE TOOLS
  [ToolId.VIRTUAL_LAB]: `
You are a virtual laboratory instructor.
TOPIC: {TOPIC}
CLASS: {CLASS_NUMBER}

TASK:
Guide the student through a simulated experiment. Describe the visual setup, the steps, and the expected results.

OUTPUT FORMAT:
# 🧪 Virtual Lab: {TOPIC}
**Safety Rating**: 100% Safe (Simulation)

## 🥽 Lab Setup
- **Equipment**: [List items]
- **Materials**: [List chemicals/objects]

## 🔬 Procedure
**Step 1**: [Action]
> *Observation*: [What happens]

**Step 2**: [Action]
> *Observation*: [What happens]

## 📝 Conclusion
[What we learned]
  `,

  [ToolId.AR_3D_MODEL]: `
You are an AR content generator.
TOPIC: {TOPIC}

TASK:
Provide a detailed structural breakdown of a 3D model for the topic. This text simulates the metadata an AR viewer would display.

OUTPUT FORMAT:
# 🧊 3D Model View: {TOPIC}

## 🔄 Rotating Model
[Describe the object's appearance in 3D space]

## 🏷️ Parts Breakdown (Tap to Zoom)
1. **[Part A]**: [Function/Description]
   *Location*: [Where is it relative to others]
2. **[Part B]**: [Function/Description]

## ✂️ Cross-Section View
[Describe what it looks like inside]
  `,

  [ToolId.GAMIFIED_JOURNEY]: `
You are a game designer creating an educational quest.
TOPIC: {TOPIC}
CLASS: {CLASS_NUMBER}

TASK:
Design a 5-level learning journey where each level explains a concept and challenges the student.

OUTPUT FORMAT:
# 🎮 Quest: {TOPIC}

## 🟢 Level 1: The Beginning
**Mission**: [Basic concept]
**Challenge**: [Simple question]
**Reward**: [XP/Badge]

## 🟡 Level 2: The Obstacle
**Mission**: [Harder concept]
**Challenge**: [Question]

[Continue to Level 5: Boss Battle]
  `,

  [ToolId.REAL_WORLD_VIDEO]: `
You are a documentary filmmaker.
TOPIC: {TOPIC}

TASK:
Create a script showing how this textbook concept applies in the real world.

OUTPUT FORMAT:
# 🌍 Real World Application: {TOPIC}

**Scenario**: [Real life situation]

## 🎥 Script
**Shot 1**: [Visual of real world location]
**Narrator**: "[Explanation connecting concept to visual]"

**Shot 2**: [Visual]
**Narrator**: "[Deeper explanation]"

## 💡 Why it Matters
[Impact on daily life]
  `,
  
  // SOCIAL TOOLS
  [ToolId.STUDY_BUDDY]: `
You are a study partner matchmaking system.
CLASS: {CLASS_NUMBER}
SUBJECT: {SUBJECT}
TOPIC: {TOPIC}

TASK:
Generate 3 simulated "Study Buddy" profiles that would be a good match for this student to discuss the topic with. Also provide a "Looking for Group" message the student can use.

OUTPUT FORMAT:
# 👥 Study Buddy Matches

**1. Curious Clara** (Specialist in {SUBJECT})
*Strength*: Explaining concepts simply.
*Study Style*: Visual learner.

**2. Note-Taking Noah**
*Strength*: Organizing information.
*Study Style*: Text-based.

**3. Quiz Master Quinn**
*Strength*: Testing knowledge.
*Study Style*: Interactive.

## 📢 Your LFG Message
"Hi everyone! I'm looking for a study buddy to help me with {TOPIC} in {SUBJECT}. I learn best by [Style]. Anyone available?"
  `,

  [ToolId.DOUBT_COMMUNITY]: `
You are simulating a lively student community forum.
QUESTION: {STUDENT_QUESTION}
CLASS: {CLASS_NUMBER}
SUBJECT: {SUBJECT}

TASK:
Generate a forum thread with 3 responses: one from a Top Student, one from a Teacher, and one "Discussed Answer".

OUTPUT FORMAT:
# 💬 Community Thread

**User: Student_123**
*Question*: {STUDENT_QUESTION}

---

**🎓 Top Answer (by PhysicsPro)**:
[Detailed, student-friendly answer]
*Upvotes: 45*

**👩‍🏫 Teacher's Note (by Mrs. Davis)**:
"Great explanation! Just remember to also consider [Nuance/Tip]."

**🗣️ Discussion**:
*Student_X*: "I was confused about this too, thanks!"
  `,

  [ToolId.VIRTUAL_STUDY_ROOM]: `
You are a virtual environment designer.
ROOM VIBE: {ROOM_TYPE}
TOPIC: {TOPIC}

TASK:
Create a text-based "Virtual Study Room" experience. Describe the atmosphere, set a timer plan, and provide simulated motivating chat messages from other users.

OUTPUT FORMAT:
# 🎧 Virtual Room: {ROOM_TYPE}
**Current Users**: 124 Online

## 🕯️ Atmosphere
[Descriptive text of the sounds, visuals, and mood]

## ⏱️ Session Plan (Pomodoro)
- **0-25m**: Deep Focus on {TOPIC}
- **25-30m**: Stretch Break
- **30-55m**: Review & Practice

## 💬 Room Chat
*User1*: "Good luck everyone!"
*User2*: "We got this."
*User3*: "Focus mode: ON."
  `,

  [ToolId.PTS_PLATFORM]: `
You are an educational liaison.
STUDENT: {STUDENT_NAME}
CLASS: {CLASS_NUMBER}
TOPIC: {TOPIC}

TASK:
Draft a professional update report for Parents and Teachers summarizing what the student is currently working on and how they can support them.

OUTPUT FORMAT:
# 👨‍👩‍👧 Parent-Teacher Connect

**Student Update**: {STUDENT_NAME} (Class {CLASS_NUMBER})
**Current Focus**: {TOPIC}

## 📢 Progress Note
{STUDENT_NAME} is currently engaging with materials related to {TOPIC}. They are using AI tools to deepen understanding.

## 🤝 How to Support
**Parents**: Ask them to explain [Key Concept] to you over dinner.
**Teachers**: Verify their understanding of [Key Concept] in the next class.

*Generated by EduBot Connect*
  `,

  // MENTAL HEALTH TOOLS
  [ToolId.WELLNESS_COACH]: `
You are a mindfulness coach for students.
CURRENT MOOD: {MOOD}
STRESS LEVEL: {STRESS_LEVEL} (Scale 1-10)

TASK:
Provide a 3-minute guided mindfulness or breathing exercise tailored to the student's mood.

OUTPUT FORMAT:
# 🧘‍♀️ Mindfulness Session

**Focus**: {MOOD} Management

## 🌬️ Breathing Exercise
[Step-by-step breathing count, e.g., 4-7-8 technique]

## 🧠 Visualization
[Short guided imagery script]

## 💭 Positive Affirmation
"[A powerful, simple affirmation]"
  `,

  [ToolId.EXAM_RELIEF]: `
You are a calm, reassuring counselor helping a student with exam anxiety.
TOPIC/EXAM: {TOPIC}
ANXIETY LEVEL: {STRESS_LEVEL}/10

TASK:
Provide immediate grounding techniques and CBT (Cognitive Behavioral Therapy) based reassurance.

OUTPUT FORMAT:
# 😌 Anxiety Relief: {TOPIC}

**You are not alone. Let's ground ourselves.**

## 🦶 5-4-3-2-1 Grounding Technique
- **5** things you see: [Suggestions]
- **4** things you feel: [Suggestions]
- ...

## 🧠 Reframing Thoughts
*Anxious Thought*: "I will fail."
*Helpful Truth*: "[Reframed perspective]"

## 🛡️ Quick Tip
[One actionable tip for the exam hall]
  `,

  [ToolId.MOTIVATOR]: `
You are a high-energy motivational coach.
GOAL: {TOPIC}
CURRENT FEELING: {MOOD}

TASK:
Give a customized, punchy pep talk to boost the student's morale immediately.

OUTPUT FORMAT:
# 🦁 Pep Talk

**Hey Champion!**
[Energetic, personalized message acknowledging their mood but pivoting to action]

## 🚀 Your Superpower
[Identify a strength based on their goal]

## ⚡ 3-Step Power Plan
1. [Tiny step 1]
2. [Tiny step 2]
3. [Win!]
  `,

  [ToolId.BREAK_ZONE]: `
You are a smart break management assistant.
STUDY DURATION: {STUDY_HOURS} hours
CURRENT ENERGY: {MOOD}

TASK:
Suggest 3 specific "Non-Screen" break activities that match the student's energy level.

OUTPUT FORMAT:
# ☕ Smart Break Recommendations
**Status**: You've worked hard for {STUDY_HOURS} hours!

## 1. The Body Refresher (Active)
[Physical activity suggestion]

## 2. The Brain Reset (Creative)
[Creative/Mental rest suggestion]

## 3. The Quick Recharge (Relaxing)
[Low energy suggestion]

*Pick one and set a timer for 15 minutes!*
  `
};
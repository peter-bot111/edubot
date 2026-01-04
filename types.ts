export enum ToolId {
  AI_TUTOR = 'ai_tutor',
  WRITING_ASSISTANT = 'writing_assistant',
  SCORE_PREDICTOR = 'score_predictor',
  DOUBT_SOLVER = 'doubt_solver',
  LESSON_SUMMARY = 'lesson_summary',
  STUDY_SCHEDULER = 'study_scheduler',
  EXAM_GENERATOR = 'exam_generator',
  PERFORMANCE_ANALYSIS = 'performance_analysis',
  SIMPLIFIER = 'simplifier',
  MOTIVATOR = 'motivator',
  // Materials Library
  PDF_NOTES = 'pdf_notes',
  VIDEO_LESSONS = 'video_lessons',
  PRACTICE_EXERCISES = 'practice_exercises',
  VISUAL_DIAGRAMS = 'visual_diagrams',
  AUDIO_NOTES = 'audio_notes',
  QUICK_SUMMARIES = 'quick_summaries',
  // Quick View Generators
  AUDIO_OVERVIEW = 'audio_overview',
  VIDEO_OVERVIEW = 'video_overview',
  MIND_MAP = 'mind_map',
  REPORT_GENERATOR = 'report_generator',
  FLASHCARD_GENERATOR = 'flashcard_generator',
  INTERACTIVE_QUIZ = 'interactive_quiz',
  // Interactive Learning
  VIRTUAL_LAB = 'virtual_lab',
  AR_3D_MODEL = 'ar_3d_model',
  GAMIFIED_JOURNEY = 'gamified_journey',
  REAL_WORLD_VIDEO = 'real_world_video',
  // Social Features
  STUDY_BUDDY = 'study_buddy',
  DOUBT_COMMUNITY = 'doubt_community',
  VIRTUAL_STUDY_ROOM = 'virtual_study_room',
  PTS_PLATFORM = 'pts_platform',
  // Mental Health
  WELLNESS_COACH = 'wellness_coach',
  EXAM_RELIEF = 'exam_relief',
  BREAK_ZONE = 'break_zone'
}

export type ClassLevelGroup = 'PRIMARY' | 'MIDDLE' | 'HIGH';

export interface StudentProfile {
  name: string;
  classNumber: string;
  subjects: string[];
  learningPace: 'SLOW' | 'MEDIUM' | 'FAST';
  weakSubjects: string[];
  strongSubjects: string[];
  learningStyle: 'VISUAL' | 'AUDITORY' | 'READING' | 'INTERACTIVE';
  primaryGoal?: string;
  accessibility: {
    dyslexiaFriendly: boolean;
    highContrast: boolean;
  };
  region: 'Tamil Nadu' | 'General';
  xp: number;
  stars: number;
  avatar?: string;
}

export interface DailyChallengeTask {
  id: string;
  title: string;
  description: string;
  toolId: ToolId;
  rewardXp: number;
  rewardStars: number;
  completed: boolean;
  claimed: boolean;
}

export interface ToolConfig {
  id: ToolId;
  name: string;
  icon: string;
  description: string;
  color: string;
  cardGradient: string;
  category: string;
  status: string;
}

export interface Message {
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export interface ChartDataPoint {
  subject: string;
  score: number;
  fullMark: number;
}

export interface Achievement {
  id: string;
  name: string;
  icon: string;
  description: string;
  dateEarned?: string;
  locked: boolean;
}

export interface Goal {
  id: string;
  title: string;
  progress: number; // 0-100
  targetDate: string;
  type: 'Academic' | 'Habit' | 'Exam';
}
import { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  Mic, 
  MicOff, 
  Send, 
  ArrowRight, 
  Target, 
  AlertCircle, 
  CheckCircle2, 
  BarChart3, 
  Sparkles,
  RefreshCcw,
  LayoutDashboard,
  ChevronDown,
  Trophy,
  TrendingUp,
  BrainCircuit,
  Award,
  History,
  Info,
  Clock,
  Calendar,
  Trash2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { INTERVIEW_ROLES, ROLE_QUESTIONS, DIFFICULTY_LEVELS, Difficulty } from './constants';
import { AnalysisResult, OverallReport, InterviewSession } from './types';
import { analyzeSession } from './services/geminiService';

// --- LocalStorage Helpers ---
const HISTORY_KEY = 'interview_lens_history';

const saveSessionToHistory = (session: InterviewSession) => {
  const existing = getHistory();
  const updated = [session, ...existing];
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
};

const getHistory = (): InterviewSession[] => {
  const data = localStorage.getItem(HISTORY_KEY);
  return data ? JSON.parse(data) : [];
};

const clearHistory = () => {
  localStorage.removeItem(HISTORY_KEY);
};

// --- Components ---

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 z-50 flex items-center px-6 md:px-12 justify-between">
      <div 
        className="flex items-center gap-3 cursor-pointer group" 
        onClick={() => navigate('/')}
      >
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-all shadow-lg shadow-indigo-200">
          <Target className="text-white w-6 h-6" />
        </div>
        <span className="font-black text-2xl tracking-tighter bg-gradient-to-br from-slate-900 to-slate-600 bg-clip-text text-transparent">
          InterviewLens
        </span>
      </div>

      <nav className="flex items-center gap-8">
        <button 
          onClick={() => navigate('/')} 
          className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" /> Practice
        </button>
        <button 
          onClick={() => navigate('/history')} 
          className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-2"
        >
          <History className="w-4 h-4" /> History
        </button>
      </nav>
    </header>
  );
};

const LandingPage = () => {
  const [selectedRole, setSelectedRole] = useState(INTERVIEW_ROLES[0]);
  const [selectedLevel, setSelectedLevel] = useState<Difficulty>('mid');
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[calc(100vh-80px)]">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-indigo-100 blur-[120px] opacity-60 animate-pulse" />
      <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-violet-100 blur-[120px] opacity-60" />

      <div className="space-y-32 max-w-5xl mx-auto py-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-50 rounded-full text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-100/50 shadow-sm">
            <BrainCircuit className="w-4 h-4" /> Powering next-gen careers
          </div>
          <h1 className="text-7xl font-black tracking-tight text-slate-900 md:text-[9rem] italic leading-[0.85] select-none">
            CRACK THE <span className="text-indigo-600 block md:inline">CODE.</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-semibold">
            The ultimate 5-round technical laboratory. Analyze your patterns and get the hiring blueprint.
          </p>

          <div className="flex justify-center pt-8">
             <div className="flex -space-x-4">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="w-14 h-14 rounded-2xl border-4 border-white bg-slate-100 overflow-hidden shadow-lg transform rotate-[-6deg] even:rotate-[6deg] hover:rotate-0 transition-transform cursor-pointer">
                    <img src={`https://i.pravatar.cc/150?u=${i+20}`} alt="User" />
                  </div>
                ))}
                <div className="w-14 h-14 rounded-2xl border-4 border-white bg-indigo-600 flex items-center justify-center text-white text-xs font-black shadow-lg translate-y-2">
                  +2k
                </div>
             </div>
          </div>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white/90 backdrop-blur-2xl p-10 md:p-16 rounded-[4rem] shadow-[0_32px_64px_-16px_rgba(79,70,229,0.15)] border border-slate-100 space-y-16 relative">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-600 rounded-[3rem] shadow-xl flex items-center justify-center text-white rotate-12">
               <Sparkles className="w-10 h-10" />
            </div>

            <div className="space-y-12">
              {/* Role Selection */}
              <div className="space-y-6 text-center">
                <label className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em]">1. Select Your Domain</label>
                <div className="relative max-w-md mx-auto">
                  <button
                    onClick={() => setIsRoleOpen(!isRoleOpen)}
                    className="w-full p-8 bg-slate-50 border border-slate-200/60 rounded-[2.5rem] text-left flex items-center justify-between hover:border-indigo-300 transition-all shadow-inner group"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-white rounded-[1.5rem] flex items-center justify-center shadow-md text-indigo-600 group-hover:scale-110 transition-transform">
                         <Briefcase className="w-6 h-6" />
                      </div>
                      <span className="font-extrabold text-slate-900 text-xl">{selectedRole.name}</span>
                    </div>
                    <ChevronDown className={`w-6 h-6 text-slate-400 transition-transform duration-500 ${isRoleOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isRoleOpen && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        className="absolute top-full left-0 right-0 mt-6 bg-white rounded-[3rem] shadow-2xl border border-slate-100 p-6 z-30"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {INTERVIEW_ROLES.map(r => (
                            <button 
                              key={r.id} 
                              onClick={() => { setSelectedRole(r); setIsRoleOpen(false); }} 
                              className={`w-full p-5 rounded-[1.5rem] text-left font-black transition-all flex items-center justify-between ${selectedRole.id === r.id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200' : 'hover:bg-slate-50 text-slate-600'}`}
                            >
                              {r.name}
                              {selectedRole.id === r.id && <CheckCircle2 className="w-5 h-5" />}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Level Selection */}
              <div className="space-y-6 text-center">
                <label className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em]">2. Choose Intensity</label>
                <div className="flex flex-wrap justify-center gap-4">
                  {DIFFICULTY_LEVELS.map(level => (
                    <button
                      key={level.id}
                      onClick={() => setSelectedLevel(level.id)}
                      className={`px-8 py-5 rounded-[2rem] border-2 transition-all font-black text-sm uppercase tracking-widest ${
                        selectedLevel === level.id 
                        ? 'bg-slate-900 border-slate-900 text-white shadow-2xl scale-105' 
                        : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300'
                      }`}
                    >
                      {level.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={() => navigate(`/interview/${selectedRole.id}?level=${selectedLevel}`)}
              className="w-full bg-indigo-600 text-white py-8 rounded-[3rem] font-black text-2xl flex items-center justify-center gap-4 hover:bg-indigo-700 active:scale-95 transition-all shadow-2xl shadow-indigo-200 group"
            >
              Start Technical Lab
              <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: <Briefcase />, title: "Technical Focus", desc: "Questions tailored for specialized seniority.", color: "bg-orange-50 text-orange-600" },
            { icon: <Mic />, title: "Voice Radar-AI", desc: "Speak and we analyze your confidence logs.", color: "bg-blue-50 text-blue-600" },
            { icon: <LayoutDashboard />, title: "Fluff Detector", desc: "AI catches overused buzzwords instantly.", color: "bg-purple-50 text-purple-600" },
            { icon: <Award />, title: "Growth Map", desc: "Detailed roadmap to reach high-tier hiring.", color: "bg-green-50 text-green-600" }
          ].map((step, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="bg-white/60 backdrop-blur-sm p-10 rounded-[3rem] border border-slate-100 hover:border-indigo-200 transition-all hover:bg-white hover:shadow-2xl group"
            >
              <div className={`w-16 h-16 rounded-[1.5rem] ${step.color} flex items-center justify-center shrink-0 mb-8 group-hover:scale-110 transition-transform shadow-sm`}>
                {step.icon}
              </div>
              <h4 className="font-black text-slate-900 text-xl mb-3">{step.title}</h4>
              <p className="text-slate-400 text-sm font-semibold leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const HistoryPage = () => {
  const [history, setHistory] = useState<InterviewSession[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleClear = () => {
    if (confirm('Are you sure you want to delete all history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="space-y-12 max-w-5xl mx-auto"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Interview Records</h1>
          <p className="text-slate-500 font-medium">Track your growth through multiple sessions.</p>
        </div>
        {history.length > 0 && (
          <button 
            onClick={handleClear}
            className="flex items-center gap-2 text-red-500 font-bold hover:bg-red-50 px-4 py-2 rounded-xl transition-colors"
          >
            <Trash2 className="w-4 h-4" /> Clear All
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="bg-white p-20 rounded-[3rem] border border-dashed border-slate-200 text-center space-y-6">
          <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-300 mx-auto">
            <Clock className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-slate-900">No sessions recorded yet</h3>
            <p className="text-slate-400 font-medium max-w-xs mx-auto">Start your first interview session to see your progress and reports here.</p>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-black hover:bg-indigo-700 transition-all"
          >
            Start Practice
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((session) => (
            <motion.div 
              key={session.id}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 space-y-6 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-[4rem] flex items-center justify-center translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform">
                 <div className="text-indigo-600 font-black text-xl text-center">
                    {session.overall.hiring_probability}%
                    <span className="block text-[8px] uppercase tracking-widest text-indigo-400">Hiring</span>
                 </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-indigo-600 text-[10px] font-black uppercase tracking-widest">
                  <Calendar className="w-3 h-3" /> {new Date(session.timestamp).toLocaleDateString()}
                </div>
                <h3 className="text-xl font-black text-slate-900">{session.role}</h3>
                <div className="inline-block px-2 py-0.5 bg-slate-100 rounded-md text-[10px] font-bold text-slate-500 uppercase">
                  {session.level}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-50 p-4 rounded-2xl space-y-1">
                   <div className="text-slate-400 text-[8px] font-black uppercase">Substance</div>
                   <div className="font-black text-slate-900">{session.overall.average_score}%</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl space-y-1">
                   <div className="text-slate-400 text-[8px] font-black uppercase">Fluff Index</div>
                   <div className="font-black text-slate-900">{session.overall.total_fluff_average}%</div>
                </div>
              </div>

              <div className="space-y-4">
                 <div className="flex items-center gap-2">
                    <TrendingUp className="text-green-500 w-4 h-4" />
                    <span className="text-slate-700 text-xs font-bold leading-tight">{session.overall.strength}</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <AlertCircle className="text-red-500 w-4 h-4" />
                    <span className="text-slate-700 text-xs font-bold leading-tight">{session.overall.major_gap}</span>
                 </div>
              </div>

              <button 
                onClick={() => {
                   // This is where a detailed view would go
                   alert("Session ID: " + session.id + "\nSteps to improve: " + session.overall.steps_to_improve.join(", "));
                }}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
              >
                View Details <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

const InterviewPage = () => {
  const { roleId } = useParams();
  const [searchParams] = useState(new URLSearchParams(window.location.search));
  const level = (searchParams.get('level') as Difficulty) || 'beginner';
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [view, setView] = useState<'answering' | 'analyzing' | 'reviewing' | 'overall'>('answering');
  
  const [questionResults, setQuestionResults] = useState<AnalysisResult[]>([]);
  const [overallReport, setOverallReport] = useState<OverallReport | null>(null);
  
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const roleQuestions = ROLE_QUESTIONS[roleId || 'web-dev'][level] || [];
    const shuffled = [...roleQuestions].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 5));

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.onresult = (e: any) => {
        let transcript = '';
        for (let i = e.resultIndex; i < e.results.length; i++) {
          transcript += e.results[i][0].transcript;
        }
        setAnswer(prev => prev + ' ' + transcript);
      };
      recognitionRef.current.onend = () => setIsRecording(false);
    }
  }, [roleId, level]);

  const toggleRecording = () => {
    if (isRecording) recognitionRef.current?.stop();
    else { recognitionRef.current?.start(); setIsRecording(true); }
  };

  const handleNextQuestion = () => {
    if (!answer.trim()) return;
    
    const newAnswers = [...userAnswers, answer.trim()];
    setUserAnswers(newAnswers);

    if (currentIndex < 4) {
      setCurrentIndex(currentIndex + 1);
      setAnswer('');
    } else {
      batchAnalyze(newAnswers);
    }
  };

  const batchAnalyze = async (finalAnswers: string[]) => {
    setView('analyzing');
    try {
      const sessions = questions.map((q, i) => ({ question: q, answer: finalAnswers[i] }));
      const role = INTERVIEW_ROLES.find(r => r.id === roleId)?.name || 'Unknown';
      
      const data = await analyzeSession(role, sessions);
      
      if (!data.questionResults || !data.overall) {
        throw new Error("Invalid response from Gemini analysis");
      }

      // Save to History
      const session: InterviewSession = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
        role,
        level,
        overall: data.overall,
        questions,
        answers: finalAnswers,
        results: data.questionResults
      };
      saveSessionToHistory(session);

      setQuestionResults(data.questionResults);
      setOverallReport(data.overall);
      setView('reviewing');
    } catch (e: any) {
      console.error(e);
      alert(`Analysis failed: ${e.message || "Unknown error"}. Returning to landing.`);
      navigate('/');
    }
  };

  const nextReview = () => {
    if (reviewIndex < 4) {
      setReviewIndex(reviewIndex + 1);
    } else {
      setView('overall');
    }
  };

  if (view === 'analyzing') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="w-24 h-24 border-8 border-indigo-100 border-t-indigo-600 rounded-full" />
        <div className="text-center">
          <h2 className="text-3xl font-black text-slate-800">Compiling Full Report...</h2>
          <p className="text-slate-500 font-medium">Cross-referencing 5-round performance.</p>
        </div>
      </div>
    );
  }

  if (view === 'overall' && overallReport) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-5xl mx-auto">
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100 space-y-12">
          <div className="text-center space-y-4">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto" />
            <h2 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter">Final Performance</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 bg-slate-900 text-white rounded-3xl space-y-2">
              <span className="text-slate-400 text-xs font-bold uppercase">Avg Substance</span>
              <div className="text-4xl font-black">{overallReport.average_score}%</div>
            </div>
            <div className="p-8 bg-indigo-600 text-white rounded-3xl space-y-2">
              <span className="text-indigo-200 text-xs font-bold uppercase">Hiring Chance</span>
              <div className="text-4xl font-black">{overallReport.hiring_probability}%</div>
            </div>
            <div className="p-8 bg-amber-500 text-white rounded-3xl space-y-2">
              <span className="text-amber-100 text-xs font-bold uppercase">Generic Tendency</span>
              <div className="text-4xl font-black">{overallReport.total_fluff_average}%</div>
            </div>
          </div>

          <div className="space-y-12 border-t border-slate-100 pt-12">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900">Your Technical Growth Roadmap</h3>
                  <p className="text-slate-500 font-medium">Follow these specific steps to reach the next level.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {overallReport.steps_to_improve?.map((step, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className="flex gap-4 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 group hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all cursor-default"
                  >
                     <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-black shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        {i + 1}
                     </div>
                     <p className="text-slate-700 font-bold text-sm leading-relaxed">{step}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-slate-900 p-10 rounded-[3rem] text-white space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[4rem]" />
                <div className="flex items-center gap-3">
                  <BrainCircuit className="text-indigo-400 w-8 h-8" />
                  <h3 className="text-2xl font-black">Hiring Analysis</h3>
                </div>
                <p className="text-slate-300 font-bold text-lg leading-relaxed relative z-10">
                  {overallReport.improvement_prediction}
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-8 bg-green-50 rounded-[2.5rem] border border-green-100 flex items-center gap-6">
                  <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-green-200">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-green-600 text-xs font-black uppercase tracking-widest mb-1">Key Strength</div>
                    <div className="text-slate-900 font-black text-lg">{overallReport.strength}</div>
                  </div>
                </div>

                <div className="p-8 bg-red-50 rounded-[2.5rem] border border-red-100 flex items-center gap-6">
                  <div className="w-14 h-14 bg-red-500 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-red-200">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-red-600 text-xs font-black uppercase tracking-widest mb-1">Critical Gap</div>
                    <div className="text-slate-900 font-black text-lg">{overallReport.major_gap}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={() => navigate('/')}
            className="w-full py-6 bg-slate-900 text-white rounded-3xl font-black text-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
          >
            Start New Session <RefreshCcw className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    );
  }

  if (view === 'reviewing' && Array.isArray(questionResults) && questionResults.length > 0) {
    const res = questionResults[reviewIndex];
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-indigo-600 font-black uppercase text-sm tracking-widest">Question Breakdown {reviewIndex + 1}/5</h3>
          <div className="flex gap-1">
             {[0,1,2,3,4].map(i => <div key={i} className={`h-2 w-8 rounded-full ${i === reviewIndex ? 'bg-indigo-600' : 'bg-slate-200'}`} />)}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 space-y-6">
          <h2 className="text-2xl font-black text-slate-900">"{questions[reviewIndex]}"</h2>
          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 bg-slate-50 rounded-2xl text-center">
                <div className="text-xs font-bold text-slate-400 uppercase mb-1">Substance</div>
                <div className="text-3xl font-black text-indigo-600">{res.substance_score}%</div>
             </div>
             <div className="p-4 bg-slate-50 rounded-2xl text-center">
                <div className="text-xs font-bold text-slate-400 uppercase mb-1">Fluff</div>
                <div className="text-3xl font-black text-amber-500">{res.fluff_percentage}%</div>
             </div>
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-[2rem] text-white space-y-6">
           <div className="flex items-center gap-3">
             <Award className="text-indigo-400 w-6 h-6" />
             <h4 className="text-lg font-bold">Suggested Response</h4>
           </div>
           <p className="text-slate-300 italic border-l-4 border-indigo-500 pl-6 py-2 leading-relaxed">
             {res.improved_answer}
           </p>
           <button 
             onClick={nextReview}
             className="w-full bg-white text-slate-900 py-4 rounded-xl font-black flex items-center justify-center gap-2"
           >
             {reviewIndex < 4 ? "Next Analysis" : "View Overall Report"} <ArrowRight className="w-5 h-5" />
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-4">
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map(i => (
              <div key={i} className={`h-2 w-12 rounded-full ${i < currentIndex ? 'bg-indigo-600' : i === currentIndex ? 'bg-indigo-600 animate-pulse' : 'bg-slate-200'}`} />
            ))}
          </div>
          <span className="text-sm font-bold text-slate-400">Round {currentIndex + 1}/5</span>
        </div>
        <div className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg font-bold text-xs uppercase tracking-tighter">
          {level} level
        </div>
      </div>

      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100">
          <h2 className="text-3xl font-black text-slate-900 leading-tight">
            "{questions[currentIndex]}"
          </h2>
        </div>
        
        <div className="relative">
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Speak or type your answer..."
            className="w-full min-h-[300px] p-10 bg-white rounded-[2.5rem] shadow-xl border-2 border-slate-100 focus:border-indigo-600 outline-none text-xl leading-relaxed transition-all resize-none"
          />
          <div className="absolute bottom-8 right-8 flex gap-4">
            <button
              onClick={toggleRecording}
              className={`p-5 rounded-full transition-all ${isRecording ? 'bg-red-500 text-white animate-pulse shadow-xl shadow-red-200' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
            >
              {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>
            <button
              onClick={handleNextQuestion}
              disabled={!answer.trim()}
              className="bg-slate-900 text-white py-5 px-10 rounded-2xl font-black shadow-xl hover:bg-indigo-600 disabled:opacity-50 flex items-center gap-2 transition-all active:scale-95"
            >
              {currentIndex < 4 ? "Next Question" : "Complete Session"} <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
        <Header />
        <main className="pt-28 pb-20 px-6">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/interview/:roleId" element={<InterviewPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Laptop,
  Music,
  Send,
  Bot,
  User,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Timer,
  Play,
  Pause
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../locales/translations';

interface AiTutorLabProps {
  language: Language;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const AiTutorLab: React.FC<AiTutorLabProps> = ({ language }) => {
  const t = translations[language];
  const [activeTutor, setActiveTutor] = useState<'english' | 'computer' | 'singing'>('english');
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Riyaz Breathing Timer state
  const [timerSeconds, setTimerSeconds] = useState(15);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const [messages, setMessages] = useState<Record<'english' | 'computer' | 'singing', ChatMessage[]>>({
    english: [
      {
        id: 'msg-eng-welcome',
        role: 'assistant',
        text: 'Hello! I am your SP SOLUTIONS English AI Tutor. Ask me any grammar doubt (Tenses, Prepositions), ask for sentence corrections, practice daily vocabulary, or rehearse job interview questions! How can I assist you today?',
        timestamp: 'Just now',
      },
    ],
    computer: [
      {
        id: 'msg-comp-welcome',
        role: 'assistant',
        text: 'Welcome to the Computer & Coding AI Lab at SP SOLUTIONS! You can ask about Python programming, DCA/ADCA topics, MS Excel formulas, HTML/CSS web design, SQL queries, or modern AI coding tools. What topic are you working on?',
        timestamp: 'Just now',
      },
    ],
    singing: [
      {
        id: 'msg-sing-welcome',
        role: 'assistant',
        text: 'Namaste! I am your Hindi Bollywood Vocal Practice Assistant. I can guide your daily riyaz, breath control (diaphragm breathing), pitch accuracy (Sur), and song delivery. [Notice: Classical singing is excluded; our focus is Bollywood songs and vocal culture. My advice is an educational practice aid, not formal certification].',
        timestamp: 'Just now',
      },
    ],
  });

  const promptSuggestions: Record<'english' | 'computer' | 'singing', string[]> = {
    english: [
      'Explain difference between Present Perfect and Simple Past',
      'Correct this sentence: "He do not knows the answer"',
      'Give me 5 professional words for job interviews with Hindi meaning',
      'How to introduce myself in an English interview?',
    ],
    computer: [
      'Write a simple Python program to calculate student grades',
      'Explain VLOOKUP formula in MS Excel with simple example',
      'What is the difference between DCA and ADCA courses?',
      'How do I make a webpage responsive using CSS Flexbox?',
    ],
    singing: [
      'How to do 15-minute morning riyaz for pitch stabilization?',
      'What are easy Bollywood songs to practice for beginners?',
      'How can I improve my breath support for high pitch notes?',
      'Tips for singing on a live microphone without nervousness',
    ],
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => ({
      ...prev,
      [activeTutor]: [...prev[activeTutor], userMsg],
    }));

    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tutorType: activeTutor,
          message: query,
          language,
          history: messages[activeTutor].slice(-4).map(m => ({ role: m.role, text: m.text })),
        }),
      });

      if (!response.ok) {
        throw new Error('Server error');
      }

      const data = await response.json();
      const botReply: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        text: data.reply || 'Practice daily to master this skill!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => ({
        ...prev,
        [activeTutor]: [...prev[activeTutor], botReply],
      }));
    } catch (err) {
      console.warn('AI Tutor fallback:', err);
      // Fallback response
      const fallbackReply: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        text: `At SP SOLUTIONS Baloda & Online, consistent practice is key. Regarding "${query}": Keep practicing the fundamental rules and consult your instructor during your live classroom or online batch session!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => ({
        ...prev,
        [activeTutor]: [...prev[activeTutor], fallbackReply],
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-lab" className="py-16 sm:py-24 bg-slate-950 border-b border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive 24x7 Learning Lab</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.aiSectionTitle}
          </h2>

          <p className="mt-3 text-base text-slate-300">
            {t.aiSectionSubtitle}
          </p>

          {/* Assistant Disclaimer */}
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-400 shrink-0" />
            <span>{t.aiDisclaimerNote}</span>
          </div>
        </div>

        {/* Tutor Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto mb-8">
          <button
            onClick={() => setActiveTutor('english')}
            className={`flex items-center gap-3 rounded-2xl p-4 border text-left transition-all ${
              activeTutor === 'english'
                ? 'border-blue-500 bg-blue-950/40 text-white shadow-lg shadow-blue-500/10'
                : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <div className={`p-2.5 rounded-xl ${activeTutor === 'english' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-blue-400'}`}>
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">{t.aiEnglishTutorTitle}</div>
              <div className="text-[11px] text-slate-400">Grammar & Speaking drills</div>
            </div>
          </button>

          <button
            onClick={() => setActiveTutor('computer')}
            className={`flex items-center gap-3 rounded-2xl p-4 border text-left transition-all ${
              activeTutor === 'computer'
                ? 'border-emerald-500 bg-emerald-950/40 text-white shadow-lg shadow-emerald-500/10'
                : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <div className={`p-2.5 rounded-xl ${activeTutor === 'computer' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-emerald-400'}`}>
              <Laptop className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">{t.aiComputerTutorTitle}</div>
              <div className="text-[11px] text-slate-400">Python, DCA & Web Dev</div>
            </div>
          </button>

          <button
            onClick={() => setActiveTutor('singing')}
            className={`flex items-center gap-3 rounded-2xl p-4 border text-left transition-all ${
              activeTutor === 'singing'
                ? 'border-amber-500 bg-amber-950/40 text-white shadow-lg shadow-amber-500/10'
                : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <div className={`p-2.5 rounded-xl ${activeTutor === 'singing' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-amber-400'}`}>
              <Music className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">{t.aiSingingAssistantTitle}</div>
              <div className="text-[11px] text-slate-400">Pitch, Breath & Riyaz tips</div>
            </div>
          </button>
        </div>

        {/* Interactive Chat Window */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl overflow-hidden backdrop-blur-xl">
          {/* Chat Window Top Bar */}
          <div className="border-b border-slate-800 bg-slate-950 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span>
                    {activeTutor === 'english' && t.aiEnglishTutorTitle}
                    {activeTutor === 'computer' && t.aiComputerTutorTitle}
                    {activeTutor === 'singing' && t.aiSingingAssistantTitle}
                  </span>
                  <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-[11px] text-slate-400">
                  SP SOLUTIONS Institute AI Assistant • Powered by Gemini AI
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setMessages(prev => ({
                  ...prev,
                  [activeTutor]: [prev[activeTutor][0]],
                }));
              }}
              className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs text-slate-300 hover:bg-slate-700 hover:text-white"
              title="Reset conversation"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Clear</span>
            </button>
          </div>

          {/* Quick Vocal Exercise widget if singing active */}
          {activeTutor === 'singing' && (
            <div className="bg-amber-950/20 border-b border-amber-500/20 px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-amber-300">
                <Timer className="h-4 w-4" />
                <span>
                  <strong>Diaphragm Breath Hold Drill:</strong> Inhale 4s, Hold 7s, Exhale with gentle &apos;Sssss&apos; sound.
                </span>
              </div>
              <div className="text-slate-400 text-[11px]">
                * Classical singing excluded from vocal curriculum.
              </div>
            </div>
          )}

          {/* Messages Stream */}
          <div className="p-6 max-h-[420px] min-h-[300px] overflow-y-auto space-y-4">
            {messages[activeTutor].map(msg => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
                    <Bot className="h-4 w-4" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'border border-slate-800 bg-slate-950/80 text-slate-200'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span
                    className={`mt-1 block text-[10px] ${
                      msg.role === 'user' ? 'text-blue-200' : 'text-slate-500'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {msg.role === 'user' && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start items-center">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 animate-pulse">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-2.5 text-xs text-slate-400 flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-ping" />
                  <span>SP AI Tutor is generating advice...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Prompts Bar */}
          <div className="border-t border-slate-800 bg-slate-950/50 px-6 py-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-semibold text-slate-400 shrink-0">Try asking:</span>
            {promptSuggestions[activeTutor].map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="shrink-0 rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-[11px] text-slate-300 hover:border-blue-500 hover:text-white transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="border-t border-slate-800 bg-slate-950 p-4">
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                placeholder={`Ask ${activeTutor === 'english' ? 'English grammar or interview tips...' : activeTutor === 'computer' ? 'Python, DCA or coding questions...' : 'Bollywood singing, pitch or breathing questions...'}`}
                className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed shadow transition-all"
              >
                <span>Send</span>
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

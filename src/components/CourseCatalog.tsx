import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  BookOpen,
  Laptop,
  Music,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  X,
  FileText,
  Play,
  HelpCircle,
  Award
} from 'lucide-react';
import { Course, Language, CourseCategory, CourseLevel } from '../types';
import { translations } from '../locales/translations';

interface CourseCatalogProps {
  language: Language;
  courses: Course[];
  selectedCourseForModal: Course | null;
  setSelectedCourseForModal: (course: Course | null) => void;
  onEnquireCourse: (courseName: string) => void;
  onOpenDemoBooking: (courseName?: string) => void;
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({
  language,
  courses,
  selectedCourseForModal,
  setSelectedCourseForModal,
  onEnquireCourse,
  onOpenDemoBooking,
}) => {
  const t = translations[language];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch =
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.nameHi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || course.category === selectedCategory;

      const matchesLevel =
        selectedLevel === 'all' || course.level === selectedLevel;

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [courses, searchQuery, selectedCategory, selectedLevel]);

  const getCategoryIcon = (category: CourseCategory) => {
    switch (category) {
      case 'english':
        return <BookOpen className="h-4 w-4 text-blue-400" />;
      case 'computer':
        return <Laptop className="h-4 w-4 text-emerald-400" />;
      case 'singing':
        return <Music className="h-4 w-4 text-amber-400" />;
    }
  };

  return (
    <section id="courses" className="py-16 sm:py-24 bg-slate-900/60 border-b border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400 border border-blue-500/20 mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Full Curriculum & Certification</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {language === 'hi' ? 'सभी कोर्सेज एवं शुल्क' : 'Explore All Courses & Fees'}
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-xl">
              Transparent fees, government recognized certifications, and hybrid learning options in Baloda & Online.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={language === 'hi' ? 'कोर्स खोजें (जैसे English, DCA, Typing...)' : 'Search courses (e.g. English, DCA, Python...)'}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-4 border-b border-slate-800">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: t.btnFilterAll },
              { id: 'english', label: language === 'hi' ? 'अंग्रेजी (English)' : 'English Learning' },
              { id: 'computer', label: language === 'hi' ? 'कंप्यूटर व आईटी (Computer)' : 'Computer & Tech' },
              { id: 'singing', label: language === 'hi' ? 'बॉलीवुड गायन (Vocal)' : 'Hindi Bollywood Vocal' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Level Filter */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Level:</span>
            <select
              value={selectedLevel}
              onChange={e => setSelectedLevel(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-xs text-slate-200 focus:border-blue-500 focus:outline-none"
            >
              <option value="all">All Levels</option>
              <option value="BEGINNER">Beginner</option>
              <option value="INTERMEDIATE">Intermediate</option>
              <option value="ADVANCED">Advanced</option>
            </select>
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map(course => (
            <div
              key={course.id}
              className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-950/70 p-6 hover:border-slate-700 hover:bg-slate-950 transition-all shadow-md"
            >
              <div>
                {/* Header tags */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5 rounded-full bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-300 border border-slate-700">
                    {getCategoryIcon(course.category)}
                    <span className="capitalize">{course.category}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
                    <Clock className="h-3 w-3 text-slate-500" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                  {language === 'hi' ? course.nameHi : course.name}
                </h3>

                <p className="mt-1 text-xs font-medium text-blue-400">
                  {course.subCategory}
                </p>

                <p className="mt-3 text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {language === 'hi' ? course.descriptionHi : course.description}
                </p>

                {/* Highlights */}
                <div className="mt-4 space-y-1.5">
                  {(language === 'hi' ? course.highlightsHi : course.highlights).slice(0, 3).map((h, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing & Actions */}
              <div className="mt-6 border-t border-slate-800/80 pt-4">
                <div className="flex items-baseline justify-between mb-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                      Fee from
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-extrabold text-white">
                        ₹{course.offerPriceOnline}
                      </span>
                      {course.onlineFee > course.offerPriceOnline && (
                        <span className="text-xs text-slate-500 line-through">
                          ₹{course.onlineFee}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Classroom: ₹{course.offerPriceOffline}</span>
                    {course.monthlyFee && (
                      <span className="text-[11px] text-emerald-400 font-medium">₹{course.monthlyFee}/month</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedCourseForModal(course)}
                    className="flex items-center justify-center gap-1 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
                  >
                    <span>{t.btnViewDetails}</span>
                  </button>
                  <button
                    onClick={() => onEnquireCourse(course.name)}
                    className="rounded-xl bg-blue-600 px-3 py-2 text-xs font-bold text-white hover:bg-blue-500 transition-colors shadow"
                  >
                    {t.btnEnquireNow}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-12 text-center">
            <p className="text-slate-400">No courses match your filter criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedLevel('all');
              }}
              className="mt-3 text-xs font-bold text-blue-400 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Syllabus & Course Detail Modal */}
      {selectedCourseForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl text-left">
            <button
              onClick={() => setSelectedCourseForModal(null)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="rounded bg-blue-500/10 px-2 py-0.5 text-xs font-semibold text-blue-400 border border-blue-500/20 uppercase">
                {selectedCourseForModal.category}
              </span>
              <span className="text-xs text-slate-400">• {selectedCourseForModal.duration}</span>
              <span className="text-xs text-slate-400">• Level: {selectedCourseForModal.level}</span>
            </div>

            <h3 className="text-2xl font-bold text-white">
              {language === 'hi' ? selectedCourseForModal.nameHi : selectedCourseForModal.name}
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              {language === 'hi' ? selectedCourseForModal.descriptionHi : selectedCourseForModal.description}
            </p>

            {/* Classical Singing Disclaimer if singing */}
            {selectedCourseForModal.category === 'singing' && (
              <div className="my-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-200">
                <strong>Course Notice:</strong> Classical singing is excluded from this syllabus. Training is centered strictly around Hindi Bollywood film songs, romantic/devotional melodies, microphone dynamics, and vocal culture.
              </div>
            )}

            {/* Modules list */}
            <div className="mt-6">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                Course Modules & Lessons:
              </h4>
              <div className="space-y-3">
                {selectedCourseForModal.modules.map((mod, i) => (
                  <div key={mod.id} className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-blue-400">Module {i + 1}</span>
                      <span className="text-[11px] text-slate-500">{mod.lessons.length} Lessons</span>
                    </div>
                    <h5 className="text-sm font-bold text-white">
                      {language === 'hi' ? mod.titleHi : mod.title}
                    </h5>
                    <p className="text-xs text-slate-400 mt-1">
                      {language === 'hi' ? mod.descriptionHi : mod.description}
                    </p>

                    <div className="mt-3 space-y-1.5 border-t border-slate-800/80 pt-2.5">
                      {mod.lessons.map(les => (
                        <div key={les.id} className="flex items-center justify-between text-xs text-slate-300">
                          <span className="flex items-center gap-1.5 truncate max-w-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                            <span>{language === 'hi' ? les.titleHi : les.title}</span>
                          </span>
                          <span className="text-[10px] text-slate-500 uppercase">{les.type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fee summary box */}
            <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950 p-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div>
                  <div className="text-[10px] text-slate-400">Online Fee</div>
                  <div className="text-base font-bold text-white">₹{selectedCourseForModal.offerPriceOnline}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Classroom Fee</div>
                  <div className="text-base font-bold text-emerald-400">₹{selectedCourseForModal.offerPriceOffline}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Registration</div>
                  <div className="text-base font-bold text-slate-300">₹{selectedCourseForModal.registrationFee}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Monthly Option</div>
                  <div className="text-base font-bold text-amber-400">₹{selectedCourseForModal.monthlyFee || 'N/A'}</div>
                </div>
              </div>
            </div>

            {/* Modal CTAs */}
            <div className="mt-6 flex flex-wrap gap-3 justify-end">
              <button
                onClick={() => {
                  setSelectedCourseForModal(null);
                  onOpenDemoBooking(selectedCourseForModal.name);
                }}
                className="rounded-xl border border-amber-500/50 bg-amber-500/10 px-4 py-2.5 text-xs font-bold text-amber-300 hover:bg-amber-500/20"
              >
                Book Free Demo Session
              </button>
              <button
                onClick={() => {
                  const cName = selectedCourseForModal.name;
                  setSelectedCourseForModal(null);
                  onEnquireCourse(cName);
                }}
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-500 shadow"
              >
                Enquire for Admission
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

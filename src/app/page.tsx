"use client";

import {
    ArrowRight,
    Award,
    BarChart3,
    BookOpen,
    Brain,
    CheckCircle2,
    ChevronRight,
    Clock,
    FileText,
    Gamepad2,
    Heart,
    Lightbulb,
    Menu,
    MessageSquare,
    Mic,
    Play,
    Shield, Sparkles, Star,
    Target,
    TrendingUp,
    Users,
    X,
    Zap
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ───────── Animated counter ───────── */
function AnimatedCounter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const increment = target / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ───────── Scroll reveal wrapper ───────── */
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className} ${delay ? `delay-[${delay}ms]` : ""}`}
    >
      {children}
    </div>
  );
}

/* ───────── Floating particles background ───────── */
const particles = [
  { cls: "w-[60px] h-[60px] left-[10%] top-[15%] bg-gradient-to-br from-indigo-500 to-purple-500 delay-0" },
  { cls: "w-[90px] h-[90px] left-[25%] top-[40%] bg-gradient-to-br from-purple-500 to-violet-500 delay-[1.5s]" },
  { cls: "w-[120px] h-[120px] left-[40%] top-[65%] bg-gradient-to-br from-violet-500 to-pink-500 delay-[3s]" },
  { cls: "w-[150px] h-[150px] left-[55%] top-[15%] bg-gradient-to-br from-indigo-500 to-blue-500 delay-[4.5s]" },
  { cls: "w-[180px] h-[180px] left-[70%] top-[40%] bg-gradient-to-br from-blue-500 to-indigo-500 delay-[6s]" },
  { cls: "w-[210px] h-[210px] left-[85%] top-[65%] bg-gradient-to-br from-purple-500 to-violet-500 delay-[7.5s]" },
];

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <div
          key={i}
          className={`absolute rounded-full mix-blend-multiply filter blur-xl animate-float opacity-20 ${p.cls}`}
        />
      ))}
    </div>
  );
}

/* ───────── Navbar ───────── */
function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/70 backdrop-blur-2xl shadow-lg shadow-slate-900/5 border-b border-white/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all duration-300 group-hover:scale-105">
              <Brain className="w-5 h-5 text-white" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
            </div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">
              Interview<span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">.ai</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 rounded-xl hover:bg-indigo-50/60 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/sign-in"
              className="px-5 py-2.5 text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors rounded-xl hover:bg-slate-50"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="relative px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden group"
            >
              <span className="relative z-10">Get Started Free</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>

          <button className="md:hidden p-2.5 rounded-xl hover:bg-slate-100 transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="bg-white/95 backdrop-blur-2xl border-t border-slate-200/50 shadow-2xl px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block px-4 py-3 text-sm font-medium text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-200 space-y-2">
            <Link href="/sign-in" className="block px-4 py-3 text-sm font-medium text-slate-700 hover:text-indigo-600 rounded-xl transition-colors">
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="block px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-center shadow-lg"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════ */
/*  MAIN PAGE                                                 */
/* ═══════════════════════════════════════════════════════════ */
export default function LandingPage() {
  /* ── data ── */
  const features = [
    { icon: <Mic className="w-6 h-6" />, title: "AI Mock Interviews", description: "Practice with an AI interviewer that adapts to your skill level. Get real-time feedback on your answers, body language, and communication.", gradient: "from-blue-500 to-cyan-500", bg: "bg-blue-50" },
    { icon: <FileText className="w-6 h-6" />, title: "Smart Resume Builder", description: "Create ATS-friendly resumes with AI suggestions. Choose from professional templates and get instant optimization tips.", gradient: "from-emerald-500 to-teal-500", bg: "bg-emerald-50" },
    { icon: <BookOpen className="w-6 h-6" />, title: "Technical Practice Engine", description: "Master DSA, aptitude, and coding with 1000+ curated problems. Track your progress with detailed analytics.", gradient: "from-purple-500 to-pink-500", bg: "bg-purple-50" },
    { icon: <MessageSquare className="w-6 h-6" />, title: "HR Interview Coach", description: "Prepare for behavioral questions with AI-powered coaching. Learn STAR method responses and avoid common red flags.", gradient: "from-orange-500 to-red-500", bg: "bg-orange-50" },
    { icon: <Target className="w-6 h-6" />, title: "Dream Company Prep", description: "Get company-specific preparation for TCS, Infosys, Wipro, Accenture & more with curated question banks and strategies.", gradient: "from-indigo-500 to-blue-500", bg: "bg-indigo-50" },
    { icon: <Gamepad2 className="w-6 h-6" />, title: "Learning Games", description: "Boost your skills through interactive games — vocabulary puzzles, aptitude challenges, and coding quizzes.", gradient: "from-pink-500 to-rose-500", bg: "bg-pink-50" },
    { icon: <Clock className="w-6 h-6" />, title: "Time Machine Analytics", description: "Track your growth over time with detailed performance analytics, strength mapping, and improvement trends.", gradient: "from-amber-500 to-yellow-500", bg: "bg-amber-50" },
    { icon: <Users className="w-6 h-6" />, title: "Soft Skills Training", description: "Develop communication, leadership, and teamwork skills with AI-guided scenarios and real-world simulations.", gradient: "from-teal-500 to-emerald-500", bg: "bg-teal-50" },
    { icon: <BarChart3 className="w-6 h-6" />, title: "Placement Drive Tracker", description: "Stay updated on upcoming placement drives, eligibility criteria, and prepare with company-specific resources.", gradient: "from-violet-500 to-purple-500", bg: "bg-violet-50" },
  ];

  const steps = [
    { step: "01", title: "Create Your Profile", description: "Sign up for free and tell us about your skills, target companies, and career goals.", icon: <Users className="w-7 h-7" /> },
    { step: "02", title: "Practice & Prepare", description: "Take AI mock interviews, solve technical problems, and build your resume with smart tools.", icon: <Brain className="w-7 h-7" /> },
    { step: "03", title: "Get AI Feedback", description: "Receive detailed analysis on your performance — answers, confidence, communication, and areas to improve.", icon: <BarChart3 className="w-7 h-7" /> },
    { step: "04", title: "Land Your Dream Job", description: "Walk into real interviews with confidence. Track your progress and keep improving until you succeed.", icon: <Award className="w-7 h-7" /> },
  ];

  const testimonials = [
    { quote: "Interview.ai completely transformed my placement preparation. The AI mock interviews felt incredibly real, and the feedback helped me crack my dream company on the first attempt!", name: "Priya Sharma", role: "Software Engineer, TCS", avatar: "PS", rating: 5 },
    { quote: "The resume builder and HR interview coach are game-changers. I went from zero confidence to getting 3 placement offers within a month of using this platform.", name: "Rohit Patel", role: "Full Stack Developer, Infosys", avatar: "RP", rating: 5 },
    { quote: "As a college TPO, I recommended Interview.ai to all our students. The placement rate improved by 40% this year. The analytics dashboard gives us incredible insights.", name: "Dr. Ananya Gupta", role: "TPO, Mumbai University", avatar: "AG", rating: 5 },
    { quote: "The technical practice engine with 1000+ problems and the dream company prep section helped me prepare specifically for Wipro's interview pattern. Got selected!", name: "Arjun Menon", role: "Data Analyst, Wipro", avatar: "AM", rating: 5 },
    { quote: "I used the time machine analytics to track my weekly progress. Seeing improvement graphs motivated me to practice daily. Best free platform for placement prep!", name: "Sneha Reddy", role: "Software Developer, Accenture", avatar: "SR", rating: 5 },
    { quote: "The learning games made aptitude preparation fun instead of boring. I improved my quantitative skills without even realizing I was studying. Highly recommend!", name: "Karan Singh", role: "Associate Consultant, Capgemini", avatar: "KS", rating: 5 },
  ];

  const faqs = [
    { q: "Is Interview.ai really free?", a: "Yes! Interview.ai is completely free to use. All features — AI mock interviews, resume builder, technical practice, HR coaching, and more — are available at no cost." },
    { q: "How does the AI mock interview work?", a: "Our AI interviewer asks you relevant questions based on your skills and target role. You can respond via text or voice. After the interview, you get a detailed analysis with scores, feedback, and improvement suggestions." },
    { q: "Which companies does Interview.ai prepare me for?", a: "We have specific preparation tracks for TCS, Infosys, Wipro, Accenture, Capgemini, Cognizant, and many more. Each track includes company-specific questions, patterns, and strategies." },
    { q: "Can I use it on my phone?", a: "Yes! Interview.ai is fully responsive and works on all devices — desktop, tablet, and mobile. Practice anywhere, anytime." },
    { q: "How is this different from other interview prep platforms?", a: "Interview.ai combines AI-powered mock interviews, resume building, HR coaching, technical practice, and analytics — all in one free platform. Most competitors charge for individual features." },
    { q: "Do I need any technical skills to start?", a: "Not at all! Whether you're a beginner or experienced, Interview.ai adapts to your level. Our AI customizes questions and feedback based on your profile." },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const companyLogos = ["TCS", "INFOSYS", "WIPRO", "ACCENTURE", "CAPGEMINI", "COGNIZANT"];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <LandingNavbar />

      {/* ═══════ HERO ═══════ */}
      <section className="relative pt-28 pb-20 lg:pt-40 lg:pb-36 overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-indigo-100/70 via-purple-50/50 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-32 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-blue-100/50 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-purple-100/40 to-transparent rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>

        <FloatingParticles />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Trust badge */}
          <Reveal>
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-lg border border-indigo-100/80 text-indigo-700 text-sm font-medium shadow-lg shadow-indigo-500/5 hover:shadow-indigo-500/10 transition-shadow">
                <div className="flex -space-x-1">
                  {["bg-indigo-500", "bg-purple-500", "bg-pink-500"].map((c, i) => (
                    <div key={i} className={`w-5 h-5 rounded-full ${c} border-2 border-white`} />
                  ))}
                </div>
                <span>Trusted by 10,000+ Students Across India</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </Reveal>

          {/* Hero headline */}
          <Reveal delay={100}>
            <h1 className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
              Your AI-Powered
              <br />
              <span className="relative">
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent bg-[size:200%_auto] animate-gradient">
                  Career Launchpad
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 8C50 2 100 2 150 6C200 10 250 4 298 4" stroke="url(#underline-grad)" strokeWidth="3" strokeLinecap="round" />
                  <defs><linearGradient id="underline-grad" x1="0" y1="0" x2="300" y2="0"><stop stopColor="#6366f1" /><stop offset="1" stopColor="#a855f7" /></linearGradient></defs>
                </svg>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-8 text-center text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              From resume building to mock interviews, technical practice to HR coaching —
              everything you need to crack your dream placement, powered by AI.
              <span className="font-semibold text-indigo-600"> 100% Free.</span>
            </p>
          </Reveal>

          {/* CTA Buttons */}
          <Reveal delay={300}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/sign-up"
                className="group relative px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-2xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Practicing Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              <a
                href="#how-it-works"
                className="group px-8 py-4 text-base font-semibold text-slate-700 bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-2xl hover:border-indigo-300 hover:text-indigo-600 transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 shadow-lg shadow-slate-900/5"
              >
                <Play className="w-5 h-5" />
                See How It Works
              </a>
            </div>
          </Reveal>

          {/* Social proof mini-stats */}
          <Reveal delay={350}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["PS", "RP", "AG", "AM"].map((a, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                      {a}
                    </div>
                  ))}
                </div>
                <span><strong className="text-slate-700">4.9/5</strong> from 500+ reviews</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Setup in 2 minutes</span>
              </div>
            </div>
          </Reveal>

          {/* Hero Dashboard Preview */}
          <Reveal delay={400}>
            <div className="mt-16 lg:mt-20 relative max-w-5xl mx-auto">
              {/* Glow effects */}
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-[2rem] blur-2xl" />
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl" />

              <div className="relative rounded-2xl overflow-hidden border border-white/60 shadow-2xl bg-white/90 backdrop-blur-sm">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-50/80 border-b border-slate-200/60">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                    <div className="w-3 h-3 rounded-full bg-green-400/80" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-white rounded-lg px-4 py-1.5 text-sm text-slate-400 border border-slate-200/60 max-w-md mx-auto text-center flex items-center justify-center gap-2">
                      <Shield className="w-3 h-3 text-emerald-500" />
                      interview-ai.vercel.app/dashboard
                    </div>
                  </div>
                </div>

                {/* Dashboard mockup */}
                <div className="p-6 lg:p-8 bg-gradient-to-br from-slate-50/50 to-white min-h-[300px] lg:min-h-[420px]">
                  {/* Welcome bar */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider">Welcome back</p>
                      <p className="text-lg font-bold text-slate-800">Dashboard Overview</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 text-xs font-semibold">This Week</div>
                      <div className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-500 text-xs font-medium">This Month</div>
                    </div>
                  </div>

                  {/* Stats cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {[
                      { label: "Interviews Done", value: "24", change: "+6", color: "from-blue-500 to-cyan-500", iconBg: "bg-blue-50" },
                      { label: "Avg. Score", value: "87%", change: "+12%", color: "from-emerald-500 to-teal-500", iconBg: "bg-emerald-50" },
                      { label: "Skills Mastered", value: "12", change: "+3", color: "from-purple-500 to-pink-500", iconBg: "bg-purple-50" },
                      { label: "Days Active", value: "45", change: "+7", color: "from-orange-500 to-red-500", iconBg: "bg-orange-50" },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs text-slate-500">{stat.label}</p>
                          <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">{stat.change}</span>
                        </div>
                        <p className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Charts area */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2 bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-sm font-semibold text-slate-700">Performance Trend</p>
                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                      </div>
                      <div className="flex items-end gap-1.5 h-32">
                        {[40, 55, 45, 65, 70, 60, 75, 80, 72, 85, 88, 92].map((h, i) => (
                          <div
                            key={i}
                            className={`flex-1 rounded-t-md transition-all duration-500 hover:opacity-100 bg-gradient-to-t from-indigo-500/90 to-purple-500/70 h-[${h}%] opacity-[${(0.6 + (i / 20)).toFixed(2)}]`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
                      <p className="text-sm font-semibold text-slate-700 mb-4">Upcoming Tasks</p>
                      <div className="space-y-3">
                        {[
                          { label: "TCS Mock Interview", color: "bg-indigo-500" },
                          { label: "Resume Review", color: "bg-emerald-500" },
                          { label: "Aptitude Test", color: "bg-purple-500" },
                          { label: "HR Round Prep", color: "bg-orange-500" },
                        ].map((item) => (
                          <div key={item.label} className="flex items-center gap-3 text-sm group cursor-pointer">
                            <div className={`w-2 h-2 rounded-full ${item.color} group-hover:scale-125 transition-transform`} />
                            <span className="text-slate-600 group-hover:text-slate-900 transition-colors">{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Company logos */}
          <Reveal delay={500}>
            <div className="mt-16 lg:mt-24">
              <p className="text-center text-sm font-medium text-slate-400 uppercase tracking-widest mb-8">
                Prepare for Top Companies
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6">
                {companyLogos.map((company) => (
                  <div
                    key={company}
                    className="group px-6 py-3 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/60 text-slate-400 font-bold text-lg tracking-wide hover:border-indigo-200 hover:text-indigo-500 hover:bg-indigo-50/50 transition-all duration-300 shadow-sm hover:shadow-md cursor-default"
                  >
                    {company}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ FEATURES ═══════ */}
      <section id="features" className="py-24 lg:py-36 bg-gradient-to-b from-slate-50/80 to-white relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50/80 text-indigo-600 text-sm font-semibold mb-5 border border-indigo-100/50">
                <Zap className="w-4 h-4" />
                Powerful Features
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Everything You Need to{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Ace Your Placement
                </span>
              </h2>
              <p className="mt-5 text-lg text-slate-600 leading-relaxed">
                A complete AI-powered platform covering every aspect of placement preparation — from technical skills to soft skills.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, idx) => (
              <Reveal key={feature.title} delay={idx * 70}>
                <div className="group relative bg-white rounded-2xl p-7 border border-slate-200/60 hover:border-indigo-200/80 shadow-sm hover:shadow-xl hover:shadow-indigo-500/[0.07] transition-all duration-400 hover:-translate-y-1.5 h-full">
                  {/* Hover gradient overlay */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-400`} />

                  <div className={`relative inline-flex items-center justify-center w-[52px] h-[52px] rounded-xl bg-gradient-to-br ${feature.gradient} text-white mb-5 shadow-lg`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2.5">{feature.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                  <div className="mt-5 flex items-center text-sm font-semibold text-indigo-600 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
                    Learn more <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ STATS ═══════ */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { value: 10000, suffix: "+", label: "Active Students", icon: <Users className="w-6 h-6" /> },
              { value: 50000, suffix: "+", label: "Interviews Practiced", icon: <Mic className="w-6 h-6" /> },
              { value: 1000, suffix: "+", label: "Practice Problems", icon: <BookOpen className="w-6 h-6" /> },
              { value: 95, suffix: "%", label: "Success Rate", icon: <TrendingUp className="w-6 h-6" /> },
            ].map((stat) => (
              <Reveal key={stat.label}>
                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm text-white mb-4 group-hover:bg-white/20 transition-colors duration-300 border border-white/10">
                    {stat.icon}
                  </div>
                  <div className="text-3xl lg:text-5xl font-extrabold text-white mb-2">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-indigo-200 text-sm font-medium tracking-wide">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ HOW IT WORKS ═══════ */}
      <section id="how-it-works" className="py-24 lg:py-36 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50/80 text-emerald-600 text-sm font-semibold mb-5 border border-emerald-100/50">
                <Lightbulb className="w-4 h-4" />
                Simple Process
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                How Interview.ai{" "}
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Works
                </span>
              </h2>
              <p className="mt-5 text-lg text-slate-600">
                Four simple steps from sign-up to placement success.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Desktop connector */}
            <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-indigo-200 via-purple-200 to-emerald-200" />

            {steps.map((step, idx) => (
              <Reveal key={step.step} delay={idx * 150}>
                <div className="relative text-center group">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-xl font-bold mb-6 shadow-xl shadow-indigo-500/20 relative z-10 group-hover:scale-105 group-hover:shadow-indigo-500/30 transition-all duration-300">
                    {step.icon}
                  </div>
                  <div className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">Step {step.step}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed max-w-xs mx-auto">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ TESTIMONIALS ═══════ */}
      <section id="testimonials" className="py-24 lg:py-36 bg-gradient-to-b from-slate-50/80 to-white relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50/80 text-amber-600 text-sm font-semibold mb-5 border border-amber-100/50">
                <Heart className="w-4 h-4" />
                Student Love
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Loved by Students{" "}
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Across India
                </span>
              </h2>
              <p className="mt-5 text-lg text-slate-600">
                Hear from students and educators who transformed their placement journey with Interview.ai.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((t, idx) => (
              <Reveal key={t.name} delay={idx * 100}>
                <div className="group bg-white rounded-2xl p-7 border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-slate-900/[0.05] transition-all duration-300 h-full flex flex-col hover:-translate-y-1">
                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-6 flex items-center gap-3 pt-5 border-t border-slate-100">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-indigo-500/20">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{t.name}</p>
                      <p className="text-xs text-slate-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FREE BANNER ═══════ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 lg:p-16">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl" />

              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                <div className="text-center lg:text-left max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-5 backdrop-blur-sm border border-white/10">
                    <Shield className="w-4 h-4" />
                    100% Free Forever
                  </div>
                  <h2 className="text-3xl lg:text-5xl font-extrabold text-white mb-5 leading-tight">
                    No Hidden Fees.
                    <br />
                    No Premium Plans.
                    <br />
                    <span className="text-indigo-200">Just Free, Powerful Preparation.</span>
                  </h2>
                  <p className="text-indigo-100 text-lg leading-relaxed">
                    We believe every student deserves access to world-class interview preparation tools, regardless of their financial background.
                  </p>
                </div>
                <div className="flex flex-col gap-4 flex-shrink-0">
                  <Link
                    href="/sign-up"
                    className="group px-10 py-5 text-base font-bold text-indigo-600 bg-white rounded-2xl hover:bg-indigo-50 shadow-2xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2"
                  >
                    Get Started Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <div className="flex items-center justify-center gap-5 text-sm text-indigo-200">
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> No credit card</span>
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> No limits</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <section id="faq" className="py-24 lg:py-36 bg-gradient-to-b from-slate-50/80 to-white relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50/80 text-purple-600 text-sm font-semibold mb-5 border border-purple-100/50">
                <MessageSquare className="w-4 h-4" />
                FAQ
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
                Frequently Asked{" "}
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Questions
                </span>
              </h2>
            </div>
          </Reveal>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <Reveal key={idx} delay={idx * 60}>
                <div className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <button
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-slate-50/50 transition-colors"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  >
                    <span className="font-semibold text-slate-900">{faq.q}</span>
                    <ChevronRight
                      className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                        openFaq === idx ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaq === idx ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="px-6 pb-5 text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FINAL CTA ═══════ */}
      <section className="py-24 lg:py-36 bg-white relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-indigo-50/60 via-purple-50/40 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
                Ready to Crack Your{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Dream Placement?
                </span>
              </h2>
              <p className="text-lg text-slate-600 mb-12 leading-relaxed">
                Join thousands of students who are already preparing smarter with AI. Start your journey today — completely free.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/sign-up"
                  className="group relative px-12 py-5 text-base font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-2xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Practicing Free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> No sign-up fee</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> All features included</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> No credit card</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="bg-slate-900 text-slate-400 pt-20 pb-8 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-14 border-b border-slate-800">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <Brain className="w-4.5 h-4.5 text-white" />
                </div>
                <span className="text-lg font-extrabold text-white tracking-tight">
                  Interview<span className="text-indigo-400">.ai</span>
                </span>
              </Link>
              <p className="text-sm leading-relaxed max-w-xs text-slate-500">
                AI-powered placement preparation platform for engineering students. Making career readiness accessible to everyone.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Product</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#features" className="hover:text-indigo-400 transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-indigo-400 transition-colors">How It Works</a></li>
                <li><a href="#testimonials" className="hover:text-indigo-400 transition-colors">Testimonials</a></li>
                <li><a href="#faq" className="hover:text-indigo-400 transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Platform</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/sign-up" className="hover:text-indigo-400 transition-colors">AI Mock Interviews</Link></li>
                <li><Link href="/sign-up" className="hover:text-indigo-400 transition-colors">Resume Builder</Link></li>
                <li><Link href="/sign-up" className="hover:text-indigo-400 transition-colors">Technical Practice</Link></li>
                <li><Link href="/sign-up" className="hover:text-indigo-400 transition-colors">HR Coach</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} Interview.ai. All rights reserved.</p>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>for students across India</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

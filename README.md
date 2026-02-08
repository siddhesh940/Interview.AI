# 🎯 Interview.ai

### Your Complete AI-Powered Interview Preparation Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk)](https://clerk.dev/)

---

**Interview.ai** is a comprehensive, enterprise-grade interview preparation platform that combines AI-powered mock interviews, gamified learning, aptitude training, soft skills development, resume building, and placement tracking into one seamless experience.

🚀 [Live Demo](#) • 📖 [Documentation](#-table-of-contents) • 🤝 [Contributing](CONTRIBUTING.md)

---

## 📑 Table of Contents

- [🌟 Overview](#-overview)
- [✨ Key Features](#-key-features)
- [🏗️ Project Architecture](#️-project-architecture)
- [🛠️ Technology Stack](#️-technology-stack)
- [📁 Project Structure](#-project-structure)
- [🎯 Feature Details](#-feature-details)
  - [1. AI-Powered Interviews](#1-ai-powered-interviews-)
  - [2. AI Interviewers](#2-ai-interviewers-)
  - [3. Soft Skills Training](#3-soft-skills-training-)
  - [4. HR Interview Coach](#4-hr-interview-coach-)
  - [5. Interview Resource Hub](#5-interview-resource-hub-)
  - [6. Interactive Games](#6-interactive-games-)
  - [7. Aptitude Arena](#7-aptitude-arena-)
  - [8. Dream Company Station](#8-dream-company-station-)
  - [9. Placement Drives](#9-placement-drives-)
  - [10. Resume Builder](#10-resume-builder-)
  - [11. Skill Autofill](#11-skill-autofill-)
  - [12. Time Machine](#12-time-machine-)
  - [13. Technical Practice Engine](#13-technical-practice-engine-)
- [📊 Database Schema](#-database-schema)
- [🔌 API Reference](#-api-reference)
- [🚀 Getting Started](#-getting-started)
- [📦 Dependencies](#-dependencies)
- [🎨 UI Components](#-ui-components)
- [📈 Analytics & Tracking](#-analytics--tracking)
- [🔒 Security](#-security)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🌟 Overview

Interview.ai is designed to be the **ultimate interview preparation companion** for students, freshers, and professionals. The platform addresses every aspect of interview preparation:

### What Makes Interview.ai Special?

| Feature | Description |
|---------|-------------|
| 🤖 **AI Voice Interviews** | Realistic mock interviews with AI interviewers that adapt to your responses |
| 🎮 **Gamified Learning** | 6 interactive games that make learning interview skills fun |
| 📚 **1000+ Questions** | Comprehensive question banks across aptitude, verbal, and logical reasoning |
| 🏢 **Company-Specific Prep** | Tailored preparation for Accenture, TCS, Infosys, Cognizant, Wipro, CapGemini |
| 📊 **Predictive Analytics** | Time Machine feature predicts your interview success probability |
| 📄 **Smart Resume Builder** | ATS-optimized resume creation with AI suggestions |
| 💼 **Live Placement Drives** | Real-time job opportunities with automated scraping |

### Platform Statistics

- **11+ Core Features** covering every interview preparation need
- **1000+ Practice Questions** across all topics
- **6 Interactive Games** for skill building
- **30+ PDF Resources** for in-depth learning
- **6 Company Profiles** with company-specific preparation
- **Multiple AI Interviewers** with unique personalities
- **HR Interview Coach** for HR round mastery

---

## ✨ Key Features

### 🎯 Core Interview Features

```
┌─────────────────────────────────────────────────────────────────┐
│                    INTERVIEW PREPARATION                        │
├─────────────────────────────────────────────────────────────────┤
│  🎙️ AI Mock Interviews    │  Real-time voice interviews         │
│  👥 Multiple Interviewers │  Different personalities & styles   │
│  📊 Performance Analytics │  Detailed scoring and feedback      │
│  🎬 Interview Recording   │  Review and improve                 │
└─────────────────────────────────────────────────────────────────┘
```

### 📚 Learning & Practice

```
┌─────────────────────────────────────────────────────────────────┐
│                    SKILL DEVELOPMENT                            │
├─────────────────────────────────────────────────────────────────┤
│  🧮 Aptitude Arena        │  600+ quantitative & logical Qs     │
│  🗣️ Soft Skills Training  │  Communication, confidence, etc.    │
│  🎮 Interactive Games     │  6 skill-building games             │
│  📄 Resource Hub          │  30+ PDFs and study materials       │
└─────────────────────────────────────────────────────────────────┘
```

### 💼 Career Management

```
┌─────────────────────────────────────────────────────────────────┐
│                    CAREER TOOLS                                 │
├─────────────────────────────────────────────────────────────────┤
│  🏢 Dream Company Station │  Company-specific preparation       │
│  📋 Placement Drives      │  Live job opportunities             │
│  📄 Resume Builder        │  Professional resume creation       │
│  🤖 Skill Autofill        │  Automatic skill extraction         │
│  ⏰ Time Machine          │  Future success prediction          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🏗️ Project Architecture

```
Interview.ai Architecture
═══════════════════════════════════════════════════════════════════

┌──────────────────────────────────────────────────────────────────┐
│                         FRONTEND (Next.js 14)                    │
├──────────────────────────────────────────────────────────────────┤
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐     │
│  │   Pages    │ │ Components │ │  Contexts  │ │   Hooks    │     │
│  │  (App Dir) │ │ (Shadcn)   │ │  (State)   │ │  (Custom)  │     │
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘     │
│                           │                                      │
│                     ┌─────┴─────┐                                │
│                     │ API Routes│                                │
│                     └───────────┘                                │
└──────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│                        BACKEND SERVICES                          │
├──────────────────────────────────────────────────────────────────┤
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐     │
│  │  Supabase  │ │  Retell AI │ │   OpenAI   │ │  LangChain │     │
│  │ (Database) │ │  (Voice)   │ │  (GPT-4)   │ │ (RAG/NLP)  │     │
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘     │
└──────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│                     BACKGROUND SERVICES                          │
├──────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────┐ ┌─────────────────────┐                 │
│  │  Placement Scrapers │ │     Cron Jobs       │                 │
│  │  (6 company sites)  │ │  (Auto-scheduling)  │                 │
│  └─────────────────────┘ └─────────────────────┘                 │
└──────────────────────────────────────────────────────────────────┘
```

### Data Flow

```
User Request → Next.js API → Service Layer → Database/External API → Response
     │                                                                   │
     └───────────────────── React State Update ◄────────────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 14.2.4 | React framework with App Router |
| **React** | 18.x | UI library |
| **TypeScript** | 5.x | Type safety |
| **TailwindCSS** | 3.3.0 | Utility-first styling |
| **Shadcn/UI** | Latest | Component library |
| **Framer Motion** | 11.3.21 | Animations |
| **Radix UI** | Latest | Accessible primitives |
| **NextUI** | 2.4.6 | Additional components |
| **MUI** | 5.18.0 | Material Design components |

### Backend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18+ | Runtime environment |
| **Supabase** | 2.90.1 | PostgreSQL database + Auth |
| **Clerk** | 5.7.5 | Authentication |
| **Prisma** | 5.15.0 | ORM |
| **OpenAI** | 4.6.0 | GPT-4 integration |
| **LangChain** | 0.3.36 | LLM orchestration |
| **Retell AI** | 4.19.0 | Voice AI interviews |

### Development Tools

| Tool | Purpose |
|------|---------|
| **ESLint** | Code linting |
| **Prettier** | Code formatting |
| **Docker** | Containerization |
| **GitHub Actions** | CI/CD |

### Additional Libraries

| Library | Purpose |
|---------|---------|
| **Zustand** | State management |
| **React Query** | Data fetching |
| **Zod** | Schema validation |
| **jsPDF** | PDF generation |
| **html2canvas** | Screenshot capture |
| **Tesseract.js** | OCR for resume parsing |
| **Puppeteer** | Web scraping |

---

## 📁 Project Structure

```
Interview.ai/
├── 📁 .github/                    # GitHub workflows and templates
├── 📁 .vscode/                    # VS Code settings
├── 📁 docs/                       # Documentation
│   └── 📁 architecture/           # Architecture diagrams
├── 📁 public/                     # Static assets
│   ├── 📁 ACCENTURE/              # Accenture resources
│   ├── 📁 CAPGEMINI/              # CapGemini resources
│   ├── 📁 COGNIZANT/              # Cognizant resources
│   ├── 📁 INFOSYS/                # Infosys resources
│   ├── 📁 TCS/                    # TCS resources
│   ├── 📁 WIPRO/                  # Wipro resources
│   ├── 📁 audio/                  # Audio files
│   ├── 📁 company-logos/          # Company logos
│   ├── 📁 images/                 # General images
│   ├── 📁 interviewers/           # Interviewer avatars
│   ├── 📁 InterviewPrep/          # PDF resources (30+ files)
│   ├── 📁 pdfs/                   # Additional PDFs
│   └── 📁 videos/                 # Training videos
├── 📁 server/                     # Backend server
│   ├── 📄 app.js                  # Main server file
│   ├── 📁 config/                 # Server configuration
│   │   └── 📄 supabaseClient.js   # Supabase connection
│   ├── 📁 cron/                   # Scheduled tasks
│   │   └── 📄 scheduler.js        # Placement drive scheduler
│   ├── 📁 scrapers/               # Web scrapers
│   │   ├── 📄 accenture.scraper.js
│   │   ├── 📄 capgemini.scraper.js
│   │   ├── 📄 cognizant.scraper.js
│   │   ├── 📄 infosys.scraper.js
│   │   ├── 📄 tcs.scraper.js
│   │   └── 📄 wipro.scraper.js
│   └── 📁 services/               # Business logic
│       ├── 📄 demo.service.js
│       ├── 📄 eligibility.service.js
│       └── 📄 notification.service.js
├── 📁 sidebarfeatures-readme/     # Feature documentation
│   ├── 📄 README.md               # Index
│   ├── 📄 1_INTERVIEWS.md
│   ├── 📄 2_INTERVIEWERS.md
│   ├── 📄 3_SOFT_SKILLS.md
│   ├── 📄 4_INTERVIEW_RESOURCE_HUB.md
│   ├── 📄 5_GAMES.md
│   ├── 📄 6_APTITUDE_ARENA.md
│   ├── 📄 7_DREAM_COMPANY_STATION.md
│   ├── 📄 8_PLACEMENT_DRIVES.md
│   ├── 📄 9_RESUME_BUILDER.md
│   ├── 📄 10_SKILL_AUTOFILL.md
│   └── 📄 11_TIME_MACHINE.md
├── 📁 src/                        # Source code
│   ├── 📄 middleware.ts           # Next.js middleware
│   ├── 📁 actions/                # Server actions
│   │   └── 📄 parse-pdf.ts        # PDF parsing
│   ├── 📁 app/                    # Next.js App Router
│   │   ├── 📄 globals.css         # Global styles
│   │   ├── 📄 layout.tsx          # Root layout
│   │   ├── 📁 (client)/           # Client routes
│   │   │   ├── 📁 aptitude/       # Aptitude Arena
│   │   │   ├── 📁 dashboard/      # User dashboard
│   │   │   ├── 📁 dream-company/  # Dream Company Station
│   │   │   ├── 📁 games/          # Interactive games
│   │   │   ├── 📁 interview-resources/
│   │   │   ├── 📁 interviews/     # Interview management
│   │   │   ├── 📁 resume-builder/ # Resume Builder
│   │   │   ├── 📁 sign-in/        # Authentication
│   │   │   ├── 📁 sign-up/
│   │   │   ├── 📁 skill-autofill/ # Skill Autofill
│   │   │   └── 📁 time-machine/   # Time Machine
│   │   ├── 📁 (user)/             # User-specific routes
│   │   ├── 📁 api/                # API routes
│   │   ├── 📁 interview/          # Interview pages
│   │   └── 📁 soft-skills/        # Soft Skills pages
│   ├── 📁 components/             # React components
│   │   ├── 📄 CompanyLogos.tsx
│   │   ├── 📄 navbar.tsx
│   │   ├── 📄 providers.tsx
│   │   ├── 📄 sideMenu.tsx
│   │   ├── 📄 SimpleWebCam.tsx
│   │   ├── 📄 theme-toggle.tsx
│   │   ├── 📁 call/               # Interview call components
│   │   ├── 📁 dashboard/          # Dashboard components
│   │   ├── 📁 loaders/            # Loading states
│   │   ├── 📁 resume-builder/     # Resume components
│   │   ├── 📁 resume-templates/   # Resume templates
│   │   └── 📁 ui/                 # Shadcn UI components
│   ├── 📁 config/                 # Configuration
│   │   └── 📄 resume-fields.ts
│   ├── 📁 contexts/               # React contexts
│   │   ├── 📄 AptitudeContext.tsx
│   │   ├── 📄 clients.context.tsx
│   │   ├── 📄 GamesContext.tsx
│   │   ├── 📄 interviewers.context.tsx
│   │   ├── 📄 InterviewResourcesContext.tsx
│   │   ├── 📄 interviews.context.tsx
│   │   ├── 📄 responses.context.tsx
│   │   ├── 📄 ResumeBuilderContext.tsx
│   │   ├── 📄 ResumeContext.tsx
│   │   ├── 📄 SidebarContext.tsx
│   │   └── 📄 SoftSkillsContext.tsx
│   ├── 📁 data/                   # Static data
│   │   ├── 📄 checklist.js
│   │   ├── 📄 games-data.ts       # 1300+ lines
│   │   ├── 📄 games-questions-expanded.ts
│   │   ├── 📄 interview-resources-data.ts
│   │   ├── 📄 logical-reasoning-questions.ts
│   │   ├── 📄 pdf-questions.ts
│   │   ├── 📄 quantitative-data.ts # 590+ lines
│   │   ├── 📄 quiz.js
│   │   ├── 📄 skills-database.ts
│   │   ├── 📄 soft-skills-data.ts
│   │   ├── 📄 tips.js
│   │   └── 📄 verbal-ability-questions.ts # 800+ lines
│   ├── 📁 hooks/                  # Custom React hooks
│   ├── 📁 lib/                    # Utility functions
│   │   ├── 📁 prompts/            # AI prompts
│   │   │   └── 📄 generate-questions.ts
│   │   └── 📄 constants.ts        # App constants
│   ├── 📁 services/               # API services
│   ├── 📁 stores/                 # Zustand stores
│   └── 📁 types/                  # TypeScript types
│       ├── 📄 database.types.ts
│       ├── 📄 interview.ts
│       ├── 📄 interviewer.ts
│       ├── 📄 organization.ts
│       ├── 📄 response.ts
│       ├── 📄 resume-builder.ts
│       ├── 📄 resume.ts
│       ├── 📄 time-machine.ts     # 376 lines
│       └── 📄 user.ts
├── 📁 test/                       # Test files
│   └── 📁 data/                   # Test data
├── 📄 .env.example                # Environment template
├── 📄 .eslintrc.js                # ESLint config
├── 📄 .gitignore
├── 📄 components.json             # Shadcn config
├── 📄 CONTRIBUTING.md
├── 📄 docker-compose.yml
├── 📄 Dockerfile
├── 📄 Makefile
├── 📄 next.config.js
├── 📄 package.json
├── 📄 postcss.config.js
├── 📄 supabase_schema.sql         # Database schema
├── 📄 tailwind.config.ts
└── 📄 tsconfig.json
```

---

## 📸 Screenshots

### Dashboard
![Dashboard](Demo_Images/Dashboard.png)
*Main dashboard showing interview statistics, progress tracking, and quick access to all features*

### AI Mock Interview
![Create Interview](Demo_Images/Create%20Interview.png)
*Interview creation interface with customizable settings*

![Interview Call](Demo_Images/Call.png)
*Live AI interview session with real-time transcription*

![Software Interview](Demo_Images/Software%20Start%20Interview.png)
*Technical interview in progress*

### Aptitude Arena
![Aptitude Arena](Demo_Images/Aptitude%20Arena.png)
*Comprehensive aptitude practice with 1000+ questions*

### Interactive Games
![Games](Demo_Images/Games.png)
*Six gamified learning experiences for skill development*

### HR Interview Coach
![HR Interview Coach](Demo_Images/HR_Interview_Coach.png)
*AI-powered HR interview preparation with answer evaluation*

### Soft Skills Training
![Soft Skills](Demo_Images/Soft_Skill.png)
*Comprehensive soft skills development module*

### Technical Practice Engine
![TechPrep](Demo_Images/TechPrep.png)
*Code practice with Monaco editor and multiple domains*

### Dream Company Station
![Dream Company](Demo_Images/Dream%20Company%20Station.png)
*Company-specific preparation for top recruiters*

### Placement Drives
![Placement Drive](Demo_Images/Placement%20Drive.png)
*Live placement opportunities with automated tracking*

### Resume Builder
![Resume Builder](Demo_Images/Resume%20Builder.png)
*Professional ATS-friendly resume creation*

### Skill Autofill
![Skill Autofill](Demo_Images/Skill%20Autofill.png)
*AI-powered skill extraction from resumes*

### Interview Resource Hub
![Interview Resources](Demo_Images/Interview%20Resource%20Hub.png)
*30+ PDF resources for comprehensive preparation*

### Time Machine Analytics
![Time Machine](Demo_Images/Time%20Machine.png%20.png)
*Predictive analytics and progress tracking*

### AI Question Generation
![Question Generation](Demo_Images/Question%20Generation.png)
*Dynamic question generation using GPT-4*

---

## 🎯 Feature Details

### 1. AI-Powered Interviews 🎙️

The core interview feature powered by Retell AI for realistic voice-based mock interviews.

#### Features

- **Voice-Based Interviews**: Natural conversation with AI
- **Real-time Transcription**: Live speech-to-text
- **Adaptive Questions**: AI adjusts based on your responses
- **Performance Scoring**: Technical, communication, confidence metrics
- **Recording & Playback**: Review your interviews
- **Multiple Durations**: 5, 10, 15, 20+ minute interviews

#### AI Interviewer Prompt Template

```typescript
const RETELL_AGENT_GENERAL_PROMPT = `
You are an interviewer who is an expert in asking follow up questions 
to uncover deeper insights. You have to keep the interview for {{mins}} 
or short.

The name of the person you are interviewing is {{name}}.
The interview objective is {{objective}}.

These are some of the questions you can ask:
{{questions}}

Once you ask a question, make sure you ask a follow up question on it.

Follow the guidelines below when conversing:
- Follow a professional yet friendly tone
- Ask precise and open-ended questions
- The question word count should be 30 words or less
- Make sure you do not repeat any of the questions
- Do not talk about anything not related to the objective
- If the name is given, use it in the conversation
`;
```

#### Interview Types

| Type | Duration | Questions | Best For |
|------|----------|-----------|----------|
| Quick | 5-10 min | 3-5 | Practice |
| Standard | 15-20 min | 6-10 | Preparation |
| Full | 25-30 min | 10-15 | Final prep |

#### Scoring System

```
Overall Score = (Technical × 0.35) + (Communication × 0.30) + 
                (Confidence × 0.20) + (Problem Solving × 0.15)
```

---

### 2. AI Interviewers 👥

Multiple AI interviewer personas with unique characteristics.

#### Available Interviewers

##### Explorer Lisa
```typescript
{
  name: "Explorer Lisa",
  rapport: 7,      // Connection ability
  exploration: 10, // Question depth
  empathy: 7,      // Understanding
  speed: 5,        // Interview pace
  description: "Enthusiastic and empathetic interviewer who loves to explore.
                Delves deep into conversations while maintaining a steady pace."
}
```

##### Empathetic Bob
```typescript
{
  name: "Empathetic Bob",
  rapport: 7,
  exploration: 7,
  empathy: 10,
  speed: 5,
  description: "Go-to empathetic interviewer. Excels at understanding and 
                connecting with people on a deeper level."
}
```

#### Interviewer Metrics Explained

| Metric | Range | Description |
|--------|-------|-------------|
| **Rapport** | 1-10 | How well they build connection |
| **Exploration** | 1-10 | Depth of follow-up questions |
| **Empathy** | 1-10 | Understanding and supportiveness |
| **Speed** | 1-10 | Pace of interview (1=slow, 10=fast) |

#### Type Definition

```typescript
interface Interviewer {
  id: bigint;
  user_id: string;
  created_at: Date;
  name: string;
  rapport: number;
  exploration: number;
  empathy: number;
  speed: number;
  image: string;
  description: string;
  audio: string;
  agent_id: string;
}
```

---

### 3. Soft Skills Training 🎓

Comprehensive training on interpersonal and communication skills.

#### Skills Covered

| Skill | Icon | Color | Topics |
|-------|------|-------|--------|
| **Communication** | MessageCircle | #4f46e5 | STAR method, clarity, structure |
| **Confidence** | Award | #059669 | Power posing, mindset, preparation |
| **Body Language** | Eye | #f59e0b | Posture, eye contact, gestures |
| **Active Listening** | Ear | #ef4444 | Focus, paraphrasing, follow-ups |
| **Professionalism** | Briefcase | #8b5cf6 | Etiquette, timing, respect |

#### Learning Components

Each skill includes:

1. **Videos** - Demonstration and explanation
2. **Tips** - Actionable, mindset, practice tips
3. **Images** - Visual guides
4. **Quiz** - Knowledge verification
5. **Checklist** - Practical action items

#### Sample Quiz Question

```typescript
{
  id: 'comm-q1',
  question: 'What is the STAR method used for?',
  options: [
    'Structured responses',  // ✓ Correct
    'Time management',
    'Salary negotiation',
    'Resume building'
  ],
  correctAnswer: 'Structured responses',
  explanation: 'STAR (Situation, Task, Action, Result) helps you give 
                organized, impactful answers.'
}
```

#### Progress Tracking

```typescript
const PROGRESS_WEIGHTS = {
  VIDEO_WATCHED: 10,      // +10% per video
  CHECKLIST_ITEM: 5,      // +5% per checklist item
  QUIZ_COMPLETED: 20,     // +20% for completing quiz
};
```

---

### 4. HR Interview Coach 👔

Dedicated module for HR round preparation with AI-powered answer evaluation and red flag detection.

#### Features

- **50+ HR Questions** across 6 categories
- **4 Practice Modes** (Quick, Standard, Full, Stress)
- **Answer Builder** to craft and save perfect answers
- **Real-time AI Evaluation** with NLP-based scoring
- **Red Flag Detection** for problematic responses
- **Video Tutorials** with expert guidance
- **HR Readiness Score** tracking overall preparation

#### Question Categories

```typescript
type HRQuestionCategory = 
  | 'personal'               // Introduction, goals, background
  | 'strengths_weaknesses'   // Abilities, improvement areas
  | 'behavioral'             // STAR method scenarios
  | 'policy'                 // Salary, notice period, relocation
  | 'situational'            // Hypothetical workplace scenarios
  | 'company_specific';      // Company culture, why us
```

#### Interview Modes

| Mode | Questions | Best For |
|------|-----------|----------|
| Quick | 3 | Confidence boost |
| Standard | 8 | Balanced practice |
| Full | 12 | Complete simulation |
| Stress | 6 | Pressure handling |

#### AI Evaluation Criteria

```typescript
const evaluationParameters = {
  confidence: 20,          // Self-assurance in responses
  communication: 25,       // Clarity and articulation
  professionalTone: 15,    // Appropriate language
  attitude: 20,            // Positive mindset
  authenticity: 10,        // Genuine responses
  redFlagCheck: 10         // Avoiding problematic patterns
};
```

#### Red Flags Detected

| Red Flag | Description |
|----------|-------------|
| Negativity | Badmouthing employers, negative language |
| Rigidity | "Never", "impossible", inflexibility |
| Arrogance | Over-confidence, "I'm the best" |
| Unrealistic | Extreme salary expectations |
| Vagueness | "Maybe", "I guess", uncertainty |

#### Answer Scoring Logic

```typescript
// Base score starts at 50%
baseScore += idealPointsMatched * 0.25;  // Ideal points contribution
baseScore += specificityBonus;            // +10 for specific examples
baseScore += structureBonus;              // +10 for good structure
baseScore += starBonus;                   // +15 for STAR method
baseScore -= redFlagPenalty;              // -15 per red flag
baseScore -= vaguePenalty;                // -25 for vague answers
baseScore -= tooShortPenalty;             // -30 if < 20 words
```

#### Video Learning Sections

| Section | Videos | Content |
|---------|--------|---------|
| HR Round Basics | 3 | Introduction, mindset, expectations |
| Common Questions | 3 | Tell me about yourself, salary, etc. |
| Confidence Tips | 3 | Body language, tone, delivery |

---

### 5. Interview Resource Hub 📚

Comprehensive library of interview preparation materials.

#### Resource Categories

```typescript
type PDFCategory = 
  | 'programming-languages'     // Java, JavaScript, Python, C
  | 'backend-frameworks'        // Node.js, Express.js, MongoDB
  | 'databases-sql'             // DBMS, SQL Queries
  | 'dsa-coding'                // Data Structures & Algorithms
  | 'web-development'           // Frontend, Full Stack
  | 'comprehensive-general';    // Mixed Materials
```

#### Available Resources (30+ PDFs)

##### Programming Languages
| Resource | Difficulty | Tags |
|----------|------------|------|
| Java Interview Questions | Intermediate | Java, OOP, Core Java |
| 100 JavaScript Questions | Intermediate | JavaScript, ES6, Frontend |
| 100 Python Questions | Intermediate | Python, Data Science |
| C Programming Notes | Beginner | C, Basics |
| CSS Interview Questions | Beginner | CSS, Styling |
| HTML Interview Q&A | Beginner | HTML, Web |

##### Backend & Frameworks
| Resource | Difficulty | Tags |
|----------|------------|------|
| Node.js Interview Q&A | Intermediate | Node.js, Backend, API |
| Express.js Interview Q&A | Intermediate | Express, REST, Middleware |
| MongoDB Interview Questions | Intermediate | MongoDB, NoSQL |
| MongoDB Basic to Advanced | Advanced | MongoDB, Advanced |

##### Databases & SQL
| Resource | Difficulty | Tags |
|----------|------------|------|
| DBMS Interview Guide | Intermediate | DBMS, SQL |
| SQL Cheat Sheet | Beginner | SQL, Queries |

##### DSA & Coding
| Resource | Difficulty | Tags |
|----------|------------|------|
| Cracking the Coding Interview | Advanced | DSA, Algorithms |
| Coding Practice Problems | Intermediate | Practice, Problems |

#### Resource Type Definition

```typescript
interface PDFResource {
  id: string;
  title: string;
  category: PDFCategory;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  filePath: string;
  fileName: string;
  description?: string;
  pages?: number;
}
```

---

### 6. Interactive Games 🎮

Six gamified learning experiences for interview skill development.

#### Game List

| Game | Subtitle | Skill | Time |
|------|----------|-------|------|
| **Fix the Bad Answer** | Correction Challenge | Communication | 15 mins |
| **Keyword Hunt** | Fast Technical Recall | Technical | 5 mins |
| **Rephrase Me** | Vocabulary Builder | Communication | 10 mins |
| **Answer Builder** | Sentence Construction | Communication | 12 mins |
| **Keyword Mapping** | Concept Matching | Technical | 8 mins |
| **Truth or Bluff** | Fact Verification | Technical | 10 mins |

#### Game Configurations

```typescript
interface GameConfig {
  id: GameId;
  name: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  skillCategory: SkillCategory;
  estimatedTime: string;
  difficultySettings: {
    beginner: { scoringStrictness: number; timeBonus: number };
    intermediate: { scoringStrictness: number; timeBonus: number };
    advanced: { scoringStrictness: number; timeBonus: number };
  };
}
```

#### Difficulty Settings

| Difficulty | Strictness | Time Bonus |
|------------|------------|------------|
| Beginner | 0.7x | 1.0x |
| Intermediate | 1.0x | 1.2x |
| Advanced | 1.3x | 1.5x |

#### Game 1: Fix the Bad Answer

Transform weak interview responses into professional answers.

**Example:**
```typescript
{
  id: 'ba-hr-b1',
  pool: 'hr',
  difficulty: 'beginner',
  badAnswer: "I don't know much about it, honestly.",
  context: "Tell me about yourself",
  idealAnswer: "I'm a dedicated professional with a strong foundation in 
               [field]. I've developed my expertise through academic 
               projects and practical experience, focusing on continuous 
               learning and skill development.",
  keywords: ['dedicated', 'professional', 'expertise', 'experience'],
  skillFocus: 'communication',
}
```

#### Game 2: Answer Builder

Arrange sentence blocks in the correct order using STAR method.

**Example:**
```typescript
{
  interviewQuestion: 'Describe a challenging project you worked on.',
  blocks: [
    'The project had a tight two-week deadline.',
    'I led a team of four developers',
    'and implemented daily standups and sprint planning.',
    'As a result, we delivered on time with zero critical bugs.',
    'I learned the importance of agile methodologies.',
  ],
  correctOrder: [0, 1, 2, 3, 4],
  idealAnswer: 'The project had a tight two-week deadline. I led a team 
               of four developers and implemented daily standups and 
               sprint planning...'
}
```

#### Game 3: Rephrase Me

Transform basic statements into professional language.

**Example:**
```typescript
{
  original: "I worked on some projects.",
  idealRewrite: "I successfully planned and executed several academic 
                and technical projects, taking responsibility for 
                research, development, and delivery while collaborating 
                with my team to achieve strong outcomes.",
  keyImprovements: ['Added specific details', 'Used action verbs', 
                    'Showed responsibility'],
}
```

#### Game 4: Truth or Bluff

Identify correct/incorrect statements.

**Example:**
```typescript
{
  statement: 'Arriving 5-10 minutes early to an interview shows 
             professionalism.',
  answer: 'correct',
  explanation: 'Being slightly early demonstrates respect for the 
               interviewer\'s time and good planning.',
}
```

---

### 7. Aptitude Arena 🧮

Comprehensive aptitude training with 1000+ questions.

#### Topics Covered

##### Quantitative Aptitude (10 Topics)
| Topic | Questions | Description |
|-------|-----------|-------------|
| Number System | 10 | Prime, factors, HCF, LCM |
| Percentages | 10 | Calculations, changes |
| Profit & Loss | 10 | Business math |
| Simple Interest | 10 | Time-value calculations |
| Compound Interest | 10 | Exponential growth |
| Ratio & Proportion | 10 | Comparisons |
| Time & Work | 10 | Productivity problems |
| Time, Speed & Distance | 10 | Motion problems |
| Averages | 10 | Mean calculations |
| Ages | 10 | Age-based problems |

##### Verbal Ability (6 Topics)
| Topic | Questions | Description |
|-------|-----------|-------------|
| Reading Comprehension | 10 | Passage analysis |
| Synonyms | 10 | Word meanings |
| Antonyms | 10 | Opposite meanings |
| Sentence Correction | 10 | Grammar |
| Para Jumbles | 10 | Ordering |
| Analogies | 10 | Relationships |

##### Logical Reasoning (6 Topics)
| Topic | Questions | Description |
|-------|-----------|-------------|
| Series & Sequences | 10 | Patterns |
| Analogies | 10 | Relationships |
| Classification | 10 | Odd one out |
| Coding-Decoding | 10 | Codes |
| Blood Relations | 10 | Family |
| Direction Sense | 10 | Navigation |
| Syllogism | 10 | Logic |
| Arrangements | 10 | Seating |

#### Question Structure

```typescript
interface Question {
  id: number;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}
```

#### Topic Information Structure

```typescript
interface TopicInfo {
  id: string;
  name: string;
  description: string;
  introduction: string;
  importance: string;
  formulas: string[];
  shortcuts: string[];
  commonMistakes: string[];
  questions: Question[];
}
```

#### Sample Topic: Number System

```typescript
{
  id: "number-system",
  name: "Number System",
  description: "Foundation of mathematics covering different types of 
               numbers and their properties",
  formulas: [
    "HCF × LCM = Product of two numbers",
    "Number of factors of N = (a+1)(b+1)(c+1) where N = p^a × q^b × r^c",
    "Sum of first n natural numbers = n(n+1)/2",
    "Sum of first n odd numbers = n²",
    "Sum of first n even numbers = n(n+1)",
  ],
  shortcuts: [
    "For divisibility by 9: Sum of digits should be divisible by 9",
    "For divisibility by 11: Alternate sum of digits should be 0 or 
     divisible by 11",
    "Unit digit pattern repeats every 4 powers for most numbers",
    "Perfect squares end only in 0,1,4,5,6,9",
  ],
  commonMistakes: [
    "Confusing HCF and LCM concepts",
    "Forgetting that 1 is neither prime nor composite",
    "Not applying divisibility rules correctly",
  ],
}
```

---

### 8. Dream Company Station 🏢

Company-specific preparation for major IT companies.

#### Supported Companies

| Company | Focus | Difficulty | Prep Time |
|---------|-------|------------|-----------|
| **Accenture** | Aptitude + Coding | Easy | 5-6 days |
| **TCS** | Aptitude + Verbal | Hard | 6-8 days |
| **Infosys** | Aptitude + Verbal | Medium | 5-7 days |
| **Cognizant** | Aptitude + Coding | Easy | 5-6 days |
| **Wipro** | Technical + Aptitude | Easy | 5-6 days |
| **CapGemini** | Technical + Pseudo-code | Hard | 5-6 days |

#### Company Profiles

```typescript
const companyDetails = {
  'accenture': { 
    focus: 'Aptitude + Coding', 
    prepTime: '5–6 days', 
    contentTypes: ['Aptitude', 'Technical', 'Previous Papers'], 
    difficulty: 'Easy', 
    idealFor: 'Freshers' 
  },
  'tcs': { 
    focus: 'Aptitude + Verbal', 
    prepTime: '6–8 days', 
    contentTypes: ['Aptitude', 'Verbal', 'Previous Papers'], 
    difficulty: 'Hard', 
    idealFor: 'Strong Aptitude' 
  },
  // ... more companies
};
```

#### Interview Patterns

##### Accenture
```
Round 1: Aptitude Test (60 mins)
   ├── Quantitative Reasoning
   ├── Logical Thinking
   └── Verbal Ability

Round 2: Coding Round (45-60 mins)
   ├── 2-3 Coding Problems
   └── Basic to Medium DSA

Round 3: Technical Interview (30-45 mins)
   ├── Project Discussion
   ├── Technical Concepts
   └── Problem Solving

Round 4: HR Interview (20-30 mins)
   ├── Culture Fit
   ├── Soft Skills
   └── Salary Discussion
```

##### TCS (NQT Pattern)
```
National Qualifier Test (NQT):
   ├── Part A: Foundation (85 mins, 85 questions)
   │   ├── Numerical Ability (26 questions)
   │   ├── Verbal Ability (24 questions)
   │   └── Reasoning Ability (30 questions)
   │
   └── Part B: Advanced (Digital Track)
       ├── Advanced Quantitative (5 questions)
       └── Advanced Reasoning (5 questions)
```

#### Company Comparison

| Feature | Cognizant | Wipro | Infosys | Accenture | CapGemini | TCS |
|---------|-----------|-------|---------|-----------|-----------|-----|
| Aptitude | Easy | Easy | Medium | Easy | Hard | Hard |
| Technical | Medium | Medium | Low | Medium | High | Low |
| Coding | Yes | Yes | Optional | Yes | Yes | No |
| Verbal | Medium | Low | High | Low | Low | Medium |
| Fresher Friendly | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ |

---

### 9. Placement Drives 💼

Live job opportunities with automated scraping.

#### Automated Scrapers

```javascript
// server/scrapers/
├── accenture.scraper.js
├── capgemini.scraper.js
├── cognizant.scraper.js
├── infosys.scraper.js
├── tcs.scraper.js
└── wipro.scraper.js
```

#### Scheduler

```javascript
// server/cron/scheduler.js
const scheduler = require('./cron/scheduler');

// Initialize placement drive scheduler
scheduler.init();

// Runs at scheduled intervals to:
// 1. Scrape company career pages
// 2. Extract new job postings
// 3. Update database with new drives
// 4. Send notifications to eligible users
```

#### Drive Information

```typescript
interface PlacementDrive {
  id: string;
  company: string;
  role: string;
  location: string;
  eligibility: {
    degree: string[];
    branches: string[];
    cgpa: number;
    yearOfPassing: number[];
  };
  package: {
    ctc: string;
    base: string;
    bonus?: string;
  };
  selectionProcess: string[];
  applicationDeadline: Date;
  status: 'Open' | 'Closing Soon' | 'Closed';
  postedAt: Date;
}
```

---

### 10. Resume Builder 📄

Professional resume creation with ATS optimization.

#### Resume Sections

```typescript
interface ResumeBuilderData {
  contact: ContactInfo;      // Name, phone, email, LinkedIn, GitHub
  summary: SummaryInfo;      // Professional summary
  skills: SkillsInfo;        // Technical & soft skills
  experience: ExperienceItem[];  // Work history
  projects: ProjectItem[];       // Personal/academic projects
  education: EducationItem[];    // Academic qualifications
  certifications: CertificationItem[];  // Professional certs
  saved: boolean;
}
```

#### Contact Information

```typescript
interface ContactInfo {
  name: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  portfolio?: string;
  location?: string;
}
```

#### Experience Section

```typescript
interface ExperienceItem {
  role: string;        // Job title
  company: string;     // Company name
  location: string;    // City/Remote
  start: string;       // YYYY-MM format
  end: string;         // YYYY-MM or empty for "Present"
  description: string; // Bullet points (use \n for line breaks)
}
```

#### Project Section

```typescript
interface ProjectItem {
  title: string;       // Project name
  url?: string;        // GitHub/Live link
  description: string; // Bullet points
}
```

#### Sample Resume Data

```typescript
const sampleResume: ResumeBuilderData = {
  contact: {
    name: 'Siddhesh Patil',
    phone: '7715954900',
    email: 'patilsiddhesh2810@gmail.com',
    linkedin: 'linkedin.com/in/siddhesh-patil-268b96311',
    github: 'github.com/siddhesh940',
    location: 'Pune, India',
  },
  summary: {
    summary: 'Passionate Computer Engineering student with strong 
             foundation in full-stack web development. Experienced 
             in building responsive web applications using React, 
             Next.js, and modern JavaScript.',
  },
  skills: {
    skills: `Languages: C, C++, JavaScript, Python, SQL
Web Technologies: React.js, Next.js, Node.js, Express.js
Databases: MongoDB, PostgreSQL, Firebase
Tools & Platforms: Git, GitHub, VS Code, Postman, Vercel`,
  },
  experience: [
    {
      role: 'Software Developer Intern',
      company: 'Tech Solutions Inc.',
      location: 'Remote',
      start: '2024-06',
      end: '2024-08',
      description: `• Developed web applications using React.js and Node.js
• Collaborated with team to implement new features
• Participated in code reviews and improved code quality by 20%`,
    },
  ],
  // ... projects, education, certifications
};
```

#### Resume Templates

Multiple professional templates available:
- Modern Blue
- Classic White
- Creative Gradient
- Minimal Clean
- Professional Dark

---

### 11. Skill Autofill 🤖

Automatic skill extraction from various sources.

#### Data Sources

1. **GitHub Integration**
   - Repository analysis
   - Language detection
   - Framework identification
   - Tool recognition

2. **Resume Parsing**
   - OCR with Tesseract.js
   - NLP-based extraction
   - Technology matching

3. **Project Descriptions**
   - Keyword extraction
   - Tech stack identification

#### Skill Categories

```typescript
const skillCategories = {
  languages: ['JavaScript', 'Python', 'Java', 'C++', 'TypeScript', ...],
  frontend: ['React', 'Vue', 'Angular', 'Next.js', 'Tailwind', ...],
  backend: ['Node.js', 'Express', 'Django', 'Spring', 'Flask', ...],
  databases: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', ...],
  cloud: ['AWS', 'Azure', 'GCP', 'Heroku', 'Vercel', ...],
  devops: ['Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', ...],
  tools: ['Git', 'VS Code', 'Postman', 'Jira', 'Figma', ...],
  softSkills: ['Communication', 'Leadership', 'Teamwork', ...],
};
```

#### Proficiency Levels

| Level | Description | Indicators |
|-------|-------------|------------|
| Beginner | Basic knowledge | 1-2 projects, limited use |
| Intermediate | Solid understanding | 3-5 projects, regular use |
| Advanced | Deep expertise | 5+ projects, production use |
| Expert | Master-level | Teaching others, contributions |

---

### 12. Time Machine ⏰

Predictive analytics for interview success.

#### Time Machine Data Structure

```typescript
interface TimeMachineData {
  resumeText: string;
  targetRole: string;
  timeGoal: 30 | 60 | 90;  // days
  interviewScores: InterviewScores;
  strengths: string[];
  weaknesses: string[];
  technicalPatterns: TechnicalPattern[];
  communicationPatterns: CommunicationPattern[];
}
```

#### Interview Scores

```typescript
interface InterviewScores {
  technical: number;      // 0-100
  communication: number;  // 0-100
  confidence: number;     // 0-100
  eyeContact: number;     // 0-100
  problemSolving: number; // 0-100
  overall: number;        // Weighted average
}
```

#### Future Prediction

```typescript
interface FuturePrediction {
  targetRole: string;
  timeframe: string;
  confidence: number;
  skills: FutureSkills;
  projects: FutureProject[];
  jobRole: FutureJobRole;
  salary: FutureSalary;
  achievements: FutureAchievement[];
  roadmap: GrowthRoadmap;
  comparison: BeforeAfterComparison;
  futureResume: FutureResume;
  generatedAt: string;
  version: string;
}
```

#### Salary Prediction

```typescript
interface FutureSalary {
  estimate: string;       // "₹4.5 LPA"
  range: {
    min: number;          // 400000
    max: number;          // 500000
  };
  currency: string;       // "INR"
  timeline: string;       // "6 months"
  growth?: string;        // "+20%"
  reasoning: string;
  factors: string[];
}
```

#### Success Probability Calculation

```
Success Rate = (Technical × 0.30) + 
               (Communication × 0.25) + 
               (Confidence × 0.15) + 
               (Aptitude × 0.20) + 
               (Experience × 0.10)
```

---

### 13. Technical Practice Engine �

Comprehensive technical interview preparation with multiple practice modes.

#### Features

- **5 Practice Modes** for different learning styles
- **Multiple Domains** (DSA, DBMS, OS, OOP, CN, Programming)
- **Difficulty Levels** (Easy, Medium, Hard)
- **Real-time Code Execution** with Monaco Editor
- **AI-Powered Explanations** using GPT-4
- **Progress Tracking** across all domains

#### Practice Modes

| Mode | Description | Best For |
|------|-------------|----------|
| **Coding Practice** | Write and execute code | Hands-on practice |
| **Concept Explanation** | Learn theory with AI | Understanding concepts |
| **Debugging Mode** | Fix buggy code | Error handling skills |
| **Follow-Up Questions** | Deep dive into topics | Interview simulation |
| **Mixed Mode** | Combination of all | Complete preparation |

#### Supported Domains

```typescript
const DOMAINS = {
  'dsa': 'Data Structures & Algorithms',
  'dbms': 'Database Management Systems',
  'os': 'Operating Systems',
  'oop': 'Object-Oriented Programming',
  'cn': 'Computer Networks',
  'programming': 'Programming Languages'
};
```

#### Coding Practice Mode

Features:
- **Monaco Editor** (VS Code editor)
- **Multiple Languages** (JavaScript, Python, Java, C++)
- **Test Cases** with expected output
- **Code Execution** in browser
- **Syntax Highlighting**
- **Auto-completion**

```typescript
interface CodingQuestion {
  id: string;
  domain: Domain;
  difficulty: Difficulty;
  title: string;
  description: string;
  starterCode: {
    javascript: string;
    python: string;
    java: string;
    cpp: string;
  };
  testCases: TestCase[];
  hints: string[];
  solution: string;
  timeComplexity: string;
  spaceComplexity: string;
}
```

#### Concept Explanation Mode

AI-powered explanations with:
- **Interactive Q&A** with GPT-4
- **Visual Diagrams** for complex topics
- **Real-world Examples**
- **Related Concepts** linking
- **Practice Questions** after explanation

#### Debugging Mode

Fix buggy code with:
- **Pre-written Buggy Code**
- **Error Descriptions**
- **Hints System**
- **Step-by-step Debugging**
- **Explanation of Bugs**

#### Progress Tracking

```typescript
interface TechPrepProgress {
  userId: string;
  domain: Domain;
  questionsAttempted: number;
  questionsCorrect: number;
  averageTime: number;
  difficultyBreakdown: {
    easy: { attempted: number; correct: number };
    medium: { attempted: number; correct: number };
    hard: { attempted: number; correct: number };
  };
  lastPracticed: Date;
  streak: number;
}
```

#### Scoring System

```
Score = (Correctness × 0.50) + 
        (Efficiency × 0.25) + 
        (Code Quality × 0.15) + 
        (Time Taken × 0.10)
```

---

## 📊 Database Schema

### Core Tables

```sql
-- Organizations (Companies/Users)
CREATE TABLE organization (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT,
    image_url TEXT,
    allowed_responses_count INTEGER,
    plan plan  -- ENUM: 'free', 'pro', 'free_trial_over'
);

-- Users
CREATE TABLE "user" (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    email TEXT,
    organization_id TEXT REFERENCES organization(id)
);

-- Interviewers (AI Personas)
CREATE TABLE interviewer (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    agent_id TEXT,           -- Retell AI agent ID
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    audio TEXT,
    empathy INTEGER NOT NULL,
    exploration INTEGER NOT NULL,
    rapport INTEGER NOT NULL,
    speed INTEGER NOT NULL
);

-- Interviews
CREATE TABLE interview (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT,
    description TEXT,
    objective TEXT,
    organization_id TEXT REFERENCES organization(id),
    user_id TEXT REFERENCES "user"(id),
    interviewer_id INTEGER REFERENCES interviewer(id),
    is_active BOOLEAN DEFAULT true,
    is_anonymous BOOLEAN DEFAULT false,
    is_archived BOOLEAN DEFAULT false,
    logo_url TEXT,
    theme_color TEXT,
    url TEXT,
    readable_slug TEXT,
    questions JSONB,
    quotes JSONB[],
    insights TEXT[],
    respondents TEXT[],
    question_count INTEGER,
    response_count INTEGER,
    time_duration TEXT
);

-- Interview Responses
CREATE TABLE response (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    interview_id TEXT REFERENCES interview(id),
    name TEXT,
    email TEXT,
    call_id TEXT,
    candidate_status TEXT,
    duration INTEGER,
    details JSONB,
    analytics JSONB,
    is_analysed BOOLEAN DEFAULT false,
    is_ended BOOLEAN DEFAULT false,
    is_viewed BOOLEAN DEFAULT false,
    tab_switch_count INTEGER
);

-- User Feedback
CREATE TABLE feedback (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    interview_id TEXT REFERENCES interview(id),
    email TEXT,
    feedback TEXT,
    satisfaction INTEGER
);

-- Resumes
CREATE TABLE resumes (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    target_role TEXT,
    template TEXT NOT NULL DEFAULT 'modern-blue',
    resume_data JSONB NOT NULL,
    data JSONB
);
```

### Entity Relationship Diagram

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ Organization │────<│     User     │     │  Interviewer │
└──────────────┘     └──────────────┘     └──────────────┘
        │                   │                    │
        │                   │                    │
        ▼                   ▼                    ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Interview  │────>│   Response   │────>│   Feedback   │
└──────────────┘     └──────────────┘     └──────────────┘
        │
        ▼
┌──────────────┐
│    Resume    │
└──────────────┘
```

---

## 🔌 API Reference

### Interview APIs

```typescript
// Create Interview
POST /api/interviews
Body: {
  name: string;
  description: string;
  objective: string;
  interviewer_id: number;
  questions: Question[];
  time_duration: string;
}

// Get Interview
GET /api/interviews/:id

// Update Interview
PATCH /api/interviews/:id

// Delete Interview
DELETE /api/interviews/:id
```

### Response APIs

```typescript
// Get Responses
GET /api/responses?interview_id=xxx

// Get Single Response
GET /api/responses/:id

// Analyze Response
POST /api/responses/:id/analyze
```

### Resume APIs

```typescript
// Create Resume
POST /api/resumes
Body: ResumeBuilderData

// Get Resumes
GET /api/resumes?user_id=xxx

// Update Resume
PUT /api/resumes/:id

// Export PDF
GET /api/resumes/:id/export
```

### AI APIs

```typescript
// Generate Questions
POST /api/ai/generate-questions
Body: {
  context: string;  // Job description
  count: number;    // Number of questions
}

// Analyze Interview
POST /api/ai/analyze
Body: {
  transcript: string;
  questions: Question[];
}

// Time Machine Prediction
POST /api/ai/predict
Body: TimeMachineData
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Clerk account
- Retell AI account (for voice interviews)
- OpenAI API key

### Installation

```bash
# Clone the repository
git clone https://github.com/siddhesh940/Interview.ai-.git

# Navigate to project directory
cd Interview.ai-

# Install dependencies
npm install
# or
yarn install

# Copy environment variables
cp .env.example .env

# Set up environment variables (see below)

# Run development server
npm run dev
# or
yarn dev
```

### Environment Variables

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_xxx
CLERK_SECRET_KEY=sk_xxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

# Retell AI
RETELL_API_KEY=xxx

# OpenAI
OPENAI_API_KEY=sk-xxx

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Database Setup

```bash
# Run Supabase migrations
npx supabase db push

# Or manually run SQL from supabase_schema.sql
```

### Running the Backend Server

```bash
# Start the placement drive scraper/scheduler
cd server
node app.js
```

### Building for Production

```bash
# Build the application
npm run build

# Start production server
npm run start
```

### Docker Deployment

```bash
# Build Docker image
docker build -t interview-ai .

# Run with Docker Compose
docker-compose up -d
```

---

## 📦 Dependencies

### Production Dependencies

```json
{
  "dependencies": {
    // Core
    "next": "^14.2.4",
    "react": "^18",
    "react-dom": "^18",
    
    // Authentication
    "@clerk/nextjs": "^5.7.5",
    "@supabase/supabase-js": "^2.90.1",
    
    // AI/ML
    "openai": "^4.6.0",
    "langchain": "^0.3.36",
    "@langchain/community": "^0.3.57",
    "retell-sdk": "^4.19.0",
    "retell-client-js-sdk": "^2.0.0",
    
    // UI Components
    "@radix-ui/react-*": "various",
    "@nextui-org/react": "^2.4.6",
    "@mui/material": "^5.18.0",
    "lucide-react": "^0.294.0",
    "framer-motion": "^11.3.21",
    
    // Styling
    "tailwindcss": "^3.3.0",
    "tailwind-merge": "^2.1.0",
    "clsx": "^2.0.0",
    
    // Data Handling
    "@tanstack/react-query": "^5.17.15",
    "@tanstack/react-table": "^8.20.1",
    "zustand": "^5.0.9",
    "zod": "^3.22.4",
    
    // PDF/Document
    "jspdf": "^3.0.4",
    "html2canvas": "^1.4.1",
    "html2pdf.js": "^0.12.1",
    "pdf-lib": "^1.17.1",
    "pdf-parse": "^1.1.1",
    "tesseract.js": "^6.0.1",
    
    // Forms
    "react-hook-form": "^7.49.0",
    "@hookform/resolvers": "^3.3.2",
    
    // Utilities
    "date-fns": "^3.6.0",
    "axios": "^1.6.7",
    "nanoid": "^5.0.4",
    "uuid": "^10.0.0",
    
    // Backend
    "node-cron": "^3.0.3",
    "puppeteer": "^21.11.0"
  }
}
```

### Dev Dependencies

```json
{
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "typescript": "^5",
    "eslint": "^8",
    "eslint-config-next": "14.0.3",
    "eslint-config-prettier": "^10.0.1",
    "autoprefixer": "^10.0.1",
    "postcss": "^8",
    "prisma": "^5.15.0"
  }
}
```

---

## 🎨 UI Components

### Shadcn/UI Components Used

| Component | Purpose |
|-----------|---------|
| Button | Actions and CTAs |
| Card | Content containers |
| Dialog | Modals and popups |
| Dropdown Menu | Navigation menus |
| Form | Form controls |
| Input | Text inputs |
| Label | Form labels |
| Progress | Progress indicators |
| Select | Dropdown selections |
| Separator | Visual dividers |
| Slider | Range inputs |
| Switch | Toggle controls |
| Tabs | Tab navigation |
| Toast | Notifications |
| Tooltip | Hover information |

### Custom Components

| Component | File | Purpose |
|-----------|------|---------|
| SideMenu | `sideMenu.tsx` | Navigation sidebar |
| Navbar | `navbar.tsx` | Top navigation |
| CompanyLogos | `CompanyLogos.tsx` | Company logo display |
| SimpleWebCam | `SimpleWebCam.tsx` | Video capture |
| ThemeToggle | `theme-toggle.tsx` | Dark/light mode |
| Providers | `providers.tsx` | Context providers |

---

## 📈 Analytics & Tracking

### User Metrics

- Interview completion rate
- Score progression over time
- Time spent per feature
- Game performance history
- Resume downloads

### Interview Metrics

- Average interview duration
- Questions answered per interview
- Technical vs communication scores
- Confidence trends
- Common weak areas

### Platform Metrics

- Active users
- Feature usage statistics
- Popular resources
- Peak usage times

---

## 🔒 Security

### Authentication

- **Clerk** for user authentication
- JWT-based session management
- OAuth2 support (Google, GitHub)
- Role-based access control

### Data Protection

- **Supabase** Row Level Security
- Encrypted data at rest
- HTTPS everywhere
- Input sanitization

### API Security

- Rate limiting
- CORS configuration
- API key protection
- Request validation with Zod

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow ESLint configuration
- Use TypeScript for all new code
- Write meaningful commit messages
- Add tests for new features

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

### Technologies & Services

- **[Next.js](https://nextjs.org/)** - The React Framework for Production
- **[Supabase](https://supabase.com/)** - Open Source Firebase Alternative
- **[Clerk](https://clerk.dev/)** - User Management & Authentication
- **[OpenAI](https://openai.com/)** - GPT-4 AI Models
- **[Retell AI](https://retellai.com/)** - Voice AI Platform
- **[Vercel](https://vercel.com/)** - Deployment Platform
- **[Shadcn/UI](https://ui.shadcn.com/)** - Beautiful UI Components
- **[TailwindCSS](https://tailwindcss.com/)** - Utility-First CSS Framework

### Inspiration

This project was built to address the challenges faced by students and job seekers in interview preparation, combining the power of AI with comprehensive learning resources.

---

## 📞 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/interview-ai/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/interview-ai/discussions)
- **Email**: support@interviewai.com

---

## 🌟 Star History

If you find this project helpful, please consider giving it a ⭐ on GitHub!

---

**Made with ❤️ for aspiring professionals worldwide**



## 🙏 Acknowledgments

- [Retell AI](https://retellai.com/) for voice AI technology
- [OpenAI](https://openai.com/) for GPT-4
- [Supabase](https://supabase.com/) for database infrastructure
- [Clerk](https://clerk.dev/) for authentication
- [Shadcn/UI](https://ui.shadcn.com/) for UI components
- All contributors and users!

---

### Made with ❤️ by Siddhesh Patil

[⬆ Back to Top](#-interviewai)


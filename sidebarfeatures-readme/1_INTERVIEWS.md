<![CDATA[<div align="center">

# 🎯 AI-Powered Interviews

### Practice Mock Interviews with Advanced AI Technology

[![Feature](https://img.shields.io/badge/Feature-Core-red?style=for-the-badge)]()
[![AI Powered](https://img.shields.io/badge/AI-Retell%20AI-purple?style=for-the-badge)]()
[![Voice](https://img.shields.io/badge/Voice-Enabled-green?style=for-the-badge)]()

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [How It Works](#-how-it-works)
- [Interview Types](#-interview-types)
- [AI Prompt System](#-ai-prompt-system)
- [Scoring System](#-scoring-system)
- [Technical Architecture](#-technical-architecture)
- [User Guide](#-user-guide)
- [Best Practices](#-best-practices)
- [FAQ](#-faq)

---

## 🌟 Overview

The **Interviews** feature is the heart of Interview.ai, providing realistic AI-powered mock interview experiences. Using advanced voice AI technology from **Retell AI**, users can practice speaking naturally with AI interviewers who adapt their questions based on responses.

### What Makes It Special?

| Aspect | Description |
|--------|-------------|
| 🎙️ **Voice Interaction** | Natural, conversational voice interviews |
| 🧠 **Adaptive AI** | Follow-up questions based on your answers |
| 📊 **Real-time Analysis** | Instant feedback and scoring |
| 🎬 **Recording** | Full transcripts and audio recordings |
| ⏱️ **Flexible Duration** | 5-30 minute interview sessions |

---

## ✨ Key Features

### 1. Interview Creation

```
┌─────────────────────────────────────────────┐
│           CREATE NEW INTERVIEW              │
├─────────────────────────────────────────────┤
│  📝 Job Description Input                   │
│     ↓                                       │
│  🤖 AI Question Generation                  │
│     ↓                                       │
│  ⚙️ Configure Settings                      │
│     • Duration (5-30 mins)                  │
│     • Interview Type                        │
│     • Difficulty Level                      │
│     ↓                                       │
│  👤 Select Interviewer                      │
│     ↓                                       │
│  🚀 Start Interview                         │
└─────────────────────────────────────────────┘
```

### 2. Real-time Voice Conversation

- **Speech-to-Text**: Your voice is transcribed in real-time
- **AI Response**: Interviewer responds naturally
- **Follow-ups**: Intelligent follow-up questions
- **Adaptive Flow**: Questions adjust to your responses

### 3. Performance Tracking

| Metric | Description | Weight |
|--------|-------------|--------|
| **Technical Accuracy** | Correctness of answers | 35% |
| **Communication** | Clarity and structure | 30% |
| **Confidence** | Voice tone and delivery | 20% |
| **Problem Solving** | Analytical approach | 15% |

### 4. Post-Interview Analysis

```
┌─────────────────────────────────────────────┐
│         INTERVIEW ANALYSIS REPORT           │
├─────────────────────────────────────────────┤
│  📊 Overall Score: 78/100                   │
│                                             │
│  ✅ Strengths:                              │
│     • Clear communication                   │
│     • Good technical knowledge              │
│                                             │
│  ⚠️ Areas to Improve:                       │
│     • Use more specific examples            │
│     • Reduce filler words                   │
│                                             │
│  📝 Full Transcript Available               │
│  🎵 Audio Recording Saved                   │
└─────────────────────────────────────────────┘
```

---

## 🔄 How It Works

### Step-by-Step Process

```
1. CREATE INTERVIEW
   ├── Enter job description or select template
   ├── AI generates tailored questions
   └── Configure interview settings

2. SELECT INTERVIEWER
   ├── Choose from available AI personas
   ├── Each has unique characteristics
   └── Preview interviewer style

3. START INTERVIEW
   ├── Camera/microphone permission
   ├── Brief introduction from AI
   └── Questions begin

4. DURING INTERVIEW
   ├── Listen to AI questions
   ├── Speak your answers naturally
   ├── AI asks follow-up questions
   └── Tab switches are tracked

5. COMPLETE & ANALYZE
   ├── AI provides summary
   ├── View detailed scoring
   ├── Review transcript
   └── Download recording
```

### Technical Flow

```
User Speaks → Audio Captured → Retell AI Processes → 
AI Generates Response → Text-to-Speech → User Hears Response
```

---

## 📝 Interview Types

### By Focus Area

| Type | Description | Best For |
|------|-------------|----------|
| **HR/Behavioral** | Soft skills, culture fit | All candidates |
| **Technical** | Coding, system design | Engineers |
| **Mixed** | Combination of both | Comprehensive prep |

### By Duration

| Duration | Questions | Ideal For |
|----------|-----------|-----------|
| **Quick (5-10 min)** | 3-5 | Daily practice |
| **Standard (15-20 min)** | 6-10 | Regular prep |
| **Full (25-30 min)** | 10-15 | Final preparation |

### By Difficulty

| Level | Description | AI Behavior |
|-------|-------------|-------------|
| **Easy** | Straightforward questions | Supportive, hints provided |
| **Medium** | Standard interview | Balanced approach |
| **Hard** | Challenging follow-ups | Probing, detailed |

---

## 🤖 AI Prompt System

### Master Prompt Template

The AI interviewer uses a sophisticated prompt system:

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
- If the name is given, use it in the conversation.
`;
```

### Dynamic Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{mins}}` | Interview duration | "10 minutes" |
| `{{name}}` | Candidate name | "Siddhesh" |
| `{{objective}}` | Interview goal | "Assess React.js skills" |
| `{{questions}}` | Question list | "1. Tell me about..." |

---

## 📊 Scoring System

### Overall Score Calculation

```
Overall Score = (Technical × 0.35) + (Communication × 0.30) + 
                (Confidence × 0.20) + (Problem Solving × 0.15)
```

### Individual Metrics

#### Technical Accuracy (35%)
- Correctness of information
- Depth of knowledge shown
- Use of relevant terminology
- Problem-solving approach

#### Communication (30%)
- Clarity of speech
- Structure of answers (STAR method)
- Conciseness
- Avoiding filler words

#### Confidence (20%)
- Voice tone and pace
- Hesitation frequency
- Assertiveness
- Recovery from mistakes

#### Problem Solving (15%)
- Analytical approach
- Breaking down problems
- Logical reasoning
- Creative solutions

### Score Interpretation

| Score Range | Level | Recommendation |
|-------------|-------|----------------|
| 90-100 | Excellent | Interview ready |
| 75-89 | Good | Minor improvements needed |
| 60-74 | Average | Practice specific areas |
| 40-59 | Needs Work | Focus on fundamentals |
| Below 40 | Beginner | Start with basics |

---

## 🏗️ Technical Architecture

### Frontend Components

```
src/
├── app/
│   ├── (client)/interviews/      # Interview pages
│   │   ├── page.tsx              # Interview list
│   │   ├── [id]/page.tsx         # Single interview
│   │   └── new/page.tsx          # Create interview
│   └── interview/                # Active interview
│       └── [call_id]/page.tsx    # Live interview
├── components/
│   ├── call/                     # Call components
│   │   ├── InterviewCall.tsx     # Main call UI
│   │   ├── VoiceVisualizer.tsx   # Audio visualization
│   │   └── TranscriptPanel.tsx   # Live transcript
│   └── dashboard/interview/      # Dashboard components
└── contexts/
    └── interviews.context.tsx    # Interview state
```

### Database Schema

```sql
-- Interviews table
CREATE TABLE interview (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT NOW(),
    name TEXT,
    description TEXT,
    objective TEXT,
    organization_id TEXT REFERENCES organization(id),
    user_id TEXT REFERENCES "user"(id),
    interviewer_id INTEGER REFERENCES interviewer(id),
    is_active BOOLEAN DEFAULT true,
    questions JSONB,
    time_duration TEXT
);

-- Responses table
CREATE TABLE response (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT NOW(),
    interview_id TEXT REFERENCES interview(id),
    call_id TEXT,
    duration INTEGER,
    details JSONB,
    analytics JSONB,
    is_analysed BOOLEAN DEFAULT false,
    tab_switch_count INTEGER
);
```

---

## 📖 User Guide

### Creating Your First Interview

1. **Navigate to Interviews** - Click "Interviews" in sidebar
2. **Enter Details** - Name, description, objective, duration
3. **Generate Questions** - Paste job description or select templates
4. **Select Interviewer** - Choose AI interviewer persona
5. **Start Interview** - Allow microphone access and begin

### During the Interview

```
DO:
✅ Speak clearly and at moderate pace
✅ Use STAR method for behavioral questions
✅ Ask for clarification if needed
✅ Take brief pauses to collect thoughts

DON'T:
❌ Interrupt the interviewer
❌ Give one-word answers
❌ Go off-topic
❌ Switch tabs (it's tracked!)
```

---

## 💡 Best Practices

### STAR Method Structure

```
S - SITUATION: Set the context (10%)
    "In my previous role at XYZ company..."

T - TASK: Define your responsibility (15%)
    "I was responsible for..."

A - ACTION: Explain what you did (50%)
    "I approached this by first... then... finally..."

R - RESULT: Share the outcome (25%)
    "As a result, we achieved... I learned..."
```

### Preparation Checklist

```
☐ Quiet environment
☐ Good lighting (if video)
☐ Stable internet connection
☐ Microphone tested
☐ Browser permissions granted
☐ Water nearby
```

---

## ❓ FAQ

**Q: Can I retake the same interview?**
> Yes! You can take the same interview multiple times to practice and track improvement.

**Q: Are my interviews private?**
> Absolutely. All interview data is encrypted and accessible only to you.

**Q: What browsers are supported?**
> Chrome and Edge work best. Safari has limited support for voice features.

**Q: How is the score calculated?**
> Scores combine technical accuracy (35%), communication (30%), confidence (20%), and problem-solving (15%).

---

## 🔗 Related Features

- **[👥 Interviewers](2_INTERVIEWERS.md)** - Learn about AI interviewer personalities
- **[🎓 Soft Skills](3_SOFT_SKILLS.md)** - Improve communication before interviews
- **[🎮 Games](5_GAMES.md)** - Practice answering skills with games

---

<div align="center">

**[⬆ Back to Index](README.md)**

*Last Updated: January 2026*

</div>
]]>

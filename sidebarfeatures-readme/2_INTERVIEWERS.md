<![CDATA[<div align="center">

# 👥 AI Interviewers

### Meet Your AI Interview Practice Partners

[![Feature](https://img.shields.io/badge/Feature-Core-red?style=for-the-badge)]()
[![AI](https://img.shields.io/badge/Personas-2+-blue?style=for-the-badge)]()
[![Customizable](https://img.shields.io/badge/Style-Customizable-green?style=for-the-badge)]()

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Available Interviewers](#-available-interviewers)
- [Interviewer Metrics](#-interviewer-metrics)
- [Choosing the Right Interviewer](#-choosing-the-right-interviewer)
- [Technical Details](#-technical-details)
- [Best Practices](#-best-practices)

---

## 🌟 Overview

Interview.ai features **multiple AI interviewer personas**, each designed with unique characteristics and interviewing styles. This variety helps you prepare for different types of real-world interviewers you might encounter.

### Why Multiple Interviewers?

| Reason | Benefit |
|--------|---------|
| 🎭 **Different Styles** | Prepare for various interviewer personalities |
| 📊 **Skill Focus** | Each emphasizes different evaluation aspects |
| 🔄 **Variety** | Prevent pattern memorization |
| 🎯 **Targeted Practice** | Match interviewer to your needs |

---

## 👤 Available Interviewers

### 1. Explorer Lisa 🔍

```
┌─────────────────────────────────────────┐
│           EXPLORER LISA                  │
├─────────────────────────────────────────┤
│     📊 Metrics:                          │
│     ├── Rapport:      ████████░░ 7/10   │
│     ├── Exploration:  ██████████ 10/10  │
│     ├── Empathy:      ████████░░ 7/10   │
│     └── Speed:        █████░░░░░ 5/10   │
│                                          │
│     🎯 Style: Deep Exploration           │
│     ⏱️ Pace: Moderate                    │
└─────────────────────────────────────────┘
```

#### Configuration

```typescript
{
  name: "Explorer Lisa",
  rapport: 7,
  exploration: 10,
  empathy: 7,
  speed: 5,
  image: "/interviewers/Lisa.png",
  description: "Hi! I'm Lisa, an enthusiastic and empathetic interviewer 
               who loves to explore. With a perfect balance of empathy 
               and rapport, I delve deep into conversations while 
               maintaining a steady pace. Let's embark on this journey 
               together and uncover meaningful insights!",
  audio: "Lisa.wav"
}
```

#### Characteristics

| Trait | Description |
|-------|-------------|
| **Exploration** | Asks deep follow-up questions |
| **Style** | Curious and thorough |
| **Best For** | Detailed technical discussions |
| **Pace** | Takes time to understand fully |

#### Sample Interaction

```
Lisa: "You mentioned you worked on a React project. I'd love to 
       explore that further. What specific challenges did you face 
       with state management, and how did your approach evolve 
       as the project grew?"

[Deep follow-up after your response]

Lisa: "Interesting! You mentioned using Context API initially. 
       What made you consider other options, and what factors 
       influenced your final decision?"
```

---

### 2. Empathetic Bob 💚

```
┌─────────────────────────────────────────┐
│           EMPATHETIC BOB                 │
├─────────────────────────────────────────┤
│     📊 Metrics:                          │
│     ├── Rapport:      ████████░░ 7/10   │
│     ├── Exploration:  ████████░░ 7/10   │
│     ├── Empathy:      ██████████ 10/10  │
│     └── Speed:        █████░░░░░ 5/10   │
│                                          │
│     🎯 Style: Understanding & Supportive │
│     ⏱️ Pace: Patient                     │
└─────────────────────────────────────────┘
```

#### Configuration

```typescript
{
  name: "Empathetic Bob",
  rapport: 7,
  exploration: 7,
  empathy: 10,
  speed: 5,
  image: "/interviewers/Bob.png",
  description: "Hi! I'm Bob, your go-to empathetic interviewer. 
               I excel at understanding and connecting with people 
               on a deeper level, ensuring every conversation is 
               insightful and meaningful. With a focus on empathy, 
               I'm here to listen and learn from you. Let's create 
               a genuine connection!",
  audio: "Bob.wav"
}
```

#### Characteristics

| Trait | Description |
|-------|-------------|
| **Empathy** | Understanding and supportive |
| **Style** | Patient and encouraging |
| **Best For** | Nervous candidates, behavioral interviews |
| **Pace** | Gives time to think |

#### Sample Interaction

```
Bob: "I can understand that was a challenging situation. 
      Take your time to share how you handled it. 
      What was going through your mind at that moment?"

[Supportive follow-up after your response]

Bob: "That shows great resilience. I appreciate you sharing that 
      experience. How did that situation shape your approach 
      to similar challenges later?"
```

---

## 📊 Interviewer Metrics

### Metric Definitions

| Metric | Range | Description |
|--------|-------|-------------|
| **Rapport** | 1-10 | Ability to build connection and make candidate comfortable |
| **Exploration** | 1-10 | Depth of follow-up questions and probing |
| **Empathy** | 1-10 | Understanding and supportiveness level |
| **Speed** | 1-10 | Pace of interview (1 = slow/patient, 10 = fast/rapid) |

### Visual Comparison

```
                Lisa          Bob
Rapport:     ████████░░    ████████░░
Exploration: ██████████    ████████░░
Empathy:     ████████░░    ██████████
Speed:       █████░░░░░    █████░░░░░
```

---

## 🎯 Choosing the Right Interviewer

### Decision Matrix

| Your Need | Recommended | Why |
|-----------|-------------|-----|
| First mock interview | **Bob** | Supportive, patient |
| Technical deep-dive | **Lisa** | High exploration |
| Behavioral practice | **Bob** | Empathetic approach |
| Nervous/anxious | **Bob** | Creates comfort |
| Want challenge | **Lisa** | Probing questions |
| General practice | Either | Both effective |

### By Experience Level

| Level | Recommended Path |
|-------|------------------|
| **Beginner** | Start with Bob → Move to Lisa |
| **Intermediate** | Alternate between both |
| **Advanced** | Focus on Lisa for challenge |
| **Final Prep** | Use both to simulate variety |

---

## 🏗️ Technical Details

### Type Definition

```typescript
interface Interviewer {
  id: bigint;
  user_id: string;
  created_at: Date;
  name: string;
  rapport: number;      // 1-10
  exploration: number;  // 1-10
  empathy: number;      // 1-10
  speed: number;        // 1-10
  image: string;        // Avatar path
  description: string;  // Bio text
  audio: string;        // Voice sample
  agent_id: string;     // Retell AI agent ID
}
```

### Database Schema

```sql
CREATE TABLE interviewer (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    agent_id TEXT,                    -- Retell AI connection
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    audio TEXT,
    empathy INTEGER NOT NULL,         -- 1-10 scale
    exploration INTEGER NOT NULL,     -- 1-10 scale
    rapport INTEGER NOT NULL,         -- 1-10 scale
    speed INTEGER NOT NULL            -- 1-10 scale
);
```

### File Structure

```
src/
├── contexts/
│   └── interviewers.context.tsx     # State management
├── types/
│   └── interviewer.ts               # Type definitions
└── lib/
    └── constants.ts                  # Interviewer configs

public/
└── interviewers/
    ├── Lisa.png                      # Lisa avatar
    ├── Bob.png                       # Bob avatar
    ├── Lisa.wav                      # Lisa voice sample
    └── Bob.wav                       # Bob voice sample
```

---

## 💡 Best Practices

### With Explorer Lisa

```
DO:
✅ Prepare detailed examples
✅ Be ready for "why" questions
✅ Explain your thought process
✅ Expect 2-3 follow-ups per question

DON'T:
❌ Give surface-level answers
❌ Skip technical details
❌ Rush through explanations
```

### With Empathetic Bob

```
DO:
✅ Share genuine experiences
✅ Express emotions in stories
✅ Take time to think
✅ Be honest about challenges

DON'T:
❌ Feel rushed
❌ Give only positive examples
❌ Skip the personal element
```

---

## ❓ FAQ

**Q: Can I create custom interviewers?**
> Currently, custom interviewer creation is not available. Future updates may include this feature.

**Q: Do interviewers remember previous sessions?**
> No, each interview session is independent.

**Q: How are interviewer metrics determined?**
> Metrics are designed based on real interviewer archetypes.

---

## 🔗 Related Features

- **[🎯 Interviews](1_INTERVIEWS.md)** - Use interviewers in mock interviews
- **[🎓 Soft Skills](3_SOFT_SKILLS.md)** - Prepare for different interviewer styles

---

<div align="center">

**[⬆ Back to Index](README.md)**

*Last Updated: January 2026*

</div>
]]>

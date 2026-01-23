<![CDATA[<div align="center">

# 🎮 Interactive Games

### Learn Interview Skills Through Fun Challenges

[![Feature](https://img.shields.io/badge/Feature-Games-purple?style=for-the-badge)]()
[![Games](https://img.shields.io/badge/Games-6-blue?style=for-the-badge)]()
[![Questions](https://img.shields.io/badge/Questions-500+-green?style=for-the-badge)]()

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Available Games](#-available-games)
- [Game Configurations](#-game-configurations)
- [Question Pools](#-question-pools)
- [Scoring System](#-scoring-system)
- [Technical Details](#-technical-details)

---

## 🌟 Overview

The **Games** module transforms interview preparation into engaging, interactive experiences. 6 unique games help you master communication, technical knowledge, and interview skills through gamified learning.

### Why Games?

| Benefit | Description |
|---------|-------------|
| 🎯 **Engagement** | Learning feels like playing |
| 🧠 **Retention** | Gamification improves memory |
| 📈 **Progress** | Visible improvement tracking |
| 🔄 **Repetition** | Practice without boredom |
| ⏱️ **Time Pressure** | Simulate real interview conditions |

---

## 🎮 Available Games

### 1. Fix the Bad Answer ✏️

```typescript
{
  id: 'fix-bad-answer',
  name: 'Fix the Bad Answer',
  subtitle: 'Correction Challenge',
  description: 'Transform weak interview responses into professional, 
               structured answers using STAR method.',
  icon: 'Edit3',
  color: 'indigo',
  skillCategory: 'communication',
  estimatedTime: '15 mins'
}
```

#### How It Works

```
┌─────────────────────────────────────────────┐
│         FIX THE BAD ANSWER                  │
├─────────────────────────────────────────────┤
│  Question: "Tell me about yourself"         │
│                                             │
│  ❌ Bad Answer:                             │
│  "I don't know much about it, honestly."   │
│                                             │
│  📝 Your Task:                              │
│  Write a better, professional answer        │
│                                             │
│  ✅ Ideal Answer:                           │
│  "I'm a dedicated professional with a       │
│  strong foundation in [field]..."           │
│                                             │
│  Keywords to include:                       │
│  • dedicated • professional                 │
│  • expertise • experience                   │
└─────────────────────────────────────────────┘
```

#### Sample Questions

| Pool | Bad Answer | Context |
|------|------------|---------|
| HR | "I don't know much about it, honestly." | Tell me about yourself |
| HR | "I'm not sure why I applied, just trying things." | Why do you want to work here? |
| Technical | "I learned coding from YouTube, so I'm not perfect." | How did you learn programming? |
| Behavioral | "I'm not great at teamwork, I prefer being alone." | How do you work in a team? |

---

### 2. Keyword Hunt 🔍

```typescript
{
  id: 'keyword-hunt',
  name: 'Keyword Hunt',
  subtitle: 'Fast Technical Recall',
  description: 'Test your technical vocabulary under pressure. 
               Build strong conceptual memory.',
  icon: 'Clock',
  color: 'purple',
  skillCategory: 'technical',
  estimatedTime: '5 mins'
}
```

#### How It Works

```
┌─────────────────────────────────────────────┐
│           KEYWORD HUNT                       │
├─────────────────────────────────────────────┤
│  Topic: HTML Basics                          │
│  Time: 45 seconds                            │
│                                              │
│  Type as many related keywords as possible:  │
│                                              │
│  ✅ Found: Tag, Element, Attribute, DOCTYPE │
│  🎁 Bonus: semantic, form, input            │
│                                              │
│  Score: 85/100                               │
└─────────────────────────────────────────────┘
```

#### Topics Available

| Topic | Keywords | Time Limit |
|-------|----------|------------|
| HTML Basics | Tag, Element, Attribute, DOCTYPE, Head, Body... | 45s |
| CSS Fundamentals | Selector, Property, Value, Margin, Padding... | 45s |
| JavaScript Basics | Variable, Function, Array, Object, Loop... | 45s |
| DBMS Transactions | ACID, Atomicity, Consistency, Isolation... | 35s |

---

### 3. Rephrase Me 🔄

```typescript
{
  id: 'rephrase-me',
  name: 'Rephrase Me',
  subtitle: 'Vocabulary Builder',
  description: 'Transform basic statements into polished, 
               professional interview-ready language.',
  icon: 'BookOpen',
  color: 'emerald',
  skillCategory: 'communication',
  estimatedTime: '10 mins'
}
```

#### How It Works

```
┌─────────────────────────────────────────────┐
│           REPHRASE ME                        │
├─────────────────────────────────────────────┤
│  Original Statement:                         │
│  "I worked on some projects."               │
│                                              │
│  📝 Your Professional Rewrite:              │
│  [Text input area]                          │
│                                              │
│  💡 Ideal Rewrite:                          │
│  "I successfully planned and executed        │
│  several academic and technical projects,    │
│  taking responsibility for research,         │
│  development, and delivery while             │
│  collaborating with my team."               │
│                                              │
│  Key Improvements:                           │
│  ✅ Added specific details                  │
│  ✅ Used action verbs                       │
│  ✅ Showed responsibility                   │
└─────────────────────────────────────────────┘
```

---

### 4. Answer Builder 🏗️

```typescript
{
  id: 'answer-builder',
  name: 'Answer Builder',
  subtitle: 'Sentence Construction',
  description: 'Arrange sentence blocks in the correct order 
               to build professional interview answers.',
  icon: 'Layers',
  color: 'blue',
  skillCategory: 'communication',
  estimatedTime: '12 mins'
}
```

#### How It Works

Uses **STAR Method** structure:

```
S - SITUATION: Set the context
T - TASK: Define your role/challenge
A - ACTION: Explain what you did
R - RESULT: Share the outcome
```

#### Example

**Question:** "Tell me about a challenging project you worked on."

**Blocks to arrange:**
1. "The project had a tight two-week deadline."
2. "I led a team of four developers"
3. "and implemented daily standups and sprint planning."
4. "As a result, we delivered on time with zero critical bugs."
5. "I learned the importance of agile methodologies."

**Correct Order:** 1 → 2 → 3 → 4 → 5

---

### 5. Keyword Mapping 🔗

```typescript
{
  id: 'keyword-mapping',
  name: 'Keyword Mapping',
  subtitle: 'Concept Matching',
  description: 'Match technical keywords with correct statements 
               to test your conceptual understanding.',
  icon: 'Link',
  color: 'teal',
  skillCategory: 'technical',
  estimatedTime: '8 mins'
}
```

#### How It Works

Match keywords to their correct definitions/statements:

```
┌─────────────────────────────────────────────┐
│         KEYWORD MAPPING                      │
├─────────────────────────────────────────────┤
│  Match the keyword to the correct statement │
│                                              │
│  Keywords:          Statements:              │
│  ┌────────┐        ┌─────────────────────┐  │
│  │ ACID   │ ──────▶│ Transaction property│  │
│  └────────┘        └─────────────────────┘  │
│  ┌────────┐        ┌─────────────────────┐  │
│  │ JOIN   │ ──────▶│ Combine table data  │  │
│  └────────┘        └─────────────────────┘  │
└─────────────────────────────────────────────┘
```

---

### 6. Truth or Bluff ✓✗

```typescript
{
  id: 'truth-or-bluff',
  name: 'Truth or Bluff',
  subtitle: 'Fact Verification',
  description: 'Identify whether technical statements are 
               correct, incorrect, or misleading.',
  icon: 'CheckCircle',
  color: 'rose',
  skillCategory: 'technical',
  estimatedTime: '10 mins'
}
```

#### How It Works

```
┌─────────────────────────────────────────────┐
│          TRUTH OR BLUFF                      │
├─────────────────────────────────────────────┤
│  Statement:                                  │
│  "Arriving 5-10 minutes early to an         │
│  interview shows professionalism."          │
│                                              │
│  ┌─────────┐        ┌─────────┐             │
│  │  TRUE   │        │  FALSE  │             │
│  └─────────┘        └─────────┘             │
│                                              │
│  ✅ CORRECT! This is TRUE.                  │
│                                              │
│  Explanation:                               │
│  Being slightly early demonstrates respect  │
│  for the interviewer's time and good        │
│  planning.                                  │
└─────────────────────────────────────────────┘
```

---

## ⚙️ Game Configurations

### Difficulty Settings

Each game has 3 difficulty levels:

```typescript
difficultySettings: {
  beginner: { scoringStrictness: 0.7, timeBonus: 1.0 },
  intermediate: { scoringStrictness: 1.0, timeBonus: 1.2 },
  advanced: { scoringStrictness: 1.3, timeBonus: 1.5 },
}
```

| Level | Strictness | Time Bonus | Best For |
|-------|------------|------------|----------|
| Beginner | 0.7x | 1.0x | Learning concepts |
| Intermediate | 1.0x | 1.2x | Regular practice |
| Advanced | 1.3x | 1.5x | Challenge mode |

### Question Pools

```typescript
type QuestionPool = 'hr' | 'behavioral' | 'technical';
type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';
type SkillCategory = 'communication' | 'technical';
```

Questions are organized by:
- **Pool** - HR, Behavioral, Technical
- **Difficulty** - Beginner, Intermediate, Advanced
- **Skill Focus** - Communication or Technical

---

## 📊 Scoring System

### Scoring Criteria

| Game | Primary Criteria | Secondary Criteria |
|------|------------------|-------------------|
| Fix Bad Answer | Keyword inclusion | Professionalism |
| Keyword Hunt | Keywords found | Speed |
| Rephrase Me | Quality of rewrite | Key improvements |
| Answer Builder | Correct order | STAR compliance |
| Keyword Mapping | Correct matches | Speed |
| Truth or Bluff | Correct answers | Accuracy % |

### Score Calculation

```
Final Score = Base Score × Difficulty Multiplier × Time Bonus

Example (Intermediate):
- Base Score: 80
- Strictness: 1.0
- Time Bonus: 1.2
- Final: 80 × 1.0 × 1.2 = 96
```

---

## 🏗️ Technical Details

### Type Definitions

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

interface BadAnswerQuestion {
  id: string;
  pool: QuestionPool;
  difficulty: DifficultyLevel;
  badAnswer: string;
  context?: string;
  idealAnswer: string;
  keywords: string[];
  skillFocus: SkillCategory;
}

interface KeywordTopic {
  id: string;
  pool: QuestionPool;
  difficulty: DifficultyLevel;
  title: string;
  keywords: string[];
  bonusKeywords: string[];
  category: string;
  timeLimit: number;
}

interface RephraseSentence {
  id: string;
  pool: QuestionPool;
  difficulty: DifficultyLevel;
  original: string;
  idealRewrite: string;
  keyImprovements: string[];
  skillFocus: SkillCategory;
}
```

### File Structure

```
src/
├── data/
│   ├── games-data.ts               # Main game data (1327 lines)
│   └── games-questions-expanded.ts  # Additional questions
├── contexts/
│   └── GamesContext.tsx             # State management
└── app/
    └── (client)/
        └── games/
            ├── page.tsx              # Games list
            └── [gameId]/page.tsx     # Individual game
```

### Context API

```typescript
interface GamesContextType {
  games: GameConfig[];
  currentGame: GameConfig | null;
  difficulty: DifficultyLevel;
  score: number;
  questionsAnswered: number;
  
  // Actions
  setCurrentGame: (game: GameConfig) => void;
  setDifficulty: (level: DifficultyLevel) => void;
  submitAnswer: (answer: any) => void;
  resetGame: () => void;
}
```

---

## 💡 Best Practices

### Recommended Game Path

```
Beginners:
├── Start with: Truth or Bluff (easy True/False)
├── Then: Answer Builder (learn STAR method)
├── Then: Rephrase Me (improve language)
└── Finally: Fix Bad Answer (apply all skills)

Technical Focus:
├── Keyword Hunt → Keyword Mapping → Truth or Bluff

Communication Focus:
├── Rephrase Me → Answer Builder → Fix Bad Answer
```

### Daily Practice

```
Quick Session (15 mins):
├── 1 round of Keyword Hunt (5 mins)
├── 1 round of Truth or Bluff (5 mins)
└── 1 round of Rephrase Me (5 mins)

Full Session (45 mins):
├── All 6 games, 1 round each
└── Focus on weak areas
```

---

## 🔗 Related Features

- **[🎓 Soft Skills](3_SOFT_SKILLS.md)** - Apply game skills in training
- **[🎯 Interviews](1_INTERVIEWS.md)** - Use game knowledge in interviews
- **[🧮 Aptitude Arena](6_APTITUDE_ARENA.md)** - More technical practice

---

<div align="center">

**[⬆ Back to Index](README.md)**

*Last Updated: January 2026*

</div>
]]>

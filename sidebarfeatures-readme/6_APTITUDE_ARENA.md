<![CDATA[<div align="center">

# 🧮 Aptitude Arena

### Master Quantitative, Verbal & Logical Reasoning

[![Feature](https://img.shields.io/badge/Feature-Practice-blue?style=for-the-badge)]()
[![Questions](https://img.shields.io/badge/Questions-1000+-green?style=for-the-badge)]()
[![Topics](https://img.shields.io/badge/Topics-22+-orange?style=for-the-badge)]()

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Quantitative Aptitude](#-quantitative-aptitude)
- [Verbal Ability](#-verbal-ability)
- [Logical Reasoning](#-logical-reasoning)
- [Technical Details](#-technical-details)
- [Study Guide](#-study-guide)

---

## 🌟 Overview

**Aptitude Arena** provides comprehensive practice across three major aptitude categories essential for placement exams and interviews.

### Question Distribution

| Category | Topics | Questions |
|----------|--------|-----------|
| **Quantitative** | 10 | 100+ |
| **Verbal** | 6 | 60+ |
| **Logical** | 10 | 100+ |
| **Total** | 26 | **1000+** |

---

## 🔢 Quantitative Aptitude

### Topics Covered

| Topic | Questions | Difficulty |
|-------|-----------|------------|
| Number System | 10 | Easy-Medium |
| Percentages | 10 | Medium |
| Profit & Loss | 10 | Medium |
| Simple Interest | 10 | Easy-Medium |
| Compound Interest | 10 | Medium |
| Ratio & Proportion | 10 | Medium |
| Time & Work | 10 | Medium-Hard |
| Time, Speed & Distance | 10 | Medium-Hard |
| Averages | 10 | Easy-Medium |
| Ages | 10 | Medium |

### Topic Details

#### 1. Number System

**Key Concepts:**
- Natural numbers, whole numbers, integers
- Prime and composite numbers
- HCF (Highest Common Factor)
- LCM (Lowest Common Multiple)
- Divisibility rules

**Important Formulas:**

```
HCF × LCM = Product of two numbers
Number of factors of N = (a+1)(b+1)(c+1) where N = p^a × q^b × r^c
Sum of first n natural numbers = n(n+1)/2
Sum of first n odd numbers = n²
Sum of first n even numbers = n(n+1)
```

**Shortcuts:**
- Divisibility by 9: Sum of digits divisible by 9
- Divisibility by 11: Alternate sum of digits = 0 or divisible by 11
- Perfect squares end only in 0, 1, 4, 5, 6, 9

**Sample Question:**

```typescript
{
  question: "What is the HCF of 18 and 24?",
  options: { A: "2", B: "3", C: "6", D: "12" },
  correctAnswer: "C",
  explanation: "18 = 2 × 3² and 24 = 2³ × 3. HCF = 2¹ × 3¹ = 6",
  difficulty: "Easy"
}
```

#### 2. Percentages

**Important Formulas:**

```
Percentage = (Part/Whole) × 100
Percentage Increase = ((New - Old) / Old) × 100
Percentage Decrease = ((Old - New) / Old) × 100
Successive Percentage: (100+a)(100+b)/100 - 100
```

**Shortcuts:**
- 25% = 1/4, 50% = 1/2, 75% = 3/4
- 33⅓% = 1/3, 66⅔% = 2/3
- 12.5% = 1/8, 20% = 1/5

---

## 📖 Verbal Ability

### Topics Covered

| Topic | Questions | Focus |
|-------|-----------|-------|
| Reading Comprehension | 10 | Passage analysis |
| Sentence Completion | 10 | Vocabulary |
| Synonyms | 10 | Word meanings |
| Antonyms | 10 | Opposite meanings |
| Sentence Correction | 10 | Grammar |
| Para Jumbles | 10 | Ordering |

### Sample Reading Comprehension

```typescript
{
  paragraph: "Climate change represents one of the most pressing challenges 
             facing humanity in the 21st century. The scientific consensus 
             is clear: human activities, particularly the burning of fossil 
             fuels, are driving unprecedented changes in Earth's climate 
             system...",
  question: "According to the passage, what is the primary cause of 
            climate change?",
  options: {
    A: "Natural weather patterns",
    B: "Human activities, especially fossil fuel use",  // ✅
    C: "Solar radiation changes",
    D: "Ocean current variations"
  },
  explanation: "The passage explicitly states that 'human activities, 
               particularly the burning of fossil fuels, are driving 
               unprecedented changes in Earth's climate system.'"
}
```

### Passage Topics

1. Climate Change & Environment
2. Digital Revolution & Technology
3. Artificial Intelligence Ethics
4. Work-Life Balance
5. Sustainable Agriculture
6. Neuroplasticity
7. Urban Planning
8. E-commerce Impact
9. Mental Health Awareness
10. Renewable Energy

---

## 🧠 Logical Reasoning

### Topics Covered

| Topic | Questions | Type |
|-------|-----------|------|
| Series & Sequences | 10 | Pattern recognition |
| Analogies | 10 | Relationship |
| Classification | 10 | Odd one out |
| Coding-Decoding | 10 | Code patterns |
| Blood Relations | 10 | Family tree |
| Direction Sense | 10 | Navigation |
| Syllogism | 10 | Logic |
| Arrangements | 10 | Seating/ordering |
| Data Sufficiency | 10 | Analysis |
| Clock & Calendar | 10 | Time calculation |

### Sample Questions

#### Series & Sequences

```typescript
{
  question: "Find the next term: 2, 6, 18, 54, ?",
  options: { A: "108", B: "162", C: "216", D: "324" },
  correctAnswer: "B",
  explanation: "Each term × 3: 2×3=6, 6×3=18, 18×3=54, 54×3=162"
}
```

#### Analogies

```typescript
{
  question: "Bird : Wing :: Fish : ?",
  options: { A: "Water", B: "Fin", C: "Scale", D: "Swim" },
  correctAnswer: "B",
  explanation: "Bird uses wings for movement, fish uses fins"
}
```

#### Blood Relations

```typescript
{
  question: "A is B's sister. C is B's mother. D is C's father. 
            How is A related to D?",
  options: { A: "Daughter", B: "Granddaughter", C: "Sister", D: "Niece" },
  correctAnswer: "B",
  explanation: "A is B's sister, C is B's (and A's) mother, 
               D is C's father = A's grandfather. A is D's granddaughter."
}
```

#### Direction Sense

```typescript
{
  question: "A person walks 3 km North, then 4 km East. 
            How far from the starting point?",
  options: { A: "5 km", B: "6 km", C: "7 km", D: "8 km" },
  correctAnswer: "A",
  explanation: "Using Pythagorean theorem: √(3² + 4²) = √25 = 5 km"
}
```

---

## 🏗️ Technical Details

### Type Definitions

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

### File Structure

```
src/
├── data/
│   ├── quantitative-data.ts          # 591 lines
│   ├── verbal-ability-questions.ts   # 817 lines
│   └── logical-reasoning-questions.ts # 366 lines
├── contexts/
│   └── AptitudeContext.tsx
└── app/
    └── (client)/
        └── aptitude/
            ├── page.tsx              # Category selection
            ├── quantitative/page.tsx
            ├── verbal/page.tsx
            └── logical/page.tsx
```

### Data Statistics

| File | Lines | Topics | Questions |
|------|-------|--------|-----------|
| quantitative-data.ts | 591 | 10 | 100+ |
| verbal-ability-questions.ts | 817 | 6 | 60+ |
| logical-reasoning-questions.ts | 366 | 10 | 100+ |

---

## 📚 Study Guide

### Week-wise Plan

```
Week 1: Quantitative Basics
├── Day 1-2: Number System
├── Day 3-4: Percentages
├── Day 5-6: Ratio & Proportion
└── Day 7: Review & Practice

Week 2: Advanced Quantitative
├── Day 1-2: Time & Work
├── Day 3-4: Time, Speed & Distance
├── Day 5-6: Profit & Loss
└── Day 7: Simple & Compound Interest

Week 3: Verbal Ability
├── Day 1-3: Reading Comprehension
├── Day 4-5: Vocabulary (Synonyms/Antonyms)
└── Day 6-7: Grammar & Para Jumbles

Week 4: Logical Reasoning
├── Day 1-2: Series & Analogies
├── Day 3-4: Blood Relations & Direction
├── Day 5-6: Syllogism & Arrangements
└── Day 7: Coding-Decoding & Data Sufficiency
```

### Daily Practice Routine

```
Morning (30 mins):
├── 10 questions from any topic
├── Focus on weak areas
└── Review explanations

Evening (20 mins):
├── Timed practice (10 questions)
├── Simulate exam conditions
└── Track accuracy
```

### Tips for Each Category

**Quantitative:**
- Memorize formulas
- Practice shortcuts
- Focus on speed + accuracy

**Verbal:**
- Read passages completely
- Build vocabulary daily
- Practice grammar rules

**Logical:**
- Draw diagrams for blood relations
- Use elimination method
- Practice pattern recognition

---

## 🔗 Related Features

- **[🎮 Games](5_GAMES.md)** - Gamified practice
- **[🏢 Dream Company](7_DREAM_COMPANY_STATION.md)** - Company-specific patterns
- **[📖 Resource Hub](4_INTERVIEW_RESOURCE_HUB.md)** - Study materials

---

<div align="center">

**[⬆ Back to Index](README.md)**

*Last Updated: January 2026*

</div>
]]>

<![CDATA[<div align="center">

# 📖 Interview Resource Hub

### Your Complete Library of Interview Preparation Materials

[![Feature](https://img.shields.io/badge/Feature-Resources-orange?style=for-the-badge)]()
[![PDFs](https://img.shields.io/badge/PDFs-30+-blue?style=for-the-badge)]()
[![Categories](https://img.shields.io/badge/Categories-6-green?style=for-the-badge)]()

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Resource Categories](#-resource-categories)
- [Complete Resource List](#-complete-resource-list)
- [Technical Details](#-technical-details)
- [Usage Guide](#-usage-guide)

---

## 🌟 Overview

The **Interview Resource Hub** is a comprehensive library of 30+ PDFs covering programming languages, frameworks, databases, DSA, and interview preparation materials.

### Key Features

| Feature | Description |
|---------|-------------|
| 📚 **30+ PDFs** | Curated study materials |
| 🏷️ **6 Categories** | Organized by topic |
| 🎯 **Difficulty Levels** | Beginner to Advanced |
| 🔍 **Search & Filter** | Find resources quickly |
| 📥 **Download/View** | Access anywhere |

---

## 📂 Resource Categories

### 1. Programming Languages 💻

```typescript
{
  id: 'programming-languages',
  name: 'Programming Languages',
  description: 'Java, JavaScript, Python, C and more',
  icon: 'Code2',
  color: '#3b82f6'  // Blue
}
```

**Includes:** Java, JavaScript, Python, C, HTML, CSS

### 2. Backend & Frameworks ⚙️

```typescript
{
  id: 'backend-frameworks',
  name: 'Backend & Frameworks',
  description: 'Node.js, Express.js, MongoDB',
  icon: 'Server',
  color: '#10b981'  // Green
}
```

**Includes:** Node.js, Express.js, MongoDB

### 3. Databases & SQL 🗄️

```typescript
{
  id: 'databases-sql',
  name: 'Databases & SQL',
  description: 'DBMS, SQL Queries, Cheat Sheets',
  icon: 'Database',
  color: '#8b5cf6'  // Purple
}
```

**Includes:** DBMS concepts, SQL queries, cheat sheets

### 4. DSA & Coding Interviews 🧠

```typescript
{
  id: 'dsa-coding',
  name: 'DSA & Coding Interviews',
  description: 'Cracking the Coding Interview, Practice',
  icon: 'BrainCircuit',
  color: '#f59e0b'  // Amber
}
```

**Includes:** Data structures, algorithms, coding problems

### 5. Web Development 🌐

```typescript
{
  id: 'web-development',
  name: 'Web Development',
  description: 'Frontend, Full Stack, HTML/CSS',
  icon: 'Globe',
  color: '#ec4899'  // Pink
}
```

**Includes:** Frontend concepts, full-stack development

### 6. Comprehensive & General 📚

```typescript
{
  id: 'comprehensive-general',
  name: 'Comprehensive & General',
  description: 'Mixed Interview Materials',
  icon: 'BookOpen',
  color: '#06b6d4'  // Cyan
}
```

**Includes:** Mixed materials, general interview prep

---

## 📄 Complete Resource List

### Programming Languages

| Resource | Difficulty | Tags |
|----------|------------|------|
| **Java Interview Questions** | Intermediate | Java, OOP, Core Java |
| **100 JavaScript Interview Questions** | Intermediate | JavaScript, ES6, Frontend |
| **100 Python Interview Questions** | Intermediate | Python, Data Science |
| **JavaScript Interview Questions** | Intermediate | JavaScript, Web |
| **C Programming Interview Notes** | Beginner | C, Programming, Basics |
| **CSS Interview Questions** | Beginner | CSS, Styling, Frontend |
| **HTML Interview Q&A** | Beginner | HTML, Web, Frontend |

### Backend & Frameworks

| Resource | Difficulty | Tags |
|----------|------------|------|
| **Node.js Interview Q&A** | Intermediate | Node.js, Backend, API |
| **Express.js Interview Q&A** | Intermediate | Express, REST, Middleware |
| **MongoDB Interview Questions** | Intermediate | MongoDB, NoSQL |
| **MongoDB Basic to Advanced** | Advanced | MongoDB, Advanced |

### Databases & SQL

| Resource | Difficulty | Tags |
|----------|------------|------|
| **DBMS Interview Guide** | Intermediate | DBMS, SQL |
| **SQL Cheat Sheet** | Beginner | SQL, Queries |

### DSA & Coding

| Resource | Difficulty | Tags |
|----------|------------|------|
| **Cracking the Coding Interview** | Advanced | DSA, Algorithms |
| **Coding Practice Problems** | Intermediate | Practice, Problems |

---

## 🏗️ Technical Details

### Type Definitions

```typescript
type PDFCategory = 
  | 'programming-languages'
  | 'backend-frameworks'
  | 'databases-sql'
  | 'dsa-coding'
  | 'web-development'
  | 'comprehensive-general';

type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

interface PDFResource {
  id: string;
  title: string;
  category: PDFCategory;
  difficulty: DifficultyLevel;
  tags: string[];
  filePath: string;
  fileName: string;
  description?: string;
  pages?: number;
}

interface CategoryInfo {
  id: PDFCategory;
  name: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
}
```

### File Structure

```
src/
├── data/
│   └── interview-resources-data.ts  # All resource data (512 lines)
├── contexts/
│   └── InterviewResourcesContext.tsx
└── app/
    └── (client)/
        └── interview-resources/
            └── page.tsx

public/
└── InterviewPrep/                   # PDF storage (30+ files)
    ├── 1.Java-Interview-Questions.pdf
    ├── 100 Most AskedJavaScript Interview.pdf
    ├── 100 python interview questions.pdf
    ├── Node js interview q and a.pdf
    ├── Express js interview q and a.pdf
    ├── MongoDB Interview Questions.pdf
    └── ... (more PDFs)
```

### Sample Resource Entry

```typescript
{
  id: 'java-interview',
  title: 'Java Interview Questions',
  category: 'programming-languages',
  difficulty: 'Intermediate',
  tags: ['Java', 'OOP', 'Core Java'],
  filePath: '/InterviewPrep/1.Java-Interview-Questions.pdf',
  fileName: '1.Java-Interview-Questions.pdf',
  description: 'Comprehensive Java interview questions covering OOP, 
               collections, and more.'
}
```

---

## 📖 Usage Guide

### Finding Resources

1. **Browse by Category** - Click on category cards
2. **Filter by Difficulty** - Beginner/Intermediate/Advanced
3. **Search by Tag** - Java, Python, DSA, etc.
4. **Search by Title** - Type resource name

### Recommended Study Path

```
Week 1: Core Programming
├── Day 1-2: Java Interview Questions
├── Day 3-4: JavaScript Questions
└── Day 5-7: Python Questions

Week 2: Backend
├── Day 1-2: Node.js Q&A
├── Day 3-4: Express.js Q&A
└── Day 5-7: MongoDB Questions

Week 3: DSA & Database
├── Day 1-4: Cracking the Coding Interview
└── Day 5-7: DBMS & SQL

Week 4: Review & Practice
├── Revisit weak areas
└── Company-specific resources
```

### Tips for Using Resources

```
✅ Read actively - take notes
✅ Practice questions, don't just read
✅ Focus on understanding, not memorizing
✅ Combine with Games & Aptitude Arena
✅ Review before interviews
```

---

## 🔗 Related Features

- **[🧮 Aptitude Arena](6_APTITUDE_ARENA.md)** - Practice questions interactively
- **[🏢 Dream Company](7_DREAM_COMPANY_STATION.md)** - Company-specific resources
- **[🎮 Games](5_GAMES.md)** - Gamified learning

---

<div align="center">

**[⬆ Back to Index](README.md)**

*Last Updated: January 2026*

</div>
]]>

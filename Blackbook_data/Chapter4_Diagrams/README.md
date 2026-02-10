# Chapter 4 Diagrams - Interview.ai System Architecture

This folder contains all the Mermaid diagram files for Chapter 4 - Plan of Project.

## Diagram Files

### 1. Figure_4_3_System_Architecture.mmd
- **Description:** Complete detailed system architecture diagram
- **Contains:** All layers from User → Auth → Frontend → API → Backend → AI Engine → Database
- **Use:** For detailed technical documentation

### 2. Figure_4_3_System_Architecture_Simple.mmd
- **Description:** Simplified academic system architecture diagram
- **Contains:** Clean layered view suitable for black book presentation
- **Use:** For academic presentation and black book

## How to Generate PNG Images

### Option 1: Online Mermaid Editor
1. Go to https://mermaid.live/
2. Copy the .mmd file content
3. Paste in the editor
4. Download as PNG/SVG

### Option 2: VS Code Extension
1. Install "Mermaid Preview" extension
2. Open .mmd file
3. Right-click → Export as PNG

### Option 3: Command Line (Node.js)
```bash
npm install -g @mermaid-js/mermaid-cli
mmdc -i Figure_4_3_System_Architecture.mmd -o Figure_4_3_System_Architecture.png
```

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     USER LAYER                               │
│                 (Candidates/Students)                        │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                 AUTHENTICATION LAYER                         │
│            (Sign Up | Sign In | Session Mgmt)                │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   FRONTEND LAYER                             │
│  ┌─────────────────────┐  ┌───────────────────────────────┐ │
│  │   SIDEBAR FEATURES  │  │      UI COMPONENTS            │ │
│  │  • Interviews       │  │  • Dashboard & Navigation     │ │
│  │  • Interviewers     │  │  • Interview UI (Voice/Text)  │ │
│  │  • Soft Skills      │  │  • Practice & Game Interfaces │ │
│  │  • Resource Hub     │  │  • Resume Builder & Viewer    │ │
│  │  • Games            │  │  • Reports & Analytics UI     │ │
│  │  • Aptitude Arena   │  └───────────────────────────────┘ │
│  │  • Dream Company    │                                    │
│  │  • Placement Drives │                                    │
│  │  • Resume Builder   │                                    │
│  │  • Skill Autofill   │                                    │
│  │  • Time Machine     │                                    │
│  └─────────────────────┘                                    │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      API LAYER                               │
│    REST APIs | WebSocket | Auth APIs | Interview APIs        │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND LAYER                             │
│  User Mgmt | Interview Mgmt | Interviewer Service |          │
│  Resume Service | Aptitude Service | Soft Skills Service |   │
│  Placement Service | Dream Company Service |                 │
│  Time Machine Service | Feedback Service |                   │
│  Analytics Service | Notification Service                    │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                     AI ENGINE                                │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  Resume Parsing | Question Generation | Answer Eval     ││
│  │  Confidence Scoring | Performance Scoring | Recommend   ││
│  └─────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────┐│
│  │        NLP Engine | Voice (STT/TTS) | Embedding         ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    DATABASE LAYER                            │
│  User Profiles | Resume Data | Skills Map | Questions Bank | │
│  Responses | Scores | Progress | Company Data                │
└─────────────────────────────────────────────────────────────┘
                            ↑
┌─────────────────────────────────────────────────────────────┐
│                  EXTERNAL SERVICES                           │
│       Cloud Hosting | Supabase | AI APIs (OpenAI)            │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

1. **User** → Logs in via Authentication
2. **Frontend** → User selects feature from Sidebar
3. **API** → Request sent to appropriate API endpoint
4. **Backend** → Service processes the request
5. **AI Engine** → AI processes data (if needed)
6. **Database** → Data stored/retrieved
7. **Response** → Result sent back to User
8. **Feedback Loop** → Performance data improves recommendations

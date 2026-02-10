# Chapter 6: Project Design

## 6.1 Data Flow Diagram (DFD)

A Data Flow Diagram (DFD) is a graphical representation that depicts the flow of data through a system and the work or processing performed by that system. For the Interview.ai platform, the DFD illustrates how data moves between users, the system processes, and the database.

### 6.1.1 DFD Level 0 (Context Diagram)

![Figure 6.1.1: DFD Level 0](./Figure_6_1_1_DFD_Level_0.png)

*Figure 6.1.1: DFD Level 0*

In Figure 6.1.1, the DFD Level 0 of the "Interview.ai - AI-Powered Interview Preparation Platform" provides an overarching view of the system's functionality. It illustrates the main processes and interactions between external entities such as candidates, AI interviewers, and the database system.

At this level, the focus is on high-level processes, including:
- **User Registration & Authentication**: Candidates register and login to access the platform
- **AI Interview Sessions**: Users engage with AI-powered interviewers for mock interviews
- **Resume Analysis**: The system processes and analyzes uploaded resumes
- **Performance Analytics**: Comprehensive feedback and scoring are generated and stored

The system ensures robust privacy and security measures to protect user information, interview recordings, and personal data. The Interview.ai platform provides a cutting-edge solution that:
- Enables realistic AI-powered mock interviews with voice interaction
- Provides detailed feedback on communication skills, technical knowledge, and soft skills
- Offers comprehensive analytics and progress tracking
- Generates actionable insights for interview improvement

This innovative approach represents a significant stride towards modernizing interview preparation, ultimately helping candidates improve their interview skills through AI-driven practice sessions and personalized feedback.

### 6.1.2 DFD Level 1

![Figure 6.1.2: DFD Level 1](./Figure_6_1_2_DFD_Level_1.png)

*Figure 6.1.2: DFD Level 1*

The DFD Level 1 expands on the context diagram by breaking down the main process into sub-processes. **Note:** Interview.ai is a fully automated platform with no manual Admin role - all operations are handled by the AI Engine and Backend Services.

**External Entity:**
- **User (Candidate)** - The only external entity interacting with the system

**Internal System Component:**
- **Interview.ai System (AI Engine & Backend Services)** - Handles all automated operations including question generation, response evaluation, and analytics processing

**Processes:**

1. **Process 1.1 - Manage User Registration & Authentication**
   - Automated user registration via Clerk authentication
   - Secure login and session management
   - Profile creation and management
   - Data stored in D.1 User Database

2. **Process 1.2 - Manage Interview Sessions**
   - AI-powered question generation based on job role and difficulty
   - Real-time voice interview with Retell AI
   - Response capture and transcription
   - Interview data stored in D.2 Interview & Analytics Database

3. **Process 1.3 - Manage Performance Analytics**
   - AI-powered response evaluation using GPT-4
   - Automated scoring and performance metrics
   - Personalized feedback generation
   - Analytics retrieval and report generation

**Data Stores:**
- **D.1 User Database** - Stores user profiles, authentication data, and preferences
- **D.2 Interview & Analytics Database** - Stores interview sessions, responses, scores, and analytics

**Why No Admin Role?**
Interview.ai is designed as a fully autonomous AI-powered platform where all administrative tasks (user management, interview configuration, analytics generation) are handled automatically by the AI Engine and Backend Services. This eliminates the need for manual intervention, ensuring 24/7 availability and consistent user experience.

### 6.1.3 DFD Level 2

![Figure 6.1.3: DFD Level 2](./Figure_6_1_3_DFD_Level_2.png)

*Figure 6.1.3: DFD Level-2 of Interview.ai System*

The DFD Level 2 provides a detailed decomposition of each Level 1 process into subprocesses, showing the complete data flow within the Interview.ai system.

#### Process 1.1 - Manage User Registration & Authentication (Level-2)

| Subprocess | Description |
|------------|-------------|
| 1.1.1 Capture User Details | Collects registration information from the candidate |
| 1.1.2 Validate User Credentials | Verifies the format and validity of user input |
| 1.1.3 Encrypt & Store User Data | Securely encrypts and stores user data in D.1 User Database |
| 1.1.4 Authenticate Login Request | Validates login credentials against stored data |
| 1.1.5 Return Authentication Status | Returns success/failure status to the user |

**Data Flows:**
- User → Registration/Login Details → System
- System ↔ D.1 User Database (store/retrieve user data)
- System → User (Login Success / Failure)

#### Process 1.2 - Manage Interview Sessions (Level-2)

| Subprocess | Description |
|------------|-------------|
| 1.2.1 Select Interview Type & Role | User selects job role and interview type |
| 1.2.2 Generate AI Interview Questions | AI Engine generates role-specific questions from D.3 Question Bank |
| 1.2.3 Conduct AI Interview Session | Real-time voice interview using Retell AI |
| 1.2.4 Capture Audio/Video Responses | Records user responses during interview |
| 1.2.5 Analyze Responses | AI performs NLP, voice, and facial analysis |
| 1.2.6 Store Interview Data | Saves interview data to D.2 Interview & Analytics Database |

**Data Flows:**
- User → Interview Request, Role Selection, Responses
- AI Engine → Questions, Analysis Results
- System ↔ D.2 Interview & Analytics Database
- System ↔ D.3 Question Bank

#### Process 1.3 - Manage Performance Analytics (Level-2)

| Subprocess | Description |
|------------|-------------|
| 1.3.1 Retrieve Interview Data | Fetches interview data from D.2 Database |
| 1.3.2 Evaluate Technical Accuracy | AI evaluates technical response accuracy using NLP |
| 1.3.3 Analyze Confidence & Communication | AI analyzes voice tone, confidence, and communication skills |
| 1.3.4 Generate AI Feedback & Scores | Creates comprehensive feedback with improvement suggestions |
| 1.3.5 Update Performance Analytics | Updates analytics data in D.2 Database |
| 1.3.6 Display Feedback to User | Presents performance report to the candidate |

**Outputs:**
- Performance Score
- Improvement Suggestions
- AI Feedback Report

**Entities & Data Stores:**

| Type | Name | Description |
|------|------|-------------|
| External Entity | User (Candidate) | The only human entity interacting with the system |
| External System | AI Interview System | AI Engine & Backend Services handling all automation |
| Data Store | D.1 User Database | Stores user profiles and authentication data |
| Data Store | D.2 Interview & Analytics Database | Stores interviews, responses, scores, and analytics |
| Data Store | D.3 Question Bank | Repository of AI-generated and curated interview questions |


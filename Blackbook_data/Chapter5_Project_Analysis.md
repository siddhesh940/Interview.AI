 # Chapter 5 - Project Analysis

## 5.1 Use Case Diagram

In Figure 5.1, the use case diagram represents the functional interactions of the Interview.ai -AI Powered Interview Preparation System. The system involves two primary actors: User (Candidate/Admin) and AI Interviewer. The user initiates the process by registering and logging into the system, uploading a resume, and participating in various interview preparation activities such as AI mock interviews, aptitude practice, soft skills practice, and interview-related games. The AI Interviewer acts as an intelligent system component that automatically generates interview questions, conducts mock interviews, analyzes user responses, evaluates confidence and communication skills, and generates detailed feedback and reports. The interaction between the user and the AI Interviewer enables continuous performance evaluation, feedback generation, and career readiness assessment, making the interview preparation process structured, automated, and effective.

### 5.1.1 Use Case Document

### 5.1.2 Use Case Analysis

**1. Account Creation and Platform Authentication**

   • Actors: User (Candidate), Interview.ai System

   • Description:
During the first interaction with the platform, candidates establish their personal accounts by providing necessary identification credentials and authentication information. Once the account is successfully created, authorized access is granted to the Interview.ai ecosystem. This security-driven access framework safeguards user-specific details while enabling the system to retrieve customized preparation content, historical activity logs, and personalized progress metrics in a secure manner.

**2. Document Submission and AI-Driven Processing**

   • Actors: User (Candidate), Interview.ai System

   • Description:
Candidates upload their professional resumes or career-related documents through the platform interface. The Interview.ai system processes these documents using machine learning algorithms to identify competencies, work experience, and relevant professional qualifications. The extracted data is leveraged for automated skill correlation and to customize subsequent interview practice sessions and preparation activities.

**3. AI-Powered Mock Interview Session**

   • Actors: User (Candidate), AI Interviewer

   • Description:
Candidates launch an artificial intelligence-driven interview simulation from the platform dashboard. Utilizing the processed resume data and specified job role preferences, the AI Interviewer constructs contextually appropriate interview questions. The session is conducted interactively, allowing candidates to provide responses in real-time while experiencing a realistic interview atmosphere.

**4. Response Analysis and Competency Evaluation**

   • Actors: AI Interviewer, Interview.ai System

   • Description:
Throughout the interview simulation, the AI Interviewer scrutinizes candidate responses by measuring response accuracy, verbal communication effectiveness, and confidence indicators. The platform computes comprehensive performance metrics derived from this assessment, facilitating the recognition of proficiency levels alongside areas demanding additional improvement.

**5. Feedback Synthesis and Report Generation**

   • Actors: AI Interviewer, Interview.ai System

   • Description:
Following the competency assessment, the platform produces elaborate feedback and systematically organized evaluation reports. These reports emphasize key strengths, highlight improvement opportunities, and offer practical recommendations to enhance interview preparedness. All feedback documentation is securely archived to facilitate ongoing monitoring of candidate development.

**6. Skill Enhancement Learning Modules**

   • Actors: User (Candidate), Interview.ai System

   • Description:
The platform provides diverse learning modules concentrating on quantitative aptitude exercises, interpersonal skill development, and gamified interview preparation activities. These modules are designed to strengthen analytical reasoning, verbal articulation, and self-confidence. Performance data generated from module interactions is continuously captured to refine assessment accuracy.

**7. Technical Competency Development (TechPrep)**

   • Actors: User (Candidate), Interview.ai System

   • Description:
The TechPrep module empowers candidates to strengthen technical proficiencies through structured programming challenges and algorithmic problem-solving exercises. Submitted code solutions undergo automated system review to evaluate correctness, computational efficiency, and logical methodology. Based on the assessment outcomes, constructive performance feedback is generated to support technical interview readiness enhancement.

**8. Behavioral Interview Preparation (HR Coach)**

   • Actors: User (Candidate), AI Interviewer

   • Description:
The HR Interview Coach module supports candidates in preparing for behavioral and human resources-focused interviews. Candidates respond to situational and HR-oriented questions utilizing structured response frameworks like the STAR method. The AI Interviewer evaluates communication patterns, behavioral characteristics, and confidence metrics to deliver tailored guidance and improvement recommendations.

**9. Results Review and Secure Session Termination**

   • Actors: User (Candidate), Interview.ai System

   • Description:
Candidates access interview outcomes, feedback summaries, performance metrics, and historical progress records through the analytics dashboard interface. The platform enables longitudinal performance tracking and retrieval of archived reports. Upon session completion, candidates exit the system through a secure logout mechanism ensuring data protection.

## 5.2 Class Diagram  

In Figure 5.2, the class diagram represents the structural design of the Interview.ai system and illustrates the key classes, their attributes, methods, and relationships. The diagram includes core entities such as User, Organization, Interview, Interviewer, Resume, Response, and Feedback, which together manage user registration, resume processing, AI-driven interviews, response evaluation, and feedback generation. Additional feature-specific classes like Aptitude_Test, Soft_Skills, Games, Time_Machine, and Facial_Analysis support comprehensive interview preparation and skill development. Placement-oriented classes such as Company, Drive, Dream_Company, User_Profile, and Notification handle career readiness, placement drives, and user notifications. The relationships among these classes define how users interact with AI interviewers, participate in interviews, receive evaluations, and track progress. Overall, this class diagram provides a clear overview of the system architecture and data flow within the Interview.ai platform, ensuring modularity, scalability, and efficient management of interview preparation processes.

### 5.2.1 Class Diagram Components

The following table describes all the classes used in the Interview.ai system along with their attributes and methods:

---

#### 1. USER

| **Attributes** | **Description** |
|----------------|------------------|
| id | Unique identifier for user |
| created_at | Account creation timestamp |
| email | User's email address |
| organization_id | Reference to user's organization |

| **Methods** | **Description** |
|-------------|-----------------|
| registerUser() | Creates a new user account in the system |
| updateUserInfo() | Updates user profile information |
| login() | Authenticates user and creates session |
| logout() | Terminates user session securely |

---

#### 2. ORGANIZATION

| **Attributes** | **Description** |
|----------------|------------------|
| id | Unique identifier for organization |
| created_at | Organization creation timestamp |
| name | Name of the organization |
| image_url | Organization logo URL |
| allowed_responses_count | Maximum responses allowed per plan |
| plan | Subscription plan (free/pro/free_trial_over) |

| **Methods** | **Description** |
|-------------|-----------------|
| createOrganization() | Creates a new organization entity |
| updateOrganization() | Updates organization details |
| getPlan() | Retrieves current subscription plan details |

---

#### 3. INTERVIEWER

| **Attributes** | **Description** |
|----------------|------------------|
| id | Unique identifier for AI interviewer |
| created_at | Interviewer creation timestamp |
| agent_id | AI agent identifier for Retell API |
| name | Name of the AI interviewer (e.g., Lisa, John) |
| description | Description of interviewer personality |
| image | Avatar image URL |
| audio | Voice audio file path |
| empathy | Empathy level score (0-100) |
| exploration | Question exploration depth score |
| rapport | Rapport building capability score |
| speed | Speaking speed parameter |

| **Methods** | **Description** |
|-------------|-----------------|
| conductInterview() | Initiates and manages the interview session |
| generateQuestions() | Dynamically generates interview questions using AI |
| evaluateResponse() | Analyzes and scores candidate responses |
| provideFeedback() | Generates constructive feedback for improvement |

---

#### 4. INTERVIEW

| **Attributes** | **Description** |
|----------------|------------------|
| id | Unique identifier for interview session |
| created_at | Interview creation timestamp |
| name | Interview title/name |
| description | Detailed interview description |
| objective | Interview objective and goals |
| organization_id | Reference to organization |
| user_id | Reference to user who created interview |
| interviewer_id | Reference to assigned AI interviewer |
| is_active | Interview active status |
| is_anonymous | Anonymous mode flag |
| logo_url | Custom logo for interview |
| theme_color | UI theme color customization |
| questions | Array of interview questions |
| question_count | Total number of questions |
| response_count | Number of responses received |
| time_duration | Interview duration limit |

| **Methods** | **Description** |
|-------------|-----------------|
| createInterview() | Creates a new interview configuration |
| startInterview() | Initiates the interview session |
| endInterview() | Terminates the interview and saves data |
| getInterviewDetails() | Retrieves complete interview information |

---

#### 5. RESPONSE

| **Attributes** | **Description** |
|----------------|------------------|
| id | Unique identifier for response |
| created_at | Response submission timestamp |
| interview_id | Reference to parent interview |
| name | Candidate's name |
| email | Candidate's email address |
| call_id | Retell API call identifier |
| candidate_status | Selection status (Selected/Rejected/Pending) |
| duration | Response duration in seconds |
| details | Detailed response data and transcript |
| analytics | Performance analytics and scores |
| is_analysed | Analysis completion status |
| is_ended | Interview completion status |
| tab_switch_count | Anti-cheating tab switch counter |

| **Methods** | **Description** |
|-------------|-----------------|
| saveResponse() | Stores response data to database |
| analyzeResponse() | Performs AI-based response analysis |
| getTranscript() | Retrieves speech-to-text transcript |
| calculateScore() | Computes overall performance score |

---

#### 6. FEEDBACK

| **Attributes** | **Description** |
|----------------|------------------|
| id | Unique identifier for feedback |
| created_at | Feedback submission timestamp |
| interview_id | Reference to interview |
| email | Feedback provider's email |
| feedback | Detailed feedback text |
| satisfaction | Satisfaction rating (1-5) |

| **Methods** | **Description** |
|-------------|-----------------|
| submitFeedback() | Submits user feedback to database |
| getFeedback() | Retrieves feedback for specific interview |

---

#### 7. RESUME

| **Attributes** | **Description** |
|----------------|------------------|
| id | Unique identifier for resume |
| created_at | Resume creation timestamp |
| updated_at | Last modification timestamp |
| user_id | Reference to resume owner |
| title | Resume title |
| target_role | Target job position |
| template | Selected resume template name |
| resume_data | Complete resume content (skills, experience, education) |

| **Methods** | **Description** |
|-------------|-----------------|
| createResume() | Creates new resume with template |
| updateResume() | Updates resume content |
| downloadResume() | Generates and downloads PDF |
| parseResume() | Extracts data from uploaded resume |

---

#### 8. COMPANY

| **Attributes** | **Description** |
|----------------|------------------|
| id | Unique identifier for company |
| created_at | Company record creation timestamp |
| name | Company name (TCS, Infosys, Wipro, etc.) |
| official_careers_url | Official careers page URL |
| logo_url | Company logo image path |
| is_active | Active status flag |

| **Methods** | **Description** |
|-------------|-----------------|
| getCompanyDetails() | Retrieves complete company information |
| getInterviewPatterns() | Fetches company-specific interview patterns |
| getPreviousQuestions() | Gets historical interview questions |

---

#### 9. DRIVE (Placement Drive)

| **Attributes** | **Description** |
|----------------|------------------|
| id | Unique identifier for drive |
| created_at | Drive creation timestamp |
| company_id | Reference to company |
| role | Job position/role |
| drive_type | Type: on-campus/off-campus/virtual |
| batch | Eligible batch year |
| min_cgpa | Minimum CGPA requirement |
| branches | Eligible branches array |
| deadline | Registration deadline |
| registration_link | External registration URL |
| is_active | Drive active status |

| **Methods** | **Description** |
|-------------|-----------------|
| createDrive() | Creates new placement drive entry |
| registerCandidate() | Registers user for drive |
| updateDriveStatus() | Updates drive status |
| getEligibleCandidates() | Lists candidates meeting criteria |

---

#### 10. USER_PROFILE

| **Attributes** | **Description** |
|----------------|------------------|
| id | Unique identifier for profile |
| clerk_user_id | Clerk authentication user ID |
| email | User's email address |
| batch | Graduation batch year |
| branch | Academic branch/department |
| cgpa | Current CGPA score |
| college_name | College/University name |

| **Methods** | **Description** |
|-------------|-----------------|
| updateProfile() | Updates user profile details |
| checkEligibility() | Validates eligibility for drives |

---

#### 11. NOTIFICATION

| **Attributes** | **Description** |
|----------------|------------------|
| id | Unique identifier for notification |
| created_at | Notification creation timestamp |
| clerk_user_id | Target user identifier |
| drive_id | Reference to related drive |
| title | Notification title |
| message | Notification content |
| is_read | Read status flag |
| notification_type | Type: new_drive/reminder/update |

| **Methods** | **Description** |
|-------------|-----------------|
| sendNotification() | Dispatches notification to user |
| markAsRead() | Updates notification read status |
| getNotifications() | Retrieves user's notifications |

---

#### 12. FACIAL_ANALYSIS

| **Attributes** | **Description** |
|----------------|------------------|
| confidence_index | Overall confidence score (0-100) |
| engagement_score | User engagement level |
| stress_indicator | Stress level measurement |
| eye_contact_percentage | Eye contact with camera percentage |
| emotion_summary | Emotion breakdown (happy, neutral, nervous, etc.) |

| **Methods** | **Description** |
|-------------|-----------------|
| analyzeFrame() | Processes video frame for facial features |
| detectEmotions() | Identifies emotions from facial expressions |
| generateReport() | Creates comprehensive facial analysis report |
| calculateConfidenceIndex() | Computes confidence score from metrics |

---

#### 13. TIME_MACHINE

| **Attributes** | **Description** |
|----------------|------------------|
| resume_text | Parsed resume content |
| target_role | Desired job position |
| time_goal | Goal timeframe (30/60/90 days) |
| interview_scores | Historical interview performance |
| strengths | Identified strong areas |
| weaknesses | Areas needing improvement |

| **Methods** | **Description** |
|-------------|-----------------|
| generatePrediction() | Creates future career prediction |
| analyzeTrends() | Analyzes career growth trends |
| createRoadmap() | Generates personalized learning path |
| getFutureSalary() | Predicts expected salary range |

---

#### 14. APTITUDE_TEST

| **Attributes** | **Description** |
|----------------|------------------|
| category | Test category (Quantitative/Logical/Verbal) |
| difficulty | Difficulty level (Easy/Medium/Hard) |
| time_limit | Time limit in minutes |
| questions | Array of test questions |
| score | Achieved score |

| **Methods** | **Description** |
|-------------|-----------------|
| startTest() | Initiates aptitude test session |
| submitTest() | Submits completed test |
| calculateScore() | Computes test score |
| getResults() | Retrieves detailed results |

---

#### 15. SOFT_SKILLS

| **Attributes** | **Description** |
|----------------|------------------|
| skill_id | Unique skill module identifier |
| skill_type | Skill category (Communication/Leadership/Teamwork) |
| content | Learning content and materials |
| exercises | Practice exercises list |
| progress | Completion progress percentage |

| **Methods** | **Description** |
|-------------|-----------------|
| startModule() | Begins soft skill training module |
| trackProgress() | Updates learning progress |
| completeExercise() | Marks exercise as completed |

---

#### 16. GAMES

| **Attributes** | **Description** |
|----------------|------------------|
| game_type | Game type (Fix Bad Answer/Rephrase Me/Truth or Bluff) |
| score | Game score achieved |
| attempts | Number of attempts made |

| **Methods** | **Description** |
|-------------|-----------------|
| startGame() | Initiates game session |
| evaluateAnswer() | AI evaluates user's game response |
| getLeaderboard() | Retrieves top scores |

---

#### 17. DREAM_COMPANY

| **Attributes** | **Description** |
|----------------|------------------|
| company_slug | URL-friendly company identifier |
| interview_patterns | Company interview round patterns |
| previous_questions | Historical interview questions |
| preparation_tips | Company-specific preparation tips |

| **Methods** | **Description** |
|-------------|-----------------|
| getCompanyInfo() | Retrieves detailed company information |
| getInterviewProcess() | Gets interview process details |
| getPracticeQuestions() | Fetches practice questions for company |

---

### 5.2.2 Class Relationships

The following relationships exist between the classes in Interview.ai system:

| **Relationship** | **Type** | **Description** |
|------------------|----------|-----------------|
| ORGANIZATION → USER | One-to-Many | An organization contains multiple users |
| USER → INTERVIEW | One-to-Many | A user can create multiple interviews |
| INTERVIEWER → INTERVIEW | One-to-Many | An AI interviewer conducts multiple interviews |
| INTERVIEW → RESPONSE | One-to-Many | An interview generates multiple responses |
| INTERVIEW → FEEDBACK | One-to-Many | An interview receives multiple feedbacks |
| USER → RESUME | One-to-Many | A user can create multiple resumes |
| COMPANY → DRIVE | One-to-Many | A company organizes multiple placement drives |
| USER_PROFILE → NOTIFICATION | One-to-Many | A user receives multiple notifications |
| DRIVE → NOTIFICATION | One-to-Many | A drive triggers multiple notifications |
| RESPONSE → FACIAL_ANALYSIS | One-to-One | A response includes facial analysis data |
| USER → TIME_MACHINE | One-to-One | A user has one time machine prediction |
| USER → APTITUDE_TEST | One-to-Many | A user takes multiple aptitude tests |
| USER → SOFT_SKILLS | One-to-Many | A user learns multiple soft skill modules |
| USER → GAMES | One-to-Many | A user plays multiple interview games |
| COMPANY → DREAM_COMPANY | One-to-One | A company has dream company preparation data |


## 5.3 Activity Diagram

In Figure 5.3, the activity diagram illustrates the workflow of the Interview.ai system using four swimlanes: Login, User/Candidate, AI Interviewer, and System. The process begins with User Registration, Authentication, and Profile Setup in the Login phase. The User/Candidate swimlane shows Resume Upload followed by module selection where users can choose preparation activities (Aptitude Arena, Soft Skills, Games, Dream Company Station, Placement Drives, Resume Builder) or the AI Interview path including Start AI Interview, HR Interview Coach (HIC) for behavioral preparation using STAR methodology, Technical Practice Engine (TPE) for coding practice, Skill Autofill, and Interview Resource Hub. The AI Interviewer swimlane handles Generate Questions, Conduct Interview, Response Analysis, and Quality Check decision leading to either Positive Feedback with HIC Soft Skills Evaluation or Improvement Suggestions with TPE Code Evaluation. The System swimlane processes Resume Analysis, Skill Extraction, HIC STAR Analysis, TPE Code Analysis, Performance Evaluation, and Score Calculation. The Interview Ready decision determines whether to Generate Report and End or Continue Practice with a Retry loop for improvement.


## 5.4 Sequence Diagram

In Fig. 5.4, this sequence diagram illustrates the end-to-end interaction flow of the Interview.ai system between the user, frontend interface, backend APIs, AI engine, analysis services, and database during an AI-driven mock interview. It shows how a user registers and logs in, selects an AI interviewer, and starts an interview session. The system then generates interview questions, captures audio/video responses, and performs AI-based analysis such as response evaluation, facial expression and emotion detection. Based on this analysis, the platform generates structured feedback, scores, and performance insights, which are stored in the database and displayed to the user. The sequence diagram also highlights how analytics are updated to enable continuous performance tracking and personalized interview preparation within the Interview.ai platform.

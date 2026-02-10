# Figure 5.3 - Activity Diagram (Interview.ai System)

## 📋 Activity Diagram Structure for Draw.io / Lucidchart

### 🎨 Color Scheme (Match with Reference Image)
| Element | Color Code | Usage |
|---------|------------|-------|
| Swimlane Headers | `#4FC3F7` (Light Blue) | Login, User, AI, System |
| Activity Boxes | `#4FC3F7` (Blue) | Main activities |
| Decision Diamond | `#FFB74D` (Orange) | Decision points |
| Start Node | `#4CAF50` (Green) | Filled circle |
| End Node | `#F44336` (Red) | Filled circle with ring |
| Error/Alert | `#E57373` (Light Red) | Error states |
| Success | `#81C784` (Light Green) | Completion states |

---

## 🏊 SWIMLANES (4 Horizontal Lanes)

### Lane 1: 🔐 LOGIN
```
(●) START → [User Registration] → [Authentication] → [Profile Setup] →
```

### Lane 2: 👤 USER / CANDIDATE  
```
→ [Resume Upload] → [Select Module] → ◇ Module Type? ◇
                                            │
                    ┌───────────────────────┼───────────────────────┐
                    ↓                       ↓                       ↓
            [AI Mock Interview]    [Aptitude Practice]    [Soft Skills/Games]
```

### Lane 3: 🤖 AI INTERVIEWER
```
[Generate Questions] → [Conduct Interview] → [Record Responses] → ◇ Quality Check ◇
                                                                        │
                                                    ┌───────────────────┴───────────────────┐
                                                    ↓                                       ↓
                                            [Good Response]                    [Needs Improvement]
                                            (Green Box)                        (Orange/Red Box)
```

### Lane 4: ⚙️ SYSTEM PROCESSING
```
[Resume Analysis] → [Skill Extraction] → [Performance Evaluation] → [Score Calculation]
                                                                            ↓
                                                                    ◇ Pass Criteria? ◇
                                                                            │
                                                    ┌───────────────────────┴───────────────────┐
                                                    ↓                                           ↓
                                        [Success Report]                            [Improvement Plan]
                                        (Green Box)                                 (Orange Box)
                                                    ↓                                           ↓
                                                    └───────────────┬───────────────────────────┘
                                                                    ↓
                                                            [View Dashboard]
                                                                    ↓
                                                            ◇ Interview Ready? ◇
                                                                    │
                                            ┌───────────────────────┴───────────────────┐
                                            ↓                                           ↓
                                    [Complete - END (◉)]                    [Continue Practice]
                                    (Red End Node)                          (Loop back to Module Selection)
```

---

## 🔗 CROSS-LANE CONNECTIONS

| From | To | Arrow Label |
|------|-----|-------------|
| Login → Profile Setup | User → Resume Upload | (straight down) |
| User → AI Mock Interview | AI → Generate Questions | (straight down) |
| AI → Good Response | System → Success Report | "Pass" |
| AI → Needs Improvement | System → Improvement Plan | "Fail" |
| System → Interview Ready (No) | User → Select Module | "Retry" loop |

---

## 📐 Draw.io Instructions

1. **Open:** https://app.diagrams.net/
2. **New Diagram** → Select "UML" → "Activity Diagram"
3. **Insert Swimlanes:** Drag "Pool" from left panel
4. **Add 4 horizontal lanes** with labels
5. **Use these shapes:**
   - **Start:** Filled circle (green)
   - **Activity:** Rounded rectangle (blue)
   - **Decision:** Diamond (orange)
   - **End:** Bullseye circle (red)
6. **Connect with arrows**
7. **Export as PNG** (File → Export → PNG, 300 DPI)

---

## 📝 Activity Diagram Description (for Chapter 5)

In Figure 5.3, the Activity Diagram represents the main workflow of the Interview.ai - AI Powered Interview Preparation System. The diagram is organized into four swimlanes representing different actors and system components: Login, User/Candidate, AI Interviewer, and System Processing.

The flow of activities begins when a user registers and authenticates with the system through the Login swimlane. Upon successful authentication, the user proceeds to upload their resume and select a preparation module from options including AI Mock Interview, Aptitude Practice, Soft Skills Training, Interview Games, or Dream Company Preparation.

When the user selects AI Mock Interview, the AI Interviewer generates context-aware questions based on the user's resume and target role. The interview is conducted in real-time, with responses being recorded and analyzed. The system evaluates response quality and provides either positive feedback for good responses or improvement suggestions for responses that need enhancement.

The System Processing swimlane handles resume analysis, skill extraction, performance evaluation, and score calculation. Based on the evaluation results, the system determines whether the user meets the pass criteria. If yes, a success report is generated; otherwise, an improvement plan with guided learning resources is provided.

Finally, the user views their dashboard with performance reports. If the system determines the user is interview-ready, the process ends successfully. If not, the user is directed back to continue practice through the selected modules, creating a continuous improvement loop until interview readiness is achieved.

This activity diagram effectively illustrates the dynamic behavior of the Interview.ai system, showing how different components interact to provide a comprehensive interview preparation experience.

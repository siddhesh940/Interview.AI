# Chapter 3 - Requirement Gathering

## 3.1 Software and Hardware Requirements

Here we will discuss everything we will need in order to execute. Below we list the necessary hardware and software requirements. An AI-Powered Interview Preparation System with web capabilities requires both software and hardware components to function effectively. The system's primary goal is to manage interview preparation, track students, and facilitate efficient interview practice and skill development processes. Here are the typical software and hardware requirements for such a system.

### 3.1.1 Software Requirements

• **Operating System:** Windows 10/11, macOS, Linux
• **Frontend:** React.js, Next.js, TypeScript
• **Backend:** Node.js, Express.js
• **Database:** PostgreSQL, Supabase
• **AI/ML:** Python, TensorFlow, OpenAI API
• **Development Environment:** VS Code, Git
• **Cloud Platform:** Vercel, AWS, Google Cloud

### 3.1.2 Hardware Requirements

• **System:** Intel i5 or AMD equivalent Processor
• **Hard Disk:** 1 TB SSD
• **Monitor:** 15" LED or higher
• **Input Devices:** Keyboard, Mouse, Webcam
• **RAM:** 16 GB or higher
• **Internet:** Stable broadband connection

## 3.2 Cost Estimation

Cost estimation is a critical aspect of software project planning, as it helps in predicting the resources, effort, and time required for successful project completion. For this project, the **Basic COCOMO (Constructive Cost Model)** is used, which is one of the most widely adopted algorithmic cost estimation models in software engineering.

### 3.2.1 COCOMO Model Overview

The COCOMO model, proposed by **Barry W. Boehm** in 1981, estimates software development effort based on the size of the software measured in **KLOC (Kilo Lines of Code)**. The Basic COCOMO model uses three modes:

| Mode | Description |
|---|---|
| **Organic** | Small teams, familiar environment, flexible requirements |
| **Semi-Detached** | Medium-sized teams, mixed experience levels |
| **Embedded** | Tight constraints, complex systems, large teams |

Since this project is developed by a small academic team working in a familiar environment with flexible requirements, the **Organic Mode** is selected.

### 3.2.2 Organic Mode Formulas

| Parameter | Formula |
|---|---|
| **Effort (E)** | E = 2.4 × (KLOC)^1.05 Person-Months |
| **Development Time (T)** | T = 2.5 × (E)^0.38 Months |
| **Manpower Required (P)** | P = E / T Persons |

### 3.2.3 KLOC Estimation

The core functional codebase of the Interview.AI system includes API routes, business logic, database queries, AI integration modules, authentication, and essential UI components. Auto-generated boilerplate, configuration files, and third-party library code are excluded from this count to reflect the actual development effort.

| Component | Estimated LOC |
|---|---|
| API Routes & Backend Logic | 3,500 |
| AI/ML Integration (OpenAI, Sentiment Analysis) | 2,800 |
| Database Schema & Queries (SQL, Supabase) | 2,200 |
| Authentication & Middleware | 1,500 |
| Core UI Components (Functional TSX) | 3,500 |
| Utility Functions & Helpers | 1,500 |
| **Total** | **15,000 LOC** |

**KLOC = 15,000 / 1,000 = 15 KLOC**

### 3.2.4 Basic COCOMO Calculation (Organic Mode)

| Parameter | Formula | Calculation | Result |
|---|---|---|---|
| **Effort (E)** | 2.4 × (KLOC)^1.05 | 2.4 × (15)^1.05 | **41.2199 Person-Months** |
| **Development Time (T)** | 2.5 × (E)^0.38 | 2.5 × (41.2199)^0.38 | **10.2726 Months** |
| **Manpower Required (P)** | E / T | 41.2199 / 10.2726 | **4.0126 ≈ 4 Persons** |

**Figure 3.2.1 - COCOMO Model Based Cost Estimation**

### 3.2.5 Cost Estimation

| Cost Component | Details | Amount (₹) |
|---|---|---|
| Development Cost | E × Avg Stipend (₹20,000/month) = 41.22 × 20,000 | ₹8,24,400 |
| API/Token Cost | OpenAI API usage (GPT-4 tokens) | ₹500 |
| Cloud Hosting | Vercel (Free Tier), Supabase (Free Tier) | ₹0 |
| Domain & Miscellaneous | Domain registration, SSL, testing tools | ₹1,000 |
| **Total Estimated Cost** | | **₹8,25,900** |

### 3.2.6 Interpretation

The COCOMO model estimates approximately **41 Person-Months** of effort with a development timeline of around **10 months** and a team size of **4 persons**. Since this is an academic project developed by a small team of three students, the actual development effort was distributed across overlapping phases (design, development, testing) and does not strictly follow industrial COCOMO manpower scaling. The estimated values closely align with the actual development timeline of **8–9 months** with a **3-member team**, validating the accuracy of the Organic mode selection for this project.

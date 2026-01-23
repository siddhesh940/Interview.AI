<![CDATA[<div align="center">

# 💼 Placement Drives

### Live Job Opportunities & Eligibility Tracking

[![Feature](https://img.shields.io/badge/Feature-Jobs-green?style=for-the-badge)]()
[![Companies](https://img.shields.io/badge/Companies-6-blue?style=for-the-badge)]()
[![Auto-Update](https://img.shields.io/badge/Updates-Daily-orange?style=for-the-badge)]()

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Supported Companies](#-supported-companies)
- [Scraper System](#-scraper-system)
- [Eligibility Checker](#-eligibility-checker)
- [Technical Details](#-technical-details)
- [Usage Guide](#-usage-guide)

---

## 🌟 Overview

**Placement Drives** automatically fetches and displays current job openings from top IT companies. The system scrapes official career pages daily and filters opportunities based on your eligibility criteria.

### Key Benefits

| Benefit | Description |
|---------|-------------|
| 🔄 **Auto-Updated** | Daily scraping of career pages |
| 🎯 **Eligibility Filter** | Shows only relevant jobs |
| 📧 **Notifications** | Alerts for new opportunities |
| 🔗 **Direct Links** | Apply directly on company sites |

---

## ✨ Key Features

### 1. Real-time Job Listings

```
┌─────────────────────────────────────────────┐
│         PLACEMENT DRIVES                     │
├─────────────────────────────────────────────┤
│  🔵 TCS                                      │
│  └── 3 new openings                         │
│      ├── Digital (Campus) - Bangalore       │
│      ├── Ninja (Off-Campus) - Multiple      │
│      └── Prime (Experienced) - Mumbai       │
│                                              │
│  💙 Infosys                                  │
│  └── 2 new openings                         │
│      ├── Power Programmer - Hyderabad       │
│      └── DSE - Pune                         │
│                                              │
│  💜 Wipro                                    │
│  └── 2 new openings                         │
│      ├── Elite - Chennai                    │
│      └── Turbo - Bangalore                  │
└─────────────────────────────────────────────┘
```

### 2. Eligibility Checker

Input your details and see matching opportunities:

```
Profile:
├── Graduation Year: 2024
├── Percentage: 75%
├── Branch: Computer Science
├── Backlogs: 0
└── Location Preference: Any

Eligible For:
✅ TCS Digital
✅ Infosys Power Programmer
✅ Wipro Turbo
❌ Cognizant GenC Pro (Need 80%)
```

### 3. Notification System

- Email alerts for new jobs
- Deadline reminders
- Application status tracking

---

## 🏢 Supported Companies

### Companies & Scrapers

| Company | Scraper | Update Frequency |
|---------|---------|------------------|
| TCS | `tcs.scraper.js` | Daily |
| Infosys | `infosys.scraper.js` | Daily |
| Wipro | `wipro.scraper.js` | Daily |
| Cognizant | `cognizant.scraper.js` | Daily |
| Accenture | `accenture.scraper.js` | Daily |
| Capgemini | `capgemini.scraper.js` | Daily |

### Job Information Extracted

| Field | Description |
|-------|-------------|
| Title | Job role name |
| Location | Office location(s) |
| Type | Campus/Off-Campus/Lateral |
| Eligibility | CGPA, Year, Branch |
| Deadline | Application deadline |
| Apply Link | Direct application URL |
| Package | CTC information |

---

## 🤖 Scraper System

### Architecture

```
┌─────────────────────────────────────────────┐
│            SCRAPER SYSTEM                    │
├─────────────────────────────────────────────┤
│                                              │
│  ┌──────────┐    ┌──────────┐               │
│  │ Scheduler│───▶│ Scrapers │               │
│  │  (Cron)  │    │          │               │
│  └──────────┘    └────┬─────┘               │
│                       │                      │
│       ┌───────────────┼───────────────┐     │
│       ▼               ▼               ▼     │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐ │
│  │   TCS   │    │ Infosys │    │  Wipro  │ │
│  └────┬────┘    └────┬────┘    └────┬────┘ │
│       │              │              │       │
│       └──────────────┼──────────────┘       │
│                      ▼                      │
│              ┌──────────────┐               │
│              │   Supabase   │               │
│              │   Database   │               │
│              └──────────────┘               │
│                      │                      │
│                      ▼                      │
│              ┌──────────────┐               │
│              │  Frontend    │               │
│              │  Display     │               │
│              └──────────────┘               │
└─────────────────────────────────────────────┘
```

### Scraper Code Structure

```javascript
// Example: TCS Scraper (server/scrapers/tcs.scraper.js)
const puppeteer = require('puppeteer');
const { supabase } = require('../config/supabaseClient');

async function scrapeTCS() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('https://www.tcs.com/careers');
  
  // Extract job listings
  const jobs = await page.evaluate(() => {
    // Scraping logic
  });
  
  // Save to database
  await supabase.from('placement_drives').upsert(jobs);
  
  await browser.close();
}
```

### Scheduler

```javascript
// server/cron/scheduler.js
const cron = require('node-cron');

// Run all scrapers daily at 6 AM
cron.schedule('0 6 * * *', async () => {
  console.log('Starting daily scrape...');
  
  await Promise.all([
    scrapeTCS(),
    scrapeInfosys(),
    scrapeWipro(),
    scrapeCognizant(),
    scrapeAccenture(),
    scrapeCapgemini()
  ]);
  
  console.log('Daily scrape completed');
});
```

---

## ✅ Eligibility Checker

### Eligibility Service

```javascript
// server/services/eligibility.service.js

function checkEligibility(userProfile, jobRequirements) {
  const checks = {
    percentage: userProfile.percentage >= jobRequirements.minPercentage,
    year: jobRequirements.eligibleYears.includes(userProfile.gradYear),
    branch: jobRequirements.branches.includes(userProfile.branch),
    backlogs: userProfile.backlogs <= jobRequirements.maxBacklogs,
    age: userProfile.age <= jobRequirements.maxAge
  };
  
  return {
    isEligible: Object.values(checks).every(Boolean),
    checks
  };
}
```

### Common Eligibility Criteria

| Company | Min % | Backlogs | Branches |
|---------|-------|----------|----------|
| TCS | 60% | 0 | All |
| Infosys | 60% | 0 | All |
| Wipro | 60% | 0 | All |
| Cognizant | 60-70% | 0 | CS, IT, ECE |
| Accenture | 60% | 0 | All |
| Capgemini | 60% | 0 | All |

---

## 🏗️ Technical Details

### Database Schema

```sql
CREATE TABLE placement_drives (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    company TEXT NOT NULL,
    title TEXT NOT NULL,
    location TEXT[],
    type TEXT, -- campus, off-campus, lateral
    min_percentage DECIMAL,
    eligible_years INTEGER[],
    eligible_branches TEXT[],
    max_backlogs INTEGER DEFAULT 0,
    deadline DATE,
    apply_link TEXT,
    package_ctc TEXT,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE user_applications (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES "user"(id),
    drive_id INTEGER REFERENCES placement_drives(id),
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT DEFAULT 'applied'
);
```

### File Structure

```
server/
├── app.js                    # Express server
├── config/
│   └── supabaseClient.js     # Database connection
├── cron/
│   └── scheduler.js          # Cron job scheduler
├── scrapers/
│   ├── tcs.scraper.js
│   ├── infosys.scraper.js
│   ├── wipro.scraper.js
│   ├── cognizant.scraper.js
│   ├── accenture.scraper.js
│   └── capgemini.scraper.js
└── services/
    ├── eligibility.service.js
    └── notification.service.js
```

### Notification Service

```javascript
// server/services/notification.service.js

async function sendNewJobAlert(userId, job) {
  const user = await getUser(userId);
  
  await sendEmail({
    to: user.email,
    subject: `New Job Alert: ${job.title} at ${job.company}`,
    template: 'new-job-alert',
    data: { job, user }
  });
}

async function sendDeadlineReminder(userId, job) {
  // Send reminder 2 days before deadline
}
```

---

## 📖 Usage Guide

### Setting Up Your Profile

1. **Navigate to Placement Drives**
2. **Complete Your Profile**
   - Graduation year
   - Percentage/CGPA
   - Branch
   - Backlog history
   - Location preferences
3. **Save Profile**

### Finding Relevant Jobs

1. **View All Drives** - See all available opportunities
2. **Filter by Company** - Focus on specific companies
3. **Check Eligibility** - Auto-filter based on profile
4. **Sort by Deadline** - Prioritize urgent applications

### Applying to Jobs

1. **Click on Job** - View full details
2. **Check Requirements** - Verify eligibility
3. **Click Apply** - Redirects to official page
4. **Track Application** - Mark as applied in system

### Setting Up Alerts

1. **Go to Notifications**
2. **Enable Email Alerts**
3. **Select Companies** - Choose which to follow
4. **Set Preferences** - Frequency, criteria

---

## 💡 Tips

### Best Practices

```
✅ Update profile regularly
✅ Check drives daily
✅ Apply early (before deadline)
✅ Enable notifications
✅ Keep documents ready

❌ Don't miss deadlines
❌ Don't ignore eligibility criteria
❌ Don't apply without preparation
```

### Preparation Before Applying

```
Before applying, ensure:
├── Resume is updated
├── Profile is complete
├── Documents are ready
│   ├── 10th Marksheet
│   ├── 12th Marksheet
│   ├── Degree Certificate
│   └── ID Proof
└── Practice relevant topics
```

---

## 🔗 Related Features

- **[🏢 Dream Company](7_DREAM_COMPANY_STATION.md)** - Company-specific prep
- **[📄 Resume Builder](9_RESUME_BUILDER.md)** - Create resume for applications
- **[🧮 Aptitude Arena](6_APTITUDE_ARENA.md)** - Practice for tests

---

<div align="center">

**[⬆ Back to Index](README.md)**

*Last Updated: January 2026*

</div>
]]>

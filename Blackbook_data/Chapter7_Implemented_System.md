# Chapter 7 - Implemented System
## 7.1 System Architecture

In Figure 7.1, the system architecture of the Interview.ai – AI-Powered Interview Preparation Platform illustrates a layered design that ensures scalability, modularity, and efficient processing of interview preparation activities. The architecture begins with users (candidates) interacting through the frontend layer, where authentication, dashboard access, and feature selection are managed securely. User requests are routed through the API layer to backend services that handle interview sessions, resume building, practice modules, and analytics processing. At the core, the AI engine integrates advanced NLP and machine learning models to generate interview questions, analyze candidate responses, evaluate performance, and provide personalized feedback. Supporting components such as the technical practice engine, HR interview coach, and resume analysis modules perform domain-specific processing, while the data layer securely stores user profiles, interview responses, scores, and feedback reports. Overall, the architecture demonstrates seamless interaction between the presentation layer, intelligent processing components, and storage systems, enabling a scalable and automated interview preparation environment.

## 7.2 Sample Code

This section presents the key sample code files from the Interview.ai – AI-Powered Interview Preparation Platform. The code snippets illustrate the core implementation of the system, covering the frontend layout structure, user dashboard with authentication and state management, AI-powered interview question generation using OpenAI GPT-4o, and the create interview API for setting up new AI interview sessions with unique shareable URLs. Each code file demonstrates the modular architecture, clean separation of concerns, and industry-standard practices followed throughout the development of the platform. The sample code is written in TypeScript using the Next.js 14 framework with React 18, and leverages Clerk Authentication, Supabase PostgreSQL, and OpenAI API for backend processing.

### 1. layout.tsx (Root Layout)

```tsx
import type { Metadata } from "next";
import { Inter, Lato, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const sourceSans = Source_Sans_3({ 
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "900"],
  variable: "--font-source-sans"
});
const lato = Lato({ 
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato"
});

export const metadata: Metadata = {
  title: "Interview.ai",
  description: "AI-powered Interviews",
  openGraph: {
    title: "Interview.ai",
    description: "AI-powered Interviews",
    siteName: "Interview.ai",
    images: [{ url: "/interviewai.png", width: 800, height: 600 }],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/browser-client-icon.ico" />
      </head>
      <body className={`${inter.className} ${sourceSans.variable} ${lato.variable}`}>
        {children}
      </body>
    </html>
  );
}
```

*Figure 7.2.1: layout.tsx*

In Fig 7.2.1, the root layout file (`layout.tsx`) serves as the application's entry point and defines the global HTML structure for the entire Interview.ai platform. It initializes three Google Fonts — Inter, Source Sans 3, and Lato — with multiple font weights to ensure consistent and professional typography across all pages. The metadata configuration sets the application title as "Interview.ai" along with Open Graph meta tags for social media sharing, including site name, description, and preview image. The `RootLayout` component wraps all child pages within a standard HTML structure, applying the configured fonts globally through CSS class variables. This file acts as the foundational template, similar to an `index.html`, ensuring every page rendered by Next.js inherits the same font styling, favicon, and metadata configuration. The `suppressHydrationWarning` attribute on the `<html>` tag prevents React hydration mismatches caused by browser extensions or theme toggles.

---

### 2. Dashboard/page.tsx (Main Dashboard)

```tsx
"use client";

import CreateInterviewCard from "@/components/dashboard/interview/createInterviewCard";
import InterviewCard from "@/components/dashboard/interview/interviewCard";
import Modal from "@/components/dashboard/Modal";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useInterviews } from "@/contexts/interviews.context";
import { ClientService } from "@/services/clients.service";
import { InterviewService } from "@/services/interviews.service";
import { ResponseService } from "@/services/responses.service";
import { useOrganization } from "@clerk/nextjs";
import { Gem, Plus, TrendingUp, Users, Video } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

function Interviews() {
  const { interviews, interviewsLoading } = useInterviews();
  const { organization } = useOrganization();
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPlan, setCurrentPlan] = useState<string>("");
  const [allowedResponsesCount, setAllowedResponsesCount] = useState<number>(10);
  const [totalResponsesCount, setTotalResponsesCount] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchOrganizationData = async () => {
      try {
        if (organization?.id) {
          const data = await ClientService.getOrganizationById(organization.id);
          if (data?.plan) {
            setCurrentPlan(data.plan);
            if (data.plan === "free_trial_over") {
              setIsModalOpen(true);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching organization data:", error);
      }
    };
    fetchOrganizationData();
  }, [organization]);

  useEffect(() => {
    const fetchResponsesCount = async () => {
      if (!organization) return;
      setLoading(true);
      try {
        const totalResponses =
          await ResponseService.getResponseCountByOrganizationId(organization.id);
        setTotalResponsesCount(totalResponses);
        if (currentPlan === "free") {
          const hasExceededLimit = totalResponses >= allowedResponsesCount;
          if (hasExceededLimit) {
            setCurrentPlan("free_trial_over");
            await InterviewService.deactivateInterviewsByOrgId(organization.id);
            await ClientService.updateOrganization(
              { plan: "free_trial_over" }, organization.id
            );
          }
        }
      } catch (error) {
        console.error("Error fetching responses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResponsesCount();
  }, [organization, currentPlan, allowedResponsesCount]);

  return (
    <main className="page-container">
      <div className="content-container">
        <div className="mb-8 animate-fade-in-up">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 
              dark:from-indigo-900/50 dark:to-purple-900/50 rounded-xl section-icon">
              <Video className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                My Interviews
              </h2>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
```

*Figure 7.2.2: Dashboard/page.tsx*

In Fig 7.2.2, the Dashboard page (`page.tsx`) serves as the central hub of the Interview.ai platform after user authentication. It is a client-side React component that manages the user's interview sessions, organization plan, and response tracking. The component utilizes Clerk Authentication via `useOrganization()` to fetch the logged-in user's organization details and plan status (free, premium, or trial expired). Two `useEffect` hooks handle asynchronous data fetching — the first retrieves the organization's subscription plan and allowed response limits, while the second monitors total response counts and automatically downgrades the plan to "free_trial_over" when limits are exceeded. The UI displays interview cards for each created interview, along with a "Create Interview" option, animated loading skeletons for better UX, and a modal that triggers when the free trial expires. Services like `ClientService`, `InterviewService`, and `ResponseService` abstract database interactions with Supabase, ensuring clean separation of concerns between the presentation and data layers.

---

### 3. generate-interview-questions/route.ts (AI Question Generation API)

```tsx
import { OpenAI } from "openai";
import { NextResponse } from "next/server";
import {
  SYSTEM_PROMPT,
  generateQuestionsPrompt,
} from "@/lib/prompts/generate-questions";
import { logger } from "@/lib/logger";

export const maxDuration = 60;

export async function POST(req: Request, res: Response) {
  logger.info("generate-interview-questions request received");
  const body = await req.json();

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    maxRetries: 5,
    dangerouslyAllowBrowser: true,
  });

  try {
    const baseCompletion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: generateQuestionsPrompt(body) },
      ],
      response_format: { type: "json_object" },
    });

    const basePromptOutput = baseCompletion.choices[0] || {};
    const content = basePromptOutput.message?.content;

    logger.info("Interview questions generated successfully");

    return NextResponse.json({ response: content }, { status: 200 });
  } catch (error) {
    logger.error("Error generating interview questions");
    return NextResponse.json({ error: "internal server error" }, { status: 500 });
  }
}
```

*Figure 7.2.3: generate-interview-questions/route.ts*

In Fig 7.2.3, the AI Question Generation API route is the core intelligence module of the Interview.ai platform. This Next.js API route handles POST requests to dynamically generate interview questions using the OpenAI GPT-4o model. The route initializes an OpenAI client with the server-side API key and configures it with 5 retry attempts for reliability. It utilizes a structured prompt engineering approach with two components — a `SYSTEM_PROMPT` that defines the AI's role as an interview question generator, and a `generateQuestionsPrompt()` function that constructs the user prompt based on interview parameters such as job role, difficulty level, and topic domain. The `response_format: { type: "json_object" }` ensures the AI returns structured JSON output that can be directly parsed and stored. The `maxDuration = 60` setting extends the serverless function timeout to 60 seconds, accommodating the latency of GPT-4o responses. A structured logging system tracks request processing and error handling, ensuring production-grade observability.

---

### 4. create-interview/route.ts (Create Interview API)

```tsx
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import { InterviewService } from "@/services/interviews.service";
import { logger } from "@/lib/logger";

const base_url = process.env.NEXT_PUBLIC_LIVE_URL;

export async function POST(req: Request, res: Response) {
  try {
    const url_id = nanoid();
    const url = `${base_url}/call/${url_id}`;
    const body = await req.json();

    logger.info("create-interview request received");

    const payload = body.interviewData;

    let readableSlug = null;
    if (body.organizationName) {
      const interviewNameSlug = payload.name?.toLowerCase().replace(/\s/g, "-");
      const orgNameSlug = body.organizationName
        ?.toLowerCase()
        .replace(/\s/g, "-");
      readableSlug = `${orgNameSlug}-${interviewNameSlug}`;
    }

    const newInterview = await InterviewService.createInterview({
      ...payload,
      url: url,
      id: url_id,
      readable_slug: readableSlug,
    });

    logger.info("Interview created successfully");

    return NextResponse.json(
      { response: "Interview created successfully" },
      { status: 200 },
    );
  } catch (err) {
    logger.error("Error creating interview");
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
```

*Figure 7.2.4: create-interview/route.ts*

In Fig 7.2.4, the Create Interview API route is the primary entry point for setting up new AI-powered interview sessions on the Interview.ai platform. This Next.js API route handles POST requests to create a unique interview instance with a shareable URL. The route generates a unique identifier using `nanoid()`, a compact and URL-safe ID generator, and constructs a live interview call URL by appending this ID to the base application URL. The request body contains the interview configuration data — including interview name, job role, questions, and the assigned AI interviewer — along with the organization name. A human-readable slug is generated by combining the organization name and interview name in lowercase hyphenated format (e.g., `accenture-backend-developer`), enabling SEO-friendly and memorable interview URLs. The `InterviewService.createInterview()` method persists the complete interview payload to the Supabase PostgreSQL database, including the generated URL, unique ID, and readable slug. Structured logging via `logger.info()` and `logger.error()` ensures traceability of interview creation events in production, while comprehensive try-catch error handling returns appropriate HTTP status codes for successful (200) and failed (500) operations.

// HR Interview Coach Data
// Contains question categories, evaluation parameters, and skill configurations

export interface HRQuestion {
  id: string;
  category: HRQuestionCategory;
  question: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  idealPoints: string[];
  redFlagPatterns: string[];
  sampleAnswer: string;
  tips: string[];
}

export type HRQuestionCategory = 
  | 'personal'
  | 'strengths_weaknesses'
  | 'behavioral'
  | 'policy'
  | 'situational'
  | 'company_specific';

export interface HRCategory {
  id: HRQuestionCategory;
  name: string;
  description: string;
  icon: string;
  weight: number;
  color: string;
  bgColor: string;
  questions: number;
}

export const hrCategories: HRCategory[] = [
  {
    id: 'personal',
    name: 'Personal Introduction',
    description: 'Self-introduction, career goals, and personal background questions',
    icon: 'User',
    weight: 20,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    questions: 8
  },
  {
    id: 'strengths_weaknesses',
    name: 'Strengths & Weaknesses',
    description: 'Questions about your abilities, skills, and areas of improvement',
    icon: 'Target',
    weight: 15,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    questions: 6
  },
  {
    id: 'behavioral',
    name: 'Behavioral (STAR Method)',
    description: 'Past experience questions using Situation-Task-Action-Result framework',
    icon: 'Briefcase',
    weight: 25,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    questions: 12
  },
  {
    id: 'policy',
    name: 'HR Policy Questions',
    description: 'Salary expectations, notice period, relocation, and company policies',
    icon: 'FileText',
    weight: 15,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    questions: 8
  },
  {
    id: 'situational',
    name: 'Situational Questions',
    description: 'Hypothetical workplace scenarios and decision-making situations',
    icon: 'Brain',
    weight: 15,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    questions: 10
  },
  {
    id: 'company_specific',
    name: 'Company-Specific',
    description: 'Questions about why you want to join and what you know about the company',
    icon: 'Building2',
    weight: 10,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    questions: 6
  }
];

export const hrQuestions: HRQuestion[] = [
  // Personal Introduction Questions
  {
    id: 'personal_1',
    category: 'personal',
    question: 'Tell me about yourself.',
    difficulty: 'basic',
    idealPoints: [
      'Brief professional background',
      'Key achievements and skills',
      'Current role or recent education',
      'Why you are here today',
      'Career aspirations'
    ],
    redFlagPatterns: [
      'Too personal/irrelevant details',
      'Negative talk about past',
      'Rambling without structure'
    ],
    sampleAnswer: 'I am a software engineer with 2 years of experience in full-stack development. I graduated from XYZ University with a B.Tech in Computer Science. In my current role at ABC Company, I led a team of 3 developers to build a customer portal that increased user engagement by 40%. I am passionate about building scalable applications and am excited about this opportunity because it aligns with my goal of working on innovative products.',
    tips: [
      'Keep it under 2 minutes',
      'Follow the Present-Past-Future formula',
      'Highlight relevant achievements',
      'Connect to the role you are applying for'
    ]
  },
  {
    id: 'personal_2',
    category: 'personal',
    question: 'Walk me through your resume.',
    difficulty: 'basic',
    idealPoints: [
      'Chronological flow of career',
      'Key transitions explained',
      'Skills developed at each stage',
      'Relevance to current role'
    ],
    redFlagPatterns: [
      'Unexplained gaps',
      'Frequent job changes without reason',
      'Contradicting resume facts'
    ],
    sampleAnswer: 'After completing my degree in 2022, I joined ABC Company as a junior developer where I learned React and Node.js. Within a year, I was promoted to mid-level developer, leading small feature implementations. I am now looking for a senior role where I can mentor others and work on larger architectural decisions.',
    tips: [
      'Prepare for gap explanations',
      'Know your resume inside out',
      'Highlight growth and learning'
    ]
  },
  {
    id: 'personal_3',
    category: 'personal',
    question: 'Why are you looking for a change?',
    difficulty: 'intermediate',
    idealPoints: [
      'Positive reason for change',
      'Growth-oriented motivation',
      'Alignment with new opportunity',
      'Professional development focus'
    ],
    redFlagPatterns: [
      'Badmouthing current employer',
      'Only salary-driven',
      'Complaining about colleagues',
      'Vague or unclear reasons'
    ],
    sampleAnswer: 'While I have learned a lot at my current company, I am seeking new challenges that will help me grow as a professional. This role offers the opportunity to work on larger-scale projects and cutting-edge technologies, which aligns perfectly with my career goals.',
    tips: [
      'Never criticize current employer',
      'Focus on growth and opportunities',
      'Show enthusiasm for new role'
    ]
  },
  {
    id: 'personal_4',
    category: 'personal',
    question: 'What are your short-term and long-term career goals?',
    difficulty: 'intermediate',
    idealPoints: [
      'Clear short-term objectives (1-2 years)',
      'Realistic long-term vision (5+ years)',
      'Alignment with company growth',
      'Continuous learning mindset'
    ],
    redFlagPatterns: [
      'Unrealistic expectations',
      'Goals unrelated to the role',
      'Lack of ambition',
      'Only focused on salary/position'
    ],
    sampleAnswer: 'In the short term, I want to master the technologies used here and contribute meaningfully to the team. Within 2-3 years, I see myself taking on leadership responsibilities. Long term, I aspire to become a technical architect who can guide product decisions and mentor junior developers.',
    tips: [
      'Research typical career paths in the company',
      'Balance ambition with realism',
      'Show commitment to growth'
    ]
  },
  {
    id: 'personal_5',
    category: 'personal',
    question: 'Tell me about a time you failed and what you learned from it.',
    difficulty: 'advanced',
    idealPoints: [
      'Honest admission of failure',
      'Clear explanation of situation',
      'Actions taken to address it',
      'Lessons learned and applied'
    ],
    redFlagPatterns: [
      'Denying ever failing',
      'Blaming others entirely',
      'Trivial or fake example',
      'No learning demonstrated'
    ],
    sampleAnswer: 'Early in my career, I underestimated a project deadline and delivered late. I learned the importance of proper estimation and buffer time. Now I use the PERT estimation technique and always communicate proactively if there are any risks to the timeline.',
    tips: [
      'Choose a genuine but not catastrophic failure',
      'Focus on the learning, not the failure',
      'Show how you applied the learning'
    ]
  },
  {
    id: 'personal_6',
    category: 'personal',
    question: 'How would your colleagues or friends describe you?',
    difficulty: 'basic',
    idealPoints: [
      'Positive traits relevant to work',
      'Backed by real feedback',
      'Self-awareness and humility',
      'Professional qualities mentioned'
    ],
    redFlagPatterns: [
      'Only negative traits',
      'Unrealistic or exaggerated claims',
      'No specific examples',
      'Contradictory statements'
    ],
    sampleAnswer: 'My colleagues often describe me as reliable and a good team player. They appreciate that I meet my deadlines and am always willing to help when someone is stuck. My manager in my last review specifically mentioned my ability to stay calm under pressure.',
    tips: [
      'Use feedback from actual reviews or conversations',
      'Choose traits relevant to the job',
      'Be humble but confident'
    ]
  },
  {
    id: 'personal_7',
    category: 'personal',
    question: 'What motivates you to do your best work?',
    difficulty: 'intermediate',
    idealPoints: [
      'Intrinsic motivation factors',
      'Connection to career goals',
      'Alignment with role requirements',
      'Genuine and thoughtful response'
    ],
    redFlagPatterns: [
      'Only money-driven motivation',
      'Vague or generic answers',
      'No connection to the role',
      'Lack of passion or enthusiasm'
    ],
    sampleAnswer: 'I am motivated by solving complex problems and seeing the impact of my work. When I build something that helps users or improves efficiency, it gives me immense satisfaction. I also thrive in collaborative environments where I can learn from others.',
    tips: [
      'Be genuine about what drives you',
      'Connect motivation to the role',
      'Show passion for your work'
    ]
  },
  {
    id: 'personal_8',
    category: 'personal',
    question: 'Where do you see yourself in 5 years?',
    difficulty: 'intermediate',
    idealPoints: [
      'Realistic career progression',
      'Alignment with company growth',
      'Continuous learning mindset',
      'Leadership or expertise goals'
    ],
    redFlagPatterns: [
      'Planning to leave soon',
      'Unrealistic expectations',
      'No career direction',
      'Contradicting the role applied for'
    ],
    sampleAnswer: 'In 5 years, I see myself growing into a senior role where I can lead projects and mentor junior team members. I want to deepen my expertise in this field while contributing to the company growth. I believe this role is a perfect stepping stone for that journey.',
    tips: [
      'Show ambition but stay realistic',
      'Align goals with company opportunities',
      'Demonstrate commitment to growth'
    ]
  },

  // Strengths & Weaknesses
  {
    id: 'sw_1',
    category: 'strengths_weaknesses',
    question: 'What are your greatest strengths?',
    difficulty: 'basic',
    idealPoints: [
      'Relevant strengths for the role',
      'Backed by examples',
      'Self-awareness',
      'Connection to job requirements'
    ],
    redFlagPatterns: [
      'Generic answers without proof',
      'Arrogance or over-claiming',
      'Irrelevant strengths'
    ],
    sampleAnswer: 'My greatest strength is problem-solving. In my current role, I reduced system downtime by 30% by identifying and fixing a recurring memory leak. I also excel at communication - I regularly conduct knowledge-sharing sessions for my team.',
    tips: [
      'Pick 2-3 strengths relevant to the job',
      'Always provide examples',
      'Be confident but not arrogant'
    ]
  },
  {
    id: 'sw_2',
    category: 'strengths_weaknesses',
    question: 'What is your biggest weakness?',
    difficulty: 'intermediate',
    idealPoints: [
      'Genuine weakness (not disguised strength)',
      'Self-awareness',
      'Steps taken to improve',
      'Progress made'
    ],
    redFlagPatterns: [
      'Fake weakness (I work too hard)',
      'Critical weakness for the role',
      'No improvement efforts',
      'Defensive attitude'
    ],
    sampleAnswer: 'I used to struggle with public speaking. To improve, I joined Toastmasters and started presenting in team meetings. While I am still working on it, I am now comfortable presenting to groups of 20-30 people.',
    tips: [
      'Choose a real but manageable weakness',
      'Show what you are doing to improve',
      'Never say you have no weaknesses'
    ]
  },
  {
    id: 'sw_3',
    category: 'strengths_weaknesses',
    question: 'How would your colleagues describe you?',
    difficulty: 'basic',
    idealPoints: [
      'Honest self-assessment',
      'Positive traits with examples',
      'Acknowledgment of areas to grow',
      'Team perspective'
    ],
    redFlagPatterns: [
      'Only negative descriptions',
      'Unrealistic self-praise',
      'Conflict with colleagues mentioned'
    ],
    sampleAnswer: 'My colleagues would describe me as reliable and collaborative. I am often the go-to person for debugging complex issues. They might also say I am sometimes too detail-oriented, but I am learning to balance thoroughness with speed.',
    tips: [
      'Think about actual feedback you have received',
      'Be authentic and balanced',
      'Use this to reinforce your strengths'
    ]
  },

  // Behavioral Questions (STAR Method)
  {
    id: 'behavioral_1',
    category: 'behavioral',
    question: 'Tell me about a time you had a conflict with a colleague. How did you handle it?',
    difficulty: 'intermediate',
    idealPoints: [
      'Clear situation description',
      'Your role in the conflict',
      'Steps taken to resolve',
      'Positive outcome',
      'Lesson learned'
    ],
    redFlagPatterns: [
      'Blaming the other person entirely',
      'Escalating to management immediately',
      'Unresolved conflict',
      'Aggressive behavior'
    ],
    sampleAnswer: 'In a previous project, a colleague and I disagreed on the database design. Instead of escalating, I suggested we both present our approaches to the team. After discussion, we realized a hybrid approach was best. This taught me the value of open dialogue and considering multiple perspectives.',
    tips: [
      'Use the STAR method (Situation-Task-Action-Result)',
      'Focus on resolution, not the conflict',
      'Show emotional intelligence'
    ]
  },
  {
    id: 'behavioral_2',
    category: 'behavioral',
    question: 'Describe a situation where you worked under pressure.',
    difficulty: 'intermediate',
    idealPoints: [
      'High-pressure situation explained',
      'Your actions and approach',
      'Time management skills',
      'Successful outcome',
      'Stress management techniques'
    ],
    redFlagPatterns: [
      'Crumbling under pressure',
      'Blaming circumstances',
      'Poor prioritization'
    ],
    sampleAnswer: 'During a product launch, we discovered a critical bug 2 days before release. I organized the team into shifts, prioritized the most critical fixes, and we worked in 4-hour focused sprints. We fixed the issues and launched on time. I learned the importance of staying calm and organizing chaos.',
    tips: [
      'Choose a genuine high-pressure situation',
      'Highlight your coping mechanisms',
      'Show leadership if applicable'
    ]
  },
  {
    id: 'behavioral_3',
    category: 'behavioral',
    question: 'Give an example of a time you showed leadership.',
    difficulty: 'advanced',
    idealPoints: [
      'Leadership opportunity identified',
      'Actions taken to lead',
      'Team coordination',
      'Results achieved',
      'Leadership style demonstrated'
    ],
    redFlagPatterns: [
      'Taking credit for team work',
      'Authoritarian approach',
      'No tangible results'
    ],
    sampleAnswer: 'When our team lead was on leave, I stepped up to coordinate a sprint. I organized daily standups, resolved blockers, and ensured everyone had clarity on priorities. We delivered the sprint on time with all story points completed. This experience reinforced my interest in technical leadership.',
    tips: [
      'Leadership is not just about title',
      'Show how you influenced others',
      'Quantify results if possible'
    ]
  },
  {
    id: 'behavioral_4',
    category: 'behavioral',
    question: 'Tell me about a time you went above and beyond your job responsibilities.',
    difficulty: 'intermediate',
    idealPoints: [
      'Initiative demonstrated',
      'Value added beyond expectations',
      'Positive impact on team/company',
      'Recognition received'
    ],
    redFlagPatterns: [
      'Only doing assigned work',
      'Expecting rewards for everything',
      'Overstepping boundaries'
    ],
    sampleAnswer: 'I noticed our onboarding process was taking new developers 2 weeks. On my own initiative, I created a comprehensive documentation wiki and onboarding checklist. This reduced onboarding time to 5 days and was adopted as the standard process.',
    tips: [
      'Choose genuine examples of initiative',
      'Show impact on the organization',
      'Do not overdo the humble-brag'
    ]
  },

  // HR Policy Questions
  {
    id: 'policy_1',
    category: 'policy',
    question: 'What are your salary expectations?',
    difficulty: 'intermediate',
    idealPoints: [
      'Research-based range',
      'Flexibility shown',
      'Focus on value, not just money',
      'Consideration of total compensation'
    ],
    redFlagPatterns: [
      'Unrealistic expectations',
      'Rigid demands',
      'Only focused on salary',
      'No research done'
    ],
    sampleAnswer: 'Based on my research and considering my experience, I am expecting a salary in the range of X to Y. However, I am flexible and open to discussing the complete compensation package including benefits, growth opportunities, and work culture.',
    tips: [
      'Research market rates beforehand',
      'Give a range, not a fixed number',
      'Consider the entire package',
      'Be flexible but know your worth'
    ]
  },
  {
    id: 'policy_2',
    category: 'policy',
    question: 'What is your notice period? Can you join earlier?',
    difficulty: 'basic',
    idealPoints: [
      'Honest about current notice period',
      'Willingness to negotiate if possible',
      'Professional transition approach'
    ],
    redFlagPatterns: [
      'Lying about notice period',
      'Leaving immediately without proper handover',
      'Rigid about dates'
    ],
    sampleAnswer: 'My current notice period is 60 days. However, I can discuss with my manager about an early release after proper handover. I want to ensure a smooth transition for both my current employer and your organization.',
    tips: [
      'Be honest about your notice period',
      'Show professionalism about handover',
      'Express willingness to expedite if possible'
    ]
  },
  {
    id: 'policy_3',
    category: 'policy',
    question: 'Are you willing to relocate?',
    difficulty: 'basic',
    idealPoints: [
      'Clear answer with reasoning',
      'Flexibility if possible',
      'Practical considerations addressed'
    ],
    redFlagPatterns: [
      'Complete rigidity',
      'Dishonest about willingness',
      'Negative attitude about company locations'
    ],
    sampleAnswer: 'Yes, I am open to relocation. I understand that sometimes the best opportunities require moving, and I am willing to make that adjustment for the right role and growth opportunity.',
    tips: [
      'Be honest about your constraints',
      'If constraints exist, explain professionally',
      'Show flexibility where possible'
    ]
  },
  {
    id: 'policy_4',
    category: 'policy',
    question: 'Are you comfortable working in night shifts or rotational shifts?',
    difficulty: 'basic',
    idealPoints: [
      'Honest response',
      'Understanding of business needs',
      'Flexibility demonstrated'
    ],
    redFlagPatterns: [
      'Complete refusal without discussion',
      'Negative attitude about shift work',
      'False commitment'
    ],
    sampleAnswer: 'I understand that some projects may require different shift timings based on client locations. I am flexible and willing to work in rotational shifts as required. My priority is contributing effectively to the team.',
    tips: [
      'Understand the actual shift requirements',
      'Be honest about your preferences',
      'Show understanding of business needs'
    ]
  },

  // Situational Questions
  {
    id: 'situational_1',
    category: 'situational',
    question: 'What would you do if you disagreed with your manager\'s decision?',
    difficulty: 'advanced',
    idealPoints: [
      'Respectful approach',
      'Private discussion preference',
      'Data-backed alternative',
      'Acceptance after discussion',
      'Professionalism maintained'
    ],
    redFlagPatterns: [
      'Immediate compliance without thought',
      'Aggressive disagreement',
      'Going over manager\'s head',
      'Passive-aggressive behavior'
    ],
    sampleAnswer: 'I would first try to understand the reasoning behind the decision. If I still disagreed, I would request a private meeting to share my perspective with supporting data. If my manager still chose the original decision, I would respect it and commit to making it successful while documenting my concerns.',
    tips: [
      'Show respect for hierarchy',
      'Demonstrate constructive disagreement',
      'Balance conviction with flexibility'
    ]
  },
  {
    id: 'situational_2',
    category: 'situational',
    question: 'How would you handle a situation where you have multiple urgent deadlines?',
    difficulty: 'intermediate',
    idealPoints: [
      'Prioritization approach',
      'Communication with stakeholders',
      'Time management skills',
      'Seeking help when needed'
    ],
    redFlagPatterns: [
      'Panic response',
      'Missing all deadlines',
      'Not communicating',
      'Overcommitting'
    ],
    sampleAnswer: 'I would first assess all deadlines and prioritize based on business impact and true urgency. I would communicate proactively with stakeholders about realistic timelines. If needed, I would negotiate deadlines or seek additional resources. I believe in setting realistic expectations rather than overpromising.',
    tips: [
      'Show structured thinking',
      'Emphasize communication',
      'Demonstrate prioritization skills'
    ]
  },
  {
    id: 'situational_3',
    category: 'situational',
    question: 'What would you do if you made a mistake that went unnoticed?',
    difficulty: 'advanced',
    idealPoints: [
      'Integrity and honesty',
      'Proactive disclosure',
      'Solution-oriented approach',
      'Learning from mistakes'
    ],
    redFlagPatterns: [
      'Hiding the mistake',
      'Blaming others',
      'Only confessing if caught'
    ],
    sampleAnswer: 'I would immediately disclose the mistake to my manager along with a proposed solution. Hiding mistakes can lead to bigger problems later. I believe in taking responsibility for my actions and using mistakes as learning opportunities.',
    tips: [
      'Show integrity and honesty',
      'Demonstrate ownership',
      'Focus on solutions, not excuses'
    ]
  },

  // Company-Specific Questions
  {
    id: 'company_1',
    category: 'company_specific',
    question: 'Why do you want to join our company?',
    difficulty: 'intermediate',
    idealPoints: [
      'Research about company demonstrated',
      'Alignment with company values',
      'Specific reasons, not generic',
      'Career growth alignment',
      'Genuine enthusiasm'
    ],
    redFlagPatterns: [
      'Generic answer applicable to any company',
      'Only focused on salary/benefits',
      'No knowledge about company',
      'Desperation for any job'
    ],
    sampleAnswer: 'I have been following your company\'s journey, especially the recent product launch in AI space. Your commitment to innovation and employee development aligns with my career goals. I am particularly excited about the opportunity to work with cutting-edge technologies and contribute to products that impact millions of users.',
    tips: [
      'Research the company thoroughly',
      'Mention specific products, values, or news',
      'Connect your goals to company mission',
      'Show genuine enthusiasm'
    ]
  },
  {
    id: 'company_2',
    category: 'company_specific',
    question: 'What do you know about our company?',
    difficulty: 'basic',
    idealPoints: [
      'Company history and products',
      'Recent news or achievements',
      'Company culture and values',
      'Market position'
    ],
    redFlagPatterns: [
      'Complete ignorance',
      'Wrong information',
      'Generic industry knowledge only'
    ],
    sampleAnswer: 'Your company was founded in [year] and is known for [products/services]. I read about your recent [achievement/news]. I understand you have a culture that values [values]. Your market position as [position] in [industry] is impressive.',
    tips: [
      'Research website, news, and LinkedIn',
      'Know products and services',
      'Understand company culture',
      'Be up-to-date on recent news'
    ]
  },
  {
    id: 'company_3',
    category: 'company_specific',
    question: 'Where do you see yourself in 5 years with our company?',
    difficulty: 'intermediate',
    idealPoints: [
      'Realistic growth expectations',
      'Alignment with company career paths',
      'Continuous learning commitment',
      'Long-term commitment indication'
    ],
    redFlagPatterns: [
      'Unrealistic expectations',
      'No ambition',
      'Plans unrelated to company',
      'Short-term thinking'
    ],
    sampleAnswer: 'In 5 years, I see myself as a senior technical lead, having grown through the learning opportunities here. I aim to contribute to major product decisions and mentor junior developers. I want to be someone who has made a significant impact on the team and products.',
    tips: [
      'Research typical career paths',
      'Balance ambition with realism',
      'Show long-term commitment',
      'Connect growth to company success'
    ]
  }
];

export interface InterviewMode {
  id: string;
  name: string;
  description: string;
  duration: string;
  questionCount: number;
  icon: string;
  color: string;
}

export const interviewModes: InterviewMode[] = [
  {
    id: 'quick',
    name: 'Quick Practice',
    description: 'Practice with 3 random questions for a quick confidence boost',
    duration: '5-10 min',
    questionCount: 3,
    icon: 'Zap',
    color: 'text-yellow-600'
  },
  {
    id: 'standard',
    name: 'Standard Interview',
    description: 'Balanced interview covering all major question categories',
    duration: '20-25 min',
    questionCount: 8,
    icon: 'ClipboardList',
    color: 'text-blue-600'
  },
  {
    id: 'full',
    name: 'Full HR Interview',
    description: 'Complete HR round simulation with comprehensive evaluation',
    duration: '30-40 min',
    questionCount: 12,
    icon: 'Award',
    color: 'text-green-600'
  },
  {
    id: 'stress',
    name: 'Stress Interview',
    description: 'High-pressure scenarios to build resilience and composure',
    duration: '15-20 min',
    questionCount: 6,
    icon: 'AlertTriangle',
    color: 'text-red-600'
  }
];

export interface EvaluationParameter {
  id: string;
  name: string;
  weight: number;
  description: string;
  icon: string;
}

export const evaluationParameters: EvaluationParameter[] = [
  {
    id: 'confidence',
    name: 'Confidence',
    weight: 20,
    description: 'Voice tone, assertiveness, and clarity in responses',
    icon: 'Shield'
  },
  {
    id: 'communication',
    name: 'Communication',
    weight: 20,
    description: 'Structure, coherence, and articulation of ideas',
    icon: 'MessageSquare'
  },
  {
    id: 'professional_tone',
    name: 'Professional Tone',
    weight: 15,
    description: 'Language appropriateness and formality level',
    icon: 'Briefcase'
  },
  {
    id: 'attitude',
    name: 'Attitude',
    weight: 15,
    description: 'Positivity, flexibility, and enthusiasm displayed',
    icon: 'Smile'
  },
  {
    id: 'authenticity',
    name: 'Authenticity',
    weight: 15,
    description: 'Honesty and genuine responses vs over-smartness',
    icon: 'Heart'
  },
  {
    id: 'red_flag_check',
    name: 'Red Flag Check',
    weight: 15,
    description: 'Absence of negativity, rigidity, or unrealistic expectations',
    icon: 'AlertCircle'
  }
];

export interface RedFlag {
  id: string;
  category: string;
  description: string;
  examples: string[];
  severity: 'critical' | 'high' | 'medium';
  color: string;
}

export const redFlags: RedFlag[] = [
  {
    id: 'negativity',
    category: 'Negativity',
    description: 'Criticizing previous employers, colleagues, or showing negative attitude',
    examples: [
      'My previous company was terrible',
      'My manager never appreciated my work',
      'The team was incompetent'
    ],
    severity: 'critical',
    color: 'text-red-600'
  },
  {
    id: 'rigidity',
    category: 'Rigidity',
    description: 'Inflexible preferences and unwillingness to adapt',
    examples: [
      'I will never work on weekends',
      'I only want to work on specific technology',
      'I cannot relocate under any circumstances'
    ],
    severity: 'high',
    color: 'text-orange-600'
  },
  {
    id: 'unrealistic_expectations',
    category: 'Unrealistic Expectations',
    description: 'Excessive salary demands or immediate promotion expectations',
    examples: [
      'I expect 100% hike',
      'I should be promoted within 6 months',
      'I will only accept if I am made team lead'
    ],
    severity: 'high',
    color: 'text-orange-600'
  },
  {
    id: 'overconfidence',
    category: 'Over-confidence',
    description: 'Arrogance and inability to acknowledge limitations',
    examples: [
      'I never make mistakes',
      'I am the best in my team',
      'I do not need to learn anything new'
    ],
    severity: 'medium',
    color: 'text-yellow-600'
  },
  {
    id: 'lack_preparation',
    category: 'Lack of Preparation',
    description: 'No knowledge about the company or role',
    examples: [
      'I did not get time to research',
      'What does your company do?',
      'I applied to many companies, cannot remember specifics'
    ],
    severity: 'medium',
    color: 'text-yellow-600'
  },
  {
    id: 'inconsistency',
    category: 'Inconsistency',
    description: 'Conflicting statements or information',
    examples: [
      'Different story about job changes',
      'Contradicting resume details',
      'Changing salary expectations'
    ],
    severity: 'medium',
    color: 'text-yellow-600'
  }
];

export const readinessLevels = [
  { min: 90, max: 100, label: 'HR Interview Ready', color: 'text-green-600', bgColor: 'bg-green-100' },
  { min: 75, max: 89, label: 'Almost Ready', color: 'text-blue-600', bgColor: 'bg-blue-100' },
  { min: 60, max: 74, label: 'Moderate Preparation Needed', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
  { min: 0, max: 59, label: 'Intensive Practice Needed', color: 'text-red-600', bgColor: 'bg-red-100' }
];

export const PROGRESS_WEIGHTS = {
  CATEGORY_COMPLETED: 10,
  INTERVIEW_COMPLETED: 15,
  ANSWER_SAVED: 5,
  RED_FLAG_AVOIDED: 5,
  HIGH_SCORE_ACHIEVED: 10,
  VIDEO_WATCHED: 5
};

// HR Video Learning Data
export interface HRVideo {
  id: string;
  title: string;
  videoPath: string;
  duration?: string;
}

export interface HRVideoSection {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  videos: HRVideo[];
}

export const hrVideoSections: HRVideoSection[] = [
  {
    id: 'hr_basics',
    title: 'HR Round Basics',
    description: 'Covers introduction to HR rounds, mindset, and what interviewers expect from candidates.',
    icon: 'BookOpen',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    videos: [
      {
        id: 'hr_basics_1',
        title: 'HR Round Basics - Part 1',
        videoPath: '/HR_Videoes/HR Round Basics1.mp4',
        duration: '~20 min'
      },
      {
        id: 'hr_basics_2',
        title: 'HR Round Basics - Part 2',
        videoPath: '/HR_Videoes/HR Round Basics2.mp4',
        duration: '~40 min'
      },
      {
        id: 'hr_basics_3',
        title: 'HR Round Basics - Part 3',
        videoPath: '/HR_Videoes/HR Round Basics3.mp4',
        duration: '~15 min'
      }
    ]
  },
  {
    id: 'common_questions',
    title: 'Most Common HR Questions & Answers',
    description: 'Learn to answer common HR questions like "Tell me about yourself", salary expectations, strengths/weaknesses, relocation, night shifts, and more.',
    icon: 'HelpCircle',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    videos: [
      {
        id: 'common_qa_1',
        title: 'Common HR Questions - Part 1',
        videoPath: '/HR_Videoes/Most Common HR Questions & Answers1.mp4',
        duration: '~2 hrs'
      },
      {
        id: 'common_qa_2',
        title: 'Common HR Questions - Part 2',
        videoPath: '/HR_Videoes/Most Common HR Questions & Answers2.mp4',
        duration: '~38 min'
      },
      {
        id: 'common_qa_3',
        title: 'Common HR Questions - Part 3',
        videoPath: '/HR_Videoes/Most Common HR Questions & Answers3.mp4',
        duration: '~21 min'
      }
    ]
  },
  {
    id: 'confidence_tips',
    title: 'Confidence & Delivery Tips',
    description: 'Focuses on communication clarity, confidence, body language, tone, and answer delivery during HR interviews.',
    icon: 'Sparkles',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    videos: [
      {
        id: 'confidence_1',
        title: 'Confidence & Delivery - Part 1',
        videoPath: '/HR_Videoes/Confidence & Delivery Tips1.mp4',
        duration: '~50 min'
      },
      {
        id: 'confidence_2',
        title: 'Confidence & Delivery - Part 2',
        videoPath: '/HR_Videoes/Confidence & Delivery Tips2.mp4',
        duration: '~3 hrs'
      },
      {
        id: 'confidence_3',
        title: 'Confidence & Delivery - Part 3',
        videoPath: '/HR_Videoes/Confidence & Delivery Tips3.mp4',
        duration: '~33 min'
      }
    ]
  }
];


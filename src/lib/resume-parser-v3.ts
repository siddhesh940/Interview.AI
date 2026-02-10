/**
 * ENHANCED RESUME PARSER v3.0
 * ============================
 * Multi-layer parsing solution for maximum accuracy
 * 
 * 🟢 LAYER 1: Pre-validation & Text Quality Check
 * 🟢 LAYER 2: Multi-pass Section Detection with Aliases
 * 🟢 LAYER 3: Confidence-based Extraction (never absolute)
 * 🟢 LAYER 4: User-editable Results
 * 
 * NO PAID APIs - 100% frontend processing
 */

// ============================================================================
// TYPES
// ============================================================================

export interface ResumeQualityCheck {
  isValid: boolean;
  textLength: number;
  alphabetDensity: number;
  lineCount: number;
  emptyLineRatio: number;
  hasStructuredContent: boolean;
  warnings: string[];
  suggestions: string[];
  qualityScore: number; // 0-100
}

export interface SectionDetection {
  type: SectionType;
  headerLine: number;
  headerText: string;
  content: string;
  confidence: number;
  detectionMethod: 'exact' | 'alias' | 'pattern' | 'content-based' | 'fallback';
  warnings: string[];
}

export type SectionType = 
  | 'contact'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'achievements'
  | 'languages'
  | 'hobbies'
  | 'volunteer'
  | 'publications';

export interface ExtractedSkill {
  name: string;
  category: 'programming' | 'framework' | 'database' | 'tool' | 'cloud' | 'soft' | 'other';
  confidence: number;
}

export interface ExtractedExperience {
  title: string;
  company: string;
  duration: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
  confidence: number;
  isInferred: boolean;
}

export interface ExtractedEducation {
  degree: string;
  institution: string;
  field: string;
  year: string;
  level: 'SSC' | 'HSC' | 'Diploma' | 'Graduation' | 'Masters' | 'PhD' | 'Other';
  confidence: number;
  isInferred: boolean;
}

export interface ExtractedProject {
  name: string;
  description: string;
  techStack: string[];
  link: string | null;
  confidence: number;
}

export interface ExtractedCertification {
  name: string;
  issuer: string;
  date: string;
  confidence: number;
}

export interface SectionConfidence {
  skills: number;
  experience: number;
  education: number;
  projects: number;
  certifications: number;
  contact: number;
  summary: number;
}

export interface ParsedResumeV3 {
  // Metadata
  parseId: string;
  parseTimestamp: string;
  parserVersion: string;
  
  // Quality Assessment
  qualityCheck: ResumeQualityCheck;
  
  // Detected Sections
  detectedSections: SectionDetection[];
  
  // Extracted Data (with confidence)
  contact: {
    name: string | null;
    email: string | null;
    phone: string | null;
    linkedin: string | null;
    github: string | null;
    location: string | null;
    confidence: number;
  };
  summary: string | null;
  skills: ExtractedSkill[];
  experience: ExtractedExperience[];
  education: ExtractedEducation[];
  projects: ExtractedProject[];
  certifications: ExtractedCertification[];
  
  // Confidence Scores
  sectionConfidence: SectionConfidence;
  overallConfidence: number;
  
  // User-friendly Messages (NEVER absolute negatives)
  confidenceMessages: {
    skills: string;
    experience: string;
    education: string;
    projects: string;
    overall: string;
  };
  
  // Warnings & Suggestions
  warnings: string[];
  suggestions: string[];
  
  // Raw text for fallback editing
  cleanedText: string;
}

// ============================================================================
// SECTION ALIAS DICTIONARY (COMPREHENSIVE)
// ============================================================================

const SECTION_ALIASES: Record<SectionType, string[]> = {
  contact: [
    'contact', 'contact info', 'contact information', 'contact details',
    'personal info', 'personal information', 'personal details',
    'get in touch', 'reach me', 'connect with me', 'about'
  ],
  summary: [
    'summary', 'professional summary', 'executive summary', 'career summary',
    'profile', 'professional profile', 'career profile',
    'objective', 'career objective', 'professional objective',
    'about me', 'overview', 'introduction', 'who i am',
    'background', 'my background', 'personal statement', 'statement'
  ],
  experience: [
    'experience', 'work experience', 'professional experience', 'employment',
    'employment history', 'work history', 'career history',
    'positions held', 'job experience', 'professional background',
    'relevant experience', 'internship', 'internships',
    'industrial experience', 'industrial training', 'work'
  ],
  education: [
    'education', 'educational background', 'educational history',
    'academic background', 'academic history', 'academic qualifications',
    'qualifications', 'academic details', 'academics',
    'educational credentials', 'studies', 'academic record',
    'degrees', 'schooling'
  ],
  skills: [
    'skills', 'technical skills', 'key skills', 'core skills',
    'primary skills', 'professional skills', 'relevant skills',
    'soft skills', 'hard skills', 'skill set', 'skillset',
    'competencies', 'core competencies', 'key competencies',
    'technologies', 'technologies used', 'tech stack',
    'technology stack', 'technical stack',
    'technical proficiency', 'technical knowledge', 'technical expertise',
    'proficiencies', 'tools', 'tools and technologies',
    'software skills', 'software knowledge', 'software proficiency',
    'programming languages', 'programming skills', 'coding skills',
    'languages and frameworks', 'areas of expertise',
    'domain expertise', 'specializations', 'strengths', 'capabilities',
    'it skills', 'computer skills', 'digital skills', 'expertise'
  ],
  projects: [
    'projects', 'personal projects', 'academic projects', 'side projects',
    'key projects', 'portfolio', 'notable projects', 'selected projects',
    'featured projects', 'project experience', 'project work',
    'project highlights', 'major projects', 'recent projects',
    'mini projects', 'open source', 'open source projects',
    'open source contributions', 'project portfolio'
  ],
  certifications: [
    'certifications', 'certificates', 'certification',
    'certifications and licenses', 'licenses and certifications',
    'professional certifications', 'credentials',
    'training', 'trainings', 'courses', 'online courses',
    'professional development', 'accreditations', 'certified in'
  ],
  achievements: [
    'achievements', 'accomplishments', 'honors', 'awards',
    'achievements and awards', 'recognition', 'accolades',
    'key achievements', 'notable achievements', 'career highlights',
    'highlights', 'distinctions', 'prizes', 'scholarships'
  ],
  languages: [
    'languages', 'languages known', 'languages spoken',
    'spoken languages', 'linguistic skills', 'communication languages',
    'fluency'
  ],
  hobbies: [
    'hobbies', 'interests', 'hobbies and interests', 'interests and hobbies',
    'personal interests', 'extracurricular', 'extracurricular activities',
    'activities', 'outside interests', 'leisure activities', 'passions'
  ],
  volunteer: [
    'volunteer', 'volunteering', 'volunteer experience', 'volunteer work',
    'community service', 'community involvement', 'community work',
    'social service', 'social work', 'social activities',
    'ngo experience', 'ngo work', 'charitable work', 'charitable activities',
    'pro bono'
  ],
  publications: [
    'publications', 'research', 'research papers', 'research publications',
    'papers published', 'papers presented',
    'journal articles', 'journal publications',
    'conference papers', 'conference presentations',
    'thesis', 'dissertations', 'white papers', 'patents'
  ]
};

// ============================================================================
// SKILL DICTIONARY (COMPREHENSIVE - 300+ SKILLS)
// ============================================================================

const SKILL_DICTIONARY = {
  programming: [
    'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'c', 'go', 'golang',
    'rust', 'ruby', 'php', 'swift', 'kotlin', 'scala', 'perl', 'r', 'matlab',
    'lua', 'haskell', 'elixir', 'clojure', 'dart', 'objective-c', 'groovy',
    'fortran', 'assembly', 'bash', 'powershell', 'shell', 'sql', 'plsql', 'tsql',
    'html', 'css', 'scss', 'sass', 'less', 'xml', 'json', 'yaml',
    'graphql', 'solidity', 'vhdl', 'verilog', 'julia'
  ],
  framework: [
    // Frontend
    'react', 'react.js', 'reactjs', 'angular', 'angularjs', 'vue', 'vue.js', 'vuejs',
    'svelte', 'next.js', 'nextjs', 'nuxt', 'nuxt.js', 'gatsby', 'remix',
    'ember', 'backbone', 'jquery', 'bootstrap', 'tailwind', 'tailwindcss',
    'material-ui', 'mui', 'chakra ui', 'ant design', 'styled-components',
    // Backend
    'express', 'express.js', 'expressjs', 'fastify', 'koa', 'hapi',
    'nest', 'nest.js', 'nestjs', 'django', 'flask', 'fastapi',
    'spring', 'spring boot', 'springboot', 'hibernate',
    'rails', 'ruby on rails', 'laravel', 'symfony', 'codeigniter',
    'asp.net', 'aspnet', '.net', 'dotnet', '.net core', 'blazor', 'entity framework',
    // Mobile
    'react native', 'flutter', 'ionic', 'xamarin', 'swiftui', 'jetpack compose',
    'android sdk', 'ios sdk', 'expo',
    // Others
    'electron', 'tauri', 'qt', 'tkinter', 'pygame', 'unity', 'unreal engine'
  ],
  database: [
    'mysql', 'postgresql', 'postgres', 'sqlite', 'mariadb', 'oracle', 'mssql',
    'sql server', 'microsoft sql', 'cockroachdb', 'timescaledb',
    'mongodb', 'mongo', 'dynamodb', 'cassandra', 'couchdb', 'couchbase',
    'firebase', 'firestore', 'redis', 'memcached', 'elasticsearch',
    'neo4j', 'arangodb', 'influxdb', 'graphql',
    'prisma', 'sequelize', 'mongoose', 'typeorm', 'knex',
    'supabase', 'planetscale', 'fauna', 'faunadb', 'neon'
  ],
  tool: [
    // Version Control
    'git', 'github', 'gitlab', 'bitbucket', 'svn', 'mercurial',
    // CI/CD
    'jenkins', 'travis ci', 'travisci', 'circle ci', 'circleci', 'github actions',
    'gitlab ci', 'azure devops', 'azure pipelines', 'bamboo', 'teamcity',
    'argocd', 'spinnaker', 'drone',
    // Containers
    'docker', 'kubernetes', 'k8s', 'docker compose', 'podman', 'helm',
    'rancher', 'openshift', 'minikube', 'kind',
    // Build Tools
    'webpack', 'vite', 'parcel', 'rollup', 'esbuild', 'turbopack',
    'gradle', 'maven', 'ant', 'npm', 'yarn', 'pnpm', 'pip', 'poetry', 'cargo',
    // Testing
    'jest', 'mocha', 'chai', 'jasmine', 'karma', 'cypress', 'playwright',
    'selenium', 'puppeteer', 'webdriver', 'pytest', 'unittest', 'junit',
    'testng', 'rspec', 'cucumber', 'postman', 'insomnia',
    // IDEs & Editors
    'vscode', 'visual studio', 'intellij', 'pycharm', 'webstorm', 'eclipse',
    'android studio', 'xcode', 'vim', 'neovim', 'emacs', 'atom', 'sublime text',
    // Design
    'figma', 'sketch', 'adobe xd', 'photoshop', 'illustrator', 'canva',
    // Project Management
    'jira', 'confluence', 'trello', 'asana', 'notion', 'linear', 'monday',
    // Communication
    'slack', 'discord', 'microsoft teams', 'zoom',
    // Others
    'swagger', 'openapi', 'graphiql', 'apollo', 'nginx', 'apache',
    'linux', 'unix', 'windows server', 'vmware', 'virtualbox'
  ],
  cloud: [
    // AWS
    'aws', 'amazon web services', 'ec2', 's3', 'lambda', 'rds', 'dynamodb',
    'cloudfront', 'route 53', 'route53', 'ecs', 'eks', 'fargate',
    'cloudwatch', 'sns', 'sqs', 'api gateway', 'cognito', 'amplify',
    'elastic beanstalk', 'lightsail', 'cloudformation', 'cdk',
    // Azure
    'azure', 'microsoft azure', 'azure functions', 'azure devops',
    'cosmos db', 'cosmosdb', 'azure blob', 'azure sql', 'aks',
    'azure app service', 'azure storage', 'azure ad',
    // GCP
    'gcp', 'google cloud', 'google cloud platform', 'cloud run',
    'cloud functions', 'bigquery', 'cloud storage', 'gke',
    'app engine', 'compute engine', 'cloud sql',
    // Others
    'heroku', 'vercel', 'netlify', 'digitalocean', 'linode',
    'cloudflare', 'fly.io', 'railway', 'render', 'supabase',
    'terraform', 'pulumi', 'ansible', 'chef', 'puppet'
  ],
  soft: [
    'leadership', 'communication', 'teamwork', 'problem solving',
    'problem-solving', 'analytical', 'critical thinking', 'time management',
    'project management', 'agile', 'scrum', 'kanban', 'mentoring',
    'coaching', 'presentation', 'collaboration', 'adaptability',
    'creativity', 'attention to detail', 'decision making',
    'conflict resolution', 'negotiation', 'organization', 'planning',
    'research', 'documentation', 'technical writing', 'public speaking'
  ]
};

// ============================================================================
// LAYER 1: RESUME QUALITY CHECK
// ============================================================================

export function checkResumeQuality(text: string): ResumeQualityCheck {
  const warnings: string[] = [];
  const suggestions: string[] = [];
  
  // Basic metrics
  const textLength = text.length;
  const lines = text.split('\n');
  const lineCount = lines.length;
  const emptyLines = lines.filter(l => !l.trim()).length;
  const emptyLineRatio = lineCount > 0 ? emptyLines / lineCount : 1;
  
  // Alphabet density (ratio of letters to total characters)
  const letters = text.replace(/[^a-zA-Z]/g, '').length;
  const alphabetDensity = textLength > 0 ? letters / textLength : 0;
  
  // Check for structured content (has some headers)
  const hasHeaders = Object.values(SECTION_ALIASES).some(aliases =>
    aliases.some(alias => {
      const pattern = new RegExp(`^\\s*${alias.replace(/\s+/g, '\\s+')}\\s*[:]*\\s*$`, 'im');
      
return pattern.test(text);
    })
  );
  
  // Quality checks
  if (textLength < 200) {
    warnings.push('Resume text is very short - may not have extracted properly');
    suggestions.push('Try uploading a different format (PDF with selectable text)');
  }
  
  if (alphabetDensity < 0.3) {
    warnings.push('Low text quality detected - may be a scanned image');
    suggestions.push('Use a resume with selectable text, not a scanned image');
  }
  
  if (emptyLineRatio > 0.5) {
    warnings.push('Many empty lines detected - text extraction may be incomplete');
    suggestions.push('Check if your resume uses complex formatting or tables');
  }
  
  if (!hasHeaders) {
    warnings.push('No clear section headers detected');
    suggestions.push('Use clear section headings like Skills, Experience, Education');
  }
  
  // Calculate quality score (0-100)
  let qualityScore = 100;
  if (textLength < 500) {qualityScore -= 30;}
  else if (textLength < 1000) {qualityScore -= 15;}
  
  if (alphabetDensity < 0.3) {qualityScore -= 30;}
  else if (alphabetDensity < 0.5) {qualityScore -= 15;}
  
  if (emptyLineRatio > 0.5) {qualityScore -= 20;}
  else if (emptyLineRatio > 0.3) {qualityScore -= 10;}
  
  if (!hasHeaders) {qualityScore -= 20;}
  
  qualityScore = Math.max(0, Math.min(100, qualityScore));
  
  return {
    isValid: textLength >= 100 && alphabetDensity >= 0.2,
    textLength,
    alphabetDensity,
    lineCount,
    emptyLineRatio,
    hasStructuredContent: hasHeaders,
    warnings,
    suggestions,
    qualityScore
  };
}

// ============================================================================
// LAYER 2: MULTI-PASS SECTION DETECTION WITH ALIASES
// ============================================================================

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanHeaderText(text: string): string {
  return text
    .replace(/^[\s•●○◆■□▪▫*#|\->:]+/, '')
    .replace(/[\s•●○◆■□▪▫*#|\->:]+$/, '')
    .replace(/^\d+[.)]\s*/, '')
    .trim();
}

export function detectSections(text: string): SectionDetection[] {
  const lines = text.split('\n');
  const sections: SectionDetection[] = [];
  const detectedTypes = new Set<SectionType>();
  
  // PASS 1: Exact header matching with aliases
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.length > 80 || line.split(/\s+/).length > 8) {continue;}
    
    const cleaned = cleanHeaderText(line);
    const normalized = normalizeText(cleaned);
    
    for (const [sectionType, aliases] of Object.entries(SECTION_ALIASES)) {
      if (detectedTypes.has(sectionType as SectionType)) {continue;}
      
      for (const alias of aliases) {
        const aliasNormalized = normalizeText(alias);
        
        // Exact match or starts with (for "Skills:" type headers)
        if (normalized === aliasNormalized || 
            normalized.startsWith(aliasNormalized + ' ') ||
            normalized === aliasNormalized + 's') { // Handle plurals
          
          // Find section content (until next header)
          let endLine = lines.length - 1;
          for (let j = i + 1; j < lines.length; j++) {
            const nextCleaned = cleanHeaderText(lines[j].trim());
            const nextNormalized = normalizeText(nextCleaned);
            
            // Check if this is another section header
            const isNextHeader = Object.values(SECTION_ALIASES).some(aliasList =>
              aliasList.some(a => {
                const aNorm = normalizeText(a);
                
return nextNormalized === aNorm || nextNormalized.startsWith(aNorm + ' ');
              })
            );
            
            if (isNextHeader) {
              endLine = j - 1;
              break;
            }
          }
          
          const content = lines.slice(i + 1, endLine + 1).join('\n').trim();
          
          sections.push({
            type: sectionType as SectionType,
            headerLine: i,
            headerText: line,
            content,
            confidence: 0.9, // High confidence for exact alias match
            detectionMethod: 'alias',
            warnings: []
          });
          
          detectedTypes.add(sectionType as SectionType);
          break;
        }
      }
    }
  }
  
  // PASS 2: Pattern-based detection for missed sections
  const missedSections: SectionType[] = ['experience', 'education', 'skills', 'projects'];
  
  for (const sectionType of missedSections) {
    if (detectedTypes.has(sectionType)) {continue;}
    
    const detected = detectSectionByContent(text, sectionType);
    if (detected) {
      sections.push(detected);
      detectedTypes.add(sectionType);
    }
  }
  
  return sections;
}

function detectSectionByContent(text: string, sectionType: SectionType): SectionDetection | null {
  const lines = text.split('\n');
  
  switch (sectionType) {
    case 'experience': {
      // Look for job patterns: dates + titles
      const datePattern = /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s*['']?\d{2,4}|\b\d{4}\s*[-–to]+\s*(\d{4}|present|current)/gi;
      const titlePattern = /\b(engineer|developer|designer|manager|analyst|intern|lead|senior|junior|consultant|specialist|architect)\b/i;
      
      let expContent = '';
      let startLine = -1;
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (datePattern.test(line) && titlePattern.test(line)) {
          if (startLine === -1) {startLine = i;}
          expContent += line + '\n';
          // Grab next few lines as responsibilities
          for (let j = i + 1; j < Math.min(i + 8, lines.length); j++) {
            if (!detectIsHeader(lines[j])) {
              expContent += lines[j] + '\n';
            } else {break;}
          }
        }
      }
      
      if (expContent.length > 50) {
        return {
          type: 'experience',
          headerLine: startLine,
          headerText: '(Detected from content)',
          content: expContent.trim(),
          confidence: 0.6,
          detectionMethod: 'content-based',
          warnings: ['Experience section detected without explicit header']
        };
      }
      break;
    }
    
    case 'education': {
      // Look for degree patterns
      const degreePattern = /\b(bachelor|master|b\.?tech|m\.?tech|b\.?sc|m\.?sc|b\.?e|m\.?e|ph\.?d|diploma|degree)\b/i;
      const institutionPattern = /\b(university|college|institute|school|academy)\b/i;
      
      let eduContent = '';
      let startLine = -1;
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (degreePattern.test(line) || institutionPattern.test(line)) {
          if (startLine === -1) {startLine = i;}
          eduContent += line + '\n';
          // Grab next few lines
          for (let j = i + 1; j < Math.min(i + 4, lines.length); j++) {
            if (!detectIsHeader(lines[j]) && !degreePattern.test(lines[j])) {
              eduContent += lines[j] + '\n';
            } else {break;}
          }
        }
      }
      
      if (eduContent.length > 30) {
        return {
          type: 'education',
          headerLine: startLine,
          headerText: '(Detected from content)',
          content: eduContent.trim(),
          confidence: 0.6,
          detectionMethod: 'content-based',
          warnings: ['Education section detected without explicit header']
        };
      }
      break;
    }
    
    case 'skills': {
      // Look for skill keywords in text
      const allSkills = Object.values(SKILL_DICTIONARY).flat();
      const skillMatches: string[] = [];
      
      for (const skill of allSkills) {
        const pattern = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        if (pattern.test(text)) {
          skillMatches.push(skill);
        }
      }
      
      if (skillMatches.length >= 3) {
        return {
          type: 'skills',
          headerLine: -1,
          headerText: '(Extracted from content)',
          content: skillMatches.join(', '),
          confidence: 0.5,
          detectionMethod: 'content-based',
          warnings: ['Skills extracted from resume content without explicit section']
        };
      }
      break;
    }
    
    case 'projects': {
      // Look for project patterns
      const projectPattern = /\b(built|developed|created|designed|implemented|project)\b/i;
      const techPattern = /\b(using|with|tech stack|technologies)\b/i;
      const linkPattern = /github\.com|gitlab\.com|live:|demo:|link:/i;
      
      let projContent = '';
      let startLine = -1;
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if ((projectPattern.test(line) && techPattern.test(line)) || linkPattern.test(line)) {
          if (startLine === -1) {startLine = i;}
          projContent += line + '\n';
        }
      }
      
      if (projContent.length > 50) {
        return {
          type: 'projects',
          headerLine: startLine,
          headerText: '(Detected from content)',
          content: projContent.trim(),
          confidence: 0.5,
          detectionMethod: 'content-based',
          warnings: ['Projects section detected without explicit header']
        };
      }
      break;
    }
  }
  
  return null;
}

function detectIsHeader(line: string): boolean {
  const cleaned = cleanHeaderText(line.trim());
  const normalized = normalizeText(cleaned);
  
  return Object.values(SECTION_ALIASES).some(aliases =>
    aliases.some(alias => normalizeText(alias) === normalized)
  );
}

// ============================================================================
// LAYER 3: CONFIDENCE-BASED EXTRACTION
// ============================================================================

function extractSkillsWithConfidence(text: string, sections: SectionDetection[]): ExtractedSkill[] {
  const skills: ExtractedSkill[] = [];
  const addedSkills = new Set<string>();
  
  // Prefer skills section if found
  const skillsSection = sections.find(s => s.type === 'skills');
  const searchText = skillsSection?.content || text;
  
  for (const [category, skillList] of Object.entries(SKILL_DICTIONARY)) {
    for (const skill of skillList) {
      const skillNormalized = normalizeText(skill);
      if (addedSkills.has(skillNormalized)) {continue;}
      
      // Check for skill in text
      const pattern = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      if (pattern.test(searchText)) {
        addedSkills.add(skillNormalized);
        
        // Calculate confidence based on context
        let confidence = 0.7;
        if (skillsSection) {confidence += 0.2;} // Found in dedicated section
        if (searchText.toLowerCase().includes(skill.toLowerCase() + ',')) {confidence += 0.1;} // In a list
        
        skills.push({
          name: skill,
          category: category as ExtractedSkill['category'],
          confidence: Math.min(confidence, 1)
        });
      }
    }
  }
  
  return skills.sort((a, b) => b.confidence - a.confidence);
}

function extractExperienceWithConfidence(text: string, sections: SectionDetection[]): ExtractedExperience[] {
  const experiences: ExtractedExperience[] = [];
  const expSection = sections.find(s => s.type === 'experience');
  const content = expSection?.content || '';
  
  if (!content) {
    // Fallback: try to extract from full text
    return extractExperienceFromText(text);
  }
  
  const lines = content.split('\n').filter(l => l.trim());
  const datePattern = /\b(\d{4})\s*[-–to]+\s*(\d{4}|present|current|ongoing)\b/i;
  const monthYearPattern = /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s*['']?\d{2,4}/i;
  const titlePattern = /\b(engineer|developer|designer|manager|analyst|intern|lead|senior|junior|consultant|specialist|architect|administrator|coordinator|executive|programmer)\b/i;
  
  let currentExp: Partial<ExtractedExperience> = {};
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.length < 5) {continue;}
    
    // Skip bullet points (responsibilities)
    if (/^[•●○◆■□▪▫*\->]/.test(trimmed)) {
      if (currentExp.title) {
        currentExp.responsibilities = currentExp.responsibilities || [];
        currentExp.responsibilities.push(trimmed.replace(/^[•●○◆■□▪▫*\->]\s*/, ''));
      }
      continue;
    }
    
    const hasDate = datePattern.test(trimmed) || monthYearPattern.test(trimmed);
    const hasTitle = titlePattern.test(trimmed);
    
    if (hasDate || hasTitle) {
      // Save previous experience
      if (currentExp.title || currentExp.company) {
        experiences.push({
          title: currentExp.title || 'Position',
          company: currentExp.company || 'Company',
          duration: currentExp.duration || '',
          startDate: currentExp.startDate || '',
          endDate: currentExp.endDate || '',
          responsibilities: currentExp.responsibilities || [],
          confidence: calculateExperienceConfidence(currentExp),
          isInferred: !currentExp.title || !currentExp.company
        });
      }
      
      // Start new experience
      currentExp = { responsibilities: [] };
      
      // Extract dates
      const dateMatch = trimmed.match(datePattern);
      if (dateMatch) {
        currentExp.startDate = dateMatch[1];
        currentExp.endDate = dateMatch[2];
        currentExp.duration = `${dateMatch[1]} - ${dateMatch[2]}`;
      }
      
      // Extract title and company
      const titleCompanyMatch = trimmed.match(/^(.+?)\s*(?:at|@|[-–|])\s*(.+?)(?:\s*[-–|,]?\s*\d{4})?$/i);
      if (titleCompanyMatch) {
        currentExp.title = titleCompanyMatch[1].replace(/\s*\d{4}.*$/, '').trim();
        currentExp.company = titleCompanyMatch[2].replace(/\s*\d{4}.*$/, '').trim();
      } else if (hasTitle) {
        currentExp.title = trimmed.replace(/\s*\d{4}.*$/, '').trim();
      }
    }
  }
  
  // Don't forget last experience
  if (currentExp.title || currentExp.company) {
    experiences.push({
      title: currentExp.title || 'Position',
      company: currentExp.company || 'Company',
      duration: currentExp.duration || '',
      startDate: currentExp.startDate || '',
      endDate: currentExp.endDate || '',
      responsibilities: currentExp.responsibilities || [],
      confidence: calculateExperienceConfidence(currentExp),
      isInferred: !currentExp.title || !currentExp.company
    });
  }
  
  return experiences.slice(0, 6); // Max 6 experiences
}

function extractExperienceFromText(text: string): ExtractedExperience[] {
  // Fallback extraction when no section found
  const experiences: ExtractedExperience[] = [];
  const lines = text.split('\n');
  
  const expPattern = /^(.+?)\s+(?:at|@)\s+(.+?)(?:\s*[-–|,]?\s*\d{4}.*)?$/i;
  const titlePattern = /\b(intern|developer|engineer|designer|analyst|manager|lead)\b/i;
  const datePattern = /\b(\d{4})\s*[-–to]+\s*(\d{4}|present|current)\b/i;
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.length > 150) {continue;}
    
    const expMatch = trimmed.match(expPattern);
    const hasTitle = titlePattern.test(trimmed);
    const dateMatch = trimmed.match(datePattern);
    
    if (expMatch && hasTitle) {
      experiences.push({
        title: expMatch[1].trim(),
        company: expMatch[2].replace(/\s*\d{4}.*$/, '').trim(),
        duration: dateMatch ? `${dateMatch[1]} - ${dateMatch[2]}` : '',
        startDate: dateMatch?.[1] || '',
        endDate: dateMatch?.[2] || '',
        responsibilities: [],
        confidence: 0.5,
        isInferred: true
      });
    }
  }
  
  return experiences.slice(0, 4);
}

function calculateExperienceConfidence(exp: Partial<ExtractedExperience>): number {
  let confidence = 0.3;
  if (exp.title) {confidence += 0.25;}
  if (exp.company) {confidence += 0.25;}
  if (exp.duration) {confidence += 0.15;}
  if (exp.responsibilities && exp.responsibilities.length > 0) {confidence += 0.05;}
  
return Math.min(confidence, 1);
}

function extractEducationWithConfidence(text: string, sections: SectionDetection[]): ExtractedEducation[] {
  const education: ExtractedEducation[] = [];
  const eduSection = sections.find(s => s.type === 'education');
  const content = eduSection?.content || text;
  
  const levelPatterns: { pattern: RegExp; level: ExtractedEducation['level'] }[] = [
    { pattern: /\b(ph\.?d|doctorate|doctoral)\b/i, level: 'PhD' },
    { pattern: /\b(master|m\.?tech|m\.?sc|m\.?a|m\.?b\.?a|m\.?e|m\.?com|m\.?s)\b/i, level: 'Masters' },
    { pattern: /\b(bachelor|b\.?tech|b\.?sc|b\.?a|b\.?e|b\.?com|b\.?s|undergraduate)\b/i, level: 'Graduation' },
    { pattern: /\b(diploma|associate)\b/i, level: 'Diploma' },
    { pattern: /\b(hsc|12th|higher\s+secondary|intermediate|puc)\b/i, level: 'HSC' },
    { pattern: /\b(ssc|10th|secondary|matric)\b/i, level: 'SSC' }
  ];
  
  const institutionPattern = /\b(university|college|institute|school|academy|iit|nit|bits|education\s+society)\b/i;
  const yearPattern = /\b(19|20)\d{2}\b/;
  const fieldPattern = /\b(computer\s+science|engineering|information\s+technology|electronics|mechanical|civil|electrical|commerce|arts|science|business|management)\b/i;
  
  const lines = content.split('\n');
  const addedEdu = new Set<string>();
  
  for (const line of lines) {
    if (education.length >= 4) {break;}
    
    const trimmed = line.trim();
    if (!trimmed || trimmed.length > 200) {continue;}
    
    let detectedLevel: ExtractedEducation['level'] = 'Other';
    for (const { pattern, level } of levelPatterns) {
      if (pattern.test(trimmed)) {
        detectedLevel = level;
        break;
      }
    }
    
    const hasInstitution = institutionPattern.test(trimmed);
    
    if (detectedLevel !== 'Other' || hasInstitution) {
      // Extract institution
      let institution = '';
      const instMatch = trimmed.match(/([A-Z][A-Za-z\s&,'-]+(?:university|college|institute|school|academy)[A-Za-z\s,'-]*)/i);
      if (instMatch) {
        institution = instMatch[1].trim();
      }
      
      // Extract year
      const yearMatch = trimmed.match(yearPattern);
      
      // Extract field
      const fieldMatch = trimmed.match(fieldPattern);
      
      // Dedup key
      const key = `${detectedLevel}-${institution}`.toLowerCase();
      if (addedEdu.has(key)) {continue;}
      addedEdu.add(key);
      
      let confidence = 0.5;
      if (detectedLevel !== 'Other') {confidence += 0.2;}
      if (institution) {confidence += 0.2;}
      if (yearMatch) {confidence += 0.1;}
      
      education.push({
        degree: detectedLevel,
        institution: institution || '',
        field: fieldMatch?.[1] || '',
        year: yearMatch?.[0] || '',
        level: detectedLevel,
        confidence: Math.min(confidence, 1),
        isInferred: !institution
      });
    }
  }
  
  return education;
}

function extractProjectsWithConfidence(text: string, sections: SectionDetection[]): ExtractedProject[] {
  const projects: ExtractedProject[] = [];
  const projSection = sections.find(s => s.type === 'projects');
  const content = projSection?.content || '';
  
  if (!content) {return [];}
  
  const lines = content.split('\n');
  const techPattern = /\b(react|angular|vue|node|python|java|django|spring|mongodb|mysql|aws|docker|kubernetes|firebase|flutter|express)\b/gi;
  const linkPattern = /(github\.com\/[^\s]+|gitlab\.com\/[^\s]+|https?:\/\/[^\s]+)/i;
  
  let currentProject: Partial<ExtractedProject> | null = null;
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {continue;}
    
    // Check if this looks like a project title (not a bullet, not too long)
    const isBullet = /^[•●○◆■□▪▫*\->]/.test(trimmed);
    const isLikelyTitle = !isBullet && trimmed.length < 80 && /^[A-Z]/.test(trimmed);
    
    if (isLikelyTitle && projects.length < 5) {
      // Save previous project
      if (currentProject?.name) {
        projects.push({
          name: currentProject.name,
          description: currentProject.description || '',
          techStack: currentProject.techStack || [],
          link: currentProject.link || null,
          confidence: currentProject.techStack?.length ? 0.8 : 0.6
        });
      }
      
      // Start new project
      const [name, ...descParts] = trimmed.split(/[-–:|]/);
      currentProject = {
        name: name.trim(),
        description: descParts.join(' ').trim(),
        techStack: [],
        link: null
      };
    } else if (currentProject) {
      // Add to current project
      const techs = trimmed.match(techPattern);
      if (techs) {
        currentProject.techStack = [...(currentProject.techStack || []), ...techs.map(t => t.toLowerCase())];
      }
      
      const linkMatch = trimmed.match(linkPattern);
      if (linkMatch) {
        currentProject.link = linkMatch[1];
      }
      
      if (isBullet) {
        currentProject.description = (currentProject.description || '') + ' ' + trimmed.replace(/^[•●○◆■□▪▫*\->]\s*/, '');
      }
    }
  }
  
  // Don't forget last project
  if (currentProject?.name) {
    projects.push({
      name: currentProject.name,
      description: currentProject.description || '',
      techStack: [...new Set(currentProject.techStack || [])],
      link: currentProject.link || null,
      confidence: currentProject.techStack?.length ? 0.8 : 0.6
    });
  }
  
  return projects;
}

function extractContact(text: string): ParsedResumeV3['contact'] {
  const first2000 = text.slice(0, 2000);
  
  // Email
  const emailMatch = first2000.match(/\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/);
  
  // Phone
  const phoneMatch = first2000.match(/(?:\+\d{1,3}[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,4}/);
  const phone = phoneMatch && phoneMatch[0].replace(/[^\d+]/g, '').length >= 10 ? phoneMatch[0] : null;
  
  // Name (first non-contact line that looks like a name)
  let name: string | null = null;
  const lines = first2000.split('\n').filter(l => l.trim());
  for (const line of lines.slice(0, 10)) {
    const trimmed = line.trim();
    if (/@/.test(trimmed)) {continue;}
    if (/^(https?:|www\.|linkedin|github)/i.test(trimmed)) {continue;}
    if (detectIsHeader(trimmed)) {continue;}
    
    const words = trimmed.split(/\s+/).filter(w => w.length > 0);
    if (words.length >= 2 && words.length <= 4 && words.every(w => /^[a-zA-Z\-'.]+$/.test(w))) {
      name = trimmed;
      break;
    }
  }
  
  // LinkedIn
  const linkedinMatch = first2000.match(/(?:linkedin\.com\/in\/|linkedin:\s*)([a-zA-Z0-9\-_]+)/i);
  
  // GitHub
  const githubMatch = first2000.match(/(?:github\.com\/|github:\s*)([a-zA-Z0-9\-_]+)/i);
  
  // Location
  const locationMatch = first2000.match(/\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?),?\s*([A-Z]{2}|[A-Z][a-z]+)\b/);
  
  let confidence = 0;
  if (name) {confidence += 0.3;}
  if (emailMatch) {confidence += 0.3;}
  if (phone) {confidence += 0.2;}
  if (linkedinMatch || githubMatch) {confidence += 0.2;}
  
  return {
    name,
    email: emailMatch?.[0] || null,
    phone,
    linkedin: linkedinMatch ? `linkedin.com/in/${linkedinMatch[1]}` : null,
    github: githubMatch ? `github.com/${githubMatch[1]}` : null,
    location: locationMatch?.[0] || null,
    confidence: Math.min(confidence, 1)
  };
}

// ============================================================================
// LAYER 4: CONFIDENCE MESSAGING (NEVER ABSOLUTE)
// ============================================================================

function generateConfidenceMessage(count: number, confidence: number, sectionName: string): string {
  if (count === 0 && confidence < 0.3) {
    return `${sectionName} section could not be detected. Consider adding a clear "${sectionName}" heading.`;
  }
  if (count === 0) {
    return `${sectionName} may be present but couldn't be parsed. Try reformatting this section.`;
  }
  if (confidence < 0.5) {
    return `${count} ${sectionName.toLowerCase()} item(s) partially detected (Confidence: ${Math.round(confidence * 100)}%)`;
  }
  if (confidence < 0.8) {
    return `${count} ${sectionName.toLowerCase()} item(s) detected (Confidence: ${Math.round(confidence * 100)}%)`;
  }
  
return `${count} ${sectionName.toLowerCase()} item(s) successfully extracted`;
}

function generateOverallMessage(overallConfidence: number): string {
  if (overallConfidence >= 0.8) {
    return 'Resume parsed successfully with high confidence!';
  }
  if (overallConfidence >= 0.6) {
    return 'Resume parsed with moderate confidence. Some sections may need review.';
  }
  if (overallConfidence >= 0.4) {
    return 'Resume partially parsed. Consider reviewing and editing the extracted data.';
  }
  
return 'Resume parsing had limited success. Please review and add missing information manually.';
}

// ============================================================================
// MAIN PARSER FUNCTION
// ============================================================================

export function parseResumeV3(rawText: string): ParsedResumeV3 {
  const parseId = `parse_v3_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const parseTimestamp = new Date().toISOString();
  
  // Clean the text
  const cleanedText = rawText
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '')
    .replace(/[\u00A0\u2000-\u200B\u202F\u205F\u3000]/g, ' ')
    .replace(/[\u2013\u2014\u2015]/g, '-')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  
  // LAYER 1: Quality Check
  const qualityCheck = checkResumeQuality(cleanedText);
  
  // LAYER 2: Section Detection
  const detectedSections = detectSections(cleanedText);
  
  // LAYER 3: Extract Data with Confidence
  const contact = extractContact(cleanedText);
  const skills = extractSkillsWithConfidence(cleanedText, detectedSections);
  const experience = extractExperienceWithConfidence(cleanedText, detectedSections);
  const education = extractEducationWithConfidence(cleanedText, detectedSections);
  const projects = extractProjectsWithConfidence(cleanedText, detectedSections);
  
  // Extract summary if found
  const summarySection = detectedSections.find(s => s.type === 'summary');
  const summary = summarySection?.content || null;
  
  // Extract certifications
  const certSection = detectedSections.find(s => s.type === 'certifications');
  const certifications: ExtractedCertification[] = [];
  if (certSection) {
    const lines = certSection.content.split('\n').filter(l => l.trim());
    for (const line of lines.slice(0, 5)) {
      const cleaned = line.replace(/^[•●○◆■□▪▫*\->]\s*/, '').trim();
      if (cleaned.length > 5 && cleaned.length < 100) {
        certifications.push({
          name: cleaned,
          issuer: '',
          date: '',
          confidence: 0.7
        });
      }
    }
  }
  
  // Calculate section confidences
  const skillsConfidence = skills.length > 0 ? skills.reduce((a, s) => a + s.confidence, 0) / skills.length : 0;
  const expConfidence = experience.length > 0 ? experience.reduce((a, e) => a + e.confidence, 0) / experience.length : 0;
  const eduConfidence = education.length > 0 ? education.reduce((a, e) => a + e.confidence, 0) / education.length : 0;
  const projConfidence = projects.length > 0 ? projects.reduce((a, p) => a + p.confidence, 0) / projects.length : 0;
  const certConfidence = certifications.length > 0 ? 0.7 : 0;
  
  const sectionConfidence: SectionConfidence = {
    skills: skillsConfidence,
    experience: expConfidence,
    education: eduConfidence,
    projects: projConfidence,
    certifications: certConfidence,
    contact: contact.confidence,
    summary: summarySection ? summarySection.confidence : 0
  };
  
  // Calculate overall confidence (weighted)
  const overallConfidence = (
    skillsConfidence * 0.25 +
    expConfidence * 0.30 +
    eduConfidence * 0.20 +
    projConfidence * 0.15 +
    contact.confidence * 0.10
  );
  
  // LAYER 4: Generate friendly messages
  const confidenceMessages = {
    skills: generateConfidenceMessage(skills.length, skillsConfidence, 'Skills'),
    experience: generateConfidenceMessage(experience.length, expConfidence, 'Experience'),
    education: generateConfidenceMessage(education.length, eduConfidence, 'Education'),
    projects: generateConfidenceMessage(projects.length, projConfidence, 'Projects'),
    overall: generateOverallMessage(overallConfidence)
  };
  
  // Compile warnings and suggestions
  const warnings = [
    ...qualityCheck.warnings,
    ...detectedSections.flatMap(s => s.warnings)
  ];
  
  const suggestions = [
    ...qualityCheck.suggestions
  ];
  
  if (experience.length === 0) {
    suggestions.push('Add a clear "Work Experience" or "Experience" section heading');
  }
  if (education.length === 0) {
    suggestions.push('Add a clear "Education" section heading with your degrees');
  }
  if (skills.length < 5) {
    suggestions.push('List your skills with a clear "Skills" or "Technical Skills" heading');
  }
  if (projects.length === 0) {
    suggestions.push('Add a "Projects" section to showcase your work');
  }
  
  return {
    parseId,
    parseTimestamp,
    parserVersion: '3.0.0',
    qualityCheck,
    detectedSections,
    contact,
    summary,
    skills,
    experience,
    education,
    projects,
    certifications,
    sectionConfidence,
    overallConfidence,
    confidenceMessages,
    warnings,
    suggestions,
    cleanedText
  };
}

// ============================================================================
// EXPORT HELPER FOR LEGACY FORMAT CONVERSION
// ============================================================================

export function convertToLegacyFormat(parsed: ParsedResumeV3) {
  return {
    text: parsed.cleanedText,
    extractedData: {
      skills: parsed.skills.map(s => s.name),
      experience: parsed.experience.map(e => 
        `${e.title}${e.company ? ` at ${e.company}` : ''}${e.duration ? ` (${e.duration})` : ''}`
      ),
      education: parsed.education.map(e => 
        `${e.degree}${e.institution ? ` - ${e.institution}` : ''}${e.year ? ` (${e.year})` : ''}`
      ),
      projects: parsed.projects.map(p => 
        `${p.name}${p.techStack.length ? ` [${p.techStack.join(', ')}]` : ''}`
      ),
      achievements: parsed.certifications.map(c => c.name),
      name: parsed.contact.name,
      email: parsed.contact.email,
      phone: parsed.contact.phone,
      linkedin: parsed.contact.linkedin,
      github: parsed.contact.github
    },
    confidence: {
      overall: parsed.overallConfidence,
      skills: parsed.sectionConfidence.skills,
      experience: parsed.sectionConfidence.experience,
      education: parsed.sectionConfidence.education,
      projects: parsed.sectionConfidence.projects
    },
    messages: parsed.confidenceMessages,
    warnings: parsed.warnings,
    suggestions: parsed.suggestions
  };
}

/**
 * STRICT RESUME PARSER v4.0
 * ==========================
 * 
 * CORE RULE (NON-NEGOTIABLE):
 * Resume structure is the SINGLE SOURCE OF TRUTH.
 * If a section exists in the resume, ALL its content MUST be extracted.
 * 
 * ✅ If section header exists → 100% PRESENT, extract ALL content
 * ✅ If section header exists but content is short → Still extract, NO low confidence
 * ⚠️ Only show warnings if section header does NOT exist
 * 
 * ACCURACY CALCULATION:
 * - Skills section found → 30%
 * - Experience section found → 30%  
 * - Education section found → 20%
 * - Projects section found → 20%
 * = 100% if all sections exist (regardless of content length)
 */

// ============================================================================
// SECTION ALIAS DICTIONARY (COMPREHENSIVE)
// ============================================================================

export const SECTION_ALIASES = {
  skills: [
    'skills', 'technical skills', 'skill set', 'expertise', 'core skills',
    'key skills', 'primary skills', 'professional skills', 'relevant skills',
    'soft skills', 'hard skills', 'competencies', 'core competencies',
    'technologies', 'technologies used', 'tech stack', 'technology stack',
    'technical proficiency', 'technical knowledge', 'technical expertise',
    'proficiencies', 'tools', 'tools and technologies', 'software skills',
    'programming languages', 'programming skills', 'coding skills',
    'languages and frameworks', 'areas of expertise', 'specializations',
    'strengths', 'capabilities', 'it skills', 'computer skills', 'digital skills'
  ],
  experience: [
    'experience', 'work experience', 'professional experience', 'employment',
    'employment history', 'work history', 'career history', 'positions held',
    'job experience', 'professional background', 'relevant experience',
    'internship', 'internships', 'industrial experience', 'industrial training',
    'work'
  ],
  education: [
    'education', 'educational background', 'educational history',
    'academic background', 'academic history', 'academic qualifications',
    'qualifications', 'academic details', 'academics', 'educational credentials',
    'studies', 'academic record', 'degrees', 'schooling',
    // Added more common variations
    'edu', 'educational qualification', 'educational qualifications',
    'academic qualification', 'academic qualifications', 'college',
    'university', 'degree', 'b tech', 'btech', 'b.tech', 'mtech', 'm.tech',
    'bachelor', 'master', 'diploma', 'higher education', 'school education',
    'educational details', 'graduation', 'post graduation'
  ],
  projects: [
    'projects', 'personal projects', 'academic projects', 'side projects',
    'key projects', 'portfolio', 'notable projects', 'selected projects',
    'featured projects', 'project experience', 'project work',
    'project highlights', 'major projects', 'recent projects', 'mini projects',
    'open source', 'open source projects', 'open source contributions',
    // Added more common variations
    'project', 'my projects', 'work samples', 'sample projects',
    'college projects', 'university projects', 'freelance projects',
    'client projects', 'professional projects', 'software projects',
    'development projects', 'coding projects', 'technical projects'
  ],
  certifications: [
    'certifications', 'certificates', 'certification', 'certifications and licenses',
    'licenses and certifications', 'professional certifications', 'credentials',
    'training', 'trainings', 'courses', 'online courses', 'professional development',
    'accreditations', 'certified in'
  ],
  achievements: [
    'achievements', 'accomplishments', 'honors', 'awards', 'achievements and awards',
    'recognition', 'accolades', 'key achievements', 'notable achievements',
    'career highlights', 'highlights', 'distinctions', 'prizes', 'scholarships'
  ],
  summary: [
    'summary', 'professional summary', 'executive summary', 'career summary',
    'profile', 'professional profile', 'career profile', 'objective',
    'career objective', 'professional objective', 'about me', 'overview',
    'introduction', 'who i am', 'background', 'personal statement'
  ],
  contact: [
    'contact', 'contact info', 'contact information', 'contact details',
    'personal info', 'personal information', 'personal details'
  ]
};

export type SectionTypeStrict = keyof typeof SECTION_ALIASES;

// ============================================================================
// TYPES
// ============================================================================

export interface StrictSectionResult {
  type: SectionTypeStrict;
  headerFound: boolean;
  headerText: string;
  headerLine: number;
  content: string;
  contentLines: string[];
  // If header found, confidence is 100% (section EXISTS)
  sectionExists: boolean;
  // Only show warning if header NOT found
  warning: string | null;
}

export interface StrictParseResult {
  parseId: string;
  timestamp: string;
  
  // Raw text after normalization
  normalizedText: string;
  totalLines: number;
  
  // Detected sections with FULL content
  sections: {
    skills: StrictSectionResult;
    experience: StrictSectionResult;
    education: StrictSectionResult;
    projects: StrictSectionResult;
    certifications: StrictSectionResult;
    achievements: StrictSectionResult;
    summary: StrictSectionResult;
    contact: StrictSectionResult;
  };
  
  // Extracted data - ALL content from each section
  extractedData: {
    skills: string[];
    experience: string[];
    education: string[];
    projects: string[];
    certifications: string[];
    achievements: string[];
    summary: string;
    contact: {
      name: string | null;
      email: string | null;
      phone: string | null;
      linkedin: string | null;
      github: string | null;
      location: string | null;
    };
  };
  
  // STRICT ACCURACY: Grant FULL weight if section header exists
  // Skills → 30%, Experience → 30%, Education → 20%, Projects → 20%
  accuracy: number;
  
  // Only warnings for MISSING sections (header not found)
  warnings: string[];
  
  // Suggestions for improvement
  suggestions: string[];
}

// ============================================================================
// TEXT NORMALIZATION (CRITICAL FOR PDF EXTRACTION)
// ============================================================================

export function normalizeResumeText(text: string): string {
  return text
    // Normalize line endings
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    // Replace bullets with standard dash
    .replace(/[•●○◆■□▪▫►▸➜➤⁃◦⦿⦾]/g, '-')
    // Normalize unicode dashes/hyphens
    .replace(/[\u2013\u2014\u2015\u2212\u2E3A\u2E3B]/g, '-')
    // Normalize multiple spaces (but preserve newlines)
    .replace(/[^\S\n]+/g, ' ')
    // Remove non-printable characters except newlines
    .replace(/[^\x20-\x7E\n\u00A0-\u024F]/g, ' ')
    // Clean up multiple spaces again
    .replace(/ +/g, ' ')
    // Reduce excessive blank lines to max 2
    .replace(/\n{3,}/g, '\n\n')
    // Trim each line
    .split('\n')
    .map(line => line.trim())
    .join('\n')
    .trim();
}

// ============================================================================
// SECTION HEADER DETECTION (Case-insensitive, Alias-aware)
// ============================================================================

function normalizeForMatching(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * IMPROVED Section Header Detection
 * More flexible matching to catch various header formats
 */
function detectSectionType(line: string): SectionTypeStrict | null {
  const trimmed = line.trim();
  
  // Skip empty lines
  if (!trimmed) {
    return null;
  }
  
  // Skip lines that are definitely NOT headers (too long or contain too much content)
  // Headers are usually short (1-5 words)
  const wordCount = trimmed.split(/\s+/).length;
  if (wordCount > 8 || trimmed.length > 80) {
    return null;
  }
  
  // Clean the line for matching - remove common header decorations
  const cleaned = trimmed
    .replace(/^[:\-•●○◆■□▪▫*#|→►▸►➜➤\d.)\]]+\s*/, '') // Remove bullets/numbers at start
    .replace(/\s*[:\-•●○◆■□▪▫*#|→►▸►➜➤]+$/, '') // Remove at end
    .replace(/[_=\-]{2,}/g, '') // Remove underlines/separators
    .trim();
  
  if (!cleaned) {return null;}
  
  const normalized = normalizeForMatching(cleaned);
  
  // PRIORITY 1: Exact match with aliases (most reliable)
  for (const [sectionType, aliases] of Object.entries(SECTION_ALIASES)) {
    for (const alias of aliases) {
      const aliasNormalized = normalizeForMatching(alias);
      
      // Exact match
      if (normalized === aliasNormalized) {
        return sectionType as SectionTypeStrict;
      }
    }
  }
  
  // PRIORITY 2: Starts with alias (for "Skills:" or "Skills -" type headers)
  for (const [sectionType, aliases] of Object.entries(SECTION_ALIASES)) {
    for (const alias of aliases) {
      const aliasNormalized = normalizeForMatching(alias);
      
      if (normalized.startsWith(aliasNormalized + ' ') || 
          normalized.startsWith(aliasNormalized + ':') ||
          normalized.endsWith(' ' + aliasNormalized)) {
        return sectionType as SectionTypeStrict;
      }
    }
  }
  
  // PRIORITY 3: Contains alias (for headers like "MY SKILLS" or "TECHNICAL SKILLS SUMMARY")
  for (const [sectionType, aliases] of Object.entries(SECTION_ALIASES)) {
    for (const alias of aliases) {
      const aliasNormalized = normalizeForMatching(alias);
      // Only match if the alias is a significant part of the header
      if (aliasNormalized.length >= 4 && normalized.includes(aliasNormalized)) {
        return sectionType as SectionTypeStrict;
      }
    }
  }
  
  // PRIORITY 4: ALL CAPS headers (common in resumes)
  if (cleaned === cleaned.toUpperCase() && cleaned.length >= 4 && /^[A-Z\s&]+$/.test(cleaned)) {
    const lowerCleaned = cleaned.toLowerCase();
    for (const [sectionType, aliases] of Object.entries(SECTION_ALIASES)) {
      if (aliases.some(alias => {
        const aliasNorm = normalizeForMatching(alias);
        
        return lowerCleaned === aliasNorm || 
               lowerCleaned.includes(aliasNorm) ||
               aliasNorm.includes(lowerCleaned);
      })) {
        return sectionType as SectionTypeStrict;
      }
    }
  }
  
  // PRIORITY 5: Check if line looks like a header (short, possibly bold/caps indicators)
  // Common patterns: underlined, followed by colon, all caps, title case with no other content
  const looksLikeHeader = (
    wordCount <= 4 &&
    (cleaned === cleaned.toUpperCase() || // ALL CAPS
     /^[A-Z][a-z]+(\s+[A-Z][a-z]+)*$/.test(cleaned) || // Title Case
     trimmed.endsWith(':') || // Ends with colon
     /^[A-Z\s]+$/.test(cleaned)) // All letters caps
  );
  
  if (looksLikeHeader) {
    const lowerCleaned = cleaned.toLowerCase();
    // Check for partial matches with main section keywords
    const mainKeywords = {
      skills: ['skill', 'technical', 'competenc', 'expertise', 'proficienc'],
      experience: ['experience', 'work', 'employment', 'career', 'job', 'internship'],
      education: ['education', 'academic', 'qualification', 'degree', 'college', 'university'],
      projects: ['project', 'portfolio', 'work sample'],
      certifications: ['certif', 'course', 'training', 'credential'],
      achievements: ['achievement', 'award', 'honor', 'accomplish'],
      summary: ['summary', 'profile', 'objective', 'about', 'overview'],
      contact: ['contact', 'personal']
    };
    
    for (const [sectionType, keywords] of Object.entries(mainKeywords)) {
      if (keywords.some(kw => lowerCleaned.includes(kw))) {
        return sectionType as SectionTypeStrict;
      }
    }
  }
  
  return null;
}

// ============================================================================
// SECTION BOUNDARY DETECTION & CONTENT EXTRACTION
// ============================================================================

interface SectionBoundary {
  type: SectionTypeStrict;
  headerLine: number;
  headerText: string;
  startLine: number; // First content line (after header)
  endLine: number; // Last content line (before next header)
}

function detectAllSectionBoundaries(lines: string[]): SectionBoundary[] {
  const boundaries: SectionBoundary[] = [];
  
  console.log('🔍 [SECTION DETECTION] Scanning for section headers...');
  
  for (let i = 0; i < lines.length; i++) {
    const sectionType = detectSectionType(lines[i]);
    if (sectionType) {
      console.log(`   ✅ Found "${sectionType}" at line ${i}: "${lines[i].trim()}"`);
      boundaries.push({
        type: sectionType,
        headerLine: i,
        headerText: lines[i].trim(),
        startLine: i + 1,
        endLine: lines.length - 1 // Will be adjusted
      });
    }
  }
  
  // Adjust end lines (each section ends before the next one starts)
  for (let i = 0; i < boundaries.length - 1; i++) {
    boundaries[i].endLine = boundaries[i + 1].headerLine - 1;
  }
  
  console.log(`🔍 [SECTION DETECTION] Found ${boundaries.length} sections: ${boundaries.map(b => b.type).join(', ')}`);
  
  return boundaries;
}

function extractSectionContent(lines: string[], boundary: SectionBoundary): string[] {
  const contentLines: string[] = [];
  
  for (let i = boundary.startLine; i <= boundary.endLine && i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines at the very start of content
    if (contentLines.length === 0 && !line) {
      continue;
    }
    
    // Include all non-empty lines
    if (line) {
      contentLines.push(line);
    }
  }
  
  return contentLines;
}

// ============================================================================
// STRICT SECTION EXTRACTION
// ============================================================================

function extractStrictSection(
  lines: string[],
  boundaries: SectionBoundary[],
  sectionType: SectionTypeStrict
): StrictSectionResult {
  const boundary = boundaries.find(b => b.type === sectionType);
  
  if (!boundary) {
    // Section header NOT found - this is the ONLY case for a warning
    return {
      type: sectionType,
      headerFound: false,
      headerText: '',
      headerLine: -1,
      content: '',
      contentLines: [],
      sectionExists: false,
      warning: `⚠️ ${sectionType.charAt(0).toUpperCase() + sectionType.slice(1)} section not found. You may add it manually.`
    };
  }
  
  // Section header FOUND - extract ALL content, NO warnings
  const contentLines = extractSectionContent(lines, boundary);
  const content = contentLines.join('\n');
  
  return {
    type: sectionType,
    headerFound: true,
    headerText: boundary.headerText,
    headerLine: boundary.headerLine,
    content,
    contentLines,
    sectionExists: true,
    // NO WARNING - section exists, trust the content
    warning: null
  };
}

// ============================================================================
// DATA EXTRACTION FROM SECTION CONTENT
// ============================================================================

function extractSkillsFromContent(contentLines: string[]): string[] {
  const skills: string[] = [];
  const addedLower = new Set<string>();
  
  // Common tech skills that should be recognized even if standalone
  
  // Filter out contact info lines FIRST
  const filteredLines = contentLines.filter(line => !isContactInfo(line));
  
  for (const line of filteredLines) {
    // Split by common delimiters including spaces for "HTML CSS JavaScript" format
    let items = line.split(/[,|;•●○◆■□▪▫►▸➜➤\-\/]/).map(s => s.trim()).filter(s => s);
    
    // Also try splitting by multiple spaces if items are few
    if (items.length <= 2 && line.includes('  ')) {
      items = line.split(/\s{2,}/).map(s => s.trim()).filter(s => s);
    }
    
    for (const item of items) {
      // Clean the item
      const cleanedItem = item
        .replace(/^[\-•●○◆■□▪▫►▸➜➤:]+\s*/, '')
        .replace(/\s*[\-•●○◆■□▪▫►▸➜➤:]+$/, '')
        .trim();
      
      if (!cleanedItem) {continue;}
      
      // Skip if too long (probably a sentence, not a skill)
      if (cleanedItem.length > 50 || cleanedItem.split(/\s+/).length > 6) {
        continue;
      }
      
      // Skip duplicates (case-insensitive)
      const lower = cleanedItem.toLowerCase();
      if (addedLower.has(lower)) {
        continue;
      }
      
      // Skip common non-skill words
      if (/^(and|or|the|with|using|etc|experience|years?|months?|proficient|familiar|knowledge)$/i.test(cleanedItem)) {
        continue;
      }
      
      // Add the skill
      addedLower.add(lower);
      skills.push(cleanedItem);
    }
  }
  
  // If no skills found via delimiters, try line-by-line
  if (skills.length === 0) {
    for (const line of filteredLines) {
      const trimmed = line.trim();
      if (trimmed && trimmed.length <= 50 && trimmed.split(/\s+/).length <= 5) {
        const lower = trimmed.toLowerCase();
        if (!addedLower.has(lower)) {
          addedLower.add(lower);
          skills.push(trimmed);
        }
      }
    }
  }
  
  return skills;
}

function extractExperienceFromContent(contentLines: string[]): string[] {
  const experiences: string[] = [];
  
  // Filter out contact info lines FIRST
  const filteredLines = contentLines.filter(line => !isContactInfo(line));
  
  // Try to extract structured experience entries
  const datePattern = /\b(\d{4})\s*[-–to]+\s*(\d{4}|present|current)\b/i;
  const titlePattern = /\b(engineer|developer|designer|manager|analyst|intern|lead|senior|junior|consultant|specialist|architect|administrator|coordinator|executive|programmer)\b/i;
  
  let currentEntry = '';
  
  for (const line of filteredLines) {
    const hasDate = datePattern.test(line);
    const hasTitle = titlePattern.test(line);
    
    // New entry detected
    if ((hasDate || hasTitle) && !line.startsWith('-')) {
      if (currentEntry.trim() && !isContactInfo(currentEntry)) {
        experiences.push(currentEntry.trim());
      }
      currentEntry = line;
    } else if (currentEntry) {
      // Continue building current entry
      currentEntry += ' ' + line;
    } else {
      // First line without clear markers
      currentEntry = line;
    }
  }
  
  // Don't forget last entry (also filter contact info)
  if (currentEntry.trim() && !isContactInfo(currentEntry)) {
    experiences.push(currentEntry.trim());
  }
  
  // If no structured entries found, just return filtered content lines
  if (experiences.length === 0) {
    return filteredLines.filter(l => l.length > 10 && !isContactInfo(l));
  }
  
  // Final filter on all experiences
  return experiences.filter(exp => !isContactInfo(exp)).slice(0, 10); // Max 10 entries
}

function extractEducationFromContent(contentLines: string[]): string[] {
  const education: string[] = [];
  const addedLower = new Set<string>();
  
  // Filter out contact info lines FIRST
  const filteredLines = contentLines.filter(line => !isContactInfo(line));
  
  const degreePattern = /\b(bachelor|master|b\.?tech|m\.?tech|b\.?sc|m\.?sc|b\.?e|m\.?e|b\.?a|m\.?a|ph\.?d|diploma|degree|hsc|ssc|12th|10th)\b/i;
  const institutionPattern = /\b(university|college|institute|school|academy|education\s+society)\b/i;
  
  let currentEntry = '';
  
  for (const line of filteredLines) {
    const hasDegree = degreePattern.test(line);
    const hasInstitution = institutionPattern.test(line);
    
    if ((hasDegree || hasInstitution) && !line.startsWith('-')) {
      if (currentEntry.trim() && !isContactInfo(currentEntry)) {
        const lower = currentEntry.toLowerCase();
        if (!addedLower.has(lower)) {
          addedLower.add(lower);
          education.push(currentEntry.trim());
        }
      }
      currentEntry = line;
    } else if (currentEntry) {
      currentEntry += ' ' + line;
    } else {
      currentEntry = line;
    }
  }
  
  // Don't forget last entry (also filter contact info)
  if (currentEntry.trim() && !isContactInfo(currentEntry)) {
    const lower = currentEntry.toLowerCase();
    if (!addedLower.has(lower)) {
      education.push(currentEntry.trim());
    }
  }
  
  if (education.length === 0) {
    return filteredLines.filter(l => l.length > 10 && !isContactInfo(l));
  }
  
  // Final filter on all education entries
  return education.filter(edu => !isContactInfo(edu)).slice(0, 5); // Max 5 entries
}

function extractProjectsFromContent(contentLines: string[]): string[] {
  const projects: string[] = [];
  const addedLower = new Set<string>();
  
  // Filter out contact info lines FIRST
  const filteredLines = contentLines.filter(line => !isContactInfo(line));
  
  let currentProject = '';
  
  for (const line of filteredLines) {
    // Project title indicators
    const isLikelyTitle = (
      /^[A-Z]/.test(line) &&
      line.length < 80 &&
      !line.startsWith('-') &&
      !/^(developed|built|created|implemented|designed|used|worked)/i.test(line)
    );
    
    if (isLikelyTitle && currentProject.trim() && !isContactInfo(currentProject)) {
      const lower = currentProject.toLowerCase();
      if (!addedLower.has(lower)) {
        addedLower.add(lower);
        projects.push(currentProject.trim());
      }
      currentProject = line;
    } else if (currentProject || isLikelyTitle) {
      currentProject = currentProject ? currentProject + ' ' + line : line;
    }
  }
  
  // Don't forget last project (also filter contact info)
  if (currentProject.trim() && !isContactInfo(currentProject)) {
    const lower = currentProject.toLowerCase();
    if (!addedLower.has(lower)) {
      projects.push(currentProject.trim());
    }
  }
  
  if (projects.length === 0) {
    return filteredLines.filter(l => l.length > 10 && !isContactInfo(l));
  }
  
  // Final filter on all projects
  return projects.filter(proj => !isContactInfo(proj)).slice(0, 8); // Max 8 projects
}

// ============================================================================
// CONTACT INFO DETECTION (AGGRESSIVE - MUST FILTER FROM ALL SECTIONS)
// ============================================================================

/**
 * Check if a line is contact information (should be EXCLUDED from other sections)
 * This function is CRITICAL for preventing contact info leakage
 */
function isContactInfo(line: string): boolean {
  if (!line || line.trim().length < 3) {
    return false;
  }
  
  const trimmed = line.trim();
  
  // PATTERN 1: Email detection (very reliable)
  if (/@[\w.-]+\.[a-zA-Z]{2,}/.test(trimmed)) {
    console.log(`   [CONTACT FILTER] Email detected: "${trimmed.slice(0, 40)}..."`);

    return true;
  }
  
  // PATTERN 2: Phone number detection - ENHANCED for country codes
  // Catches +91, +1, etc. and phone numbers
  if (/\+\s*\d{1,4}/.test(trimmed)) {
    // Line contains country code like +91, +1, +44
    console.log(`   [CONTACT FILTER] Country code detected: "${trimmed.slice(0, 40)}..."`);

    return true;
  }
  
  const digitsOnly = trimmed.replace(/[^\d]/g, '');
  if (digitsOnly.length >= 10 && digitsOnly.length <= 15) {
    console.log(`   [CONTACT FILTER] Phone (10+ digits) detected: "${trimmed.slice(0, 40)}..."`);

    return true;
  }
  
  // PATTERN 3: URLs that aren't project links
  if (/linkedin\.com|twitter\.com|x\.com|instagram\.com|facebook\.com|portfolio\.dev/i.test(trimmed)) {
    console.log(`   [CONTACT FILTER] Social URL detected: "${trimmed.slice(0, 40)}..."`);

    return true;
  }
  
  // PATTERN 4: GitHub profile (not repo - repos have owner/repo format)
  if (/github\.com\/[\w-]+\s*$/i.test(trimmed) && !/github\.com\/[\w-]+\/[\w-]+/i.test(trimmed)) {
    console.log(`   [CONTACT FILTER] GitHub profile detected: "${trimmed.slice(0, 40)}..."`);

    return true;
  }
  
  // PATTERN 5: Just a person's name (First Last or First Middle Last)
  // Also catch "Name at Something" patterns that look like garbled contact
  if (/^[A-Z][a-z]+\s+[A-Z]?\s*(at|@)\s*/i.test(trimmed)) {
    console.log(`   [CONTACT FILTER] Name-at pattern detected: "${trimmed}"`);

    return true;
  }
  
  if (/^[A-Z][a-z]+(\s+[A-Z][a-z]+){1,3}\.?\s*$/.test(trimmed) && trimmed.split(/\s+/).length <= 4) {
    // Must not contain job-related keywords
    if (!/developer|engineer|designer|manager|analyst|intern|lead|senior|junior|consultant/i.test(trimmed)) {
      console.log(`   [CONTACT FILTER] Name detected: "${trimmed}"`);

      return true;
    }
  }
  
  // PATTERN 6: Location patterns (City, State/Country)
  const locationPatterns = [
    /^[A-Z][a-z]+,\s*[A-Z]{2}\s*\d{5}$/i, // City, ST 12345
    /^[A-Z][a-z]+,\s*[A-Z][a-z]+$/i, // City, State (only if short)
    /\b(Mumbai|Delhi|Bangalore|Bengaluru|Hyderabad|Chennai|Kolkata|Pune|Jaipur|Ahmedabad|Lucknow|Noida|Gurgaon|India|USA|UK|Dubai|Singapore)\b/i
  ];
  
  // Only flag as contact if it's JUST location (short line)
  if (trimmed.length < 50) {
    for (const pattern of locationPatterns) {
      if (pattern.test(trimmed) && !/@|developer|engineer|company|worked|project/i.test(trimmed)) {
        console.log(`   [CONTACT FILTER] Location detected: "${trimmed}"`);

        return true;
      }
    }
  }
  
  // PATTERN 7: Contact section keywords as standalone
  if (/^(phone|mobile|email|tel|cell|contact|address)\s*[:.\-]/i.test(trimmed)) {

    return true;
  }
  
  // PATTERN 8: Lines that contain "II" followed by numbers (garbled parsing)
  // e.g., "Siddhesh P at II +91" - this is clearly garbled contact info
  if (/\bII\s*\+?\d/i.test(trimmed) || /\bat\s+II\b/i.test(trimmed)) {
    console.log(`   [CONTACT FILTER] Garbled contact pattern detected: "${trimmed}"`);

    return true;
  }
  
  // PATTERN 9: Short lines that look like header info (name + something)
  // Less than 40 chars, starts with capital, no real job keywords
  if (trimmed.length < 40 && /^[A-Z][a-z]+\s+[A-Z]/.test(trimmed)) {
    if (!/developer|engineer|designer|manager|analyst|intern|lead|senior|junior|consultant|company|worked|built|created|developed/i.test(trimmed)) {
      // Check if it has suspicious patterns
      if (/\s+at\s+|\s+@\s+|\+\d|\|\s*\d/i.test(trimmed)) {
        console.log(`   [CONTACT FILTER] Short header-like line: "${trimmed}"`);

        return true;
      }
    }
  }
  
  // PATTERN 10: Lines that are ONLY contact info combined
  const contactIndicatorCount = [
    /@[\w.-]+\.\w+/.test(trimmed),          // email
    /\d{10,}/.test(digitsOnly),              // phone
    /linkedin|github|portfolio/i.test(trimmed), // links
    /\+\d{1,4}/.test(trimmed)                // country code
  ].filter(Boolean).length;
  
  if (contactIndicatorCount >= 2) {
    console.log(`   [CONTACT FILTER] Multiple contact items: "${trimmed.slice(0, 40)}..."`);

    return true;
  }
  
  return false;
}

// ============================================================================
// FALLBACK EXTRACTION (When section headers are NOT found)
// ============================================================================

/**
 * Fallback Education Extraction - scans entire text for education patterns
 * Used when no explicit "Education" section header is found
 * ENHANCED: More aggressive patterns for Indian resumes
 */
function fallbackExtractEducation(_text: string, lines: string[]): string[] {
  const education: string[] = [];
  const addedLower = new Set<string>();
  
  // Education degree patterns - ENHANCED for Indian education system
  const degreePatterns = [
    /\b(B\.?Tech|BTech|B\.?E\.?|BE|Bachelor|M\.?Tech|MTech|M\.?E\.?|ME|Master|PhD|Ph\.?D|Diploma|BSc|B\.?Sc|MSc|M\.?Sc|BCA|MCA|BBA|MBA|BA|MA)\b/gi,
    /\b(Bachelor|Master|Doctor|Associate)\s+(of|in)\s+\w+/gi,
    /\b(Engineering|Science|Arts|Commerce|Computer)\s+(degree|qualification|Science)/gi,
    /\bComputer\s+Science\b/gi,
    /\b(HSC|SSC|CBSE|ICSE|State\s+Board)\b/gi,
    /\b(10th|12th|X|XII)\s*(standard|class|grade)?\b/gi,
    /\b(Information\s+Technology|IT|CS|CSE|ECE|EEE|Mechanical|Civil)\b/gi,
  ];
  
  // University/College patterns - ENHANCED  
  const institutionPatterns = [
    /\b(University|College|Institute|School|Academy)\s+of\s+[\w\s]+/gi,
    /\b[\w\s]+(University|College|Institute|IIT|NIT|IIIT|Engineering)\b/gi,
    /\b(CGPA|GPA|Percentage|Score|Marks)[:\s]*[\d.]+/gi,
    /\b\d+\.?\d*\s*(CGPA|GPA|%|percent)/gi,
    /\bPune|Mumbai|Delhi|Bangalore|Hyderabad|Chennai\s+University\b/gi,
  ];
  
  // Year patterns
  const yearPatterns = /\b(19|20)\d{2}\s*[-–]\s*(19|20)?\d{2,4}|\b(19|20)\d{2}\b/g;
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.length < 5) {continue;}
    
    // SKIP CONTACT INFO!
    if (isContactInfo(trimmed)) {continue;}
    
    // Check if line contains education-related content
    let isEducation = false;
    
    for (const pattern of degreePatterns) {
      if (pattern.test(trimmed)) {
        isEducation = true;
        break;
      }
      // Reset regex lastIndex
      pattern.lastIndex = 0;
    }
    
    if (!isEducation) {
      for (const pattern of institutionPatterns) {
        if (pattern.test(trimmed)) {
          isEducation = true;
          break;
        }
        pattern.lastIndex = 0;
      }
    }
    
    if (isEducation) {
      const lower = trimmed.toLowerCase();
      if (!addedLower.has(lower) && trimmed.length > 10) {
        addedLower.add(lower);
        education.push(trimmed);
      }
    }
  }
  
  // Also check for lines with year patterns near degree/institution mentions
  if (education.length === 0) {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // SKIP CONTACT INFO!
      if (isContactInfo(line)) {continue;}
      
      if (yearPatterns.test(line) && line.length > 15) {
        // Check surrounding lines for education context
        const context = [
          lines[i - 1] || '',
          line,
          lines[i + 1] || ''
        ].join(' ').toLowerCase();
        
        if (/university|college|institute|degree|bachelor|master|engineering|btech|mtech|computer|science|cgpa|gpa|percentage/i.test(context)) {
          const lower = line.toLowerCase();
          if (!addedLower.has(lower)) {
            addedLower.add(lower);
            education.push(line);
          }
        }
      }
      yearPatterns.lastIndex = 0;
    }
  }
  
  console.log(`📚 [FALLBACK] Found ${education.length} education entries without explicit section header`);
  
  return education.slice(0, 5);
}

/**
 * Fallback Projects Extraction - scans entire text for project patterns
 * Used when no explicit "Projects" section header is found
 * ENHANCED: More aggressive patterns
 */
function fallbackExtractProjects(_text: string, lines: string[]): string[] {
  const projects: string[] = [];
  const addedLower = new Set<string>();
  
  // Project indicator patterns - ENHANCED
  const projectPatterns = [
    /\b(developed|built|created|implemented|designed|architected|worked\s+on)\s+(a|an|the)?\s*\w+/i,
    /\b(web\s+app|mobile\s+app|application|system|platform|tool|website|portal|dashboard|clone)\b/i,
    /\b(using|with|technologies?|tech\s+stack)[:\s]+([\w\s,]+)/i,
    /\bgithub\.com\/[\w\-]+\/[\w\-]+/i, // GitHub REPO link
    /\b(React|Angular|Vue|Node|Django|Flask|Spring|MongoDB|MySQL|PostgreSQL|Firebase)\b/i, // Tech stack
    /\b(frontend|backend|fullstack|full-stack|full\s+stack)\b/i,
    /\b(API|REST|GraphQL|database|authentication|deployment)\b/i,
  ];
  
  let currentProjectBlock: string[] = [];
  let inProjectLikeBlock = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) {
      // End of block
      if (inProjectLikeBlock && currentProjectBlock.length > 0) {
        const projectText = currentProjectBlock.join(' ');
        // FILTER: Skip if it looks like contact info
        if (!isContactInfo(projectText)) {
          const lower = projectText.toLowerCase();
          if (!addedLower.has(lower) && projectText.length > 20) {
            addedLower.add(lower);
            projects.push(projectText);
          }
        }
      }
      currentProjectBlock = [];
      inProjectLikeBlock = false;
      continue;
    }
    
    // SKIP CONTACT INFO LINES!
    if (isContactInfo(line)) {continue;}
    
    // Check if this line looks like a project description
    let isProjectLine = false;
    for (const pattern of projectPatterns) {
      if (pattern.test(line)) {
        isProjectLine = true;
        break;
      }
    }
    
    if (isProjectLine) {
      inProjectLikeBlock = true;
      currentProjectBlock.push(line);
    } else if (inProjectLikeBlock && line.length > 10 && !isContactInfo(line)) {
      currentProjectBlock.push(line);
    }
  }
  
  // Don't forget last block
  if (inProjectLikeBlock && currentProjectBlock.length > 0) {
    const projectText = currentProjectBlock.join(' ');
    // FILTER: Skip if it looks like contact info
    if (!isContactInfo(projectText)) {
      const lower = projectText.toLowerCase();
      if (!addedLower.has(lower) && projectText.length > 20) {
        projects.push(projectText);
      }
    }
  }
  
  console.log(`🔧 [FALLBACK] Found ${projects.length} project entries without explicit section header`);
  
  return projects.slice(0, 8);
}

function extractContactInfo(text: string, lines: string[]): StrictParseResult['extractedData']['contact'] {
  const first2000 = text.slice(0, 2000);
  
  // Email
  const emailMatch = first2000.match(/\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/);
  
  // Phone
  const phoneMatch = first2000.match(/(?:\+\d{1,3}[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,4}/);
  const phone = phoneMatch && phoneMatch[0].replace(/[^\d+]/g, '').length >= 10 ? phoneMatch[0] : null;
  
  // LinkedIn
  const linkedinMatch = first2000.match(/(?:linkedin\.com\/in\/|linkedin:\s*)([a-zA-Z0-9\-_]+)/i);
  
  // GitHub
  const githubMatch = first2000.match(/(?:github\.com\/|github:\s*)([a-zA-Z0-9\-_]+)/i);
  
  // Location
  const locationMatch = first2000.match(/\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?),?\s*([A-Z]{2}|[A-Z][a-z]+)\b/);
  
  // Name (first non-contact line that looks like a name)
  let name: string | null = null;
  for (const line of lines.slice(0, 15)) {
    const trimmed = line.trim();
    if (!trimmed || /@/.test(trimmed)) {continue;}
    if (/^(https?:|www\.|linkedin|github)/i.test(trimmed)) {continue;}
    if (detectSectionType(trimmed)) {continue;}
    
    const words = trimmed.split(/\s+/).filter(w => w.length > 0);
    if (words.length >= 2 && words.length <= 4 && words.every(w => /^[a-zA-Z\-'.]+$/.test(w))) {
      name = trimmed;
      break;
    }
  }
  
  return {
    name,
    email: emailMatch?.[0] || null,
    phone,
    linkedin: linkedinMatch ? `linkedin.com/in/${linkedinMatch[1]}` : null,
    github: githubMatch ? `github.com/${githubMatch[1]}` : null,
    location: locationMatch?.[0] || null
  };
}

// ============================================================================
// ACCURACY CALCULATION (STRICT RULES)
// ============================================================================

/**
 * STRICT ACCURACY CALCULATION
 * 
 * Grant FULL weight if section header EXISTS (regardless of content length):
 * - Skills → 30%
 * - Experience → 30%
 * - Education → 20%
 * - Projects → 20%
 * 
 * = 100% accuracy if ALL sections exist
 */
function calculateStrictAccuracy(sections: StrictParseResult['sections']): number {
  let accuracy = 0;
  
  if (sections.skills.sectionExists) {
    accuracy += 30;
  }
  
  if (sections.experience.sectionExists) {
    accuracy += 30;
  }
  
  if (sections.education.sectionExists) {
    accuracy += 20;
  }
  
  if (sections.projects.sectionExists) {
    accuracy += 20;
  }
  
  return accuracy;
}

// ============================================================================
// MAIN PARSER FUNCTION
// ============================================================================

export function parseResumeStrict(rawText: string): StrictParseResult {
  const parseId = `strict_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const timestamp = new Date().toISOString();
  
  // Step 1: Normalize text (critical for PDF extraction)
  const normalizedText = normalizeResumeText(rawText);
  const lines = normalizedText.split('\n');
  
  // Step 2: Detect ALL section boundaries
  const boundaries = detectAllSectionBoundaries(lines);
  
  console.log('📋 [STRICT PARSER] Detected section boundaries:', boundaries.map(b => b.type).join(', '));
  
  // Step 3: Extract each section with FULL content
  const sections: StrictParseResult['sections'] = {
    skills: extractStrictSection(lines, boundaries, 'skills'),
    experience: extractStrictSection(lines, boundaries, 'experience'),
    education: extractStrictSection(lines, boundaries, 'education'),
    projects: extractStrictSection(lines, boundaries, 'projects'),
    certifications: extractStrictSection(lines, boundaries, 'certifications'),
    achievements: extractStrictSection(lines, boundaries, 'achievements'),
    summary: extractStrictSection(lines, boundaries, 'summary'),
    contact: extractStrictSection(lines, boundaries, 'contact')
  };
  
  // Step 4: Extract structured data from section content
  const extractedData: StrictParseResult['extractedData'] = {
    skills: sections.skills.sectionExists 
      ? extractSkillsFromContent(sections.skills.contentLines)
      : [],
    experience: sections.experience.sectionExists
      ? extractExperienceFromContent(sections.experience.contentLines)
      : [],
    education: sections.education.sectionExists
      ? extractEducationFromContent(sections.education.contentLines)
      : fallbackExtractEducation(normalizedText, lines), // FALLBACK EXTRACTION
    projects: sections.projects.sectionExists
      ? extractProjectsFromContent(sections.projects.contentLines)
      : fallbackExtractProjects(normalizedText, lines), // FALLBACK EXTRACTION
    certifications: sections.certifications.sectionExists
      ? sections.certifications.contentLines.filter(l => l.length > 5)
      : [],
    achievements: sections.achievements.sectionExists
      ? sections.achievements.contentLines.filter(l => l.length > 5)
      : [],
    summary: sections.summary.content,
    contact: extractContactInfo(normalizedText, lines)
  };
  
  // Step 4.5: UPDATE section status if fallback extraction found data
  // This ensures we count sections as "found" even without explicit headers
  if (!sections.education.sectionExists && extractedData.education.length > 0) {
    console.log('📚 [STRICT PARSER] Education found via fallback extraction');
    sections.education = {
      ...sections.education,
      sectionExists: true,
      headerFound: false, // Not found via header
      warning: null // Remove warning since we found data
    };
  }
  
  if (!sections.projects.sectionExists && extractedData.projects.length > 0) {
    console.log('🔧 [STRICT PARSER] Projects found via fallback extraction');
    sections.projects = {
      ...sections.projects,
      sectionExists: true,
      headerFound: false, // Not found via header
      warning: null // Remove warning since we found data
    };
  }
  
  // Step 5: Calculate STRICT accuracy (now includes fallback data)
  const accuracy = calculateStrictAccuracy(sections);
  
  // Step 6: Collect warnings (ONLY for missing sections)
  const warnings: string[] = [];
  for (const section of Object.values(sections)) {
    if (section.warning) {
      warnings.push(section.warning);
    }
  }
  
  // Step 7: Generate suggestions
  const suggestions: string[] = [];
  if (!sections.skills.sectionExists) {
    suggestions.push('Add a "Skills" or "Technical Skills" section to your resume');
  }
  if (!sections.experience.sectionExists) {
    suggestions.push('Add an "Experience" or "Work Experience" section to your resume');
  }
  if (!sections.education.sectionExists) {
    suggestions.push('Add an "Education" section to your resume');
  }
  if (!sections.projects.sectionExists) {
    suggestions.push('Consider adding a "Projects" section to showcase your work');
  }
  
  console.log(`✅ [STRICT PARSER] Parse complete. Accuracy: ${accuracy}%`);
  console.log(`📊 [STRICT PARSER] Extracted: Skills(${extractedData.skills.length}), Experience(${extractedData.experience.length}), Education(${extractedData.education.length}), Projects(${extractedData.projects.length})`);
  
  return {
    parseId,
    timestamp,
    normalizedText,
    totalLines: lines.length,
    sections,
    extractedData,
    accuracy,
    warnings,
    suggestions
  };
}

// ============================================================================
// LEGACY FORMAT CONVERSION
// ============================================================================

export function convertStrictToLegacyFormat(result: StrictParseResult) {
  return {
    text: result.normalizedText,
    skills: result.extractedData.skills,
    experience: result.extractedData.experience,
    education: result.extractedData.education,
    projects: result.extractedData.projects,
    achievements: result.extractedData.achievements,
    certifications: result.extractedData.certifications,
    summary: result.extractedData.summary,
    contact: result.extractedData.contact,
    confidence: {
      overall: result.accuracy / 100,
      skills: result.sections.skills.sectionExists ? 1 : 0,
      experience: result.sections.experience.sectionExists ? 1 : 0,
      education: result.sections.education.sectionExists ? 1 : 0,
      projects: result.sections.projects.sectionExists ? 1 : 0
    },
    // V4 Enhanced data
    v4ParsingData: {
      parseId: result.parseId,
      accuracy: result.accuracy,
      sectionsFound: {
        skills: result.sections.skills.sectionExists,
        experience: result.sections.experience.sectionExists,
        education: result.sections.education.sectionExists,
        projects: result.sections.projects.sectionExists,
        certifications: result.sections.certifications.sectionExists,
        achievements: result.sections.achievements.sectionExists
      },
      sectionHeaders: {
        skills: result.sections.skills.headerText,
        experience: result.sections.experience.headerText,
        education: result.sections.education.headerText,
        projects: result.sections.projects.headerText
      },
      warnings: result.warnings,
      suggestions: result.suggestions,
      // Confidence messages - POSITIVE messages for found sections
      confidenceMessages: {
        skills: result.sections.skills.sectionExists
          ? `✅ Skills extracted successfully (${result.extractedData.skills.length} items)`
          : '⚠️ Skills section not detected. Add a "Skills" section for better results.',
        experience: result.sections.experience.sectionExists
          ? `✅ Experience extracted successfully (${result.extractedData.experience.length} entries)`
          : '⚠️ Experience section not detected. Add a "Work Experience" section for better results.',
        education: result.sections.education.sectionExists
          ? `✅ Education extracted successfully (${result.extractedData.education.length} entries)`
          : '⚠️ Education section not detected. Add an "Education" section for better results.',
        projects: result.sections.projects.sectionExists
          ? `✅ Projects extracted successfully (${result.extractedData.projects.length} items)`
          : '⚠️ Projects section not detected. Add a "Projects" section for better results.',
        overall: result.accuracy >= 80
          ? '✅ Resume parsed successfully! All major sections were extracted.'
          : result.accuracy >= 50
          ? '✅ Resume parsed. Some sections may need to be reviewed or added manually.'
          : '⚠️ Resume parsing had limited success. Consider adding clear section headers.'
      }
    },
    warnings: result.warnings
  };
}

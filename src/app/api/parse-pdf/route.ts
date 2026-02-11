import { convertToLegacyFormat, deterministicParser } from '@/lib/pdf-parser-deterministic';
import { convertStrictToLegacyFormat, parseResumeStrict } from '@/lib/resume-parser-strict';
import { convertToLegacyFormat as convertV3ToLegacy, parseResumeV3 } from '@/lib/resume-parser-v3';
import { NextRequest, NextResponse } from 'next/server';
import Tesseract from 'tesseract.js';

// Route Segment Config - Increase body size limit for PDF uploads (Vercel default is 4.5MB)
export const maxDuration = 60; // Allow up to 60s for OCR processing
export const dynamic = 'force-dynamic';

// ============================================================================
// EXTRACTION CONFIDENCE CALCULATOR
// ============================================================================

interface ExtractionResult {
  text: string;
  extractedChars: number;
  fileSize: number;
  isLikelyVectorized: boolean;
  extractionConfidence: number;
  extractionMethod: string | null;
}

function calculateExtractionConfidence(text: string, _fileSize: number): number {
  const charCount = text.trim().length;
  
  // HARD FAIL: No text extracted
  if (charCount === 0) {return 0;}
  if (charCount < 50) {return 0.05;}
  if (charCount < 100) {return 0.15;}
  if (charCount < 200) {return 0.25;}
  
  // Check for gibberish (CID fonts without Unicode mapping)
  const gibberishRatio = (text.match(/[^\x20-\x7E\n\u00A0-\u024F]/g) || []).length / charCount;
  if (gibberishRatio > 0.4) {return 0.1;}
  if (gibberishRatio > 0.25) {return 0.3;}
  
  // Check for resume keywords
  const keywordMatches = text.match(/experience|education|skills?|projects?|work|employment|summary|objective|certifications?/gi) || [];
  const hasKeywords = keywordMatches.length >= 2;
  
  if (!hasKeywords && charCount < 500) {return 0.35;}
  if (!hasKeywords) {return 0.5;}
  
  // Good extraction
  if (charCount >= 1000 && hasKeywords) {return 0.9;}
  if (charCount >= 500 && hasKeywords) {return 0.75;}
  
  return Math.min(0.85, 0.4 + (charCount / 2000));
}

// ============================================================================
// NON-EXTRACTABLE PDF RESPONSE (422)
// ============================================================================

function createNonExtractableResponse(extractedChars: number, fileSize: number) {
  const isLikelyVectorized = fileSize > 30000 && extractedChars < 50;
  
  return NextResponse.json({
    success: false,
    errorCode: 'NON_EXTRACTABLE_PDF',
    message: isLikelyVectorized
      ? 'This PDF contains outlined/vectorized text or custom fonts that prevent text extraction.'
      : 'Unable to extract readable text from this PDF.',
    extractedChars,
    fileSize,
    isLikelyVectorized,
    confidence: {
      overall: 0,
      extraction: 0,
      skills: 0,
      experience: 0,
      projects: 0
    },
    solutions: [
      'Re-export your resume from Word or Google Docs as a standard PDF',
      'Download your resume from LinkedIn (Profile → More → Save to PDF)',
      'Use the "Paste Text Instead" option to manually input your resume',
      'If using Canva/Figma, export with "Embed fonts" option disabled'
    ],
    extractedData: null,
    text: null
  }, { status: 422 });
}

// Multi-layer PDF text extraction function
async function extractTextFromFile(file: File): Promise<ExtractionResult> {
  console.log(`🔄 Extracting text from ${file.type} file...`);
  const arrayBuffer = await file.arrayBuffer();
  const fileSize = arrayBuffer.byteLength;
  
  try {
    if (file.type === 'application/pdf') {
      return await extractFromPDF(file, fileSize);
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const text = await extractFromDOCX(file);
      
return {
        text,
        extractedChars: text.trim().length,
        fileSize,
        isLikelyVectorized: false,
        extractionConfidence: calculateExtractionConfidence(text, fileSize),
        extractionMethod: 'mammoth-docx'
      };
    } else {
      // Fallback for text-based files
      const text = await file.text();
      
return {
        text,
        extractedChars: text.trim().length,
        fileSize,
        isLikelyVectorized: false,
        extractionConfidence: calculateExtractionConfidence(text, fileSize),
        extractionMethod: 'raw-text'
      };
    }
  } catch (error) {
    console.error('❌ Text extraction failed:', error);
    
return {
      text: '',
      extractedChars: 0,
      fileSize,
      isLikelyVectorized: fileSize > 30000,
      extractionConfidence: 0,
      extractionMethod: null
    };
  }
}

// ============================================================================
// OCR EXTRACTION USING TESSERACT.JS
// ============================================================================

async function extractTextWithOCR(pdfData: Uint8Array): Promise<string> {
  console.log('🔄 Starting OCR extraction pipeline...');
  
  try {
    // Tesseract.js v5+ can directly process PDF files
    // We'll use the buffer directly with Tesseract
    const pdfBuffer = Buffer.from(pdfData);
    
    console.log('🔍 Running Tesseract OCR on PDF buffer...');
    
    // Create a worker with English language
    const worker = await Tesseract.createWorker('eng', 1, {
      logger: (m: Tesseract.LoggerMessage) => {
        if (m.status === 'recognizing text' && m.progress) {
          console.log(`   OCR progress: ${Math.round(m.progress * 100)}%`);
        }
      }
    });
    
    // Recognize text from PDF - Tesseract can handle PDF buffers
    const result = await worker.recognize(pdfBuffer);
    
    await worker.terminate();
    
    const extractedText = result.data.text || '';
    console.log(`✅ OCR completed: ${extractedText.length} characters (confidence: ${Math.round(result.data.confidence)}%)`);
    
    return extractedText.trim();
    
  } catch (error) {
    console.error('❌ OCR extraction failed:', error);
    throw error;
  }
}

async function extractFromPDF(file: File, fileSize: number): Promise<ExtractionResult> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const uint8Array = new Uint8Array(arrayBuffer);
  
  let bestText = '';
  let extractionMethod: string | null = null;
  const errors: string[] = [];

  // Method 1: pdf2json with getRawTextContent (MOST RELIABLE for Node.js)
  try {
    console.log('📖 Attempting pdf2json extraction...');
    const PDFParser = (await import('pdf2json')).default;
    
    const text = await new Promise<string>((resolve, reject) => {
      const pdfParser = new PDFParser();
      
      const timeout = setTimeout(() => {
        reject(new Error('pdf2json timeout'));
      }, 30000);
      
      pdfParser.on('pdfParser_dataReady', () => {
        clearTimeout(timeout);
        try {
          // Use getRawTextContent which is the proper method
          const rawText = (pdfParser as any).getRawTextContent();
          console.log(`📖 pdf2json getRawTextContent returned ${rawText?.length || 0} chars`);
          resolve(rawText || '');
        } catch (e) {
          console.log('📖 getRawTextContent failed, trying manual extraction');
          // Fallback to manual extraction
          try {
            const pdfData = (pdfParser as any).data;
            let extractedText = '';
            if (pdfData && pdfData.Pages) {
              for (const page of pdfData.Pages) {
                if (page.Texts) {
                  for (const textItem of page.Texts) {
                    if (textItem.R) {
                      for (const r of textItem.R) {
                        if (r.T) {
                          try {
                            extractedText += decodeURIComponent(r.T) + ' ';
                          } catch {
                            extractedText += r.T + ' ';
                          }
                        }
                      }
                    }
                  }
                }
                extractedText += '\n';
              }
            }
            resolve(extractedText.trim());
          } catch (fallbackErr) {
            reject(fallbackErr);
          }
        }
      });
      
      pdfParser.on('pdfParser_dataError', (err: any) => {
        clearTimeout(timeout);
        reject(err?.parserError || err);
      });
      
      pdfParser.parseBuffer(buffer);
    });
    
    if (text.trim().length > bestText.trim().length) {
      bestText = text;
      extractionMethod = 'pdf2json';
      console.log(`✅ pdf2json extracted ${bestText.length} characters`);
    }
  } catch (error: any) {
    console.warn('⚠️ pdf2json failed:', error?.message || error);
    errors.push(`pdf2json: ${error instanceof Error ? error.message : 'Unknown'}`);
  }

  // Method 2: unpdf (uses pdfjs under hood but simpler API)
  if (bestText.trim().length < 100) {
    try {
      console.log('📖 Attempting unpdf extraction...');
      const { extractText } = await import('unpdf');
      const result = await extractText(uint8Array, { mergePages: true });
      
      if (result.text && result.text.trim().length > bestText.trim().length) {
        bestText = result.text;
        extractionMethod = 'unpdf';
        console.log(`✅ unpdf extracted ${bestText.length} characters`);
      }
    } catch (error: any) {
      console.warn('⚠️ unpdf failed:', error?.message || error);
      errors.push(`unpdf: ${error instanceof Error ? error.message : 'Unknown'}`);
    }
  }

  // Method 3: pdf-parse with custom render
  if (bestText.trim().length < 100) {
    try {
      console.log('📖 Attempting pdf-parse extraction...');
      const pdfParse = (await import('pdf-parse')).default;
      
      // Custom render function to better extract text
      const options = {
        pagerender: (pageData: any) => {
          return pageData.getTextContent().then((textContent: any) => {
            let text = '';
            for (const item of textContent.items) {
              text += item.str + ' ';
            }
            
return text;
          });
        }
      };
      
      const result = await pdfParse(buffer, options);
      
      if (result.text && result.text.trim().length > bestText.length) {
        bestText = result.text;
        extractionMethod = 'pdf-parse';
        console.log(`✅ pdf-parse extracted ${bestText.length} characters`);
      }
    } catch (error: any) {
      console.warn('⚠️ pdf-parse failed:', error?.message || error);
      errors.push(`pdf-parse: ${error instanceof Error ? error.message : 'Unknown'}`);
    }
  }

  // Method 4: Enhanced raw buffer text extraction
  if (bestText.trim().length < 50) {
    try {
      console.log('📖 Attempting raw buffer text extraction...');
      
      const rawText = buffer.toString('latin1'); // Use latin1 for better binary handling
      
      // PDF text streams pattern - text between BT and ET markers
      const btEtPattern = /BT\s*([\s\S]*?)\s*ET/g;
      let streamText = '';
      let match;
      
      while ((match = btEtPattern.exec(rawText)) !== null) {
        // Extract text from Tj and TJ operators
        const tjMatches = match[1].match(/\(([^)]*)\)\s*Tj/g);
        if (tjMatches) {
          for (const tj of tjMatches) {
            const text = tj.match(/\(([^)]*)\)/);
            if (text) {streamText += text[1] + ' ';}
          }
        }
        
        // TJ arrays
        const tjArrays = match[1].match(/\[(.*?)\]\s*TJ/g);
        if (tjArrays) {
          for (const tjArray of tjArrays) {
            const strings = tjArray.match(/\(([^)]*)\)/g);
            if (strings) {
              for (const s of strings) {
                streamText += s.slice(1, -1) + '';
              }
            }
          }
        }
      }
      
      // Also extract any readable text patterns
      const readablePattern = /[A-Za-z][A-Za-z0-9\s@.,\-:;!?'"()]{10,}/g;
      const readableMatches = rawText.match(readablePattern);
      let readableText = '';
      if (readableMatches) {
        readableText = readableMatches
          .filter(t => !/^[A-Z][a-z]+$/.test(t)) // Filter out single words
          .join(' ');
      }
      
      const extractedFromRaw = streamText.length > readableText.length ? streamText : readableText;
      
      if (extractedFromRaw.trim().length > bestText.trim().length) {
        bestText = extractedFromRaw;
        extractionMethod = 'raw-buffer';
        console.log(`✅ Raw extraction got ${bestText.length} characters`);
      }
    } catch (error) {
      console.warn('⚠️ Raw extraction failed:', error);
      errors.push(`raw: ${error instanceof Error ? error.message : 'Unknown'}`);
    }
  }

  // Method 5: OCR with Tesseract.js (for vectorized/image-based PDFs)
  if (bestText.trim().length < 50) {
    try {
      console.log('📖 Attempting OCR extraction with Tesseract.js...');
      const ocrText = await extractTextWithOCR(uint8Array);
      
      if (ocrText.trim().length > bestText.trim().length) {
        bestText = ocrText;
        extractionMethod = 'tesseract-ocr';
        console.log(`✅ OCR extracted ${bestText.length} characters`);
      }
    } catch (error: any) {
      console.warn('⚠️ OCR extraction failed:', error?.message || error);
      errors.push(`ocr: ${error instanceof Error ? error.message : 'Unknown'}`);
    }
  }

  // Clean up extracted text
  bestText = bestText
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .trim();

  const extractedChars = bestText.length;
  const isLikelyVectorized = fileSize > 30000 && extractedChars < 50;
  const extractionConfidence = calculateExtractionConfidence(bestText, fileSize);

  // Log extraction result
  if (extractedChars < 50) {
    console.error('❌ All extraction methods failed or returned minimal text');
    console.log(`📋 Errors: ${errors.join('; ')}`);
    console.log(`📊 File size: ${fileSize} bytes, Extracted: ${extractedChars} chars`);
    console.log(`🔍 Likely vectorized: ${isLikelyVectorized}`);
  } else {
    console.log(`✅ Final extracted text: ${extractedChars} characters`);
    console.log(`📊 Extraction confidence: ${(extractionConfidence * 100).toFixed(1)}%`);
  }

  return {
    text: extractedChars >= 50 ? cleanExtractedText(bestText) : bestText,
    extractedChars,
    fileSize,
    isLikelyVectorized,
    extractionConfidence,
    extractionMethod
  };
}

async function extractFromDOCX(file: File): Promise<string> {
  try {
    const mammoth = (await import('mammoth')).default;
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    
    if (result.value && result.value.length > 50) {
      console.log('✅ DOCX extraction successful');

      return cleanExtractedText(result.value);
    }
  } catch (error) {
    console.warn('⚠️ DOCX extraction failed:', error);
  }
  
  throw new Error('DOCX extraction failed');
}

function cleanExtractedText(text: string): string {
  return text
    // Normalize line endings first
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    // Remove non-printable characters but KEEP newlines and essential punctuation
    .replace(/[^\x20-\x7E\n\u00A0-\u024F\u1E00-\u1EFF]/g, ' ')
    // Clean up multiple spaces on SAME line (not newlines!)
    .replace(/[^\S\n]+/g, ' ')
    // Reduce excessive blank lines to max 2
    .replace(/\n{3,}/g, '\n\n')
    // Trim each line
    .split('\n')
    .map(line => line.trim())
    .filter((line, i, arr) => {
      // Remove empty lines if previous was also empty
      if (!line && i > 0 && !arr[i - 1]) {
        return false;
      }

      return true;
    })
    .join('\n')
    .trim();
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';
    
    let extractionResult: ExtractionResult;
    
    // Handle JSON body (manual text input)
    if (contentType.includes('application/json')) {
      const body = await request.json();
      
      if (!body.text || body.text.trim().length < 50) {
        return NextResponse.json({
          success: false,
          errorCode: 'TEXT_TOO_SHORT',
          message: 'Text is too short. Please provide at least 50 characters.',
          extractedChars: body.text?.length || 0,
          extractedData: null
        }, { status: 400 });
      }
      
      console.log(`🔍 Processing manual text input (${body.text.length} characters)`);
      const cleanedText = cleanExtractedText(body.text);
      
      extractionResult = {
        text: cleanedText,
        extractedChars: cleanedText.length,
        fileSize: body.text.length,
        isLikelyVectorized: false,
        extractionConfidence: 0.95, // Manual input is trusted
        extractionMethod: 'manual-input'
      };
    } 
    // Handle FormData (file upload)
    else {
      const formData = await request.formData();
      const file = formData.get('file') as File;

      if (!file) {
        return NextResponse.json({
          success: false,
          errorCode: 'NO_FILE',
          message: 'No file provided',
          extractedData: null
        }, { status: 400 });
      }

      // Validate file type
      const allowedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];

      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json({
          success: false,
          errorCode: 'INVALID_FILE_TYPE',
          message: 'Invalid file type. Only PDF and DOCX files are supported.',
          extractedData: null
        }, { status: 400 });
      }

      // Validate file size (10MB limit)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        return NextResponse.json({
          success: false,
          errorCode: 'FILE_TOO_LARGE',
          message: 'File size too large. Maximum size is 10MB.',
          extractedData: null
        }, { status: 400 });
      }

      console.log(`🔍 Starting PDF extraction for: ${file.name} (${file.type})`);
      
      // Multi-layer extraction pipeline
      extractionResult = await extractTextFromFile(file);
    }
    
    // =========================================================================
    // CRITICAL: NON-EXTRACTABLE PDF GATE (422 Response)
    // =========================================================================
    if (extractionResult.extractedChars < 50) {
      console.log(`🚫 NON-EXTRACTABLE PDF detected: ${extractionResult.extractedChars} chars from ${extractionResult.fileSize} bytes`);
      
return createNonExtractableResponse(extractionResult.extractedChars, extractionResult.fileSize);
    }
    
    console.log(`📄 Extracted text: ${extractionResult.extractedChars} characters`);
    console.log(`📊 Extraction confidence: ${(extractionResult.extractionConfidence * 100).toFixed(1)}%`);
    
    // =========================================================================
    // STRICT PARSER v4.0 - Section-based with FULL extraction
    // Resume structure = truth. If section exists, extract ALL content.
    // =========================================================================
    console.log('🚀 Using STRICT Resume Parser v4.0...');
    const strictResult = parseResumeStrict(extractionResult.text);
    const strictParsed = convertStrictToLegacyFormat(strictResult);
    
    // Also run V3 parser for additional data extraction
    console.log('🚀 Running Enhanced Resume Parser v3 for additional extraction...');
    const v3Result = parseResumeV3(extractionResult.text);
    const parsedResumeV3 = convertV3ToLegacy(v3Result);
    
    // Also run legacy parser for comparison (can be removed later)
    const rawResult = deterministicParser.parse(extractionResult.text);
    const parsedResume = convertToLegacyFormat(rawResult);
    
    console.log(`📊 STRICT Initial Results: ${strictResult.accuracy}% accuracy`);
    console.log(`📊 Initial Sections Found: Skills(${strictResult.sections.skills.sectionExists}), Experience(${strictResult.sections.experience.sectionExists}), Education(${strictResult.sections.education.sectionExists}), Projects(${strictResult.sections.projects.sectionExists})`);
    console.log(`🔑 Parse ID: ${strictResult.parseId}`);

    // USE STRICT PARSER DATA (with V3 as fallback for empty sections)
    // Also UPDATE strictResult section status when V3 finds data that strict parser missed
    
    // CONTACT INFO FILTER - Don't let contact info leak into other sections
    // ENHANCED: More aggressive patterns to catch all contact info variants
    const isContactInfoLine = (text: string): boolean => {
      if (!text || text.trim().length < 3) {return false;}
      
      const trimmed = text.trim();
      const digitsOnly = trimmed.replace(/[^\d]/g, '');
      
      const patterns = [
        /@[\w.-]+\.\w+/i,                          // Email
        /\+\s*\d{1,4}/,                            // Country code like +91, +1
        /linkedin\.com/i,
        /github\.com(?!\/[\w-]+\/[\w-]+)/i,        // GitHub profile (not repo)
        /\b(phone|mobile|email|contact|address)\s*[:]/i,
        /^[A-Z][a-z]+\s+[A-Z][a-z]+\s*$/,          // Just a name (First Last)
        /^[A-Z][a-z]+\s+[A-Z]?\s*(at|@)\s*/i,      // Name at Something (garbled)
        /\bII\s*\+?\d/i,                           // Garbled "II +91" pattern
        /\bat\s+II\b/i,                            // "at II" pattern
        /\b(Mumbai|Delhi|Bangalore|Bengaluru|Hyderabad|Chennai|Kolkata|Pune|India|USA|UK|Dubai|Singapore)\b/i,
      ];
      
      // Check patterns
      if (patterns.some(p => p.test(trimmed))) {
        return true;
      }
      
      // Check if 10+ digits (phone number)
      if (digitsOnly.length >= 10 && digitsOnly.length <= 15) {
        return true;
      }
      
      return false;
    };

    // Skills: Use strict parser, fallback to V3 if empty
    let finalSkills = strictParsed.skills;
    if (finalSkills.length === 0 && parsedResumeV3.extractedData.skills.length > 0) {
      finalSkills = parsedResumeV3.extractedData.skills;
      strictResult.sections.skills.sectionExists = true; // V3 found it!
      console.log('📋 Using V3 skills as fallback - marking section as found');
    }
    
    // Experience: Use strict parser, FILTER contact info from V3
    let experienceStrings = strictParsed.experience;
    if (experienceStrings.length === 0 && v3Result.experience.length > 0) {
      const filteredExp = v3Result.experience.filter(exp => 
        !isContactInfoLine(exp.title || '') && !isContactInfoLine(exp.company || '')
      );
      if (filteredExp.length > 0) {
        experienceStrings = filteredExp.map(exp => 
          `${exp.title}${exp.company ? ` at ${exp.company}` : ''}${exp.duration ? ` (${exp.duration})` : ''}`
        );
        strictResult.sections.experience.sectionExists = true;
        console.log('📋 Using V3 experience as fallback - marking section as found');
      }
    }
    // Also filter contact info from strict parser results AND the final strings
    experienceStrings = experienceStrings.filter(e => !isContactInfoLine(e));
    
    // Projects: Use strict parser, FILTER contact info from V3
    let projectStrings = strictParsed.projects;
    if (projectStrings.length === 0 && v3Result.projects.length > 0) {
      const filteredProj = v3Result.projects.filter(proj => 
        !isContactInfoLine(proj.name || '') && !isContactInfoLine(proj.description || '')
      );
      if (filteredProj.length > 0) {
        projectStrings = filteredProj.map(proj => 
          `${proj.name}: ${proj.description || ''}`
        );
        strictResult.sections.projects.sectionExists = true;
        console.log('📋 Using V3 projects as fallback - marking section as found');
      }
    }
    // Also filter contact info from strict parser results
    projectStrings = projectStrings.filter(p => !isContactInfoLine(p));
    
    // Education: Use strict parser, FILTER contact info from V3
    let educationStrings = strictParsed.education;
    if (educationStrings.length === 0 && v3Result.education.length > 0) {
      const filteredEdu = v3Result.education.filter(edu => 
        !isContactInfoLine(edu.degree || '') && !isContactInfoLine(edu.institution || '')
      );
      if (filteredEdu.length > 0) {
        educationStrings = filteredEdu.map(edu => 
          `${edu.degree}${edu.institution ? ` from ${edu.institution}` : ''}${edu.year ? ` (${edu.year})` : ''}`
        );
        strictResult.sections.education.sectionExists = true;
        console.log('📋 Using V3 education as fallback - marking section as found');
      }
    }
    // Also filter contact info from strict parser results
    educationStrings = educationStrings.filter(e => !isContactInfoLine(e));
    
    // UPDATE section exists based on filtered results
    if (experienceStrings.length === 0) {
      strictResult.sections.experience.sectionExists = false;
    }
    if (projectStrings.length === 0) {
      strictResult.sections.projects.sectionExists = false;
    }
    if (educationStrings.length === 0) {
      strictResult.sections.education.sectionExists = false;
    }
    
    // RECALCULATE accuracy after V3 fallback updates
    const updatedAccuracy = 
      (strictResult.sections.skills.sectionExists ? 30 : 0) +
      (strictResult.sections.experience.sectionExists ? 30 : 0) +
      (strictResult.sections.education.sectionExists ? 20 : 0) +
      (strictResult.sections.projects.sectionExists ? 20 : 0);
    strictResult.accuracy = updatedAccuracy;
    
    // USE UPDATED ACCURACY (based on sections found, not content length)
    const parsingConfidence = strictResult.accuracy / 100;
    const combinedConfidence = Math.min(extractionResult.extractionConfidence, parsingConfidence);
    
    console.log(`📊 UPDATED Parsing Results: ${strictResult.accuracy}% accuracy`);
    console.log(`📊 Final Sections Found: Skills(${strictResult.sections.skills.sectionExists}), Experience(${strictResult.sections.experience.sectionExists}), Education(${strictResult.sections.education.sectionExists}), Projects(${strictResult.sections.projects.sectionExists})`);

    // Flatten skills for backward compatibility - DEDUPLICATED
    const allSkillsRaw = finalSkills;
    
    // Remove duplicates case-insensitively, keeping the first occurrence
    const seenSkills = new Set<string>();
    const allSkills = allSkillsRaw.filter((skill: string) => {
      const normalizedSkill = skill.toLowerCase().trim();
      if (seenSkills.has(normalizedSkill)) {
        return false;
      }
      seenSkills.add(normalizedSkill);

      return true;
    });

    return NextResponse.json({
      success: true,
      text: parsedResume.rawText,
      skills: allSkills,
      experience: experienceStrings,
      education: educationStrings,
      projects: projectStrings,
      achievements: parsedResume.extractedData.achievements.map(a => a.title),
      extractionMethod: extractionResult.extractionMethod || parsedResume.parseMethod,
      contact: parsedResume.extractedData.personalInfo,
      summary: parsedResume.extractedData.summary,
      // ADD extractedData OBJECT for frontend compatibility
      extractedData: {
        skills: allSkills,
        experience: experienceStrings,
        education: educationStrings,
        projects: projectStrings,
        achievements: parsedResume.extractedData.achievements.map(a => a.title),
        contact: parsedResume.extractedData.personalInfo,
        summary: parsedResume.extractedData.summary
      },
      // Return confidence as OBJECT - USE STRICT PARSER (1 if section exists, 0 if not)
      confidence: {
        overall: combinedConfidence,
        extraction: extractionResult.extractionConfidence,
        parsing: parsingConfidence,
        skills: strictResult.sections.skills.sectionExists ? 1 : 0,
        experience: strictResult.sections.experience.sectionExists ? 1 : 0,
        projects: strictResult.sections.projects.sectionExists ? 1 : 0,
        education: strictResult.sections.education.sectionExists ? 1 : 0
      },
      warnings: parsedResume.warnings,
      // Extraction metadata for debugging
      extractionDetails: {
        extractedChars: extractionResult.extractedChars,
        fileSize: extractionResult.fileSize,
        method: extractionResult.extractionMethod,
        isLikelyVectorized: extractionResult.isLikelyVectorized
      },
      // Enhanced structured data with categorized skills - USE V3 DATA
      structuredData: {
        experience: v3Result.experience.map(e => ({
          jobTitle: e.title,
          companyName: e.company || '',
          startDate: e.startDate || '',
          endDate: e.endDate || 'Present',
          description: e.responsibilities?.join('; ') || '',
          achievements: [],
          technologies: []
        })),
        projects: v3Result.projects.map(p => ({
          name: p.name,
          description: p.description || '',
          technologies: p.techStack || [],
          link: p.link,
          duration: ''
        })),
        education: v3Result.education.map(e => ({
          degree: e.degree,
          institution: e.institution || '',
          year: e.year || '',
          score: '',
          field: e.field || ''
        })),
        skills: {
          technical: parsedResumeV3.extractedData.skills,
          languages: [],
          frameworks: [],
          databases: [],
          tools: []
        },
        personalInfo: parsedResume.extractedData.personalInfo,
        achievements: parsedResume.extractedData.achievements,
        certifications: parsedResume.extractedData.certifications
      },
      // V3 Enhanced Parsing Metadata - USE STRICT PARSER CONFIDENCE MESSAGES
      v3ParsingData: {
        qualityCheck: v3Result.qualityCheck,
        detectedSections: v3Result.detectedSections,
        // USE STRICT PARSER SECTION CONFIDENCE (1 if exists, 0 if not)
        sectionConfidence: {
          skills: strictResult.sections.skills.sectionExists ? 1 : 0,
          experience: strictResult.sections.experience.sectionExists ? 1 : 0,
          education: strictResult.sections.education.sectionExists ? 1 : 0,
          projects: strictResult.sections.projects.sectionExists ? 1 : 0
        },
        overallConfidence: strictResult.accuracy / 100,
        // USE STRICT PARSER CONFIDENCE MESSAGES (no false warnings!)
        confidenceMessages: strictParsed.v4ParsingData.confidenceMessages,
        suggestions: strictResult.suggestions,
        // Sections found status from strict parser
        sectionsFound: strictParsed.v4ParsingData.sectionsFound,
        sectionHeaders: strictParsed.v4ParsingData.sectionHeaders,
        // Extracted data with confidence scores
        skills: v3Result.skills,
        experience: v3Result.experience,
        education: v3Result.education,
        projects: v3Result.projects
      },
      // STRICT PARSER v4.0 data
      v4ParsingData: strictParsed.v4ParsingData,
      // Legacy parsing metadata with determinism info
      parseMetadata: {
        parseId: strictResult.parseId, // Strict parser ID
        confidence: {
          overall: strictResult.accuracy / 100,
          skills: strictResult.sections.skills.sectionExists ? 1 : 0,
          experience: strictResult.sections.experience.sectionExists ? 1 : 0,
          education: strictResult.sections.education.sectionExists ? 1 : 0,
          projects: strictResult.sections.projects.sectionExists ? 1 : 0
        },
        sectionsDetected: Object.entries(strictResult.sections)
          .filter(([_, s]) => s.sectionExists)
          .map(([type, _]) => type),
        missingSections: Object.entries(strictResult.sections)
          .filter(([_, s]) => !s.sectionExists)
          .map(([type, _]) => type),
        accuracy: strictResult.accuracy,
        parseMethod: 'strict-v4',
        warnings: strictResult.warnings
      }
    });

  } catch (error) {
    console.error('Error in parse-pdf API:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    // Check if it's a PDF extraction failure (legacy handling)
    if (errorMessage.includes('PDF_EXTRACTION_FAILED') || 
        errorMessage.includes('scanned') || 
        errorMessage.includes('image-based') ||
        errorMessage.includes('vectorized')) {
      return NextResponse.json({
        success: false,
        errorCode: 'NON_EXTRACTABLE_PDF',
        message: 'This PDF contains text that cannot be extracted programmatically.',
        extractedChars: 0,
        fileSize: 0,
        confidence: { overall: 0 },
        solutions: [
          'Re-export your resume from Word or Google Docs as a standard PDF',
          'Download your resume from LinkedIn (Profile → More → Save to PDF)',
          'Use the "Paste Text Instead" option to manually input your resume'
        ],
        extractedData: null
      }, { status: 422 });
    }
    
    // Actual server error (not extraction failure)
    return NextResponse.json({
      success: false,
      errorCode: 'SERVER_ERROR',
      message: 'Internal server error while processing file',
      userMessage: 'Something went wrong. Please try again or use the paste text option.',
      extractedData: null
    }, { status: 500 });
  }
}

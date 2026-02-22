/**
 * PDF Storage Configuration
 * 
 * All PDFs have been moved from public/ to Supabase Storage bucket: "interview-pdfs"
 * This utility constructs the correct public URLs for accessing PDFs.
 * 
 * Bucket structure mirrors the old public/ folder structure:
 *   interview-pdfs/
 *   ├── InterviewPrep/
 *   ├── TCS/
 *   ├── WIPRO/
 *   ├── INFOSYS/
 *   ├── CAPGEMINI/
 *   ├── COGNIZANT/
 *   ├── ACCENTURE/
 *   └── pdfs/
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const BUCKET_NAME = 'interview-pdfs';

/**
 * Get the public Supabase Storage URL for a PDF file.
 * 
 * @param filePath - The path relative to the old public/ folder, e.g. "InterviewPrep/1.Java-Interview-Questions.pdf"
 *                   Can also start with "/" which will be stripped.
 * @returns Full public URL to the PDF in Supabase Storage
 * 
 * @example
 * getPdfUrl('/InterviewPrep/1.Java-Interview-Questions.pdf')
 * // => "https://xxx.supabase.co/storage/v1/object/public/interview-pdfs/InterviewPrep/1.Java-Interview-Questions.pdf"
 * 
 * getPdfUrl('TCS/TCSPaper2.pdf')
 * // => "https://xxx.supabase.co/storage/v1/object/public/interview-pdfs/TCS/TCSPaper2.pdf"
 */
export function getPdfUrl(filePath: string): string {
  // Strip leading slash if present
  const cleanPath = filePath.startsWith('/') ? filePath.slice(1) : filePath;
  // Encode spaces and special characters in the path
  const encodedPath = cleanPath.split('/').map(segment => encodeURIComponent(segment)).join('/');
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${encodedPath}`;
}

/**
 * Get the public URL for a company's PDF file.
 * 
 * @param companyFolder - The company folder name (e.g. "TCS", "WIPRO")
 * @param fileName - The PDF file name
 * @returns Full public URL 
 */
export function getCompanyPdfUrl(companyFolder: string, fileName: string): string {
  return getPdfUrl(`${companyFolder}/${fileName}`);
}

/**
 * Get the base storage URL for listing purposes
 */
export function getStorageBaseUrl(): string {
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}`;
}

export { BUCKET_NAME, SUPABASE_URL };


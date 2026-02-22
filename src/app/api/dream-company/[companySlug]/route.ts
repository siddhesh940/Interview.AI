import { BUCKET_NAME, getCompanyPdfUrl } from '@/lib/pdf-storage';
import { createClient } from '@/lib/supabase';
import { NextResponse } from 'next/server';

// Simple company mapping - no external dependencies
const COMPANIES = {
  'accenture': 'ACCENTURE',
  'capgemini': 'CAPGEMINI', 
  'cognizant': 'COGNIZANT',
  'infosys': 'INFOSYS',
  'tcs': 'TCS',
  'wipro': 'WIPRO'
};

const DESCRIPTIONS = {
  'ACCENTURE': 'Global professional services company with leading capabilities in digital, cloud and security.',
  'CAPGEMINI': 'French multinational information technology consulting and professional services company.',
  'COGNIZANT': 'American multinational technology company that provides IT services and consulting.',
  'INFOSYS': 'Indian multinational information technology company that provides consulting and software services.',
  'TCS': 'Tata Consultancy Services - Indian multinational IT services and consulting company.',
  'WIPRO': 'Indian multinational corporation providing IT, consulting and business process services.'
};

// Map company slugs to actual logo filenames in /public/company-logos/
const COMPANY_LOGO_MAP: Record<string, string> = {
  'accenture': 'ACN_BIG.png',
  'capgemini': 'CAP.PA_BIG.png', 
  'cognizant': 'CTSH_BIG.png',
  'infosys': 'INFY_BIG.png',
  'tcs': 'TCS.NS_BIG.png',
  'wipro': 'WIT.png',
};

export async function GET(
  request: Request
) {
  try {
    // Extract company slug directly from URL - most reliable method
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/');
    const companySlug = pathSegments[pathSegments.length - 1];
    
    if (!companySlug) {
      return NextResponse.json({ error: 'Company slug not provided' }, { status: 400 });
    }
    
    // Normalize company slug
    const normalizedSlug = companySlug.toLowerCase().trim();
    const folderName = COMPANIES[normalizedSlug as keyof typeof COMPANIES];
    
    if (!folderName) {
      return NextResponse.json({ 
        error: 'Company not found',
        available: Object.keys(COMPANIES)
      }, { status: 404 });
    }

    // List PDF files from Supabase Storage
    const supabase = createClient();
    let pdfFiles: Array<{name: string, displayName: string, url: string}> = [];

    try {
      const { data: files, error } = await supabase.storage
        .from(BUCKET_NAME)
        .list(folderName, {
          limit: 1000,
        });

      if (!error && files) {
        pdfFiles = files
          .filter(file => file.name.toLowerCase().endsWith('.pdf'))
          .map(file => ({
            name: file.name,
            displayName: formatDisplayName(file.name),
            url: getCompanyPdfUrl(folderName, file.name),
          }))
          .sort((a, b) => a.displayName.localeCompare(b.displayName));
      }
    } catch (error) {
      console.error('Error listing files from storage:', error);
    }

    // Return company data
    const logoFile = COMPANY_LOGO_MAP[normalizedSlug];
    const logoPath = logoFile ? `/company-logos/${logoFile}` : `/company-logos/${normalizedSlug}.png`;
    
    const companyData = {
      name: folderName,
      slug: normalizedSlug,
      description: DESCRIPTIONS[folderName as keyof typeof DESCRIPTIONS],
      logoPath: logoPath,
      pdfs: pdfFiles,
      totalResources: pdfFiles.length
    };

    return NextResponse.json(companyData);
  } catch (error) {
    console.error('API Error:', error);
    
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

function formatDisplayName(name: string): string {
  // Remove file extension if present
  let displayName = name.replace(/\.pdf$/i, '');
  
  // Replace underscores and hyphens with spaces
  displayName = displayName.replace(/[_-]/g, ' ');
  
  // Remove numbers at the beginning
  displayName = displayName.replace(/^\d+\./, '');
  
  // Capitalize first letter of each word
  displayName = displayName.replace(/\b\w/g, (char) => char.toUpperCase());
  
  // Clean up common patterns
  displayName = displayName
    .replace(/\s+/g, ' ') // Multiple spaces to single
    .replace(/\(\d+pgs\)/i, '') // Remove page counts
    .replace(/\s*\(online study4u\)/i, '') // Remove specific patterns
    .replace(/materials?/i, 'Materials')
    .replace(/premium/i, 'Premium')
    .trim();
  
  return displayName;
}

import { COMPANY_CONFIG } from '@/lib/company-config';
import { BUCKET_NAME } from '@/lib/pdf-storage';
import { createClient } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = createClient();

    // Process each company using the centralized configuration
    const companiesPromises = Object.entries(COMPANY_CONFIG).map(async ([slug, config]) => {
      // List PDF files from Supabase Storage bucket
      let resourceCount = 0;
      try {
        const { data: files, error } = await supabase.storage
          .from(BUCKET_NAME)
          .list(config.folderName, {
            limit: 1000,
          });

        if (!error && files) {
          resourceCount = files.filter(f => f.name.toLowerCase().endsWith('.pdf')).length;
        }
      } catch (err) {
        console.warn(`Error listing files for ${config.folderName}:`, err);
      }

      return {
        name: config.displayName,
        slug: slug,
        description: config.description,
        logoPath: `/company-logos/${slug}.png`,
        resourceCount: resourceCount,
        _folderName: config.folderName
      };
    });

    const companies = (await Promise.all(companiesPromises))
      .sort((a, b) => a.name.localeCompare(b.name));

    console.log(`Successfully loaded ${companies.length} companies`);
    
    return NextResponse.json(companies);
  } catch (error) {
    console.error('Unexpected error in dream-company list API:', error);
    
    return NextResponse.json({ 
      error: 'Failed to load companies', 
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

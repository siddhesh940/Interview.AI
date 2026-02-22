import { getResourceUrl, pdfResources } from '@/data/interview-resources-data';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Return PDF resources from the static data file with Supabase Storage URLs
    const resources = pdfResources.map(resource => ({
      name: resource.fileName,
      displayName: resource.title,
      path: getResourceUrl(resource),
    }))
    .sort((a, b) => a.displayName.localeCompare(b.displayName));

    return NextResponse.json(resources);
  } catch (error) {
    console.error('Error loading interview resources:', error);
    
    return NextResponse.json({ error: 'Failed to load interview resources' }, { status: 500 });
  }
}

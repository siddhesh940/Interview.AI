// API Route: /api/placement-drives/seed-live
// Seeds REAL (non-dummy) placement drives from verified sources
// Call GET to seed TCS NQT + other verified live drives

import { createClient } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

// ============================================================
// ADD NEW LIVE DRIVES HERE — These are REAL verified drives
// ============================================================
function getLiveDrives(companyMap: Record<string, number>) {
  return [
    // ────────────────────────────────────────────────────
    // TCS All India NQT Hiring — Feb-March 2026
    // Source: https://www.tcs.com/careers/india/tcs-all-india-nqt-hiring
    // ────────────────────────────────────────────────────
    {
      company_id: companyMap['tcs'],
      role: 'TCS NQT Hiring – Prime & Digital Cadre (Batch 2026)',
      drive_type: 'off-campus' as const,
      batch: '2026',
      min_cgpa: 6.0,
      branches: [
        'Computer Science Engineering',
        'Information Technology',
        'Electronics and Communication',
        'Electrical Engineering',
        'Mechanical Engineering',
        'Civil Engineering',
        'Electronics and Instrumentation',
        'Chemical Engineering',
        'Aerospace Engineering',
        'CSE', 'IT', 'ECE', 'EEE', 'ME', 'CE'
      ],
      deadline: '2026-03-20T23:59:59.000Z',
      registration_link: 'https://nextstep.tcsapps.com/indiacampus/#/',
      source_url: 'https://www.tcs.com/careers/india/tcs-all-india-nqt-hiring',
      is_active: true,
      is_dummy: false
    },
    {
      company_id: companyMap['tcs'],
      role: 'TCS NQT Hiring – Prime & Digital Cadre (Batch 2025)',
      drive_type: 'off-campus' as const,
      batch: '2025',
      min_cgpa: 6.0,
      branches: [
        'Computer Science Engineering',
        'Information Technology',
        'Electronics and Communication',
        'Electrical Engineering',
        'Mechanical Engineering',
        'Civil Engineering',
        'Electronics and Instrumentation',
        'Chemical Engineering',
        'Aerospace Engineering',
        'CSE', 'IT', 'ECE', 'EEE', 'ME', 'CE'
      ],
      deadline: '2026-03-20T23:59:59.000Z',
      registration_link: 'https://nextstep.tcsapps.com/indiacampus/#/',
      source_url: 'https://www.tcs.com/careers/india/tcs-all-india-nqt-hiring',
      is_active: true,
      is_dummy: false
    },
    {
      company_id: companyMap['tcs'],
      role: 'TCS NQT Hiring – Prime & Digital Cadre (Batch 2024)',
      drive_type: 'off-campus' as const,
      batch: '2024',
      min_cgpa: 6.0,
      branches: [
        'Computer Science Engineering',
        'Information Technology',
        'Electronics and Communication',
        'Electrical Engineering',
        'Mechanical Engineering',
        'Civil Engineering',
        'Electronics and Instrumentation',
        'Chemical Engineering',
        'Aerospace Engineering',
        'CSE', 'IT', 'ECE', 'EEE', 'ME', 'CE'
      ],
      deadline: '2026-03-20T23:59:59.000Z',
      registration_link: 'https://nextstep.tcsapps.com/indiacampus/#/',
      source_url: 'https://www.tcs.com/careers/india/tcs-all-india-nqt-hiring',
      is_active: true,
      is_dummy: false
    }
  ];
}

export async function GET() {
  try {
    const supabase = createClient();

    // Step 1: Get all companies
    const { data: companies, error: companyError } = await supabase
      .from('companies')
      .select('id, name');

    if (companyError || !companies || companies.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'No companies found in database. Run the placement_drives_schema.sql first.',
        details: companyError?.message
      }, { status: 400 });
    }

    // Build company name → id map (case-insensitive)
    const companyMap: Record<string, number> = {};
    companies.forEach(c => {
      companyMap[c.name.toLowerCase()] = c.id;
    });

    // Step 2: Get live drives to insert
    const liveDrives = getLiveDrives(companyMap);

    // Filter out drives where company_id is undefined
    const validDrives = liveDrives.filter(d => d.company_id);

    if (validDrives.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'No valid drives to insert. Make sure TCS exists in companies table.',
        companiesFound: Object.keys(companyMap)
      }, { status: 400 });
    }

    // Step 3: Upsert drives (avoid duplicates based on company_id + role + deadline)
    let inserted = 0;
    let skipped = 0;
    const errors: string[] = [];

    for (const drive of validDrives) {
      // Check if already exists
      const { data: existing } = await supabase
        .from('drives')
        .select('id')
        .eq('company_id', drive.company_id)
        .eq('role', drive.role)
        .single();

      if (existing) {
        skipped++;
        continue;
      }

      const { error: insertError } = await supabase
        .from('drives')
        .insert(drive);

      if (insertError) {
        errors.push(`Failed to insert "${drive.role}": ${insertError.message}`);
      } else {
        inserted++;
      }
    }

    // Step 4: Verify insertion — fetch back the drives
    const { data: allLiveDrives } = await supabase
      .from('drives')
      .select(`
        id, role, batch, deadline, is_dummy, is_active,
        companies ( name )
      `)
      .eq('is_dummy', false)
      .eq('is_active', true)
      .gte('deadline', new Date().toISOString())
      .order('deadline', { ascending: true });

    return NextResponse.json({
      success: true,
      message: `Seeded ${inserted} live drives (${skipped} already existed)`,
      inserted,
      skipped,
      errors: errors.length > 0 ? errors : undefined,
      liveDrivesInDB: allLiveDrives || [],
      totalLiveDrives: allLiveDrives?.length || 0,
      mode: 'LIVE'
    });

  } catch (error: any) {
    console.error('Error seeding live drives:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to seed live drives',
      details: error?.message
    }, { status: 500 });
  }
}

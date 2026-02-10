import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    console.log('Starting response count sync for all interviews...');
    
    // Get all interviews
    const { data: interviews, error: interviewError } = await supabase
      .from('interview')
      .select('id, name, organization_id');
    
    if (interviewError) {
      console.error('Error fetching interviews:', interviewError);
      
return NextResponse.json({ error: 'Failed to fetch interviews' }, { status: 500 });
    }
    
    let updated = 0;
    let errors = 0;
    const results = [];
    
    for (const interview of interviews || []) {
      try {
        // Count actual ended responses for this interview
        const { count } = await supabase
          .from('response')
          .select('*', { count: 'exact', head: true })
          .eq('interview_id', interview.id)
          .eq('is_ended', true);
        
        // Update interview with correct count
        const { error: updateError } = await supabase
          .from('interview')
          .update({ response_count: count || 0 })
          .eq('id', interview.id);
        
        if (updateError) {
          console.error(`Error updating interview ${interview.id}:`, updateError);
          errors++;
          results.push({
            id: interview.id,
            name: interview.name,
            status: 'error',
            error: updateError.message,
            count: count || 0
          });
        } else {
          console.log(`Updated interview "${interview.name}" (${interview.id}): ${count || 0} responses`);
          updated++;
          results.push({
            id: interview.id,
            name: interview.name,
            status: 'updated',
            count: count || 0
          });
        }
      } catch (error: any) {
        console.error(`Error processing interview ${interview.id}:`, error);
        errors++;
        results.push({
          id: interview.id,
          name: interview.name,
          status: 'error',
          error: error.message
        });
      }
    }
    
    console.log(`✅ Response count sync completed!`);
    console.log(`📊 Updated: ${updated} interviews`);
    console.log(`❌ Errors: ${errors} interviews`);
    
    return NextResponse.json({
      success: true,
      message: 'Response count sync completed',
      stats: {
        updated,
        errors,
        total: interviews?.length || 0
      },
      results
    });
    
  } catch (error: any) {
    console.error('Error in response count sync:', error);
    
return NextResponse.json({ error: 'Sync failed: ' + error.message }, { status: 500 });
  }
}

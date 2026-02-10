/**
 * Utility script to sync response_count field in interview table
 * with actual response count from response table
 */

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

export async function syncAllResponseCounts() {
  try {
    console.log('Starting response count sync...');
    
    // Get all interviews
    const { data: interviews, error: interviewError } = await supabase
      .from('interview')
      .select('id');
    
    if (interviewError) {
      console.error('Error fetching interviews:', interviewError);
      
return;
    }
    
    let updated = 0;
    let errors = 0;
    
    for (const interview of interviews || []) {
      try {
        // Count actual responses for this interview
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
        } else {
          console.log(`Updated interview ${interview.id}: ${count || 0} responses`);
          updated++;
        }
      } catch (error) {
        console.error(`Error processing interview ${interview.id}:`, error);
        errors++;
      }
    }
    
    console.log(`✅ Response count sync completed!`);
    console.log(`📊 Updated: ${updated} interviews`);
    console.log(`❌ Errors: ${errors} interviews`);
    
    return { updated, errors };
  } catch (error) {
    console.error('Error in syncAllResponseCounts:', error);
    throw error;
  }
}

// Run this function if called directly
if (require.main === module) {
  syncAllResponseCounts()
    .then(() => {
      console.log('Sync completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Sync failed:', error);
      process.exit(1);
    });
}

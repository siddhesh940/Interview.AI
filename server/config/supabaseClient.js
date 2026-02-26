const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  throw new Error('Supabase configuration error');
}

const supabase = createClient(supabaseUrl, supabaseKey);

class SupabaseService {
  getClient() {
    return supabase;
  }

  async insertDrives(drives) {
    if (!drives || drives.length === 0) {
      return { inserted: 0, duplicates: 0 };
    }

    let inserted = 0;
    let duplicates = 0;

    for (const drive of drives) {
      try {
        // Check for duplicates
        const { data: existing } = await supabase
          .from('drives')
          .select('id')
          .eq('role', drive.role)
          .eq('company_id', drive.company_id)
          .eq('batch', drive.batch)
          .single();

        if (existing) {
          duplicates++;
          continue;
        }

        // Insert new drive
        const { error } = await supabase
          .from('drives')
          .insert(drive);

        if (error) {
          console.error('Error inserting drive:', error);
        } else {
          inserted++;
        }
      } catch (error) {
        console.error('Error processing drive:', error);
      }
    }

    return { inserted, duplicates };
  }

  async getCompanyId(companyName) {
    const { data } = await supabase
      .from('companies')
      .select('id')
      .ilike('name', companyName)
      .single();
    
return data?.id;
  }

  async getCompanyByName(companyName) {
    const { data } = await supabase
      .from('companies')
      .select('*')
      .ilike('name', companyName)
      .single();
    
return data;
  }

  async cleanupOldDrives(daysOld = 30) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    const { data, error } = await supabase
      .from('drives')
      .delete()
      .lt('deadline', cutoffDate.toISOString())
      .eq('is_active', false)
      .select();

    if (error) {
      console.error('Error cleaning up old drives:', error);
    }
    
return data;
  }

  async getActiveDrives() {
    const { data } = await supabase
      .from('drives')
      .select(`
        *,
        companies (
          name,
          logo_url
        )
      `)
      .eq('is_active', true)
      .gte('deadline', new Date().toISOString())
      .order('deadline', { ascending: true });

    return data || [];
  }

  async getAllUserProfiles() {
    const { data } = await supabase
      .from('user_profiles')
      .select('*');
    
return data || [];
  }
}

module.exports = new SupabaseService();

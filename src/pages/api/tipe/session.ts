import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Save TechPrep session
    try {
      const {
        userId,
        domain,
        mode,
        difficulty,
        score,
        questionsAttempted,
        timeSpentSeconds,
        feedback,
        weakTopics,
        strongTopics
      } = req.body;

      if (!userId || !domain || !mode) {
        return res.status(400).json({ error: 'Missing required fields: userId, domain, mode' });
      }

      // Insert session record
      const { data: session, error: sessionError } = await supabase
        .from('tipe_sessions')
        .insert({
          user_id: userId,
          domain,
          mode,
          difficulty: difficulty || 'medium',
          score: score || 0,
          questions_attempted: questionsAttempted || 0,
          time_spent_seconds: timeSpentSeconds || 0,
          feedback: feedback || {}
        })
        .select()
        .single();

      if (sessionError) {
        console.error('Session insert error:', sessionError);
        
return res.status(500).json({ error: 'Failed to save session' });
      }

      // Update user progress
      const { data: existingProgress } = await supabase
        .from('user_technical_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('domain', domain)
        .single();

      if (existingProgress) {
        // Update existing progress
        const newAvgScore = (existingProgress.average_score * existingProgress.total_sessions + score) / 
                           (existingProgress.total_sessions + 1);
        
        // Merge weak and strong topics
        const allWeak = [...(existingProgress.weak_topics || []), ...(weakTopics || [])];
        const updatedWeakTopics = Array.from(new Set(allWeak)).filter(t => !(strongTopics || []).includes(t));
        
        const allStrong = [...(existingProgress.strong_topics || []), ...(strongTopics || [])];
        const updatedStrongTopics = Array.from(new Set(allStrong));

        await supabase
          .from('user_technical_progress')
          .update({
            total_sessions: existingProgress.total_sessions + 1,
            average_score: newAvgScore,
            last_session_at: new Date().toISOString(),
            weak_topics: updatedWeakTopics,
            strong_topics: updatedStrongTopics,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingProgress.id);
      } else {
        // Create new progress record
        await supabase
          .from('user_technical_progress')
          .insert({
            user_id: userId,
            domain,
            total_sessions: 1,
            average_score: score || 0,
            last_session_at: new Date().toISOString(),
            weak_topics: weakTopics || [],
            strong_topics: strongTopics || []
          });
      }

      return res.status(200).json({ 
        success: true, 
        sessionId: session.id,
        message: 'Session saved successfully' 
      });

    } catch (error) {
      console.error('TechPrep session save error:', error);
      
return res.status(500).json({ error: 'Internal server error' });
    }

  } else if (req.method === 'GET') {
    // Get user's TechPrep sessions
    try {
      const { userId, domain, limit = 10 } = req.query;

      if (!userId) {
        return res.status(400).json({ error: 'Missing userId parameter' });
      }

      let query = supabase
        .from('tipe_sessions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(Number(limit));

      if (domain) {
        query = query.eq('domain', domain);
      }

      const { data: sessions, error } = await query;

      if (error) {
        return res.status(500).json({ error: 'Failed to fetch sessions' });
      }

      return res.status(200).json({ sessions });

    } catch (error) {
      console.error('TechPrep session fetch error:', error);
      
return res.status(500).json({ error: 'Internal server error' });
    }

  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    
return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}

import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    
return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'Missing userId parameter' });
    }

    // Get all domain progress for user
    const { data: progress, error: progressError } = await supabase
      .from('user_technical_progress')
      .select('*')
      .eq('user_id', userId);

    if (progressError) {
      console.error('Progress fetch error:', progressError);
      
return res.status(500).json({ error: 'Failed to fetch progress' });
    }

    // Calculate overall stats
    const totalSessions = progress?.reduce((acc, p) => acc + (p.total_sessions || 0), 0) || 0;
    const domainScores: Record<string, number> = {};
    const allWeakTopics: string[] = [];
    const allStrongTopics: string[] = [];

    progress?.forEach(p => {
      domainScores[p.domain] = p.average_score || 0;
      if (p.weak_topics) {allWeakTopics.push(...p.weak_topics);}
      if (p.strong_topics) {allStrongTopics.push(...p.strong_topics);}
    });

    // Calculate overall technical readiness
    const domainCount = Object.keys(domainScores).length;
    const technicalReadiness = domainCount > 0 
      ? Math.round(Object.values(domainScores).reduce((a, b) => a + b, 0) / domainCount)
      : 0;

    // Get recent sessions for trend analysis
    const { data: recentSessions } = await supabase
      .from('techprep_sessions')
      .select('score, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(10);

    // Calculate improvement rate (comparing recent vs older scores)
    let improvementRate = 0;
    if (recentSessions && recentSessions.length >= 4) {
      const recentAvg = recentSessions.slice(0, 5).reduce((a, s) => a + s.score, 0) / 5;
      const olderAvg = recentSessions.slice(5).reduce((a, s) => a + s.score, 0) / Math.max(1, recentSessions.length - 5);
      improvementRate = Math.round(((recentAvg - olderAvg) / Math.max(1, olderAvg)) * 100);
    }

    // Response data for Time Machine integration
    const timeMachineData = {
      technicalReadiness,
      domainScores,
      weakAreas: Array.from(new Set(allWeakTopics)),
      strongAreas: Array.from(new Set(allStrongTopics)),
      sessionsCompleted: totalSessions,
      improvementRate,
      lastUpdated: progress?.[0]?.updated_at || null
    };

    // Detailed progress per domain
    const domainProgress = progress?.map(p => ({
      domain: p.domain,
      totalSessions: p.total_sessions,
      averageScore: p.average_score,
      lastSessionAt: p.last_session_at,
      weakTopics: p.weak_topics || [],
      strongTopics: p.strong_topics || []
    })) || [];

    return res.status(200).json({
      success: true,
      timeMachineData,
      domainProgress,
      summary: {
        totalSessions,
        domainsAttempted: domainCount,
        overallReadiness: technicalReadiness,
        topDomain: Object.entries(domainScores).sort((a, b) => b[1] - a[1])[0]?.[0] || null,
        weakestDomain: Object.entries(domainScores).sort((a, b) => a[1] - b[1])[0]?.[0] || null
      }
    });

  } catch (error) {
    console.error('TechPrep progress fetch error:', error);
    
return res.status(500).json({ error: 'Internal server error' });
  }
}

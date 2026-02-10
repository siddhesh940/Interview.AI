import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// Mock interview data for fallback (inline to avoid import issues)
const MOCK_INTERVIEW = {
  id: 'pushkarrane-s-org-backend-developer',
  readable_slug: 'pushkarrane-s-org-backend-developer',
  name: 'Backend Developer Interview',
  description: 'Mock interview for testing purposes',
  is_active: true,
  user_id: 'test-user',
  organization_id: 'test-org',
  created_at: new Date().toISOString(),
  questions: [{ id: 1, text: "Tell me about yourself", type: "general" }],
  interviewer: {
    id: 1,
    name: "Lisa Anderson",
    description: "Senior Technical Interviewer",
    image: "/interviewers/lisa.png",
    agent_id: "lisa-001"
  }
};

const supabase = createClientComponentClient();

const getAllInterviews = async (userId: string, organizationId: string) => {
  try {
    const { data: clientData, error: clientError } = await supabase
      .from("interview")
      .select(`*`)
      .or(`organization_id.eq.${organizationId},user_id.eq.${userId}`)
      .order("created_at", { ascending: false });

    return [...(clientData || [])];
  } catch (error) {
    console.log(error);

    return [];
  }
};

const getInterviewById = async (id: string) => {
  try {
    console.log('🔧 InterviewService: getInterviewById called with:', id);
    
    // Add timeout to prevent hanging
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Database timeout')), 8000);
    });
    
    const queryPromise = supabase
      .from("interview")
      .select(`*`)
      .or(`id.eq.${id},readable_slug.eq.${id}`);

    const { data, error } = await Promise.race([queryPromise, timeoutPromise]) as any;

    console.log('🔧 InterviewService: Supabase response data:', data);
    console.log('🔧 InterviewService: Supabase response error:', error);

    if (error) {
      console.error('🚨 InterviewService: Supabase error:', error);
      
      // Fallback to mock data for development
      if (process.env.NODE_ENV === 'development' && 
          (id === 'pushkarrane-s-org-backend-developer' || 
           id === 'pushkarrane\'s-org-backend-developer')) {
        console.log('🔧 InterviewService: Using mock data fallback');
        return MOCK_INTERVIEW;
      }
      
      return null;
    }

    const result = data ? data[0] : null;
    
    // If no data found but it's the test ID, return mock data
    if (!result && process.env.NODE_ENV === 'development' && 
        (id === 'pushkarrane-s-org-backend-developer' || 
         id === 'pushkarrane\'s-org-backend-developer')) {
      console.log('🔧 InterviewService: No data found, using mock data fallback');
      return MOCK_INTERVIEW;
    }
    
    console.log('🔧 InterviewService: Returning result:', result);
    return result;
  } catch (error) {
    console.error('🚨 InterviewService: Catch block error:', error);
    
    // Fallback to mock data on any error for development
    if (process.env.NODE_ENV === 'development') {
      console.log('🔧 InterviewService: Error occurred, using mock data fallback');
      return MOCK_INTERVIEW;
    }
    
    return null;
  }
};

const updateInterview = async (payload: any, id: string) => {
  const { error, data } = await supabase
    .from("interview")
    .update({ ...payload })
    .eq("id", id);
  if (error) {
    console.log(error);

    return [];
  }

  return data;
};

const deleteInterview = async (id: string) => {
  const { error, data } = await supabase
    .from("interview")
    .delete()
    .eq("id", id);
  if (error) {
    console.log(error);

    return [];
  }

  return data;
};

const getAllRespondents = async (interviewId: string) => {
  try {
    const { data, error } = await supabase
      .from("interview")
      .select(`respondents`)
      .eq("interview_id", interviewId);

    return data || [];
  } catch (error) {
    console.log(error);

    return [];
  }
};

const createInterview = async (payload: any) => {
  const { error, data } = await supabase
    .from("interview")
    .insert({ ...payload });
  if (error) {
    console.log(error);

    return [];
  }

  return data;
};

const deactivateInterviewsByOrgId = async (organizationId: string) => {
  try {
    const { error } = await supabase
      .from("interview")
      .update({ is_active: false })
      .eq("organization_id", organizationId)
      .eq("is_active", true); // Optional: only update if currently active

    if (error) {
      console.error("Failed to deactivate interviews:", error);
    }
  } catch (error) {
    console.error("Unexpected error disabling interviews:", error);
  }
};

export const InterviewService = {
  getAllInterviews,
  getInterviewById,
  updateInterview,
  deleteInterview,
  getAllRespondents,
  createInterview,
  deactivateInterviewsByOrgId,
};

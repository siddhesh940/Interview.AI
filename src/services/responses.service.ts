import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

const createResponse = async (payload: any) => {
  const { error, data } = await supabase
    .from("response")
    .insert({ ...payload })
    .select("id");

  if (error) {
    console.log(error);
    return [];
  }

  // Update response_count in interview table
  if (data[0]?.id && payload.interview_id) {
    try {
      const { count } = await supabase
        .from("response")
        .select("*", { count: 'exact', head: true })
        .eq("interview_id", payload.interview_id)
        .eq("is_ended", true);
      
      await supabase
        .from("interview")
        .update({ response_count: count || 0 })
        .eq("id", payload.interview_id);
    } catch (updateError) {
      console.log("Error updating response count:", updateError);
    }
  }

  return data[0]?.id;
};

const saveResponse = async (payload: any, call_id: string) => {
  const { error, data } = await supabase
    .from("response")
    .update({ ...payload })
    .eq("call_id", call_id);
  if (error) {
    console.log(error);
    return [];
  }

  // If response is being marked as ended, update response_count in interview table
  if (payload.is_ended) {
    try {
      // Get interview_id from the response
      const { data: responseData } = await supabase
        .from("response")
        .select("interview_id")
        .eq("call_id", call_id)
        .single();
      
      if (responseData?.interview_id) {
        const { count } = await supabase
          .from("response")
          .select("*", { count: 'exact', head: true })
          .eq("interview_id", responseData.interview_id)
          .eq("is_ended", true);
        
        await supabase
          .from("interview")
          .update({ response_count: count || 0 })
          .eq("id", responseData.interview_id);
      }
    } catch (updateError) {
      console.log("Error updating response count:", updateError);
    }
  }

  return data;
};

const getAllResponses = async (interviewId: string) => {
  try {
    const { data, error } = await supabase
      .from("response")
      .select(`*`)
      .eq("interview_id", interviewId)
      .or(`details.is.null, details->call_analysis.not.is.null`)
      .eq("is_ended", true)
      .order("created_at", { ascending: false });

    return data || [];
  } catch (error) {
    console.log(error);

    return [];
  }
};

const getResponseCountByOrganizationId = async (
  organizationId: string,
): Promise<number> => {
  try {
    // Get all interviews for this organization
    const { data: interviews, error: interviewError } = await supabase
      .from("interview")
      .select("id")
      .eq("organization_id", organizationId);

    if (interviewError || !interviews) {
      console.log("Error fetching interviews:", interviewError);
      return 0;
    }

    // Count all ended responses for these interviews
    const { count, error } = await supabase
      .from("response")
      .select("*", { count: "exact", head: true })
      .in("interview_id", interviews.map(interview => interview.id))
      .eq("is_ended", true);

    return count ?? 0;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

const getAllEmailAddressesForInterview = async (interviewId: string) => {
  try {
    const { data, error } = await supabase
      .from("response")
      .select(`email`)
      .eq("interview_id", interviewId);

    return data || [];
  } catch (error) {
    console.log(error);

    return [];
  }
};

const getResponseByCallId = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("response")
      .select(`*`)
      .filter("call_id", "eq", id);

    return data ? data[0] : null;
  } catch (error) {
    console.log(error);

    return [];
  }
};

const deleteResponse = async (id: string) => {
  // Get interview_id before deleting
  const { data: responseData } = await supabase
    .from("response")
    .select("interview_id")
    .eq("call_id", id)
    .single();

  const { error, data } = await supabase
    .from("response")
    .delete()
    .eq("call_id", id);
  if (error) {
    console.log(error);
    return [];
  }

  // Update response_count in interview table after deletion
  if (responseData?.interview_id) {
    try {
      const { count } = await supabase
        .from("response")
        .select("*", { count: 'exact', head: true })
        .eq("interview_id", responseData.interview_id)
        .eq("is_ended", true);
      
      await supabase
        .from("interview")
        .update({ response_count: count || 0 })
        .eq("id", responseData.interview_id);
    } catch (updateError) {
      console.log("Error updating response count after deletion:", updateError);
    }
  }

  return data;
};

const updateResponse = async (payload: any, call_id: string) => {
  const { error, data } = await supabase
    .from("response")
    .update({ ...payload })
    .eq("call_id", call_id);
  if (error) {
    console.log(error);

    return [];
  }

  return data;
};

const syncResponseCount = async (interviewId: string) => {
  try {
    const { count } = await supabase
      .from("response")
      .select("*", { count: 'exact', head: true })
      .eq("interview_id", interviewId)
      .eq("is_ended", true);
    
    await supabase
      .from("interview")
      .update({ response_count: count || 0 })
      .eq("id", interviewId);
    
    return count || 0;
  } catch (error) {
    console.log("Error syncing response count:", error);
    return 0;
  }
};

export const ResponseService = {
  createResponse,
  saveResponse,
  updateResponse,
  getAllResponses,
  getResponseByCallId,
  deleteResponse,
  getResponseCountByOrganizationId,
  getAllEmails: getAllEmailAddressesForInterview,
  syncResponseCount,
};

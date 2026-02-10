"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

export default function TestSupabase() {
  const [testResult, setTestResult] = useState("Testing...");
  const supabase = createClientComponentClient();

  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log('🔬 Testing Supabase connection...');
        
        // Test 1: Simple query
        const { data, error } = await supabase
          .from("interview")
          .select("count")
          .limit(1);

        if (error) {
          console.error('🚨 Supabase connection error:', error);
          setTestResult(`Connection Error: ${error.message}`);
          
return;
        }

        console.log('✅ Supabase connection successful:', data);
        setTestResult(`Connection Successful! Found data: ${JSON.stringify(data)}`);

        // Test 2: Test with specific ID
        const testId = 'pushkarrane-s-org-backend-developer';
        const { data: testData, error: testError } = await supabase
          .from("interview")
          .select(`*`)
          .or(`id.eq.${testId},readable_slug.eq.${testId}`);

        console.log('🔍 Test query for ID:', testId);
        console.log('🔍 Test result:', testData);
        console.log('🔍 Test error:', testError);

      } catch (err) {
        console.error('🚨 Test catch error:', err);
        setTestResult(`Catch Error: ${err}`);
      }
    };

    testConnection();
  }, [supabase]);

  return (
    <div className="p-4">
      <h1>Supabase Connection Test</h1>
      <p>{testResult}</p>
    </div>
  );
}

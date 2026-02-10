"use client";

import Call from "@/components/call";
import LoaderWithText from "@/components/loaders/loader-with-text/loaderWithText";
import { useInterviews } from "@/contexts/interviews.context";
import { Interview } from "@/types/interview";
import { ArrowUpRightSquareIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  params: {
    interviewId: string;
  };
};

type PopupProps = {
  title: string;
  description: string;
  image: string;
};

function PopupLoader({ retryCount = 0 }: { retryCount?: number }) {
  return (
    <div className="bg-white rounded-md absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 md:w-[80%] w-[90%]">
      <div className="h-[88vh] justify-center items-center rounded-lg border-2 border-b-4 border-r-4 border-black font-bold transition-all md:block dark:border-white">
        <div className="relative flex flex-col items-center justify-center h-full">
          <LoaderWithText />
          {retryCount > 0 && (
            <div className="mt-4 text-sm text-gray-600">
              Retrying... ({retryCount}/3)
            </div>
          )}
        </div>
      </div>
      <a
        className="flex flex-row justify-center align-middle mt-3"
        href="https://folo-up.co/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="text-center text-md font-semibold mr-2">
          Powered by{" "}
          <span className="font-bold">
            Interview<span className="text-indigo-600">.ai</span>
          </span>
        </div>
        <ArrowUpRightSquareIcon className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-indigo-500" />
      </a>
    </div>
  );
}

function PopUpMessage({ title, description, image, showRefresh = false, onRefresh }: PopupProps & { showRefresh?: boolean; onRefresh?: () => void }) {
  return (
    <div className="bg-white rounded-md absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 md:w-[80%] w-[90%]">
      <div className="h-[88vh] content-center rounded-lg border-2 border-b-4 border-r-4 border-black font-bold transition-all  md:block dark:border-white ">
        <div className="flex flex-col items-center justify-center my-auto">
          <Image
            src={image}
            alt="Graphic"
            width={200}
            height={200}
            className="mb-4"
          />
          <h1 className="text-md font-medium mb-2">{title}</h1>
          <p className="text-center px-4">{description}</p>
          {showRefresh && onRefresh && (
            <button
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              onClick={onRefresh}
            >
              Try Again
            </button>
          )}
        </div>
      </div>
      <a
        className="flex flex-row justify-center align-middle mt-3"
        href="https://folo-up.co/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="text-center text-md font-semibold mr-2">
          Powered by{" "}
          <span className="font-bold">
            Interview<span className="text-indigo-600">.ai</span>
          </span>
        </div>
        <ArrowUpRightSquareIcon className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-indigo-500" />
      </a>
    </div>
  );
}

function InterviewInterface({ params }: Props) {
  const [interview, setInterview] = useState<Interview>();
  const [isActive, setIsActive] = useState(true);
  const { getInterviewById } = useInterviews();
  const [interviewNotFound, setInterviewNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [timeoutReached, setTimeoutReached] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeoutReached(false);
    setInterviewNotFound(false);
    setRetryCount(0);
    setErrorMessage("");
    setInterview(undefined);
    fetchinterview(1);
  };
  useEffect(() => {
    if (interview) {
      setIsActive(interview?.is_active === true);
    }
  }, [interview, params.interviewId]);

  const fetchinterview = async (attempt = 1) => {
    try {
      console.log(`🚀 Starting fetch interview process... (Attempt ${attempt})`);
      setIsLoading(true);
      setErrorMessage("");
      
      // Decode the URL parameter to handle special characters
      const decodedInterviewId = decodeURIComponent(params.interviewId);
      console.log('📋 Fetching interview with decoded ID:', decodedInterviewId);
      console.log('📋 Original params.interviewId:', params.interviewId);
      
      const response = await getInterviewById(decodedInterviewId);
      console.log('📥 Response from getInterviewById:', response);
      
      if (response) {
        console.log('✅ Interview found, setting interview data...');
        setInterview(response);
        document.title = response.name;
        setRetryCount(0);
      } else {
        console.log('❌ Interview not found for ID:', decodedInterviewId);
        if (attempt < 3) {
          console.log(`🔄 Retrying... (${attempt + 1}/3)`);
          setRetryCount(attempt);
          setTimeout(() => fetchinterview(attempt + 1), 2000);

          return;
        }
        setInterviewNotFound(true);
      }
    } catch (error) {
      console.error('🚨 Error fetching interview:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error');
      
      if (attempt < 3) {
        console.log(`🔄 Retrying due to error... (${attempt + 1}/3)`);
        setRetryCount(attempt);
        setTimeout(() => fetchinterview(attempt + 1), 2000);

        return;
      }
      
      setInterviewNotFound(true);
    } finally {
      if (attempt >= 3 || retryCount === 0) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    // Set a timeout to show error if loading takes too long
    const timeout = setTimeout(() => {
      if (isLoading && !interview && !interviewNotFound) {
        console.log('⏰ Timeout reached, showing error message');
        setTimeoutReached(true);
        setIsLoading(false);
      }
    }, 15000); // 15 seconds timeout

    console.log('🔄 useEffect triggered for interview fetch...');
    fetchinterview();
    
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {/* Debug info - remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-0 right-0 bg-black text-white p-2 text-xs z-50">
          <div>Interview ID: {params.interviewId}</div>
          <div>Decoded ID: {decodeURIComponent(params.interviewId)}</div>
          <div>Is Loading: {isLoading.toString()}</div>
          <div>Interview Found: {!!interview ? 'Yes' : 'No'}</div>
          <div>Interview Not Found: {interviewNotFound.toString()}</div>
          <div>Timeout Reached: {timeoutReached.toString()}</div>
          <div>Is Active: {isActive.toString()}</div>
          <div>Retry Count: {retryCount}</div>
          <div>Error: {errorMessage || 'None'}</div>
          {interview && <div>Interview Name: {interview.name}</div>}
        </div>
      )}
      <div className="hidden md:block p-8 mx-auto form-container">
        {isLoading ? (
          <PopupLoader retryCount={retryCount} />
        ) : timeoutReached ? (
          <PopUpMessage
            title="Connection Timeout"
            description="Unable to load the interview. Please check your internet connection and try refreshing the page."
            image="/images/error.png"
            showRefresh={true}
            onRefresh={handleRefresh}
          />
        ) : !interview ? (
          interviewNotFound ? (
            <PopUpMessage
              title="Invalid URL"
              description="The interview link you're trying to access is invalid. Please check the URL and try again."
              image="/invalid-url.png"
            />
          ) : (
            <PopUpMessage
              title="Interview Not Available"
              description="This interview could not be found. It may have been deleted or the link has expired."
              image="/error.png"
            />
          )
        ) : !isActive ? (
          <PopUpMessage
            title="Interview Is Unavailable"
            description="We are not currently accepting responses. Please contact the sender for more information."
            image="/closed.png"
          />
        ) : (
          <Call interview={interview} />
        )}
      </div>
      <div className=" md:hidden flex flex-col items-center md:h-[0px] justify-center  my-auto">
        <div className="mt-48 px-3">
          <p className="text-center my-5 text-md font-semibold">
            {interview?.name}
          </p>
          <p className="text-center text-gray-600 my-5">
            Please use a PC to respond to the interview. Apologies for any
            inconvenience caused.{" "}
          </p>
        </div>
        <div className="text-center text-md font-semibold mr-2 my-5">
          Powered by{" "}
          <a
            className="font-bold underline"
            href="www.folo-up.co"
            target="_blank"
          >
            Interview<span className="text-indigo-600">.ai</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default InterviewInterface;

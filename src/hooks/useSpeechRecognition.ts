"use client";

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Custom hook for browser-based speech recognition using Web Speech API
 * 
 * Features:
 * - Real-time speech-to-text conversion
 * - Browser-only (no backend/API costs)
 * - Continuous recognition mode
 * - Error handling for permissions and unsupported browsers
 * 
 * @param onTranscript - Callback function that receives the transcribed text
 * @returns Object with controls and state for speech recognition
 */

interface UseSpeechRecognitionOptions {
  /** Called with the full transcript text (interim + final) */
  onTranscript?: (text: string) => void;
  /** Called when final result is ready */
  onFinalResult?: (text: string) => void;
  /** Language for recognition (default: 'en-US') */
  language?: string;
  /** Whether to show interim results (default: true) */
  interimResults?: boolean;
  /** Whether to use continuous mode (default: true) */
  continuous?: boolean;
}

interface UseSpeechRecognitionReturn {
  /** Whether speech recognition is currently active */
  isListening: boolean;
  /** Current transcript text */
  transcript: string;
  /** Any error that occurred */
  error: string | null;
  /** Whether browser supports speech recognition */
  isSupported: boolean;
  /** Start listening for speech */
  startListening: () => void;
  /** Stop listening for speech */
  stopListening: () => void;
  /** Reset the transcript */
  resetTranscript: () => void;
}

// Define SpeechRecognition types for TypeScript
interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

// Extend Window interface
declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: ((this: SpeechRecognition, ev: Event) => void) | null;
  onend: ((this: SpeechRecognition, ev: Event) => void) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => void) | null;
}

export function useSpeechRecognition(
  options: UseSpeechRecognitionOptions = {}
): UseSpeechRecognitionReturn {
  const {
    onTranscript,
    onFinalResult,
    language = 'en-US',
    interimResults = true,
    continuous = true,
  } = options;

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const finalTranscriptRef = useRef('');

  // Check browser support on mount
  useEffect(() => {
    const SpeechRecognitionAPI = 
      typeof window !== 'undefined' 
        ? window.SpeechRecognition || window.webkitSpeechRecognition 
        : null;
    
    setIsSupported(!!SpeechRecognitionAPI);

    if (SpeechRecognitionAPI) {
      recognitionRef.current = new SpeechRecognitionAPI();
      recognitionRef.current.continuous = continuous;
      recognitionRef.current.interimResults = interimResults;
      recognitionRef.current.lang = language;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [continuous, interimResults, language]);

  // Start listening
  const startListening = useCallback(() => {
    setError(null);

    if (!recognitionRef.current) {
      setError('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
      
return;
    }

    // Reset final transcript when starting new session
    finalTranscriptRef.current = '';

    const recognition = recognitionRef.current;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = '';
      
      // Process all results
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcriptText = result[0].transcript;
        
        if (result.isFinal) {
          // Add to final transcript with a space
          finalTranscriptRef.current += transcriptText + ' ';
          onFinalResult?.(finalTranscriptRef.current.trim());
        } else {
          interimTranscript += transcriptText;
        }
      }

      // Combine final + interim for display
      const fullTranscript = (finalTranscriptRef.current + interimTranscript).trim();
      setTranscript(fullTranscript);
      onTranscript?.(fullTranscript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setIsListening(false);
      
      switch (event.error) {
        case 'not-allowed':
        case 'permission-denied':
          setError('Microphone permission denied. Please allow microphone access and try again.');
          break;
        case 'no-speech':
          setError('No speech detected. Please try again.');
          break;
        case 'audio-capture':
          setError('No microphone found. Please connect a microphone and try again.');
          break;
        case 'network':
          setError('Network error occurred. Please check your connection.');
          break;
        case 'aborted':
          // User stopped - not an error
          break;
        default:
          setError(`Speech recognition error: ${event.error}`);
      }
    };

    try {
      recognition.start();
    } catch (err) {
      // Recognition might already be running
      console.warn('Speech recognition start error:', err);
    }
  }, [onTranscript, onFinalResult]);

  // Stop listening
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  }, []);

  // Reset transcript
  const resetTranscript = useCallback(() => {
    setTranscript('');
    finalTranscriptRef.current = '';
  }, []);

  return {
    isListening,
    transcript,
    error,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
  };
}

export default useSpeechRecognition;

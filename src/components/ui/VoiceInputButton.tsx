"use client";

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { AlertCircle, Mic, MicOff, Square } from 'lucide-react';
import { useCallback, useRef } from 'react';

/**
 * VoiceInputButton Component
 * 
 * A reusable voice input button that integrates with text inputs/textareas.
 * Uses the browser's Web Speech API for free, client-side speech recognition.
 * 
 * Features:
 * - 🎤 Start/Stop voice recording
 * - Real-time transcription into the target input
 * - Seamlessly works alongside manual typing
 * - Graceful error handling for permissions and unsupported browsers
 * 
 * @example
 * ```tsx
 * const [text, setText] = useState('');
 * 
 * <Textarea value={text} onChange={(e) => setText(e.target.value)} />
 * <VoiceInputButton 
 *   onTranscript={(transcript) => setText(prev => prev + transcript)}
 *   currentValue={text}
 *   onValueChange={setText}
 * />
 * ```
 */

interface VoiceInputButtonProps {
  /** Current value of the input field */
  currentValue: string;
  /** Callback to update the input field value */
  onValueChange: (value: string) => void;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Optional className for the button container */
  className?: string;
  /** Size variant of the button */
  size?: 'sm' | 'default' | 'lg' | 'icon';
  /** Optional label for accessibility */
  ariaLabel?: string;
}

export function VoiceInputButton({
  currentValue,
  onValueChange,
  disabled = false,
  className = '',
  size = 'sm',
  ariaLabel = 'Voice input',
}: VoiceInputButtonProps) {
  // Track the base text when recording started
  const baseTextRef = useRef('');

  // Handle transcript updates - append to base text
  const handleTranscript = useCallback(
    (transcript: string) => {
      // Combine base text with new speech transcript
      const baseText = baseTextRef.current;
      const newValue = baseText ? `${baseText} ${transcript}` : transcript;
      onValueChange(newValue);
    },
    [onValueChange]
  );

  const {
    isListening,
    error,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition({
    onTranscript: handleTranscript,
    continuous: true,
    interimResults: true,
  });

  // When starting to listen, store the current text as base
  const handleStartListening = useCallback(() => {
    // Store the current value as base for the transcript
    baseTextRef.current = currentValue.trim();
    resetTranscript();
    startListening();
  }, [currentValue, resetTranscript, startListening]);

  // When stopping, clear the base text ref
  const handleStopListening = useCallback(() => {
    stopListening();
    baseTextRef.current = '';
  }, [stopListening]);

  // If browser doesn't support speech recognition
  if (!isSupported) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size={size}
              className={`text-gray-500 cursor-not-allowed ${className}`}
              aria-label="Voice input not supported"
              disabled
            >
              <MicOff className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Voice input is not supported in your browser.</p>
            <p className="text-xs text-gray-400">Please use Chrome, Edge, or Safari.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {/* Error indicator */}
      {error && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-red-400 flex items-center">
                <AlertCircle className="w-4 h-4" />
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-[250px] bg-red-900/90 border-red-700">
              <p className="text-sm text-red-200">{error}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {/* Main voice button */}
      {!isListening ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size={size}
                disabled={disabled}
                className={`
                  text-gray-400 hover:text-blue-400 hover:bg-blue-500/10
                  transition-all duration-200
                  ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                aria-label={`${ariaLabel} - Click to start speaking`}
                onClick={handleStartListening}
              >
                <Mic className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>🎤 Click to speak</p>
              <p className="text-xs text-gray-400">Your speech will be converted to text</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size={size}
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10 animate-pulse"
                aria-label="Stop recording"
                onClick={handleStopListening}
              >
                <Square className="w-4 h-4 fill-current" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>⏹ Click to stop</p>
              <p className="text-xs text-gray-400">Recording in progress...</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {/* Recording indicator */}
      {isListening && (
        <span className="flex items-center gap-1.5 text-xs text-red-400 animate-pulse">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          Recording...
        </span>
      )}
    </div>
  );
}

/**
 * Simplified inline voice button for compact layouts
 */
export function VoiceInputButtonInline({
  currentValue,
  onValueChange,
  disabled = false,
}: VoiceInputButtonProps) {
  return (
    <VoiceInputButton
      currentValue={currentValue}
      disabled={disabled}
      size="icon"
      className="absolute right-2 top-2"
      onValueChange={onValueChange}
    />
  );
}

export default VoiceInputButton;

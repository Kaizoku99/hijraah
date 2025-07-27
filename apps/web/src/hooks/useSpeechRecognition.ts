"use client";

import { useState, useEffect, useRef, useCallback } from "react";

import { Locale, defaultLocale } from "@/i18n/i18n";

// --- Interfaces for Speech Recognition API results --- START
interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: SpeechRecognitionAlternative;
  length: number;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}
// --- Interfaces for Speech Recognition API results --- END

// Define the expected type for the SpeechRecognition constructor
interface SpeechRecognitionStatic {
  new (): SpeechRecognition;
}

// Define the expected type for a SpeechRecognition instance
interface SpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: any) => void) | null;
  onerror: ((event: any) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

interface UseSpeechRecognitionOptions {
  onResult: (transcript: string) => void;
  onError?: (error: any) => void;
  onEnd?: () => void;
  locale?: string; // Accept locale to determine recognition language
}

// Map locale to SpeechRecognition language code
const getLanguageCodeForLocale = (locale: string = defaultLocale): string => {
  const localeMap: Record<string, string> = {
    en: "en-US",
    ar: "ar-SA",
    es: "es-ES",
    fr: "fr-FR",
    // Add more mappings as needed
  };

  return localeMap[locale] || "en-US"; // Default to en-US if no mapping found
};

export const useSpeechRecognition = ({
  onResult,
  onError,
  onEnd,
  locale = defaultLocale,
}: UseSpeechRecognitionOptions) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Get the proper language code for the current locale
  const langCode = getLanguageCodeForLocale(locale);

  useEffect(() => {
    // Check for vendor-prefixed and standard API
    const SpeechRecognitionAPI =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (typeof SpeechRecognitionAPI !== "undefined") {
      setIsAvailable(true);
      try {
        // Explicitly cast to the constructor type
        recognitionRef.current =
          new (SpeechRecognitionAPI as SpeechRecognitionStatic)();
      } catch (error) {
        console.error("Failed to initialize SpeechRecognition:", error);
        setIsAvailable(false);
        return;
      }

      // Configure the instance
      if (recognitionRef.current) {
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = langCode;

        recognitionRef.current.onresult = (event: any) => {
          let finalTranscript = "";
          let interimTranscript = "";
          const results = (event as SpeechRecognitionEvent).results;

          for (
            let i = (event as SpeechRecognitionEvent).resultIndex;
            i < results.length;
            ++i
          ) {
            if (results[i].isFinal) {
              finalTranscript += results[i][0].transcript + " ";
            } else {
              interimTranscript += results[i][0].transcript;
            }
          }
          const transcript = finalTranscript.trim() || interimTranscript.trim();
          if (transcript) {
            onResult(transcript);
          }
        };

        recognitionRef.current.onerror = (event: any) => {
          const error = event.error || "unknown_error";
          console.error("Speech recognition error:", error);
          if (onError) {
            onError(error);
          }
          // Wrap stopRecording in useCallback if it depends on state/props
          // that might change, though here it likely doesn't need it.
          const stop = () => {
            if (recognitionRef.current && isRecording) {
              try {
                recognitionRef.current.stop();
              } catch (e) {
                console.error("Stop error", e);
                setIsRecording(false);
              }
            }
          };

          if (error === "no-speech" || error === "network") {
            stop();
          } else if (
            error === "not-allowed" ||
            error === "service-not-allowed"
          ) {
            setIsAvailable(false);
            stop();
          }
        };

        recognitionRef.current.onend = () => {
          if (onEnd) {
            onEnd();
          }
          setIsRecording(false);
        };
      }
    } else {
      console.warn("Speech Recognition API not available in this browser.");
      setIsAvailable(false);
    }

    // Cleanup function
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onend = null;
        try {
          recognitionRef.current.stop();
        } catch (e) {
          /* Ignore error if already stopped */
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [langCode]); // Include langCode as a dependency to recreate recognition when language changes

  const startRecording = useCallback(() => {
    if (recognitionRef.current && isAvailable && !isRecording) {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (error) {
        console.error("Error starting speech recognition:", error);
        if (onError) onError(error);
        setIsRecording(false);
      }
    } else if (!isAvailable) {
      console.warn("Speech recognition not available or not permitted.");
      if (onError) onError("not-available");
    }
  }, [isRecording, isAvailable, onError]);

  const stopRecording = useCallback(() => {
    if (recognitionRef.current && isRecording) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error("Error stopping speech recognition:", error);
        // Manually update state if stop fails unexpectedly
        setIsRecording(false);
      }
      // Let the onend handler set isRecording = false reliably
    }
  }, [isRecording]);

  return { isRecording, startRecording, stopRecording, isAvailable };
};

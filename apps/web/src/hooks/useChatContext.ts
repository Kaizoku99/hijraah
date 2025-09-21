"use client";

import { useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { useI18n } from "@/i18n/hooks";
import { recommendModel } from "@/lib/ai/model-provider";
import { ChatModelType } from "@/core/chat/entities/chat";

export type ChatContext = 
  | "general"
  | "visa" 
  | "documents"
  | "eligibility"
  | "timeline"
  | "legal"
  | "family"
  | "work"
  | "study"
  | "business";

export interface ChatContextInfo {
  context: ChatContext;
  placeholder: string;
  suggestedModel: string;
  systemPrompt: string;
}

/**
 * Context7 - Smart chat context detection and management
 * Provides contextual placeholders, model suggestions, and system prompts
 * based on current page, user behavior, and conversation flow
 */
export function useChatContext(initialContext?: ChatContext): ChatContextInfo {
  const { t } = useI18n();
  const pathname = usePathname();
  const [context, setContext] = useState<ChatContext>(initialContext || "general");

  // Context7 - Advanced context detection based on URL patterns
  useEffect(() => {
    if (initialContext) return; // Don't override if explicitly set

    const contextFromPath = detectContextFromPath(pathname);
    if (contextFromPath !== context) {
      setContext(contextFromPath);
    }
  }, [pathname, context, initialContext]);

  // Context7 - Intelligent model recommendations based on context
  const contextInfo = useMemo((): ChatContextInfo => {
    // Modern model recommendation mapping
    const getContextModel = (contextType: ChatContext): string => {
      const modelMap: Record<ChatContext, string> = {
        general: "gateway:chat-balanced",
        visa: "gateway:reasoning-claude",
        documents: "gateway:reasoning-large", 
        eligibility: "gateway:reasoning-claude",
        timeline: "gateway:reasoning-large",
        legal: "gateway:reasoning-claude",
        family: "gateway:chat-balanced",
        work: "gateway:reasoning-large",
        study: "gateway:chat-balanced",
        business: "gateway:reasoning-claude"
      };
      return modelMap[contextType] || "gateway:chat-balanced";
    };

    const contextConfigs: Record<ChatContext, Omit<ChatContextInfo, 'context'>> = {
      general: {
        placeholder: t("chat.input.contextualPlaceholders.general") || "How can I help you with your immigration journey today?",
        suggestedModel: getContextModel("general"),
        systemPrompt: "You are Hijraah AI, an expert immigration assistant. Provide accurate, helpful guidance on immigration matters. Always ask clarifying questions to better understand the user's specific situation and needs."
      },
      visa: {
        placeholder: t("chat.input.contextualPlaceholders.visa") || "Ask me about visa requirements, processing times, or application steps...",
        suggestedModel: getContextModel("visa"),
        systemPrompt: "You are a visa specialist AI assistant. Focus on visa requirements, application procedures, processing times, and documentation. Provide step-by-step guidance and country-specific information."
      },
      documents: {
        placeholder: t("chat.input.contextualPlaceholders.documents") || "Need help with document requirements or verification?",
        suggestedModel: getContextModel("documents"),
        systemPrompt: "You are a document verification specialist. Help users understand document requirements, formats, translations, and verification processes for immigration applications."
      },
      eligibility: {
        placeholder: t("chat.input.contextualPlaceholders.eligibility") || "Let me help you check your eligibility for immigration programs...",
        suggestedModel: getContextModel("eligibility"),
        systemPrompt: "You are an immigration eligibility expert. Analyze user situations to determine eligibility for various immigration programs. Ask relevant questions to assess qualifications accurately."
      },
      timeline: {
        placeholder: t("chat.input.contextualPlaceholders.timeline") || "Want to know about processing times or create a timeline?",
        suggestedModel: getContextModel("timeline"),
        systemPrompt: "You are a timeline planning specialist. Help users understand processing times, create realistic timelines, and plan their immigration journey step by step."
      },
      legal: {
        placeholder: t("chat.input.contextualPlaceholders.legal") || "Have questions about immigration law or policy changes?",
        suggestedModel: getContextModel("legal"),
        systemPrompt: "You are an immigration law expert. Provide accurate legal information, explain policy changes, and help users understand their rights and obligations. Always recommend consulting with licensed professionals for legal advice."
      },
      family: {
        placeholder: t("chat.input.contextualPlaceholders.family") || "Ask about family sponsorship or reunification...",
        suggestedModel: getContextModel("family"),
        systemPrompt: "You are a family immigration specialist. Help with family sponsorship, reunification processes, and relationship documentation requirements."
      },
      work: {
        placeholder: t("chat.input.contextualPlaceholders.work") || "Need information about work permits or employment visas?",
        suggestedModel: getContextModel("work"),
        systemPrompt: "You are a work immigration expert. Assist with work permits, employment visas, labor market requirements, and employer obligations."
      },
      study: {
        placeholder: t("chat.input.contextualPlaceholders.study") || "Questions about student visas or study permits?",
        suggestedModel: getContextModel("study"),
        systemPrompt: "You are a student immigration advisor. Help with study permits, educational requirements, and transitioning from student to work or permanent status."
      },
      business: {
        placeholder: t("chat.input.contextualPlaceholders.business") || "Interested in business or investment immigration?",
        suggestedModel: getContextModel("business"),
        systemPrompt: "You are a business immigration consultant. Assist with investment visas, entrepreneur programs, and business establishment requirements."
      }
    };

    return {
      context,
      ...contextConfigs[context]
    };
  }, [context, t]);

  return contextInfo;
}

/**
 * Context7 - Smart context detection from URL patterns
 */
function detectContextFromPath(pathname: string): ChatContext {
  const pathSegments = pathname.toLowerCase().split('/').filter(Boolean);
  
  // Context mapping based on URL patterns
  const contextMap: Record<string, ChatContext> = {
    'visa': 'visa',
    'visas': 'visa',
    'documents': 'documents',
    'document': 'documents',
    'eligibility': 'eligibility',
    'eligible': 'eligibility',
    'timeline': 'timeline',
    'roadmap': 'timeline',
    'legal': 'legal',
    'law': 'legal',
    'family': 'family',
    'sponsorship': 'family',
    'work': 'work',
    'employment': 'work',
    'job': 'work',
    'study': 'study',
    'education': 'study',
    'student': 'study',
    'business': 'business',
    'investment': 'business',
    'entrepreneur': 'business'
  };

  // Find matching context from URL segments
  for (const segment of pathSegments) {
    if (contextMap[segment]) {
      return contextMap[segment];
    }
  }

  return 'general';
}

/**
 * Context7 - Hook for updating context dynamically
 */
export function useChatContextUpdater() {
  return {
    updateContext: (newContext: ChatContext) => {
      // This could be enhanced to persist context in localStorage
      // or update global state management
      console.log(`Updating chat context to: ${newContext}`);
    }
  };
}

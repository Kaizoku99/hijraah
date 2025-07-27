import { LucideIcon, BookOpen, FileText, Video, Users, Upload, Calendar, Flag, HelpCircle, ExternalLink, CheckCircle2 } from 'lucide-react';
import React from 'react';

export type OnboardingStepId =
  | 'welcome'
  | 'profile-setup'
  | 'feature-tour'
  | 'first-task'
  | 'resources';
// Add 'completed' explicitly if it needs representation here, otherwise handle it in the provider

export type OnboardingStep = {
  id: string;
  title: string;
  description: string;
  features?: Feature[];
};

export type Feature = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
};

export type TourStop = {
  target: string; // CSS selector for the target element (e.g., '[data-tour="dashboard"]')
  placement: 'top' | 'right' | 'bottom' | 'left';
  title: string;
  content: string;
};

export type OnboardingTask = {
  id: string; // e.g., 'upload', 'consult', 'application'
  title: string;
  description: string;
  cta: string;
  icon: LucideIcon;
  actionKey: string; // API key, e.g., 'first_task_upload'
};

export type ResourceLink = {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
};

export type ResourceCategory = {
  id: string; // e.g., 'guides', 'documents'
  title: string;
  icon: LucideIcon;
  resources: ResourceLink[];
};

export type FormOption = {
  value: string;
  label: string;
};

export type ProfileSetupConfig = {
  countries: FormOption[];
  destinations: FormOption[];
  languages: FormOption[];
  actionKey: string; // API key, e.g., 'profile_setup_completed'
};

export interface OnboardingStepConfig {
  id: OnboardingStepId;
  title: string;
  description: string;
  // Reference the component - using string name for now, handle lazy loading later
  component: string;
  actionKey?: string; // Optional API key for step completion (if different from sub-actions)
  features?: Feature[]; // Existing features property
  tourStops?: TourStop[]; // Specific to feature-tour
  tasks?: OnboardingTask[]; // Specific to first-task
  resourceCategories?: ResourceCategory[]; // Specific to resources
  profileSetupConfig?: ProfileSetupConfig; // Specific to profile-setup
}

// Define specific configurations
const profileSetupDetails: ProfileSetupConfig = {
  actionKey: 'profile_setup_completed',
  countries: [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
    { value: "in", label: "India" },
    { value: "ng", label: "Nigeria" },
    { value: "cn", label: "China" },
    { value: "other", label: "Other" },
  ],
  destinations: [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
    { value: "au", label: "Australia" },
    { value: "nz", label: "New Zealand" },
    { value: "de", label: "Germany" },
    { value: "other", label: "Other" },
  ],
  languages: [
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
    { value: "ar", label: "Arabic" },
    // Add other relevant languages
  ],
};

const featureTourDetails: TourStop[] = [
  {
    target: '[data-tour="dashboard"]', // Example target
    placement: 'bottom',
    title: 'Your Dashboard',
    content: 'Overview of your cases, documents, and progress.',
  },
  {
    target: '[data-tour="profile"]',
    placement: 'right',
    title: 'Profile Settings',
    content: 'Manage your personal information and preferences here.',
  },
  {
    target: '[data-tour="documents"]',
    placement: 'left',
    title: 'Document Management',
    content: 'Upload, organize, and access your important documents securely.',
  },
  {
    target: '[data-tour="cases"]', // Changed from applications
    placement: 'top',
    title: 'Case Tracking',
    content: 'Track the status and progress of your immigration cases.',
  },
  {
    target: '[data-tour="help"]',
    placement: 'bottom',
    title: 'Help & Support',
    content: 'Find guides, FAQs, and contact support if you need help.',
  },
];

const firstTaskDetails: OnboardingTask[] = [
  {
    id: 'upload',
    title: 'Upload Your First Document',
    description: 'Start by uploading an important immigration document to keep it secure and accessible.',
    cta: 'Upload Document',
    icon: Upload,
    actionKey: 'first_task_upload',
  },
  {
    id: 'consult',
    title: 'Schedule a Consultation',
    description: 'Book a session with an immigration expert to discuss your specific situation.',
    cta: 'Book Consultation',
    icon: Calendar,
    actionKey: 'first_task_consult',
  },
  {
    id: 'application',
    title: 'Start an Application/Case', // Adjusted title
    description: 'Begin your first immigration case setup with our guided process.',
    cta: 'Start Case',
    icon: FileText,
    actionKey: 'first_task_application',
  },
];

const resourceDetails: ResourceCategory[] = [
  {
    id: 'guides',
    title: 'Guides',
    icon: BookOpen,
    resources: [
      {
        icon: BookOpen,
        title: 'Getting Started Guide',
        description: 'A comprehensive guide on how to use Hijraah for your immigration journey.',
        link: '/guides/getting-started',
      },
      {
        icon: Flag,
        title: 'Country-Specific Guides',
        description: 'Detailed guides for the most popular immigration destinations.',
        link: '/guides/countries',
      },
      {
        icon: Calendar,
        title: 'Immigration Timeline',
        description: 'Learn about typical immigration process timelines and milestones.',
        link: '/guides/timeline',
      },
      {
        icon: HelpCircle,
        title: 'Frequently Asked Questions',
        description: 'Find answers to common questions about immigration processes.',
        link: '/help/faq',
      },
    ],
  },
  {
    id: 'documents',
    title: 'Documents',
    icon: FileText,
    resources: [
      {
        icon: FileText,
        title: 'Document Checklist Tool', // Made more specific
        description: 'Use our tool to generate a checklist of essential documents for your specific case.',
        link: '/tools/document-checklist', // Assuming a tool exists
      },
      {
        icon: FileText,
        title: 'Sample Templates', // Adjusted title
        description: 'View sample templates for common immigration forms and letters.',
        link: '/documents/templates', // Adjusted link
      },
      {
        icon: FileText,
        title: 'Legal Resources',
        description: 'Links to official government immigration sites and legal aid information.',
        link: '/resources/legal', // Adjusted link
      },
      {
        icon: FileText,
        title: 'Form Filling Guides',
        description: 'Step-by-step guides for filling out common immigration forms accurately.',
        link: '/guides/forms', // Adjusted link
      },
    ],
  },
  {
    id: 'videos',
    title: 'Videos',
    icon: Video,
    resources: [
      {
        icon: Video,
        title: 'Platform Tutorial',
        description: 'Watch a comprehensive video tutorial on using the Hijraah platform features.',
        link: '/videos/tutorial',
      },
      {
        icon: Video,
        title: 'Immigration Process Explained',
        description: 'Video overview of typical immigration processes and common steps involved.',
        link: '/videos/process',
      },
      {
        icon: Video,
        title: 'Expert Interviews',
        description: 'Watch interviews with immigration lawyers and consultants sharing insights.',
        link: '/videos/experts',
      },
      {
        icon: Video,
        title: 'User Success Stories',
        description: 'Hear from users who successfully navigated their immigration journey with Hijraah.',
        link: '/videos/success-stories',
      },
    ],
  },
  {
    id: 'community',
    title: 'Community & Support',
    icon: Users,
    resources: [
      {
        icon: Users,
        title: 'Community Forum',
        description: 'Join discussions, ask questions, and share experiences with fellow users.',
        link: '/community/forums',
      },
      {
        icon: Users,
        title: 'Find an Expert',
        description: 'Connect with verified immigration experts and consultants through our network.',
        link: '/experts', // Adjusted link
      },
      {
        icon: Calendar,
        title: 'Events & Webinars',
        description: 'Find upcoming webinars, workshops, and Q&A sessions related to immigration.',
        link: '/community/events',
      },
      {
        icon: HelpCircle, // Changed icon
        title: 'Get Support',
        description: 'Access our help center or contact our support team for assistance.',
        link: '/help', // Adjusted link
      },
    ],
  },
];

// THE MAIN CONSTANT
export const ONBOARDING_STEPS_CONFIG: OnboardingStepConfig[] = [
  {
    id: 'welcome',
    title: 'Welcome to Hijraah',
    description: 'Your journey to simplified immigration starts here. We\'ll guide you through the process step by step.',
    component: 'WelcomeModal', // Component Name
    // No specific actionKey needed for welcome usually, completion = nextStep
  },
  {
    id: 'profile-setup',
    title: 'Profile Setup',
    description: 'Tell us about your immigration goals and preferences so we can personalize your experience.',
    component: 'ProfileSetup',
    // actionKey is within profileSetupConfig
    profileSetupConfig: profileSetupDetails,
    features: [
      {
        id: 'personal-info',
        title: 'Personal Information',
        description: 'Securely store your basic information to streamline document completion.',
      },
      {
        id: 'immigration-status',
        title: 'Immigration Status',
        description: 'Help us understand your current situation and destination plans.',
      },
      {
        id: 'preferences',
        title: 'Preferences',
        description: 'Set your preferences for language, notifications, and more.',
      }
    ]
  },
  {
    id: 'feature-tour',
    title: 'Feature Tour',
    description: 'Discover the powerful tools Hijraah offers to simplify your immigration journey.',
    component: 'FeatureTour',
    actionKey: 'feature_tour_completed', // Step completion action
    tourStops: featureTourDetails,
    features: [
      {
        id: 'document-management',
        title: 'Document Management',
        description: 'Upload, organize, and securely store all your important immigration documents in one place.',
        imageUrl: '/images/features/document-management.svg',
      },
      {
        id: 'case-tracking',
        title: 'Case Tracking',
        description: 'Monitor the progress of your immigration applications with real-time status updates.',
        imageUrl: '/images/features/case-tracking.svg',
      },
      {
        id: 'ai-assistance',
        title: 'AI Assistance',
        description: 'Get personalized guidance and answers to your immigration questions with our AI assistant.',
        imageUrl: '/images/features/ai-assistance.svg',
      },
      {
        id: 'deadline-reminders',
        title: 'Deadline Reminders',
        description: 'Never miss an important date with automated reminders for application deadlines and appointments.',
        imageUrl: '/images/features/deadline-reminders.svg',
      }
    ]
  },
  {
    id: 'first-task',
    title: 'Complete Your First Task', // Made title more active
    description: 'Choose one task to get started and experience a core feature of Hijraah.',
    component: 'FirstTask',
    // actionKeys are within task details
    tasks: firstTaskDetails,
    features: [
      {
        id: 'create-case',
        title: 'Create Your First Case',
        description: 'Set up your first immigration case to track your progress and manage documents.',
      },
      {
        id: 'upload-document',
        title: 'Upload Your First Document',
        description: 'Securely upload and store your first immigration document.',
      }
    ]
  },
  {
    id: 'resources',
    title: 'Explore Resources', // Made title more active
    description: 'Discover helpful guides, tools, and community support for your immigration journey.',
    component: 'Resources',
    actionKey: 'resources_viewed', // Step completion action
    resourceCategories: resourceDetails,
    features: [
      {
        id: 'immigration-guides',
        title: 'Immigration Guides',
        description: 'Step-by-step guides for different visa types and immigration processes.',
        imageUrl: '/images/features/guides.svg',
      },
      {
        id: 'country-information',
        title: 'Country Information',
        description: 'Detailed information about immigration policies, requirements, and cultural insights for different countries.',
        imageUrl: '/images/features/country-info.svg',
      },
      {
        id: 'document-templates',
        title: 'Document Templates',
        description: 'Access professionally designed templates for common immigration documents and letters.',
        imageUrl: '/images/features/templates.svg',
      },
      {
        id: 'community-support',
        title: 'Community Support',
        description: 'Connect with others on similar immigration journeys to share experiences and advice.',
        imageUrl: '/images/features/community.svg',
      }
    ]
  }
];

// --- Utility Functions --- //

// Keep existing utility functions, but ensure they use ONBOARDING_STEPS_CONFIG

export const getStepByIndex = (index: number): OnboardingStepConfig | undefined => {
  if (index < 0 || index >= ONBOARDING_STEPS_CONFIG.length) return undefined;
  return ONBOARDING_STEPS_CONFIG[index];
};

export const getStepById = (id: string): OnboardingStepConfig | undefined => {
  return ONBOARDING_STEPS_CONFIG.find(step => step.id === id);
};

export const getStepIndex = (id: string): number => {
  return ONBOARDING_STEPS_CONFIG.findIndex(step => step.id === id);
};

export const getTotalSteps = (): number => {
  // Exclude 'completed' step if it's handled separately
  return ONBOARDING_STEPS_CONFIG.length;
};

// Derive the order directly from the config array
export const ONBOARDING_STEPS_ORDER = ONBOARDING_STEPS_CONFIG.map(step => step.id);

export const getNextStepId = (currentId: OnboardingStepId): OnboardingStepId | undefined => {
  const currentIndex = getStepIndex(currentId);
  if (currentIndex < 0 || currentIndex >= ONBOARDING_STEPS_CONFIG.length - 1) return undefined;
  return ONBOARDING_STEPS_CONFIG[currentIndex + 1].id;
};

export const getPreviousStepId = (currentId: OnboardingStepId): OnboardingStepId | undefined => {
  const currentIndex = getStepIndex(currentId);
  if (currentIndex <= 0) return undefined;
  return ONBOARDING_STEPS_CONFIG[currentIndex - 1].id;
}; 
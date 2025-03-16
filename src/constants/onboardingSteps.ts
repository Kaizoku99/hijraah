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

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Hijraah',
    description: 'Your journey to simplified immigration starts here. We\'ll guide you through the process step by step.',
  },
  {
    id: 'profile-setup',
    title: 'Profile Setup',
    description: 'Tell us about your immigration goals and preferences so we can personalize your experience.',
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
    title: 'First Task',
    description: 'Let\'s get started with your first task to set up your immigration journey.',
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
    title: 'Resources',
    description: 'Access helpful resources and guides for your immigration journey.',
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

export const getStepByIndex = (index: number): OnboardingStep | undefined => {
  if (index < 0 || index >= ONBOARDING_STEPS.length) return undefined;
  return ONBOARDING_STEPS[index];
};

export const getStepById = (id: string): OnboardingStep | undefined => {
  return ONBOARDING_STEPS.find(step => step.id === id);
};

export const getStepIndex = (id: string): number => {
  return ONBOARDING_STEPS.findIndex(step => step.id === id);
};

export const getTotalSteps = (): number => {
  return ONBOARDING_STEPS.length;
};

export const getNextStepId = (currentId: string): string | undefined => {
  const currentIndex = getStepIndex(currentId);
  if (currentIndex < 0 || currentIndex >= ONBOARDING_STEPS.length - 1) return undefined;
  return ONBOARDING_STEPS[currentIndex + 1].id;
};

export const getPreviousStepId = (currentId: string): string | undefined => {
  const currentIndex = getStepIndex(currentId);
  if (currentIndex <= 0) return undefined;
  return ONBOARDING_STEPS[currentIndex - 1].id;
}; 
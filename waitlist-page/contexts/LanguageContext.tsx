'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type Language = 'ar' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

interface LanguageProviderProps {
  children: React.ReactNode
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar')

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('hijraah-language') as Language
    if (savedLanguage && (savedLanguage === 'ar' || savedLanguage === 'en')) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage when changed
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('hijraah-language', lang)
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }

  // Translation function - will be populated with actual translations
  const t = (key: string): string => {
    return translations[language]?.[key] || key
  }

  const isRTL = language === 'ar'

  // Set initial document attributes
  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
  }, [language, isRTL])

  const value: LanguageContextType = {
    language,
    setLanguage: handleSetLanguage,
    t,
    isRTL
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

// Translations object - to be expanded
const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Navigation
    'nav.coming_soon': 'قريباً',
    'nav.early_access': 'وصول مبكر',
    
    // Hero Section
    'hero.badge': 'المنصة العربية الأولى للهجرة',
    'hero.arabic_first': 'عربي أولاً',
    'hero.main_title': 'هِجْرَة',
    'hero.subtitle': 'مستشارك الشخصي في رحلة الهجرة',
    'hero.description': 'مستشارك الشخصي في الهجرة والانتقال',
    'hero.english_subtitle': 'مستشارك الموثوق للهجرة الناجحة',
    'hero.cta_description': 'أول منصة هجرة عربية تقدم استشارات شخصية، تدقيق وثائق، وخارطة طريق مخصصة للمحترفين العرب. انضم لآلاف المحترفين الناجحين الذين حققوا أحلامهم في الهجرة.',
    'hero.scroll_down': 'اكتشف المزيد',
    
    // Features
    'features.title': 'مستشارك الشخصي للهجرة',
    'features.subtitle': 'خدمات احترافية مصممة خصيصاً للعرب',
    'features.description': 'أول منصة مصممة خصيصاً للمحترفين العرب الساعين للحصول على إرشادات الهجرة. نحن نفهم ثقافتك، ونتحدث لغتك، ونحترم قيمك.',
    
    // Stats
    'stats.title': 'قصص نجاح حقيقية',
    'stats.description': 'آلاف المحترفين العرب حققوا أحلامهم في الهجرة من خلال هجرة',
    
    // Testimonials
    'testimonials.title': 'قصص نجاح حقيقية',
    'testimonials.description': 'اكتشف كيف حقق المحترفون العرب مثلك أحلامهم في الهجرة مع هجرة',
    
    // Waitlist Form
    'form.title': 'انضم لقائمة الانتظار',
    'form.subtitle': 'Join the Waitlist',
    'form.description': 'كن من أول المستفيدين من منصة هجرة وابدأ رحلتك نحو الهجرة الناجحة',
    'form.name_label': 'الاسم الكامل',
    'form.name_placeholder': 'أدخل اسمك الكامل',
    'form.email_label': 'البريد الإلكتروني',
    'form.email_placeholder': 'أدخل بريدك الإلكتروني',
    'form.country_label': 'البلد الحالي',
    'form.country_placeholder': 'اختر بلدك الحالي',
    'form.submit_button': 'انضم لقائمة الانتظار',
    'form.submitting': 'جاري الإرسال...',
    'form.success': 'تم تسجيلك بنجاح! سنتواصل معك قريباً.',
    'form.error': 'حدث خطأ. يرجى المحاولة مرة أخرى.',
    'form.privacy_notice': 'لا رسائل مزعجة، أبداً. إلغاء الاشتراك بنقرة واحدة.',
    
    // Footer
    'footer.title': 'هجرة',
    'footer.description': 'مستشارك الشخصي في رحلة الهجرة والانتقال',
    'footer.rights': 'جميع الحقوق محفوظة. صُنع بـ ❤️ للمحترفين العرب',
  },
  en: {
    // Navigation
    'nav.coming_soon': 'Coming Soon',
    'nav.early_access': 'Early Access',
    
    // Hero Section
    'hero.badge': 'First Arabic Immigration Platform',
    'hero.arabic_first': 'Arabic-First',
    'hero.main_title': 'Hijraah',
    'hero.subtitle': 'Your Personal Immigration Consultant',
    'hero.description': 'Your Personal Immigration & Relocation Consultant',
    'hero.english_subtitle': 'Your Trusted Partner for Successful Immigration',
    'hero.cta_description': 'The first Arabic immigration platform offering personalized consultations, document validation, and custom roadmaps for Arab professionals. Join thousands of successful professionals who achieved their immigration dreams.',
    'hero.scroll_down': 'Discover More',
    
    // Features
    'features.title': 'Your Personal Immigration Consultant',
    'features.subtitle': 'Professional Services Designed for Arabs',
    'features.description': 'The first platform designed specifically for Arab professionals seeking immigration guidance. We understand your culture, speak your language, and respect your values.',
    
    // Stats
    'stats.title': 'Real Success Stories',
    'stats.description': 'Thousands of Arab professionals have achieved their immigration dreams through Hijraah',
    
    // Testimonials
    'testimonials.title': 'Real Success Stories',
    'testimonials.description': 'See how Arab professionals like you achieved their immigration dreams with Hijraah',
    
    // Waitlist Form
    'form.title': 'Join the Waitlist',
    'form.subtitle': 'انضم لقائمة الانتظار',
    'form.description': 'Be among the first to benefit from the Hijraah platform and start your journey toward successful immigration',
    'form.name_label': 'Full Name',
    'form.name_placeholder': 'Enter your full name',
    'form.email_label': 'Email Address',
    'form.email_placeholder': 'Enter your email address',
    'form.country_label': 'Current Country',
    'form.country_placeholder': 'Select your current country',
    'form.submit_button': 'Join Waitlist',
    'form.submitting': 'Submitting...',
    'form.success': 'Successfully registered! We\'ll contact you soon.',
    'form.error': 'An error occurred. Please try again.',
    'form.privacy_notice': 'No spam, ever. Unsubscribe with one click.',
    
    // Footer
    'footer.title': 'Hijraah',
    'footer.description': 'Your Personal Immigration & Relocation Consultant',
    'footer.rights': 'All rights reserved. Made with ❤️ for Arab professionals',
  }
}
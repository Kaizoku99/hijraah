'use client'

import { useState } from 'react'
import { Globe, ChevronDown } from 'lucide-react'
import { useLanguage, Language } from '../contexts/LanguageContext'

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: 'ar' as Language, name: 'العربية', flag: '🇸🇦' },
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' }
  ]

  const currentLanguage = languages.find(lang => lang.code === language)

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 rtl:space-x-reverse bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 text-sm text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
        aria-label="Select language"
      >
        <Globe className="w-4 h-4" />
        <span className="flex items-center space-x-1 rtl:space-x-reverse">
          <span>{currentLanguage?.flag}</span>
          <span className="hidden sm:block">{currentLanguage?.name}</span>
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full mt-2 right-0 rtl:right-auto rtl:left-0 z-50 bg-gray-800/95 backdrop-blur-sm border border-white/20 rounded-lg shadow-xl overflow-hidden min-w-[140px]">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 text-sm text-left rtl:text-right transition-colors duration-150 ${
                  language === lang.code
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-200 hover:bg-white/10'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
                {language === lang.code && (
                  <div className="ml-auto rtl:ml-0 rtl:mr-auto w-2 h-2 bg-white rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
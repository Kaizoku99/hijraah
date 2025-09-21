'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Users, Clock, Award } from 'lucide-react'
import Image from 'next/image'
import { WaitlistForm } from '../components/WaitlistForm'
import { FeaturesGrid } from '../components/FeaturesGrid'
import { StatsAndImprovements } from '../components/StatsAndImprovements'
import { TestimonialsSection } from '../components/TestimonialsSection'
import { SocialProofBanner } from '../components/SocialProofBanner'
import { HijraahLogo } from '../components/HijraahLogo'
import { LanguageSelector } from '../components/LanguageSelector'
import { useLanguage } from '../contexts/LanguageContext'

export default function HomePage() {
  const { t, isRTL } = useLanguage()

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 overflow-x-hidden w-full max-w-full scrollbar-none">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <HijraahLogo width={40} height={40} showText={true} />
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse text-sm text-gray-300">
                <span>{t('nav.coming_soon')}</span>
                <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs">
                  {t('nav.early_access')}
                </span>
              </div>
              <LanguageSelector />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 pt-32 overflow-x-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-20 w-80 h-80 bg-primary-600/20 rounded-full blur-3xl animate-float ${isRTL ? '-left-20' : '-right-20'}`}></div>
          <div className={`absolute -bottom-20 w-80 h-80 bg-accent-600/20 rounded-full blur-3xl animate-float ${isRTL ? '-right-20' : '-left-20'}`} style={{ animationDelay: '-3s' }}></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Logo and Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-28 h-28 md:w-40 md:h-40 relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-accent-600/20 rounded-full blur-xl"></div>
                <Image
                  src="/hijraah-logo.png"
                  alt="Hijraah Logo"
                  fill
                  className="object-contain filter drop-shadow-2xl relative z-10"
                  priority
                />
              </motion.div>
            </div>
            <div className="inline-flex items-center space-x-2 rtl:space-x-reverse glass-card px-6 py-3">
              <Sparkles className="w-5 h-5 text-primary-400" />
              <span className="text-white font-medium arabic-text">{t('hero.badge')}</span>
              <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {t('hero.arabic_first')}
              </span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight arabic-heading mixed-text"
            style={{ paddingBottom: '2rem', minHeight: '8rem', overflow: 'visible' }}
          >
            <span className="gradient-text arabic-text">{t('hero.main_title')}</span>
            <br />
            <span className="text-white arabic-text">{t('hero.subtitle')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-2xl md:text-3xl text-primary-300 mb-4 font-bold arabic-text mixed-text"
            dir={isRTL ? 'rtl' : 'ltr'}
            style={{ paddingBottom: '1rem', minHeight: '4rem', overflow: 'visible' }}
          >
            {t('hero.description')}
          </motion.p>

          {/* CTA Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed mixed-text"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {t('hero.cta_description')}
          </motion.p>

          {/* Key Features Pills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {[
              { icon: Users, text: '50K+ Users' },
              { icon: Clock, text: '15x Faster' },
              { icon: Award, text: '99.2% Accuracy' }
            ].map(({ icon: Icon, text }, index) => (
              <div key={text} className="flex items-center space-x-2 glass-card px-4 py-2">
                <Icon className="w-5 h-5 text-primary-400" />
                <span className="text-white font-medium">{text}</span>
              </div>
            ))}
          </motion.div>

          {/* Waitlist Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-8"
          >
            <WaitlistForm />
          </motion.div>

          {/* Call-to-Action Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex items-center justify-center space-x-2 text-gray-400"
          >
            <span>Join thousands already on the waitlist</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
          </div>
        </motion.div>
      </section>

      {/* Social Proof Banner */}
      <SocialProofBanner />

      {/* Features Grid */}
      <FeaturesGrid />

      {/* Stats and Improvements */}
      <StatsAndImprovements />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Final CTA Section */}
            {/* Waitlist CTA Section */}
      <section className="py-20 px-4 overflow-x-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card p-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6 arabic-heading mixed-text">
              هل أنت مستعد لبدء رحلة هجرتك؟
            </h2>
            <h3 className="text-3xl font-semibold text-white mb-4">
              Ready to Achieve Your Dream?
            </h3>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed mixed-text">
              <span className="arabic-text block mb-2" dir="rtl">
                انضم إلى آلاف المحترفين العرب الذين اختاروا هجرة كشريكهم الموثوق في رحلة الهجرة
              </span>
              Join thousands of Arab professionals who chose Hijraah as their trusted immigration partner. 
              Get personalized guidance, expert document validation, and a custom roadmap to success.
            </p>
            
            <WaitlistForm />
            
            <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="arabic-text">استشارة مجانية - Free consultation</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="arabic-text">دعم باللغة العربية - Arabic support</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="arabic-text">خصم المنضمين الأوائل - Early bird discount</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <HijraahLogo width={64} height={64} />
          </div>
          <h3 className="text-2xl font-bold gradient-text mb-2 arabic-heading mixed-text" style={{ paddingBottom: '0.75rem', minHeight: '3rem', overflow: 'visible' }}>{t('footer.title')}</h3>
          <p className="text-gray-400 mb-8 arabic-text mixed-text" dir={isRTL ? 'rtl' : 'ltr'}>
            {t('footer.description')}
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact Us</a>
            <a href="#" className="hover:text-white transition-colors">About</a>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10 text-gray-500 text-sm" dir={isRTL ? 'rtl' : 'ltr'}>
            © 2025 {t('footer.rights')}
          </div>
        </div>
      </footer>
    </main>
  )
}
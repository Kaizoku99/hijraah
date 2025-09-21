'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const stats = [
  { number: '5,000+', label: 'Arab Professionals', description: 'Successfully guided to their dream countries' },
  { number: '95%', label: 'Success Rate', description: 'With our personalized roadmaps' },
  { number: '50+', label: 'Expert Consultants', description: 'Vetted immigration specialists' },
  { number: '24/7', label: 'Arabic Support', description: 'Native speakers available anytime' }
]

const improvements = [
  'Arabic-first platform designed specifically for Arab professionals',
  'Expert document validation with certified Arabic translators',
  'Personalized immigration roadmaps based on your unique background',
  'Vetted marketplace of immigration consultants who understand your culture',
  'Success stories and guidance from thousands of Arab immigrants',
  'Cultural sensitivity training for all expert consultants',
  'Family reunification specialists with Middle Eastern expertise'
]

export function StatsAndImprovements() {
  const { t, isRTL } = useLanguage()
  
  return (
    <section className="py-20 px-4 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6 arabic-heading mixed-text" style={{ paddingBottom: '1.5rem', minHeight: '5rem', overflow: 'visible' }}>
            {t('stats.title')}
          </h2>
          <p className="text-xl text-gray-300 mb-12 arabic-text mixed-text" dir={isRTL ? 'rtl' : 'ltr'}>
            {t('stats.description')}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-6 text-center group hover:shadow-2xl transition-all duration-300"
              >
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-xl font-semibold text-white mb-2">
                  {stat.label}
                </div>
                <div className="text-gray-300 text-sm">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Improvements Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card p-12"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center arabic-heading mixed-text">
            لماذا تختار هجرة؟ - Why Choose Hijraah?
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {improvements.map((improvement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start space-x-4 group"
              >
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <p className="text-gray-300 leading-relaxed">
                  {improvement}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
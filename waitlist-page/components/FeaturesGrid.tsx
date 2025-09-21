'use client'

import { motion } from 'framer-motion'
import { Bot, Brain, FileSearch, Globe, Shield, Zap, Users } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const features = [
  {
    icon: FileSearch,
    title: 'Expert Document Validation',
    description: 'Professional verification of all your documents with certified translators and legal experts',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Brain,
    title: 'Personalized Roadmaps',
    description: 'Custom immigration pathways designed specifically for your background and goals',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Users,
    title: 'Vetted Expert Marketplace',
    description: 'Connect with certified immigration consultants, lawyers, and specialists who understand your culture',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Globe,
    title: 'Arabic-First Experience',
    description: 'Complete platform in Arabic with cultural understanding and respect for your values',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: Shield,
    title: 'Success Guarantee',
    description: 'Proven track record with thousands of successful Arab professionals worldwide',
    color: 'from-indigo-500 to-blue-500'
  },
  {
    icon: Zap,
    title: '24/7 Personal Support',
    description: 'Dedicated Arabic-speaking consultants available whenever you need guidance',
    color: 'from-yellow-500 to-orange-500'
  }
]

export function FeaturesGrid() {
  const { t, isRTL } = useLanguage()
  
  return (
    <section className="py-20 px-4 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6 arabic-heading mixed-text" style={{ paddingBottom: '1.5rem', minHeight: '5rem', overflow: 'visible' }}>
            {t('features.title')}
          </h2>
          <h3 className="text-3xl font-semibold text-white mb-4">
            {t('features.subtitle')}
          </h3>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed" dir={isRTL ? 'rtl' : 'ltr'}>
            {t('features.description')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-card p-8 group hover:shadow-2xl transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
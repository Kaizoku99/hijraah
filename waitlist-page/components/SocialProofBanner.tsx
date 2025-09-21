'use client'

import { motion } from 'framer-motion'

const logos = [
  { name: 'Emirates', logo: '✈️' },
  { name: 'ADNOC', logo: '�️' },
  { name: 'Aramco', logo: '⚡' },
  { name: 'Etisalat', logo: '�' },
  { name: 'Ooredoo', logo: '📱' },
  { name: 'Masdar', logo: '�' },
  { name: 'Emaar', logo: '🏗️' },
  { name: 'Al Jazeera', logo: '📺' }
]

export function SocialProofBanner() {
  return (
    <section className="py-16 px-4 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-gray-400 text-lg mb-8 arabic-text mixed-text">
            محترفون من أبرز الشركات العربية يثقون في هجرة - Professionals from leading Arab companies trust Hijraah
          </p>
          
          <div className="grid grid-cols-4 md:grid-cols-8 gap-8 items-center justify-center">
            {logos.map((company, index) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center space-y-2 group"
              >
                <div className="text-4xl opacity-60 group-hover:opacity-100 transition-opacity">
                  {company.logo}
                </div>
                <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                  {company.name}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8"
          >
            <div className="flex items-center space-x-2">
              <div className="text-2xl">📋</div>
              <span className="text-white font-semibold">5,000+ Success Stories</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="text-2xl">🌍</div>
              <span className="text-white font-semibold">Arabic-First Platform</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="text-2xl">👨‍💼</div>
              <span className="text-white font-semibold">50+ Expert Consultants</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}